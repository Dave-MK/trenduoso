-- Run this in the Supabase SQL editor after schema.sql
-- Safe to run multiple times (all inserts are ON CONFLICT DO NOTHING)

-- ─── Courses ──────────────────────────────────────────────────────────────────
INSERT INTO courses (slug, title, track, description, order_index, is_free, lesson_count, hours) VALUES
  ('reading-price-structure', 'Reading price structure', 'foundations',
   'Learn to identify highs, lows, structure shifts and market phases from raw price action.',
   1, true, 18, 4.2),
  ('trendlines-and-channels', 'Trendlines and channels', 'technical',
   'Draw valid trendlines, identify channels, and grade your accuracy against reference answers.',
   2, true, 24, 5.8),
  ('support-and-resistance', 'Support and resistance', 'technical',
   'Identify key price levels, understand confluence, and practice marking them on live charts.',
   3, false, 20, 4.6),
  ('candlestick-patterns', 'Candlestick patterns', 'technical',
   'Master the 12 most reliable candlestick patterns with graded recognition exercises.',
   4, false, 16, 3.8),
  ('position-sizing-rr', 'Position sizing and R:R', 'risk',
   'Calculate position sizes, set stop losses, and build a risk-first trading mindset.',
   5, false, 12, 2.9),
  ('strategy-building', 'Strategy building', 'strategy',
   'Define your edge, backtest setups, and build a repeatable trading process from scratch.',
   6, false, 28, 6.2)
ON CONFLICT (slug) DO NOTHING;


-- ─── Lessons: reading-price-structure ─────────────────────────────────────────
INSERT INTO lessons (course_id, slug, title, order_index, type, xp_value, content)
SELECT c.id, l.slug, l.title, l.order_index, l.type, l.xp_value, l.content
FROM courses c
CROSS JOIN (VALUES
  ('lesson-1', 'What is price action?',          1, 'reading',         30, NULL::jsonb),
  ('lesson-2', 'Identifying swing highs and lows', 2, 'reading',       30, NULL::jsonb),
  ('lesson-3', 'Higher highs, higher lows',       3, 'video',          30, NULL::jsonb),
  ('lesson-4', 'Marking swing points — exercise', 4, 'canvas_exercise', 50,
     '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"Mark the three most significant swing highs on this chart.","reference_line":{"x1":0,"y1":30,"x2":100,"y2":30},"steps":[{"id":"1","label":"Study the candles","completed":false},{"id":"2","label":"Mark swing highs","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-5', 'Recognising structure shifts',    5, 'reading',         30, NULL::jsonb),
  ('lesson-6', 'Impulse vs corrective moves',     6, 'video',           30, NULL::jsonb),
  ('lesson-7', 'Structure shift — exercise',      7, 'canvas_exercise', 50,
     '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"Draw a line at the first candle that breaks structure to the upside.","reference_line":{"x1":50,"y1":50,"x2":100,"y2":30},"steps":[{"id":"1","label":"Identify the prior downtrend","completed":false},{"id":"2","label":"Find the break of structure","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb)
) AS l(slug, title, order_index, type, xp_value, content)
WHERE c.slug = 'reading-price-structure'
ON CONFLICT (course_id, slug) DO NOTHING;


-- ─── Lessons: trendlines-and-channels ─────────────────────────────────────────
INSERT INTO lessons (course_id, slug, title, order_index, type, xp_value, content)
SELECT c.id, l.slug, l.title, l.order_index, l.type, l.xp_value, l.content
FROM courses c
CROSS JOIN (VALUES
  ('lesson-1', 'What makes a valid trendline?',      1, 'reading',          30, NULL::jsonb),
  ('lesson-2', 'Identifying higher lows',             2, 'video',            30, NULL::jsonb),
  ('lesson-3', 'Drawing your first trendline',        3, 'canvas_exercise',  50,
     '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"Draw a valid uptrend line connecting the three most obvious higher lows.","reference_line":{"x1":0,"y1":88,"x2":100,"y2":22},"steps":[{"id":"1","label":"Identify higher lows","completed":false},{"id":"2","label":"Draw your trendline","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-4', 'Drawing valid uptrend lines',         4, 'canvas_exercise',  50,
     '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"Draw a valid uptrend line connecting at least three higher lows. Your line must not cut through candle bodies.","reference_line":{"x1":0,"y1":85,"x2":100,"y2":20},"steps":[{"id":"1","label":"Identify higher lows","completed":false},{"id":"2","label":"Watch intro video","completed":false},{"id":"3","label":"Draw your trendline","completed":false},{"id":"4","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-5', 'Downtrend lines — mirror technique', 5, 'canvas_exercise',  50,
     '{"ticker":"GBPUSD","timeframe":"H1","exercise_prompt":"Draw a valid downtrend line connecting at least two lower highs.","reference_line":{"x1":0,"y1":15,"x2":100,"y2":75},"steps":[{"id":"1","label":"Identify lower highs","completed":false},{"id":"2","label":"Draw your trendline","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-6', 'Channel construction',               6, 'reading',          30, NULL::jsonb),
  ('lesson-7', 'Parallel channels — exercise',       7, 'canvas_exercise',  50,
     '{"ticker":"USDJPY","timeframe":"H4","exercise_prompt":"Draw the ascending channel — both the trendline and the parallel return line.","reference_line":{"x1":0,"y1":80,"x2":100,"y2":25},"steps":[{"id":"1","label":"Draw the base trendline","completed":false},{"id":"2","label":"Draw the parallel return","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-8', 'Trendline breaks',                   8, 'reading',          30, NULL::jsonb)
) AS l(slug, title, order_index, type, xp_value, content)
WHERE c.slug = 'trendlines-and-channels'
ON CONFLICT (course_id, slug) DO NOTHING;


-- ─── Lessons: support-and-resistance ──────────────────────────────────────────
INSERT INTO lessons (course_id, slug, title, order_index, type, xp_value, content)
SELECT c.id, l.slug, l.title, l.order_index, l.type, l.xp_value, l.content
FROM courses c
CROSS JOIN (VALUES
  ('lesson-1', 'What is support and resistance?',  1, 'reading',          30, NULL::jsonb),
  ('lesson-2', 'Horizontal levels',                2, 'video',            30, NULL::jsonb),
  ('lesson-3', 'Marking key levels — exercise',    3, 'canvas_exercise',  50,
     '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Mark the three most significant horizontal support and resistance levels on this chart.","reference_line":{"x1":0,"y1":45,"x2":100,"y2":45},"steps":[{"id":"1","label":"Identify key levels","completed":false},{"id":"2","label":"Mark your levels","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-4', 'Role reversal — support becomes resistance', 4, 'reading', 30, NULL::jsonb),
  ('lesson-5', 'Confluence zones',                 5, 'video',            30, NULL::jsonb)
) AS l(slug, title, order_index, type, xp_value, content)
WHERE c.slug = 'support-and-resistance'
ON CONFLICT (course_id, slug) DO NOTHING;


-- ─── Lessons: candlestick-patterns ────────────────────────────────────────────
INSERT INTO lessons (course_id, slug, title, order_index, type, xp_value, content)
SELECT c.id, l.slug, l.title, l.order_index, l.type, l.xp_value, l.content
FROM courses c
CROSS JOIN (VALUES
  ('lesson-1', 'Why candlesticks tell a story', 1, 'reading', 30, NULL::jsonb),
  ('lesson-2', 'Doji, hammer, shooting star',   2, 'video',   30, NULL::jsonb),
  ('lesson-3', 'Engulfing patterns',            3, 'video',   30, NULL::jsonb),
  ('lesson-4', 'Pattern recognition — exercise', 4, 'canvas_exercise', 50,
     '{"ticker":"BTCUSD","timeframe":"H4","exercise_prompt":"Identify and mark the bearish engulfing pattern on this chart.","reference_line":{"x1":55,"y1":20,"x2":65,"y2":60},"steps":[{"id":"1","label":"Study the candles","completed":false},{"id":"2","label":"Find the pattern","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-5', 'Morning and evening stars',     5, 'reading', 30, NULL::jsonb)
) AS l(slug, title, order_index, type, xp_value, content)
WHERE c.slug = 'candlestick-patterns'
ON CONFLICT (course_id, slug) DO NOTHING;


-- ─── Lessons: position-sizing-rr ──────────────────────────────────────────────
INSERT INTO lessons (course_id, slug, title, order_index, type, xp_value, content)
SELECT c.id, l.slug, l.title, l.order_index, l.type, l.xp_value, l.content
FROM courses c
CROSS JOIN (VALUES
  ('lesson-1', 'The 1% rule',             1, 'reading', 30, NULL::jsonb),
  ('lesson-2', 'Calculating position size', 2, 'video', 30, NULL::jsonb),
  ('lesson-3', 'Risk:reward ratios',      3, 'reading', 30, NULL::jsonb),
  ('lesson-4', 'Setting stop losses',     4, 'video',   30, NULL::jsonb),
  ('lesson-5', 'Position sizing worksheet', 5, 'reading', 30, NULL::jsonb)
) AS l(slug, title, order_index, type, xp_value, content)
WHERE c.slug = 'position-sizing-rr'
ON CONFLICT (course_id, slug) DO NOTHING;


-- ─── Lessons: strategy-building ───────────────────────────────────────────────
INSERT INTO lessons (course_id, slug, title, order_index, type, xp_value, content)
SELECT c.id, l.slug, l.title, l.order_index, l.type, l.xp_value, l.content
FROM courses c
CROSS JOIN (VALUES
  ('lesson-1', 'What is an edge?',            1, 'reading', 30, NULL::jsonb),
  ('lesson-2', 'Defining your setup rules',   2, 'video',   30, NULL::jsonb),
  ('lesson-3', 'Introduction to backtesting', 3, 'reading', 30, NULL::jsonb),
  ('lesson-4', 'Journalling your trades',     4, 'video',   30, NULL::jsonb),
  ('lesson-5', 'Building your playbook',      5, 'reading', 30, NULL::jsonb)
) AS l(slug, title, order_index, type, xp_value, content)
WHERE c.slug = 'strategy-building'
ON CONFLICT (course_id, slug) DO NOTHING;
