-- Curriculum Difficulty Fixes
-- Run this in the Supabase SQL editor against an already-seeded database.
-- Safe to re-run. Does NOT affect user_progress or lesson data.

-- ─── FIX 1: Move options-fundamentals from Level 4 → Level 5 ─────────────────
-- Prop firms (FTMO etc.) don't allow options trading. Options basics belong at L5
-- where traders are expanding their toolkit after mastering spot execution.
UPDATE courses
SET level = 5,
    level_name = 'The Tactician',
    order_index = 55
WHERE slug = 'options-fundamentals';

-- ─── FIX 2: Rename + reframe the Level 4 macro course ───────────────────────
-- Old: "Macroeconomics: Central Banks, Interest Rates, and Economic Data"
-- Overlap with Level 7 content (Central Bank Deep Dive, Currency Wars).
-- New framing: practical event-driven trading — how to manage positions around
-- specific data releases. Level 7 remains the deep structural macro layer.
UPDATE courses
SET slug = 'trading-economic-events',
    title = 'Trading Economic Events: How to Navigate NFP, CPI, and FOMC',
    description = 'High-impact data releases create the biggest short-term moves in any market. Learn to read the economic calendar, manage open positions into news, understand the NFP, CPI, and FOMC reaction mechanics, and know when standing aside is the professional choice.'
WHERE slug = 'macro-economics-for-traders';

-- ─── FIX 3: Move statistical-arbitrage-intro from Level 6 → Level 9 ─────────
-- Cointegration testing and stat-arb are institutional-grade techniques used by
-- quant hedge funds. A trader who just learned systematic design (L6) is not
-- ready. Moved to Level 9 (The Book Runner) alongside portfolio construction and
-- attribution analysis.
UPDATE courses
SET level = 9,
    level_name = 'The Book Runner',
    order_index = 95,
    description = 'Statistical arbitrage exploits the temporary deviation of related instruments from their historical relationship. Learn pairs trading, cointegration testing, spread construction, and the position management specific to stat-arb strategies — institutional techniques for the multi-strategy book.'
WHERE slug = 'statistical-arbitrage-intro';

-- ─── FIX 4: Fix options-strategies-advanced track tag ─────────────────────────
-- Was incorrectly tagged as 'foundations'. Multi-leg options strategies (spreads,
-- straddles, iron condors) are 'strategy' track content.
UPDATE courses
SET track = 'strategy'
WHERE slug = 'options-strategies-advanced';

-- ─── FIX 5: Add market-regimes course to Level 6 ─────────────────────────────
-- Replaces statistical-arbitrage-intro. Directly useful for systematic strategy
-- design: regime detection (ADX, BB width) to avoid applying trend strategies in
-- ranging markets.
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name)
VALUES (
  'market-regimes',
  'Market Regimes: Identifying Trending, Ranging, and Volatile States',
  'strategy',
  'The single biggest reason systematic strategies fail in live trading is regime mismatch — applying a trend-following system in a range-bound market. Learn to detect the current regime objectively using ADX, Bollinger Band width, and volatility percentile, then build regime filters into every strategy you design.',
  63,false,14,3.5,6,'The Quant'
)
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;

-- ─── Add lessons for market-regimes ──────────────────────────────────────────
INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Four Market Regimes: Trending, Ranging, Volatile, and Quiet',1,'reading',40,NULL::jsonb),
  ('lesson-2','Detecting Trend Strength: ADX and the Directional Movement System',2,'video',40,NULL::jsonb),
  ('lesson-3','Detecting Range Conditions: Bollinger Band Width and ATR Normalisation',3,'reading',40,NULL::jsonb),
  ('lesson-4','Volatility Regimes: When the Market Changes Gears',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build a Regime Filter for a Systematic Strategy',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A 2-year EUR/USD chart is shown with four colour-coded periods below: trending up (green), trending down (red), ranging (grey), high-volatility (orange). For each regime period, draw a box on the strategy performance panel showing whether a trend-following EMA crossover strategy is profitable or unprofitable in that regime. Then draw a line on the ADX panel and mark where ADX>25 correctly identified the trending regimes in advance. How much does the strategy improve if you switch it off when ADX<20?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Colour-code each regime on the chart","completed":false},{"id":"2","label":"Mark strategy profitability per regime","completed":false},{"id":"3","label":"Verify ADX as regime predictor","completed":false}]}'::jsonb),
  ('lesson-6','Strategy-Regime Pairing: Matching Your System to Current Market Conditions',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='market-regimes' ON CONFLICT (course_id,slug) DO NOTHING;

-- ─── Verification query ───────────────────────────────────────────────────────
-- Run this to confirm all changes applied correctly:
SELECT level, level_name, slug, title, track
FROM courses
WHERE slug IN (
  'options-fundamentals',
  'trading-economic-events',
  'statistical-arbitrage-intro',
  'options-strategies-advanced',
  'market-regimes'
)
ORDER BY level, slug;
