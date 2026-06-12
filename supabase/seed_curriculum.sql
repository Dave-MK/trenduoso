-- Full Tradecuity Curriculum Seed
-- Run AFTER migration_001_add_level.sql
-- Safe to re-run: courses use ON CONFLICT DO UPDATE, lessons use ON CONFLICT DO NOTHING

-- ─── Clean up old placeholder courses ─────────────────────────────────────────
DELETE FROM courses WHERE slug IN (
  'reading-price-structure','trendlines-and-channels','support-and-resistance',
  'position-sizing-rr','strategy-building'
);

-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 1 — PAPER TRADER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('how-markets-work','How Financial Markets Work','foundations',
   'Understand the full ecosystem of tradeable markets — from stock exchanges and forex pairs to crypto and commodity futures. Learn who the participants are, how prices are actually formed, and why markets move.',
   10,true,14,3.0,1,'The Apprentice'),
  ('reading-price-charts','Reading a Price Chart from Scratch','technical',
   'Go from a blank chart to confidently reading candlesticks, OHLC bars, and line charts across multiple timeframes. Learn what each candle is actually telling you about buying and selling pressure in that period.',
   11,true,16,3.5,1,'The Apprentice'),
  ('basic-price-action','Basic Price Action: Trends, Ranges, and Structure','technical',
   'Learn to see what the chart is doing before you apply any indicators. Identify trending markets vs ranging markets, spot higher highs and lower lows, and understand why price structure is the foundation of every strategy.',
   12,false,15,3.0,1,'The Apprentice'),
  ('intro-to-technical-tools','Your First Technical Analysis Tools','technical',
   'Get hands-on with trendlines, horizontal levels, and a first look at moving averages. No indicator overload — just the tools that provide genuine informational edge when used correctly.',
   13,false,13,2.5,1,'The Apprentice'),
  ('risk-fundamentals','Risk Fundamentals: Protecting Your Capital First','risk',
   'Before chasing profit, define exactly how much you are willing to lose. Establishes the discipline of controlled risk: stop placement, percentage-based position sizing, and why protecting capital during losing periods is the foundation every strategy is built on.',
   14,false,12,2.5,1,'The Apprentice'),
  ('paper-trading-and-psychology','Paper Trading and the Trader''s Mindset','foundations',
   'Set up your first paper trading account and make your first trades. Understand why fear and greed cause the disposition effect — the scientifically proven tendency to cut winners short and let losers run — and build the habits to fight it.',
   15,false,14,3.0,1,'The Apprentice')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;


-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 2 — LIVE TRADER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('technical-analysis-in-depth','Technical Analysis: Trendlines, Channels, and S&R Mastery','technical',
   'Go beyond the basics and learn to draw high-probability technical structures with precision. Covers multi-touch trendlines, price channels, dynamic support/resistance, and the difference between zones and levels.',
   20,true,18,4.0,2,'The Operator'),
  ('chart-patterns','Chart Patterns: From Reversals to Continuations','technical',
   'Learn to identify and trade the chart formations that institutional and retail participants have consistently acted on for decades — head and shoulders, double tops and bottoms, triangles, flags, and wedges. Understand their formation logic, not just their visual shape.',
   21,true,20,4.5,2,'The Operator'),
  ('candlestick-patterns','Candlestick Patterns: Reading Individual and Multi-Bar Signals','technical',
   'Master the candlestick signals that appear at turning points. Learn single-bar signals (doji, hammer, shooting star) and multi-bar patterns (engulfing, morning star) — and critically — how context determines validity.',
   22,false,16,3.5,2,'The Operator'),
  ('indicators-that-work','Indicators That Actually Work: RSI, MACD, and Bollinger Bands','technical',
   'Cut through indicator overload and focus on the three that professional retail traders actually rely on. Learn what these indicators measure mathematically, their common misuses, and how to combine them with price action.',
   23,false,17,4.0,2,'The Operator'),
  ('risk-management-framework','Risk Management: Building a Framework That Survives a Losing Streak','risk',
   'Develop a complete risk management framework: reward-to-risk ratios, position sizing, understanding drawdown cycles, and the psychology of executing a plan during losses.',
   24,false,15,3.5,2,'The Operator'),
  ('volume-analysis','Volume Analysis: The Hidden Dimension of Price','technical',
   'Most traders look at price alone. Volume reveals conviction behind each move. Learn volume-price analysis, volume profile basics, and how to use volume to confirm or question every trade setup.',
   25,false,12,2.5,2,'The Operator')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;


-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 3 — SWING TRADER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('multi-timeframe-analysis','Multi-Timeframe Analysis: Trading with HTF and LTF Alignment','technical',
   'Traders operating on a single timeframe are working with incomplete information. Learn to establish directional bias from the higher timeframe, then drop to a lower timeframe for precision entries. Understand why the higher timeframe context always takes precedence over the entry signal.',
   30,true,16,4.0,3,'The Analyst'),
  ('smart-money-concepts','Smart Money Concepts: Order Blocks, Fair Value Gaps, and Liquidity','technical',
   'SMC attempts to model institutional order flow. Learn order blocks, fair value gaps, liquidity pools, CHoCH, and BOS — and understand the criticisms of the approach alongside its genuine strengths.',
   31,true,22,5.5,3,'The Analyst'),
  ('fibonacci-and-elliott-wave','Fibonacci Tools and Elliott Wave Basics','technical',
   'Fibonacci retracements and extensions are among the most widely-referenced price levels in technical analysis — used by enough participants that they generate observable self-reinforcing effects at key levels. Elliott Wave provides a structural framework for reading market cycles. Learn both with a clear-eyed view of where each approach holds up and where it does not.',
   32,false,18,4.5,3,'The Analyst'),
  ('sector-correlation-analysis','Sector Rotation and Correlation Analysis','fundamental',
   'Markets don''t move in isolation. Learn how capital flows between sectors during economic cycles, how currency and commodity correlations affect forex trades, and how to use intermarket analysis for stronger directional thesis.',
   33,false,14,3.0,3,'The Analyst'),
  ('building-your-trading-plan','Building a Complete Trading Plan','strategy',
   'Trading without documented rules is trading on impulse. A trading plan codifies every decision in advance: which setups qualify, exactly how you enter and exit, how much you risk per trade, which sessions you trade, and when you review performance. Build every component from scratch.',
   34,false,15,3.5,3,'The Analyst'),
  ('trade-journalling','Trade Journalling and Performance Review','strategy',
   'The traders who improve fastest review their work systematically. Learn to build a meaningful trade journal, identify patterns in your performance data, and run weekly and monthly reviews that generate actionable improvements.',
   35,false,13,3.0,3,'The Analyst')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;


-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 4 — PROP TRADER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('backtesting-and-statistics','Backtesting and Strategy Statistics','strategy',
   'A strategy is a hypothesis. Backtesting is how you test it. Learn statistically rigorous methodology, in-sample vs out-of-sample testing, overfitting traps, and how to calculate the metrics that actually matter.',
   40,true,20,5.0,4,'The Allocator'),
  ('algorithmic-thinking','Algorithmic Thinking: From Manual to Rule-Based Strategy','strategy',
   'You don''t need to code to think algorithmically. Formalise your trading rules into precise if-then decision trees, understand strategy parameters and sensitivity analysis, and get an introduction to automated strategy concepts.',
   41,true,16,4.0,4,'The Allocator'),
  ('trading-economic-events','Trading Economic Events: How to Navigate NFP, CPI, and FOMC','fundamental',
   'High-impact data releases create the biggest short-term moves in any market. Learn to read the economic calendar, manage open positions into news, understand the NFP, CPI, and FOMC reaction mechanics, and know when standing aside is the professional choice.',
   43,false,18,4.5,4,'The Allocator'),
  ('portfolio-and-advanced-risk','Portfolio Management and Advanced Risk','risk',
   'Move from single-trade risk to portfolio-level thinking. Learn Sharpe ratio, Sortino ratio, max drawdown, diversification, correlation risk, Kelly Criterion sizing, and how professional fund managers think about risk.',
   44,false,19,5.0,4,'The Allocator'),
  ('prop-firm-preparation','Prop Firm Evaluation: Passing the Challenge','strategy',
   'The prop firm model offers retail traders access to institutional capital. Learn exactly how FTMO-style evaluations work, the rules that catch traders out, and how to adapt your strategy to the constraints of a funded account.',
   45,false,16,4.0,4,'The Allocator')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 1: PAPER TRADER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Is a Financial Market and Why It Exists',1,'reading',30,NULL::jsonb),
  ('lesson-2','The Five Major Asset Classes: Stocks, Forex, Crypto, Commodities, Indices',2,'reading',30,NULL::jsonb),
  ('lesson-3','How a Stock Exchange Actually Works: Order Matching and Liquidity',3,'video',30,NULL::jsonb),
  ('lesson-4','Forex: Currency Pairs, Pips, and the 24-Hour Market',4,'reading',30,NULL::jsonb),
  ('lesson-5','Crypto Markets: Spot vs Perpetual Futures, CEX vs DEX',5,'reading',30,NULL::jsonb),
  ('lesson-6','Market Participants: Retail Traders vs Institutions vs Market Makers',6,'video',30,NULL::jsonb),
  ('lesson-7','Bulls, Bears, and What Drives Price: Supply and Demand Fundamentals',7,'reading',30,NULL::jsonb),
  ('lesson-8','Match the Market Participant to Their Role',8,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Five market participants are shown: retail trader, hedge fund, central bank, market maker, pension fund. Drag each to the description that best matches their primary role and typical trade size on this market depth chart.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Read the participant profiles","completed":false},{"id":"2","label":"Match each to their role","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='how-markets-work' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Chart Types: Line, Bar (OHLC), and Candlestick — Which to Use and When',1,'reading',30,NULL::jsonb),
  ('lesson-2','Anatomy of a Candlestick: Open, High, Low, Close and What They Reveal',2,'video',30,NULL::jsonb),
  ('lesson-3','Timeframes Explained: From 1-Minute Scalping to Monthly Investment Views',3,'reading',30,NULL::jsonb),
  ('lesson-4','Reading the Y-Axis: Price Scale, Log vs Linear',4,'reading',30,NULL::jsonb),
  ('lesson-5','Identify the Body and Wicks on a Live Chart',5,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"On the candlestick chart provided, draw a line marking the body of the three highlighted candles. Then identify which candle shows the strongest buying pressure by clicking on it — your line must connect the open and close, not the wicks.","reference_line":{"x1":20,"y1":40,"x2":20,"y2":70},"steps":[{"id":"1","label":"Study the candle anatomy","completed":false},{"id":"2","label":"Mark the candle bodies","completed":false},{"id":"3","label":"Identify buying pressure","completed":false}]}'::jsonb),
  ('lesson-6','What Makes a Candle Bullish or Bearish: Body Size, Wick Length, and Context',6,'video',30,NULL::jsonb),
  ('lesson-7','Volume: The Confirmation Layer That Most Beginners Ignore',7,'reading',30,NULL::jsonb),
  ('lesson-8','Choose the Right Timeframe for a Trading Style',8,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"H4","exercise_prompt":"Five trader profiles are shown: day trader, swing trader, position trader, scalper, long-term investor. On the multi-timeframe chart panel, draw a line connecting each trader to their primary timeframe. The system will score your matches.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Read each trader profile","completed":false},{"id":"2","label":"Match traders to timeframes","completed":false},{"id":"3","label":"Review your matches","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='reading-price-charts' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Defining a Trend: Higher Highs and Higher Lows vs Lower Highs and Lower Lows',1,'reading',30,NULL::jsonb),
  ('lesson-2','Ranging Markets: Consolidation and Sideways Price Action',2,'reading',30,NULL::jsonb),
  ('lesson-3','Support and Resistance: The Foundation Concepts',3,'video',30,NULL::jsonb),
  ('lesson-4','Identify Trend Direction on a Real Chart',4,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"The chart shows EUR/USD over 3 months. Draw a line marking the most recent significant swing high and another marking the most recent swing low. Then classify the market as uptrend, downtrend, or range by drawing an arrow in the dominant direction.","reference_line":{"x1":0,"y1":75,"x2":100,"y2":25},"steps":[{"id":"1","label":"Mark the swing high","completed":false},{"id":"2","label":"Mark the swing low","completed":false},{"id":"3","label":"Draw trend direction arrow","completed":false}]}'::jsonb),
  ('lesson-5','How Support Becomes Resistance: Role Reversal',5,'reading',30,NULL::jsonb),
  ('lesson-6','Swing Highs and Lows: Counting Structure Manually',6,'video',30,NULL::jsonb),
  ('lesson-7','Mark the Key Levels on a Clean Chart',7,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"A daily GBP/USD chart is displayed with all indicators removed. Draw horizontal lines at the 3 most significant support levels and 3 most significant resistance levels you can identify from the price history.","reference_line":{"x1":0,"y1":45,"x2":100,"y2":45},"steps":[{"id":"1","label":"Identify 3 support levels","completed":false},{"id":"2","label":"Identify 3 resistance levels","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-8','Why Retail Traders Buy at the Top and Sell at the Bottom',8,'reading',30,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='basic-price-action' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Drawing Trendlines Correctly: The Rules Most Traders Get Wrong',1,'video',30,NULL::jsonb),
  ('lesson-2','Horizontal S&R Zones vs Lines: Which Is More Accurate',2,'reading',30,NULL::jsonb),
  ('lesson-3','Introduction to Moving Averages: What the 20 EMA and 200 SMA Show',3,'reading',30,NULL::jsonb),
  ('lesson-4','Draw a Valid Trendline on a Trending Chart',4,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"The chart shows a clear uptrend on GBP/USD daily. Draw one valid ascending trendline connecting at least three swing lows. Your line must not cut through candle bodies. The system will score based on touch point accuracy and angle.","reference_line":{"x1":0,"y1":82,"x2":100,"y2":28},"steps":[{"id":"1","label":"Identify swing lows","completed":false},{"id":"2","label":"Draw your trendline","completed":false},{"id":"3","label":"Review feedback","completed":false}]}'::jsonb),
  ('lesson-5','Price Channels: Parallel Trendlines and Trading the Range Within',5,'reading',30,NULL::jsonb),
  ('lesson-6','Indicator vs Price Action: When Tools Help and When They Lag',6,'reading',30,NULL::jsonb),
  ('lesson-7','Build a Clean Chart Setup',7,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"Starting from a raw candlestick chart, draw: one trendline, one support zone (as a rectangle), and one resistance zone (as a rectangle). Your support and resistance zones should be areas, not single lines. Justify each element in the text box.","reference_line":{"x1":0,"y1":60,"x2":100,"y2":40},"steps":[{"id":"1","label":"Draw the trendline","completed":false},{"id":"2","label":"Mark support zone","completed":false},{"id":"3","label":"Mark resistance zone","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='intro-to-technical-tools' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Why More Than 7 in 10 Retail CFD Traders Lose: What Broker Disclosures Show',1,'reading',30,NULL::jsonb),
  ('lesson-2','What Is a Stop Loss and Where Should It Actually Go',2,'video',30,NULL::jsonb),
  ('lesson-3','The 1% and 2% Rules: Risking a Fixed Percentage of Account Per Trade',3,'reading',30,NULL::jsonb),
  ('lesson-4','Calculate Your Position Size',4,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"You have a £5,000 account and risk 1% per trade. Entry: 1.2500, stop loss: 1.2450 (50 pips). Calculate: (1) maximum risk in £, (2) pip value for a standard lot, (3) how many lots to trade. Enter your answers to see the step-by-step solution.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Calculate max risk (£)","completed":false},{"id":"2","label":"Calculate pip value","completed":false},{"id":"3","label":"Calculate lot size","completed":false}]}'::jsonb),
  ('lesson-5','The Maths of Loss Recovery: Why a 50% Loss Needs a 100% Gain',5,'reading',30,NULL::jsonb),
  ('lesson-6','Drawdown: What It Is and How Much Is Recoverable',6,'reading',30,NULL::jsonb),
  ('lesson-7','Place a Stop Loss on a Trade Setup',7,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"A long trade setup is highlighted on the chart. Draw your stop loss line at what you consider the correct invalidation level — below the key swing low. The system will compare your placement against three techniques: below swing low, below structure, and ATR-based.","reference_line":{"x1":0,"y1":88,"x2":100,"y2":88},"steps":[{"id":"1","label":"Identify the trade setup","completed":false},{"id":"2","label":"Draw your stop loss","completed":false},{"id":"3","label":"Review placement","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='risk-fundamentals' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Is Paper Trading and Why Every Serious Trader Starts Here',1,'reading',30,NULL::jsonb),
  ('lesson-2','Setting Up a Paper Trading Account: Platforms and Realistic Capital Sizing',2,'video',30,NULL::jsonb),
  ('lesson-3','The Disposition Effect: Why Prospect Theory Explains Most Trading Losses',3,'reading',30,NULL::jsonb),
  ('lesson-4','Fear and Greed: How Emotions Override Your Trading Plan',4,'video',30,NULL::jsonb),
  ('lesson-5','Your First Paper Trade: Entry, Stop Loss, and Target',5,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"Using the chart, identify a long or short opportunity. Draw your entry line, stop loss line, and take profit line on the chart. The system will then simulate the trade forward 20 bars — review the outcome and reflect on your decision.","reference_line":{"x1":50,"y1":50,"x2":100,"y2":35},"steps":[{"id":"1","label":"Identify your setup","completed":false},{"id":"2","label":"Draw entry, stop, and target","completed":false},{"id":"3","label":"Review simulated outcome","completed":false}]}'::jsonb),
  ('lesson-6','The Pre-Trade Checklist: 5 Questions to Ask Before Every Entry',6,'reading',30,NULL::jsonb),
  ('lesson-7','Loss Aversion in Practice: Why You Hold Losers and How to Stop',7,'reading',30,NULL::jsonb),
  ('lesson-8','Build Your Paper Trading Journal Template',8,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"Using the journal builder, log two of your recent paper trades. For each: mark the entry on the chart, mark the exit, rate your emotion at entry (1–10), and write one sentence on what you learned. This template will save to your Tradecuity profile.","reference_line":{"x1":30,"y1":40,"x2":70,"y2":55},"steps":[{"id":"1","label":"Log trade one","completed":false},{"id":"2","label":"Log trade two","completed":false},{"id":"3","label":"Rate emotions and reflect","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='paper-trading-and-psychology' ON CONFLICT (course_id,slug) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 2: LIVE TRADER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Valid vs Invalid Trendlines: The 3-Touch Rule and Angle Significance',1,'reading',30,NULL::jsonb),
  ('lesson-2','Ascending, Descending, and Horizontal Channels: Trading the Boundaries',2,'video',30,NULL::jsonb),
  ('lesson-3','Support and Resistance Zones: Why Areas Beat Lines Every Time',3,'reading',30,NULL::jsonb),
  ('lesson-4','Dynamic S&R: Using Moving Averages as Floating Support Levels',4,'reading',30,NULL::jsonb),
  ('lesson-5','Confluence: When Multiple Levels Align at the Same Price',5,'video',30,NULL::jsonb),
  ('lesson-6','Identify All Key Levels on an Unlabelled Chart',6,'canvas_exercise',50,
   '{"ticker":"NAS100","timeframe":"H4","exercise_prompt":"A clean 4H NAS100 chart is displayed. Mark every significant support zone, resistance zone, and trendline you can identify. Rate the strength of each level (weak/moderate/strong) and mark your top 2 confluence areas by drawing rectangles.","reference_line":{"x1":0,"y1":55,"x2":100,"y2":35},"steps":[{"id":"1","label":"Mark all support zones","completed":false},{"id":"2","label":"Mark all resistance zones","completed":false},{"id":"3","label":"Draw trendlines","completed":false},{"id":"4","label":"Highlight top 2 confluence areas","completed":false}]}'::jsonb),
  ('lesson-7','False Breakouts and Stop Hunts: How Levels Are Used Against Retail Traders',7,'reading',30,NULL::jsonb),
  ('lesson-8','Build a Confluence Trade Setup',8,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"H4","exercise_prompt":"On the chart, find a price area where at least 3 different technical factors converge (e.g. resistance zone + descending trendline + 200 EMA). Mark the area with a rectangle, then draw an entry line, stop loss, and take profit based on that confluence area.","reference_line":{"x1":0,"y1":35,"x2":100,"y2":35},"steps":[{"id":"1","label":"Find the confluence zone","completed":false},{"id":"2","label":"Mark all contributing factors","completed":false},{"id":"3","label":"Define entry, stop, and target","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='technical-analysis-in-depth' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Reversal vs Continuation Patterns: A Framework for Classification',1,'reading',30,NULL::jsonb),
  ('lesson-2','Head and Shoulders: Formation, Neckline Break, and Measured Target',2,'video',30,NULL::jsonb),
  ('lesson-3','Double Tops and Double Bottoms: The M and W Patterns',3,'reading',30,NULL::jsonb),
  ('lesson-4','Triangles: Ascending, Descending, and Symmetrical',4,'video',30,NULL::jsonb),
  ('lesson-5','Flags and Pennants: Trading the Pause in a Strong Trend',5,'reading',30,NULL::jsonb),
  ('lesson-6','Rising and Falling Wedges: The Counter-Trend Trap Pattern',6,'reading',30,NULL::jsonb),
  ('lesson-7','Identify the Pattern Type',7,'canvas_exercise',50,
   '{"ticker":"BTCUSD","timeframe":"D1","exercise_prompt":"The chart shows a completed pattern. Study the price action carefully — mark the neckline or key boundary with a horizontal line, then draw the measured move target using the height of the pattern projected from the breakout point.","reference_line":{"x1":50,"y1":30,"x2":100,"y2":55},"steps":[{"id":"1","label":"Identify the pattern type","completed":false},{"id":"2","label":"Draw the neckline","completed":false},{"id":"3","label":"Project the measured target","completed":false}]}'::jsonb),
  ('lesson-8','Why Patterns Fail: Low Volume, Failed Breakouts, and Re-tests',8,'reading',30,NULL::jsonb),
  ('lesson-9','Trade a Head and Shoulders from Entry to Exit',9,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A head and shoulders pattern has completed on this chart. Draw: (1) the neckline, (2) your entry trigger line (breakout or retest), (3) your stop loss above the right shoulder, (4) your measured move target. Then calculate the R:R ratio.","reference_line":{"x1":60,"y1":60,"x2":100,"y2":75},"steps":[{"id":"1","label":"Draw the neckline","completed":false},{"id":"2","label":"Draw entry trigger","completed":false},{"id":"3","label":"Set stop loss and target","completed":false},{"id":"4","label":"Calculate R:R","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='chart-patterns' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Doji Candles: Long-Legged, Gravestone, Dragonfly — What Indecision Means',1,'reading',30,NULL::jsonb),
  ('lesson-2','Hammer and Hanging Man: Same Candle, Opposite Signals',2,'video',30,NULL::jsonb),
  ('lesson-3','Shooting Star and Inverted Hammer: Bearish and Bullish Rejection',3,'reading',30,NULL::jsonb),
  ('lesson-4','Bullish and Bearish Engulfing: Full-Body Reversal Candles',4,'video',30,NULL::jsonb),
  ('lesson-5','Morning Star and Evening Star: Three-Candle Reversal Sequences',5,'reading',30,NULL::jsonb),
  ('lesson-6','Marubozu and Spinning Tops: Strong Momentum vs Pure Indecision',6,'reading',30,NULL::jsonb),
  ('lesson-7','Name That Candlestick',7,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Ten highlighted candles are marked on the chart. For each highlighted candle or candle group, click on it and select the pattern name from the dropdown. Identify whether it is a bullish reversal, bearish reversal, continuation, or neutral signal. Context (prior trend) is visible.","reference_line":{"x1":45,"y1":65,"x2":55,"y2":35},"steps":[{"id":"1","label":"Study each highlighted candle","completed":false},{"id":"2","label":"Name each pattern","completed":false},{"id":"3","label":"Review your score","completed":false}]}'::jsonb),
  ('lesson-8','Context Is Everything: Why a Hammer at Support Beats a Hammer in Mid-Air',8,'reading',30,NULL::jsonb),
  ('lesson-9','Spot High-Probability Candlestick Signals in a Real Chart',9,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"Six months of GBP/USD daily data is shown. Click on every candle or candle sequence you identify as a valid signal WITH context (e.g. hammer at support, engulfing at resistance). The system will highlight the 8 highest-probability signals and score your selections against them.","reference_line":{"x1":25,"y1":70,"x2":75,"y2":30},"steps":[{"id":"1","label":"Scan the full chart","completed":false},{"id":"2","label":"Click all valid signals","completed":false},{"id":"3","label":"Compare with expert selections","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='candlestick-patterns' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Moving Averages Deep Dive: SMA vs EMA, Crossovers, and the Death Cross',1,'video',30,NULL::jsonb),
  ('lesson-2','RSI Explained: What 70/30 Actually Means and What It Doesn''t',2,'reading',30,NULL::jsonb),
  ('lesson-3','RSI Divergence: Spotting Momentum Failures Before Price Moves',3,'video',30,NULL::jsonb),
  ('lesson-4','MACD: Signal Line, Histogram, and Zero-Line Crossovers',4,'reading',30,NULL::jsonb),
  ('lesson-5','Bollinger Bands: Volatility Contraction, Band Squeeze, and Breakout Signals',5,'reading',30,NULL::jsonb),
  ('lesson-6','Identify RSI Divergence on a Live Chart',6,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"Price is making higher highs on the chart. Examine the RSI panel below. Draw a line on the price chart connecting the two key highs showing divergence, then draw a corresponding line on the RSI panel showing the diverging RSI highs. The system will confirm or correct your identification.","reference_line":{"x1":40,"y1":25,"x2":80,"y2":30},"steps":[{"id":"1","label":"Find the price highs","completed":false},{"id":"2","label":"Check RSI at those highs","completed":false},{"id":"3","label":"Draw the divergence lines","completed":false}]}'::jsonb),
  ('lesson-7','Indicator Confluence: Using Two Indicators to Confirm — Not Double-Signal',7,'reading',30,NULL::jsonb),
  ('lesson-8','The Lagging Problem: Why Indicators Always Trail Price Action',8,'reading',30,NULL::jsonb),
  ('lesson-9','Build a Trade Entry Using Price Action + One Indicator',9,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"H4","exercise_prompt":"Using the chart with RSI pre-loaded, find one long setup where price action (hammer/engulfing at support) aligns with RSI below 35. Draw the entry line, stop loss, and take profit. Explain in one sentence how the RSI reading added confidence to the setup.","reference_line":{"x1":0,"y1":75,"x2":100,"y2":40},"steps":[{"id":"1","label":"Find the price action signal","completed":false},{"id":"2","label":"Confirm RSI alignment","completed":false},{"id":"3","label":"Define entry, stop, and target","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='indicators-that-work' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Reward-to-Risk Ratios: Why a 40% Win Rate Can Still Be Profitable',1,'reading',30,NULL::jsonb),
  ('lesson-2','Expectancy: The Formula That Tells You If a Strategy Is Worth Trading',2,'video',30,NULL::jsonb),
  ('lesson-3','Position Sizing Methods: Fixed %, Fixed £, and Volatility-Based',3,'reading',30,NULL::jsonb),
  ('lesson-4','Calculate R:R and Expectancy for a Strategy',4,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A table of 20 historical trades is shown with entry, stop, and target data. Calculate: (1) the average R:R ratio, (2) win rate, (3) expectancy per trade in R. Fill in the calculation cells and interpret whether this strategy has a positive expectancy worth trading.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Calculate win rate","completed":false},{"id":"2","label":"Calculate average R:R","completed":false},{"id":"3","label":"Calculate expectancy","completed":false}]}'::jsonb),
  ('lesson-5','Maximum Drawdown and Drawdown Cycles: Preparing Mentally and Financially',5,'reading',30,NULL::jsonb),
  ('lesson-6','The Disposition Effect Revisited: Cutting Losers Before They Cut You',6,'reading',30,NULL::jsonb),
  ('lesson-7','Order Types: Market, Limit, Stop-Limit, and OCO Orders Explained',7,'video',30,NULL::jsonb),
  ('lesson-8','Design Your Personal Risk Rules',8,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Complete the risk rules template: (1) draw your maximum risk per trade on the position sizing chart (what % is your line?), (2) mark your daily loss limit on the equity curve, (3) mark your maximum drawdown threshold. Your completed rules will save to your Tradecuity trading plan.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Set your risk per trade","completed":false},{"id":"2","label":"Set daily loss limit","completed":false},{"id":"3","label":"Set max drawdown threshold","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='risk-management-framework' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Volume Basics: What High Volume and Low Volume Actually Signal',1,'reading',30,NULL::jsonb),
  ('lesson-2','Volume Confirming Breakouts vs Fake Breakouts',2,'video',30,NULL::jsonb),
  ('lesson-3','Volume at Key Levels: Accumulation and Distribution Signs',3,'reading',30,NULL::jsonb),
  ('lesson-4','OBV and VWAP: The Two Volume Indicators Worth Using',4,'reading',30,NULL::jsonb),
  ('lesson-5','Volume Profile Basics: Point of Control and Value Area',5,'video',30,NULL::jsonb),
  ('lesson-6','Confirm or Reject a Breakout Using Volume',6,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"Four breakout scenarios are shown, each with a price panel and volume histogram below. For each scenario, draw a line on the volume panel at what you consider the volume threshold that determines genuine vs fake breakout. Then classify each: confirmed, suspect, or avoid.","reference_line":{"x1":50,"y1":40,"x2":100,"y2":40},"steps":[{"id":"1","label":"Analyse volume at each breakout","completed":false},{"id":"2","label":"Draw volume threshold lines","completed":false},{"id":"3","label":"Classify each scenario","completed":false}]}'::jsonb),
  ('lesson-7','Volume Divergence: When Price and Volume Tell Different Stories',7,'reading',30,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='volume-analysis' ON CONFLICT (course_id,slug) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 3: SWING TRADER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Timeframe Hierarchy: Why the Daily Chart Beats the 15-Minute Every Time',1,'reading',30,NULL::jsonb),
  ('lesson-2','Top-Down Analysis: From Monthly to Weekly to Daily to Entry',2,'video',30,NULL::jsonb),
  ('lesson-3','HTF Bias: Establishing the Directional Narrative Before You Look for Entries',3,'reading',30,NULL::jsonb),
  ('lesson-4','LTF Entry Triggers: Finding Precision Within the HTF Structure',4,'video',30,NULL::jsonb),
  ('lesson-5','HTF vs LTF Conflict: What to Do When Timeframes Disagree',5,'reading',30,NULL::jsonb),
  ('lesson-6','Conduct a Top-Down Analysis',6,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"W1","exercise_prompt":"You are shown the Weekly chart. Draw a horizontal line at the most significant HTF resistance zone. Then switch to the Daily view and draw a trendline showing the current trend. Finally, on the H4, mark the LTF entry trigger zone (the level where you would look for a short entry signal).","reference_line":{"x1":0,"y1":30,"x2":100,"y2":30},"steps":[{"id":"1","label":"Mark HTF resistance on Weekly","completed":false},{"id":"2","label":"Draw trend on Daily","completed":false},{"id":"3","label":"Mark LTF trigger on H4","completed":false}]}'::jsonb),
  ('lesson-7','Swing vs Scalp: How the Same HTF Level Generates Different Trade Types',7,'reading',30,NULL::jsonb),
  ('lesson-8','Build a Multi-Timeframe Trade Plan',8,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"Analyse GBP/USD across three timeframes: Daily (draw your HTF bias arrow), H4 (mark the key level you are watching), H1 (draw the entry trigger pattern you will wait for). Define your invalidation: if price does X, the setup is cancelled. Draw that level too.","reference_line":{"x1":0,"y1":40,"x2":100,"y2":40},"steps":[{"id":"1","label":"Daily bias arrow","completed":false},{"id":"2","label":"H4 key level","completed":false},{"id":"3","label":"H1 entry trigger","completed":false},{"id":"4","label":"Invalidation level","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='multi-timeframe-analysis' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Premise of SMC: How Institutional Order Flow Leaves Footprints',1,'reading',30,NULL::jsonb),
  ('lesson-2','Market Structure: Swing Highs, Swing Lows, and the Structure Grid',2,'video',30,NULL::jsonb),
  ('lesson-3','Break of Structure (BOS): Continuation Signal in Trending Markets',3,'reading',30,NULL::jsonb),
  ('lesson-4','Change of Character (CHoCH): The Structural Reversal Signal',4,'video',30,NULL::jsonb),
  ('lesson-5','Order Blocks: The Origin Candles of Significant Moves',5,'reading',30,NULL::jsonb),
  ('lesson-6','Fair Value Gaps: Why Price Returns to Fill the Imbalance',6,'reading',30,NULL::jsonb),
  ('lesson-7','Liquidity: Equal Highs, Equal Lows, and Stop Hunt Mechanics',7,'video',30,NULL::jsonb),
  ('lesson-8','Premium and Discount Zones: The Optimal Trade Entry (OTE) Concept',8,'reading',30,NULL::jsonb),
  ('lesson-9','Label the Market Structure',9,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"On the displayed chart, draw a small rectangle at every Break of Structure (BOS) point and a circle at every Change of Character (CHoCH) point. Then mark the most recent valid order block with a filled rectangle, and the most recent fair value gap with a outlined rectangle.","reference_line":{"x1":0,"y1":45,"x2":100,"y2":30},"steps":[{"id":"1","label":"Mark all BOS points","completed":false},{"id":"2","label":"Mark all CHoCH points","completed":false},{"id":"3","label":"Mark the order block","completed":false},{"id":"4","label":"Mark the fair value gap","completed":false}]}'::jsonb),
  ('lesson-10','SMC Full Trade Setup: HTF Narrative to LTF Trigger',10,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"Using SMC principles only: (1) draw the HTF market structure on the Daily chart — mark all BOS and the most recent CHoCH, (2) identify the most significant order block and draw a rectangle around it, (3) on the H4, draw your entry line at the top of the order block, stop loss below it, and TP at the next liquidity pool (equal highs).","reference_line":{"x1":0,"y1":60,"x2":100,"y2":25},"steps":[{"id":"1","label":"Map Daily structure (BOS/CHoCH)","completed":false},{"id":"2","label":"Identify the order block","completed":false},{"id":"3","label":"Define entry, stop, and TP","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='smart-money-concepts' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Fibonacci in Markets: Why 0.382, 0.5, and 0.618 Are Not Magic Numbers',1,'reading',30,NULL::jsonb),
  ('lesson-2','Drawing Fibonacci Retracements Correctly: Swing-to-Swing Rules',2,'video',30,NULL::jsonb),
  ('lesson-3','The Golden Zone (0.618–0.786): Trading the Deep Retracement Entry',3,'reading',30,NULL::jsonb),
  ('lesson-4','Fibonacci Extensions: Projecting Targets at 1.272 and 1.618',4,'reading',30,NULL::jsonb),
  ('lesson-5','Draw and Trade a Fibonacci Retracement',5,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"Price has made a strong bullish impulse and is now pulling back. Draw a Fibonacci retracement from the swing low to the swing high (drag from the marked low to the marked high). The system will render the key levels. Identify whether the 0.618 level has confluence with a support zone or order block by drawing a horizontal line at that level.","reference_line":{"x1":0,"y1":80,"x2":100,"y2":30},"steps":[{"id":"1","label":"Draw the Fibonacci retracement","completed":false},{"id":"2","label":"Identify the 0.618 level","completed":false},{"id":"3","label":"Check for confluence","completed":false}]}'::jsonb),
  ('lesson-6','Elliott Wave Theory: The 5-3 Wave Cycle and Its Logic',6,'video',30,NULL::jsonb),
  ('lesson-7','Impulse Waves and Corrective Waves: Identifying the Phase',7,'reading',30,NULL::jsonb),
  ('lesson-8','Elliott Wave Rules: The Non-Negotiable Constraints',8,'reading',30,NULL::jsonb),
  ('lesson-9','Label an Elliott Wave Count',9,'canvas_exercise',50,
   '{"ticker":"BTCUSD","timeframe":"W1","exercise_prompt":"The chart shows a completed 5-wave impulse. Label each wave by clicking at its peak or trough and selecting 1, 2, 3, 4, or 5. Then label the subsequent correction waves as A, B, C. The system will check your count against the three Elliott Wave rules (Wave 2 < Wave 1 start, Wave 3 not the shortest, Wave 4 not overlapping Wave 1).","reference_line":{"x1":0,"y1":90,"x2":100,"y2":20},"steps":[{"id":"1","label":"Label waves 1-5","completed":false},{"id":"2","label":"Label A-B-C correction","completed":false},{"id":"3","label":"Check against wave rules","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='fibonacci-and-elliott-wave' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Economic Cycle and Sector Rotation: Which Sectors Lead and Which Lag',1,'reading',30,NULL::jsonb),
  ('lesson-2','Intermarket Analysis: Bonds, Stocks, Commodities, and Currency Relationships',2,'video',30,NULL::jsonb),
  ('lesson-3','USD Correlation: Why Dollar Strength Affects Gold, Oil, and Emerging Markets',3,'reading',30,NULL::jsonb),
  ('lesson-4','Risk-On vs Risk-Off: Understanding Market Appetite and Its Asset Class Signals',4,'reading',30,NULL::jsonb),
  ('lesson-5','Correlation Coefficients: Measuring and Using Asset Relationships',5,'reading',30,NULL::jsonb),
  ('lesson-6','Build an Intermarket Analysis for a Live Trade',6,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"You want to go long GBP/USD. The DXY (Dollar Index) chart is shown alongside GBP/USD. Draw an arrow on the DXY chart showing its current trend direction, then draw an arrow on GBP/USD showing the expected correlated direction. Does the DXY confirm or contradict your trade idea? Write your intermarket thesis in the text box.","reference_line":{"x1":0,"y1":55,"x2":100,"y2":40},"steps":[{"id":"1","label":"Analyse DXY direction","completed":false},{"id":"2","label":"Draw correlated GBP/USD direction","completed":false},{"id":"3","label":"Write intermarket thesis","completed":false}]}'::jsonb),
  ('lesson-7','Seasonal Patterns in Commodities: Why Oil and Gold Have Calendar Tendencies',7,'reading',30,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='sector-correlation-analysis' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What a Trading Plan Actually Contains: The 10 Non-Negotiable Components',1,'reading',30,NULL::jsonb),
  ('lesson-2','Defining Your Edge: What Market Inefficiency Are You Exploiting',2,'video',30,NULL::jsonb),
  ('lesson-3','Setup Criteria: The Specific Conditions That Must Be Present Before You Trade',3,'reading',30,NULL::jsonb),
  ('lesson-4','Entry, Stop, and Target Rules: If-Then Statements for Every Scenario',4,'reading',30,NULL::jsonb),
  ('lesson-5','Write Your Setup Criteria in IF-THEN Format',5,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"Using the IF-THEN framework on the displayed chart, define your primary setup: IF [mark the HTF level that must be respected] AND [mark the LTF signal you need to see] THEN draw your entry line, stop loss, and target. Complete this for both a long and short scenario.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Define long setup criteria","completed":false},{"id":"2","label":"Define short setup criteria","completed":false},{"id":"3","label":"Mark entries, stops, and targets","completed":false}]}'::jsonb),
  ('lesson-6','Session Selection: Which Markets and Sessions Match Your Strategy',6,'reading',30,NULL::jsonb),
  ('lesson-7','Review Process: Weekly, Monthly, and Quarterly Trade Reviews',7,'reading',30,NULL::jsonb),
  ('lesson-8','Complete Your Trading Plan',8,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Using the Tradecuity plan builder, fill in all 5 core sections: (1) mark your primary market setup on the chart, (2) draw your risk parameters (max loss per trade as a line on the account equity scale), (3) mark the trading session window on the time axis, (4) define your invalidation rules, (5) set your weekly review day. Your plan saves to your profile.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Define your primary setup","completed":false},{"id":"2","label":"Set risk parameters","completed":false},{"id":"3","label":"Define trading sessions","completed":false},{"id":"4","label":"Set invalidation rules","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='building-your-trading-plan' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What to Log: The 12 Data Points Every Trade Journal Needs',1,'reading',30,NULL::jsonb),
  ('lesson-2','Screenshot Discipline: Before, During, and After the Trade',2,'reading',30,NULL::jsonb),
  ('lesson-3','Quantitative Review: Win Rate, Average R, Expectancy by Setup Type',3,'video',30,NULL::jsonb),
  ('lesson-4','Qualitative Review: Emotion Scores, Rule Adherence, and Decision Quality',4,'reading',30,NULL::jsonb),
  ('lesson-5','Analyse a Sample Trade Log',5,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A 30-trade sample journal is displayed as a chart timeline — each trade is marked on the price chart as a coloured entry/exit pair (green = win, red = loss). Identify the 3 worst losing trades. For each, draw a circle around the entry, draw where the stop was, and answer: did price give a warning before the stop was hit that the setup was failing?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Identify the 3 worst trades","completed":false},{"id":"2","label":"Circle each entry","completed":false},{"id":"3","label":"Analyse what went wrong","completed":false}]}'::jsonb),
  ('lesson-6','The Weekly Review Template: 30 Minutes That Accelerates Improvement',6,'reading',30,NULL::jsonb),
  ('lesson-7','Log Three Real Trades in the Tradecuity Journal',7,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"H4","exercise_prompt":"Mark three of your recent trades on this chart: click to place an entry marker (green arrow up = long, red arrow down = short), then click to place the exit. The journal will auto-calculate R:R. Then rate your emotion at entry (1–10 slider) and score your rule adherence (did you follow your plan?). Write one sentence of reflection for each.","reference_line":{"x1":20,"y1":60,"x2":80,"y2":40},"steps":[{"id":"1","label":"Log trade one","completed":false},{"id":"2","label":"Log trade two","completed":false},{"id":"3","label":"Log trade three","completed":false},{"id":"4","label":"Rate emotions and reflect","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='trade-journalling' ON CONFLICT (course_id,slug) DO NOTHING;


-- options-fundamentals belongs at Level 5 (after execution/tactician skills)
-- Defined here so lesson inserts below can reference it
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('options-fundamentals','Options: Calls, Puts, and the Greeks','foundations',
   'Options unlock strategies unavailable to spot traders — defined-risk entries, structured income generation, and asymmetric exposure to volatility. Learn calls and puts from first principles: strike price, expiry, intrinsic and extrinsic value, and the four Greeks — and how these variables interact as market conditions shift.',
   55,false,22,5.5,5,'The Tactician')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;

-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 4: PROP TRADER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Why Backtesting Matters: The Scientific Method Applied to Trading',1,'reading',30,NULL::jsonb),
  ('lesson-2','Manual Backtesting: Bar-by-Bar Replay Methodology',2,'video',30,NULL::jsonb),
  ('lesson-3','In-Sample vs Out-of-Sample: Why You Must Reserve Data for Validation',3,'reading',30,NULL::jsonb),
  ('lesson-4','Overfitting: Curve-Fitting to the Past vs Discovering Genuine Edge',4,'reading',30,NULL::jsonb),
  ('lesson-5','Key Strategy Metrics: Win Rate, Profit Factor, Max Drawdown, CAGR',5,'reading',30,NULL::jsonb),
  ('lesson-6','Statistical Significance: How Many Trades Do You Need for a Valid Sample',6,'reading',30,NULL::jsonb),
  ('lesson-7','Monte Carlo Simulation: Testing Strategy Robustness Against Random Sequences',7,'video',30,NULL::jsonb),
  ('lesson-8','Backtest a Price Action Strategy',8,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Using the bar-replay tool on EUR/USD daily data, backtest the bullish engulfing at support strategy. Record each trade: mark the entry with an up arrow and the exit with a down arrow. After 20 trades, the system will calculate your win rate, average R, and profit factor. Is this strategy statistically worth trading with 20 sample trades?","reference_line":{"x1":0,"y1":70,"x2":100,"y2":35},"steps":[{"id":"1","label":"Set your strategy rules","completed":false},{"id":"2","label":"Trade through 20 setups","completed":false},{"id":"3","label":"Review statistics","completed":false}]}'::jsonb),
  ('lesson-9','Evaluate a Strategy''s Statistical Validity',9,'canvas_exercise',50,
   '{"ticker":"GBPUSD","timeframe":"D1","exercise_prompt":"Two backtested strategies are shown as equity curves on the same chart. Strategy A (blue line): 47% win rate, 2.1R avg winner, 100 trades. Strategy B (orange line): 68% win rate, 0.8R avg winner, 40 trades. Draw a horizontal line at the point where you believe each strategy becomes statistically significant. Which curve do you trust more and why?","reference_line":{"x1":50,"y1":40,"x2":100,"y2":30},"steps":[{"id":"1","label":"Analyse both equity curves","completed":false},{"id":"2","label":"Mark significance thresholds","completed":false},{"id":"3","label":"Justify your choice","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='backtesting-and-statistics' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Makes a Strategy Codeable: Removing Subjectivity from Your Rules',1,'reading',30,NULL::jsonb),
  ('lesson-2','Decision Trees for Trading: Mapping Every IF-THEN Branch',2,'video',30,NULL::jsonb),
  ('lesson-3','Strategy Parameters: What to Optimise and What to Leave Alone',3,'reading',30,NULL::jsonb),
  ('lesson-4','Sensitivity Analysis: Testing How Robust Your Parameters Are',4,'reading',30,NULL::jsonb),
  ('lesson-5','Formalise a Trading Strategy as a Decision Tree',5,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H4","exercise_prompt":"Take your swing trading setup and build it as a decision tree on the chart. Start from the HTF level shown — draw a YES branch (price respects the level) and a NO branch (price breaks through). Follow the YES branch: draw the next decision node (is there a valid LTF signal?), and so on until you reach a clear Entry or No Trade leaf node.","reference_line":{"x1":0,"y1":40,"x2":100,"y2":40},"steps":[{"id":"1","label":"Define the root decision","completed":false},{"id":"2","label":"Build YES and NO branches","completed":false},{"id":"3","label":"Complete to Entry/No Trade leaf","completed":false}]}'::jsonb),
  ('lesson-6','Introduction to Pine Script Concepts: Reading an Indicator Without Writing Code',6,'reading',30,NULL::jsonb),
  ('lesson-7','Walk-Forward Testing: Validating Robustness Over Time',7,'reading',30,NULL::jsonb),
  ('lesson-8','Stress-Test a Strategy Parameter',8,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A 20/50 EMA crossover strategy has been run on 5 years of EUR/USD data. The results panel shows profit factor and max drawdown. Change the fast EMA from 20 to 15 by dragging the slider, then to 10, then to 25, then to 30. Plot the results on the provided chart. Identify: (a) the parameter range where the strategy is robust, (b) where it starts to overfit.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Test EMA values 10-30","completed":false},{"id":"2","label":"Plot profit factor results","completed":false},{"id":"3","label":"Identify robust range","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='algorithmic-thinking' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What an Option Contract Is and Why It Exists',1,'reading',30,NULL::jsonb),
  ('lesson-2','Calls and Puts: The Right to Buy vs The Right to Sell',2,'video',30,NULL::jsonb),
  ('lesson-3','Strike Price, Expiry, and Premium: The Three Defining Variables',3,'reading',30,NULL::jsonb),
  ('lesson-4','ITM, ATM, OTM: Moneyness and Its Impact on Premium Cost',4,'reading',30,NULL::jsonb),
  ('lesson-5','Intrinsic vs Extrinsic Value: Why Time Decay Works Against Option Buyers',5,'video',30,NULL::jsonb),
  ('lesson-6','Delta, Theta, Vega, and Gamma: The Greeks in Plain English',6,'reading',30,NULL::jsonb),
  ('lesson-7','Calculate Option P&L at Expiry',7,'canvas_exercise',50,
   '{"ticker":"AAPL","timeframe":"D1","exercise_prompt":"You bought a call option on Apple: $180 strike, $5 premium, Apple at expiry = $191. Draw a line on the P&L chart showing your profit at expiry. Then draw the break-even point as a vertical line. Repeat for a put option: $170 strike, $4 premium, Apple at expiry = $162. Mark both payoff lines on the same chart.","reference_line":{"x1":60,"y1":30,"x2":100,"y2":10},"steps":[{"id":"1","label":"Draw call option P&L line","completed":false},{"id":"2","label":"Mark call break-even","completed":false},{"id":"3","label":"Draw put option P&L line","completed":false},{"id":"4","label":"Mark put break-even","completed":false}]}'::jsonb),
  ('lesson-8','Defined-Risk Strategies: Bull Call Spread and Bear Put Spread',8,'video',30,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='options-fundamentals' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Central Banks: The Fed, ECB, and BOE — Their Mandate and Tools',1,'reading',30,NULL::jsonb),
  ('lesson-2','Interest Rates and Asset Prices: Why Rate Hikes Hurt Equities and Help Currencies',2,'video',30,NULL::jsonb),
  ('lesson-3','Inflation: CPI, PPI, PCE — What Each Measures and Why Traders Watch Them',3,'reading',30,NULL::jsonb),
  ('lesson-4','Non-Farm Payrolls (NFP): The Most Volatile Monthly Forex Release',4,'reading',30,NULL::jsonb),
  ('lesson-5','The Yield Curve: Normal, Inverted, and What Each Has Historically Preceded',5,'video',30,NULL::jsonb),
  ('lesson-6','Trading the News: Pre-Event Positioning and Risk Management',6,'reading',30,NULL::jsonb),
  ('lesson-7','Build a Macro Calendar Briefing',7,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"The economic calendar for the next 5 trading days is shown. Draw a vertical line on the EUR/USD chart at each high-impact event date. For each event, draw a horizontal rectangle showing the expected volatility range (based on the previous 3 readings of the same event). Mark which of your existing positions have exposure to each event.","reference_line":{"x1":40,"y1":45,"x2":60,"y2":55},"steps":[{"id":"1","label":"Mark event dates on chart","completed":false},{"id":"2","label":"Draw volatility ranges","completed":false},{"id":"3","label":"Assess position exposure","completed":false}]}'::jsonb),
  ('lesson-8','Quantitative Easing and Tightening: Balance Sheets, Liquidity, and Market Impact',8,'reading',30,NULL::jsonb),
  ('lesson-9','Interpret an FOMC Statement',9,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"An FOMC meeting just happened. The actual EUR/USD reaction is hidden. Based on the statement text provided, draw on the chart how you expect EUR/USD to react in the next 4 hours: draw your expected direction as an arrow, and a range rectangle showing likely volatility. Then reveal the actual reaction and compare.","reference_line":{"x1":50,"y1":50,"x2":100,"y2":35},"steps":[{"id":"1","label":"Read the FOMC statement","completed":false},{"id":"2","label":"Draw your expected reaction","completed":false},{"id":"3","label":"Reveal and compare actual","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='trading-economic-events' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Portfolio vs Position Risk: Why Individual Trade Risk Doesn''t Add Up Simply',1,'reading',30,NULL::jsonb),
  ('lesson-2','Sharpe Ratio and Sortino Ratio: Measuring Risk-Adjusted Return',2,'video',30,NULL::jsonb),
  ('lesson-3','Kelly Criterion: The Mathematically Optimal Position Size Formula',3,'reading',30,NULL::jsonb),
  ('lesson-4','Correlation Risk: How Correlated Positions Multiply Your Actual Exposure',4,'reading',30,NULL::jsonb),
  ('lesson-5','Black Swan Events: Tail Risk, Fat Tails, and Why Normal Distribution Fails Markets',5,'reading',30,NULL::jsonb),
  ('lesson-6','Maximum Drawdown Analysis and Recovery Expectations',6,'video',30,NULL::jsonb),
  ('lesson-7','Calculate Sharpe Ratio and Kelly Criterion',7,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A 12-month equity curve is shown. Draw a horizontal line at the peak equity point and another at the trough — this is your maximum drawdown period. Then use the statistics panel to enter your monthly returns and calculate: (1) Sharpe ratio vs 5% risk-free rate, (2) Full Kelly size for a 55% win rate / 1.8:1 R:R strategy. Mark the Kelly-sized position on the position sizing chart.","reference_line":{"x1":30,"y1":20,"x2":70,"y2":55},"steps":[{"id":"1","label":"Identify max drawdown period","completed":false},{"id":"2","label":"Calculate Sharpe ratio","completed":false},{"id":"3","label":"Calculate Kelly position size","completed":false}]}'::jsonb),
  ('lesson-8','Design a Risk-Controlled Multi-Position Portfolio',8,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"You have 5 active trade ideas shown on separate mini-charts: Long GBP/USD, Long EUR/USD, Short USD/JPY, Long Gold, Long S&P500. The correlation matrix is displayed. Colour-code each trade by its USD exposure (red = high USD correlation, amber = medium, green = low). Then draw a pie chart showing how you would allocate portfolio risk so total exposure stays under 5% with no correlated cluster over 3%.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Identify USD correlations","completed":false},{"id":"2","label":"Colour-code positions","completed":false},{"id":"3","label":"Allocate portfolio risk","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='portfolio-and-advanced-risk' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','How Prop Firms Work: The Business Model, Profit Splits, and Account Structures',1,'reading',30,NULL::jsonb),
  ('lesson-2','Evaluation Rules Deep Dive: Daily Loss Limits, Max Drawdown, Profit Targets',2,'reading',30,NULL::jsonb),
  ('lesson-3','The Funded Account Mindset: How Capital Preservation Changes Your Behaviour',3,'video',30,NULL::jsonb),
  ('lesson-4','Common Failure Modes: How Traders Fail Challenges Despite Being Profitable',4,'reading',30,NULL::jsonb),
  ('lesson-5','Simulated Prop Firm Challenge Day',5,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"H1","exercise_prompt":"You start with a simulated £100,000 account with these rules: 5% daily loss limit (£5,000), 10% max drawdown (£10,000), 10% profit target (£10,000). Trade through this live session: draw your entry as an arrow, stop loss, and take profit. Your running P&L and proximity to each rule limit will be shown in real-time. Can you make 3 trades without breaching any rule?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":40},"steps":[{"id":"1","label":"Review the account rules","completed":false},{"id":"2","label":"Place trade 1 within rules","completed":false},{"id":"3","label":"Place trade 2 within rules","completed":false},{"id":"4","label":"Review your equity and rule adherence","completed":false}]}'::jsonb),
  ('lesson-6','Adapting Position Sizing for Drawdown Constraints: The Turtle Shell Approach',6,'reading',30,NULL::jsonb),
  ('lesson-7','Scaling: Progressing from £25K to £200K Funded Accounts',7,'reading',30,NULL::jsonb),
  ('lesson-8','Build Your Prop Firm Readiness Checklist',8,'canvas_exercise',50,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Your equity curve from the last 30 days of practice trading is shown. Draw a horizontal line at 10% above your starting balance (the profit target) and at 10% below (the max drawdown limit). Did your equity ever come close to the lower line? Mark the 3 highest-risk moments on the curve. Are you ready for a prop challenge — yes or no, and why?","reference_line":{"x1":0,"y1":40,"x2":100,"y2":35},"steps":[{"id":"1","label":"Mark profit target line","completed":false},{"id":"2","label":"Mark max drawdown line","completed":false},{"id":"3","label":"Identify 3 highest-risk moments","completed":false},{"id":"4","label":"Self-assessment: ready?","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='prop-firm-preparation' ON CONFLICT (course_id,slug) DO NOTHING;
