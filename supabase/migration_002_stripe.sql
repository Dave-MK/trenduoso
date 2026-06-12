-- Add Stripe customer ID to profiles
-- Run this in the Supabase SQL editor

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- Index for webhook lookups by customer ID
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id
  ON profiles (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;
