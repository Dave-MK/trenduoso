-- Run this BEFORE running seed_curriculum.sql
-- Adds level column and level_name to courses

ALTER TABLE courses ADD COLUMN IF NOT EXISTS level integer NOT NULL DEFAULT 2;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS level_name text;

-- Update level_name from level
UPDATE courses SET level_name = CASE level
  WHEN 1 THEN 'The Apprentice'
  WHEN 2 THEN 'The Operator'
  WHEN 3 THEN 'The Analyst'
  WHEN 4 THEN 'The Allocator'
  ELSE 'The Operator'
END;
