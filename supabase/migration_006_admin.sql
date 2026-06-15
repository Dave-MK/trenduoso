-- migration_006_admin.sql
-- Admin role, policies, and is_admin helper function

-- Add is_admin flag
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Security-definer helper: bypasses RLS so profile policies can safely call it
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT coalesce(
    (SELECT is_admin FROM profiles WHERE id = auth.uid() LIMIT 1),
    false
  )
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Set the app owner as admin (matches the registered email)
DO $$
DECLARE v_uid uuid;
BEGIN
  SELECT id INTO v_uid FROM auth.users WHERE email = 'ntice.digital@gmail.com' LIMIT 1;
  IF v_uid IS NOT NULL THEN
    UPDATE profiles SET is_admin = true WHERE id = v_uid;
    RAISE NOTICE 'Admin flag set for ntice.digital@gmail.com';
  ELSE
    RAISE NOTICE 'User ntice.digital@gmail.com not found — sign up first then re-run this migration';
  END IF;
END $$;

-- ─────────────────────────────────────────
-- Profiles: admins can read ALL rows (for usage stats)
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (is_admin() OR auth.uid() = id);

-- ─────────────────────────────────────────
-- Courses: admins can INSERT / UPDATE / DELETE
-- (SELECT already public via "Courses are public" policy)
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Admins can insert courses" ON courses;
CREATE POLICY "Admins can insert courses" ON courses
  FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update courses" ON courses;
CREATE POLICY "Admins can update courses" ON courses
  FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete courses" ON courses;
CREATE POLICY "Admins can delete courses" ON courses
  FOR DELETE USING (is_admin());

-- ─────────────────────────────────────────
-- Lessons: admins can INSERT / UPDATE / DELETE
-- (SELECT already public via "Lessons are public" policy)
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Admins can insert lessons" ON lessons;
CREATE POLICY "Admins can insert lessons" ON lessons
  FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update lessons" ON lessons;
CREATE POLICY "Admins can update lessons" ON lessons
  FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete lessons" ON lessons;
CREATE POLICY "Admins can delete lessons" ON lessons
  FOR DELETE USING (is_admin());

-- ─────────────────────────────────────────
-- User progress: admins can read all rows (analytics)
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Admins can read all user_progress" ON user_progress;
CREATE POLICY "Admins can read all user_progress" ON user_progress
  FOR SELECT USING (is_admin() OR auth.uid() = user_id);
