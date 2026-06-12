-- Tradecuity Levels 5–10 Seed
-- Run AFTER seed_curriculum.sql (levels 1–4 must exist first)
-- Safe to re-run: ON CONFLICT DO UPDATE / DO NOTHING

-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 5 — THE TACTICIAN
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('order-flow-microstructure','Order Flow and Market Microstructure','technical',
   'Candlesticks aggregate what happened — order flow reveals the mechanics behind each move. Learn bid-ask dynamics, level 2 market depth, time and sales, and how institutional-size orders leave identifiable imprints in the data that consistently precede short-term price movement.',
   50,false,16,4.0,5,'The Tactician'),
  ('execution-mastery','Execution Mastery: Slippage, Spread, and Entry Timing','technical',
   'A technically correct setup executed poorly loses money. Learn to minimise slippage, use limit orders vs market orders strategically, time entries around liquidity windows, and how execution quality compounds over hundreds of trades.',
   51,false,14,3.0,5,'The Tactician'),
  ('scaling-positions','Scaling In and Out: Advanced Position Management','risk',
   'Learn the mechanics and psychology of building into a winning trade, taking partial profits, and trailing stops dynamically. Understand when scaling in adds genuine edge versus when it papers over a bad entry.',
   52,false,13,3.0,5,'The Tactician'),
  ('session-edge','Trading the Open and Close: Exploiting Session Edge','strategy',
   'The first and last 30 minutes of major sessions contain the highest-volume, highest-volatility, and highest-edge windows in the trading day. Learn why these windows exist, how to trade them, and the specific patterns they produce.',
   53,false,12,2.5,5,'The Tactician'),
  ('advanced-dynamic-risk','Advanced Risk: Dynamic Sizing and Drawdown Recovery','risk',
   'Move beyond fixed-percentage risk and learn to size dynamically based on volatility, account drawdown state, and setup quality. Understand the mathematics of drawdown recovery and why reducing size in a losing streak is not optional.',
   54,false,14,3.5,5,'The Tactician')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;

-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 6 — THE QUANT
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('systematic-strategy-design','Systematic Strategy Design: From Idea to Rules','strategy',
   'The gap between a trading idea and a tradeable system is larger than most traders realise. Learn to formalise discretionary ideas into fully specified rule sets, define every parameter, and test the system before risking capital.',
   60,false,18,4.5,6,'The Quant'),
  ('data-analysis-for-traders','Data Analysis for Traders: No Code Required','strategy',
   'You do not need to be a programmer to think with data. Learn to use spreadsheets and free tools to analyse your own trade history, calculate meaningful statistics, identify performance drivers, and reject strategies that fail the numbers.',
   61,false,14,3.5,6,'The Quant'),
  ('walk-forward-robustness','Walk-Forward Testing and Robustness Analysis','strategy',
   'In-sample optimisation tells you what worked in the past. Walk-forward testing tells you whether it has a chance of working in the future. Learn the methodology, how to interpret walk-forward efficiency ratios, and when to walk away from a strategy.',
   62,false,15,4.0,6,'The Quant'),
  ('market-regimes','Market Regimes: Identifying Trending, Ranging, and Volatile States','strategy',
   'The single biggest reason systematic strategies fail in live trading is regime mismatch — applying a trend-following system in a range-bound market. Learn to detect the current regime objectively using ADX, Bollinger Band width, and volatility percentile, then build regime filters into every strategy you design.',
   63,false,14,3.5,6,'The Quant'),
  ('building-personal-system','Building Your Personal Trading System','strategy',
   'Synthesise everything from the Quant level into a documented, tested, deployable trading system. Define your universe, signals, filters, position sizing, execution rules, and performance benchmarks — then stress-test it against historical regimes.',
   64,false,18,5.0,6,'The Quant')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;

-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 7 — THE MACRO TRADER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('global-macro-framework','The Global Macro Framework: How Big Money Moves Markets','fundamental',
   'Global macro analysis begins where technical analysis ends. Learn to read the economic cycle, understand capital flow between asset classes and geographies, and construct a top-down directional thesis before any technical analysis begins.',
   70,false,16,4.5,7,'The Macro Trader'),
  ('central-bank-playbooks','Central Bank Deep Dive: Fed, ECB, BOJ, and BOE Playbooks','fundamental',
   'Each major central bank operates differently, communicates differently, and responds to inflation and growth differently. Learn to decode their statements, anticipate their decisions, and understand why the Fed still moves every other market.',
   71,false,15,4.0,7,'The Macro Trader'),
  ('currency-wars-rates','Currency Wars: Interest Rate Differentials and Capital Flows','fundamental',
   'Currency moves are driven by relative interest rates, risk appetite, and capital flows more than any technical pattern. Learn carry trade mechanics, how rate differentials create sustained directional moves, and how to position around central bank divergence.',
   72,false,14,3.5,7,'The Macro Trader'),
  ('commodity-supercycles','Commodity Supercycles: Oil, Gold, and Agricultural Markets','fundamental',
   'Commodities move in multi-year cycles driven by supply constraints, demand shocks, and dollar strength. Learn the fundamentals of the major commodity markets, their leading indicators, and how to use commodity signals as a macro filter for other trades.',
   73,false,13,3.0,7,'The Macro Trader'),
  ('geopolitical-risk-trading','Geopolitical Risk and Its Market Impact','fundamental',
   'Elections, wars, trade wars, and sanctions move markets faster than any economic data release. Learn frameworks for pricing geopolitical risk, how to position ahead of known events, and how to manage exposure when the unexpected happens.',
   74,false,12,3.0,7,'The Macro Trader')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;

-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 8 — THE VOLATILITY TRADER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('options-strategies-advanced','Options Strategies: Spreads, Straddles, and Iron Condors','strategy',
   'Multi-leg options strategies allow precise expression of a market view: direction, magnitude, and volatility expectation all in one structure. Learn vertical spreads, straddles, strangles, iron condors, and butterflies — and understand what each position says about your forecast before you place it.',
   80,false,20,5.0,8,'The Volatility Trader'),
  ('implied-vs-realised-vol','Implied vs Realised Volatility: The Core Edge in Options','technical',
   'The only sustainable edge in options trading comes from being right about volatility relative to what the market prices in. Learn to compare implied volatility to historical realised volatility, read the VIX, and identify when options are cheap or expensive.',
   81,false,16,4.0,8,'The Volatility Trader'),
  ('volatility-surface','The Volatility Surface: Skew, Term Structure, and What It Reveals','technical',
   'The vol surface is the options market''s full view of future risk. Learn to read volatility skew (why puts trade richer than calls), term structure (why near-term vol differs from long-dated), and what surface shape changes signal about institutional positioning.',
   82,false,14,4.0,8,'The Volatility Trader'),
  ('delta-gamma-hedging','Delta Hedging and Gamma Risk Management','risk',
   'Options positions change their risk profile as the market moves. Learn delta-neutral hedging, why gamma is the risk that kills option sellers in fast markets, and how professional market makers manage their books dynamically.',
   83,false,15,4.0,8,'The Volatility Trader'),
  ('options-portfolio-protection','Options for Portfolio Protection: Hedging Real Exposure','risk',
   'Options are the most cost-effective hedging instrument available to any trader or investor. Learn protective puts, collars, and variance swaps concepts — and how to calculate the actual cost of insurance relative to the risk being hedged.',
   84,false,13,3.5,8,'The Volatility Trader')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;

-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 9 — THE BOOK RUNNER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('multi-strategy-portfolio','Multi-Strategy Portfolio Construction','strategy',
   'Running multiple uncorrelated strategies simultaneously reduces volatility, smooths returns, and generates a compounding effect that no single strategy can match. Learn to select, weight, and manage a portfolio of strategies as a unified system.',
   90,false,18,5.0,9,'The Book Runner'),
  ('factor-investing','Factor Investing: Value, Momentum, Quality, and Low Volatility','fundamental',
   'Factor investing is the bridge between discretionary trading and institutional portfolio management. Learn the five academically validated risk factors, how to construct factor-tilted portfolios, and why factors can underperform for years before delivering.',
   91,false,16,4.0,9,'The Book Runner'),
  ('portfolio-attribution','Portfolio Attribution: Understanding What Is Actually Driving Returns','strategy',
   'Most traders cannot accurately explain why they made or lost money. Attribution analysis breaks returns into their components — market beta, factor exposure, sector allocation, stock selection, and timing. Learn to do this for your own book.',
   92,false,14,3.5,9,'The Book Runner'),
  ('stress-testing-scenarios','Stress Testing and Scenario Analysis','risk',
   'Historical drawdowns underestimate future risk because history never exactly repeats. Learn to construct plausible stress scenarios (rate shock, liquidity crisis, equity crash), apply them to your portfolio, and pre-plan responses before the scenario occurs.',
   93,false,13,3.5,9,'The Book Runner'),
  ('performance-reporting','Performance Reporting: Communicating Results Professionally','strategy',
   'Whether reporting to yourself, a prop firm, or external investors, performance reporting done well builds trust and reveals truth. Learn to build a monthly tear sheet, calculate all relevant metrics correctly, and present results with full context.',
   94,false,12,3.0,9,'The Book Runner'),
  ('statistical-arbitrage-intro','Statistical Arbitrage: Pairs, Mean Reversion, and Cointegration','strategy',
   'Statistical arbitrage exploits the temporary deviation of related instruments from their historical relationship. Learn pairs trading, cointegration testing, spread construction, and the position management specific to stat-arb strategies — institutional techniques for the multi-strategy book.',
   95,false,16,4.0,9,'The Book Runner')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;

-- ══════════════════════════════════════════════════════════════════════════════
-- LEVEL 10 — THE GENERAL PARTNER
-- ══════════════════════════════════════════════════════════════════════════════
INSERT INTO courses (slug,title,track,description,order_index,is_free,lesson_count,hours,level,level_name) VALUES
  ('hedge-fund-structure','How Hedge Funds Are Structured: LP/GP, Fees, and Incentives','foundations',
   'The hedge fund structure has been refined over 70 years to align incentives between managers and investors. Learn the LP/GP model, management fees vs performance fees, high-water marks, hurdle rates, and what each term means for a manager starting out.',
   100,false,14,4.0,10,'The General Partner'),
  ('capital-raising','Capital Raising and Investor Relations for Emerging Managers','strategy',
   'The hardest part of running a fund is not generating returns — it is raising capital. Learn how institutional allocators evaluate new managers, what a DDQ contains, how to build a track record from zero, and the realistic path from solo trader to seeded fund.',
   101,false,15,4.0,10,'The General Partner'),
  ('regulatory-compliance','Regulatory Compliance: MiFID II, FCA, and SEC Basics','foundations',
   'Trading other people''s money means operating within a regulatory framework. Learn the key obligations under FCA/MiFID II (for UK/EU) and SEC (for US), what registration thresholds apply, what compliance infrastructure a new fund actually needs, and common violations.',
   102,false,13,3.5,10,'The General Partner'),
  ('fund-operations','Fund Operations: Prime Brokerage, Administrators, and Infrastructure','strategy',
   'Running a fund is a business, not just a trading account. Learn how prime brokerage relationships work, why fund administrators exist, what the technology stack looks like for a lean fund, and how to build institutional-grade operations without a large team.',
   103,false,12,3.5,10,'The General Partner'),
  ('building-your-legacy','Building Your Legacy: Long-Term Edge, Culture, and Succession','strategy',
   'The traders and funds that endure do so because they build institutions, not just track records. Learn how legendary macro funds maintained edge across decades, how to build a trading culture that survives individual bad runs, and how to think about legacy in the context of markets.',
   104,false,12,3.5,10,'The General Partner')
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, level=EXCLUDED.level,
  level_name=EXCLUDED.level_name, is_free=EXCLUDED.is_free, lesson_count=EXCLUDED.lesson_count,
  hours=EXCLUDED.hours, order_index=EXCLUDED.order_index, track=EXCLUDED.track;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 5: THE TACTICIAN
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Order Book: Bids, Asks, and the Queue Behind the Price',1,'reading',40,NULL::jsonb),
  ('lesson-2','Level 2 Data: Reading Market Depth',2,'video',40,NULL::jsonb),
  ('lesson-3','Time and Sales: Reading the Tape in Real Time',3,'reading',40,NULL::jsonb),
  ('lesson-4','Iceberg Orders and Hidden Liquidity',4,'reading',40,NULL::jsonb),
  ('lesson-5','Identify Absorption at a Key Level',5,'canvas_exercise',60,
   '{"ticker":"NAS100","timeframe":"M1","exercise_prompt":"The 1-minute NAS100 chart shows price testing a major support level three times. The order book replay panel is shown on the right. At each test, draw a circle on the price chart where you see absorption occurring (large bid volume consumed without price falling). Then draw an arrow showing the expected reaction.","reference_line":{"x1":0,"y1":70,"x2":100,"y2":70},"steps":[{"id":"1","label":"Identify the support level","completed":false},{"id":"2","label":"Circle absorption zones","completed":false},{"id":"3","label":"Draw expected reaction","completed":false}]}'::jsonb),
  ('lesson-6','Stop Hunts: How Liquidity Below Swing Lows Gets Taken',6,'reading',40,NULL::jsonb),
  ('lesson-7','Footprint Charts: Volume at Each Price Within a Candle',7,'video',40,NULL::jsonb),
  ('lesson-8','Map Institutional Footprints on a Live Chart',8,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"M5","exercise_prompt":"A 5-minute EUR/USD footprint chart is displayed showing delta (buy volume minus sell volume) inside each candle. Mark the three candles with the highest positive delta as green rectangles and the three with the most negative delta as red rectangles. Draw a trendline connecting the delta extremes — does it confirm or contradict the price trend?","reference_line":{"x1":0,"y1":55,"x2":100,"y2":40},"steps":[{"id":"1","label":"Identify high positive delta candles","completed":false},{"id":"2","label":"Identify high negative delta candles","completed":false},{"id":"3","label":"Check delta vs price trend","completed":false}]}'::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='order-flow-microstructure' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Market Orders vs Limit Orders: When Each Costs You',1,'reading',40,NULL::jsonb),
  ('lesson-2','Slippage: Where It Comes From and How to Measure It',2,'reading',40,NULL::jsonb),
  ('lesson-3','Entry Timing: High-Liquidity Windows vs Low-Liquidity Traps',3,'video',40,NULL::jsonb),
  ('lesson-4','The Pre-Entry Checklist: Spread, Volume, and Time of Day',4,'reading',40,NULL::jsonb),
  ('lesson-5','Optimise Your Entry on a Real Setup',5,'canvas_exercise',60,
   '{"ticker":"GBPUSD","timeframe":"M15","exercise_prompt":"A GBP/USD long setup is shown at a daily support level. Three possible entry methods are illustrated: (1) market order at current price, (2) limit order at the level, (3) limit order on a 15-min candlestick confirmation. For each, draw the entry line, calculate the spread cost, and mark the stop loss. Which method gives the best actual R:R after accounting for entry costs?","reference_line":{"x1":0,"y1":65,"x2":100,"y2":65},"steps":[{"id":"1","label":"Draw all three entry lines","completed":false},{"id":"2","label":"Calculate spread cost for each","completed":false},{"id":"3","label":"Select and justify best method","completed":false}]}'::jsonb),
  ('lesson-6','Partial Fills and Re-Queuing: Managing Limit Order Risk',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='execution-mastery' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Case for Scaling: When Adding to a Winner Makes Sense',1,'reading',40,NULL::jsonb),
  ('lesson-2','Scaling In: Building a Position Across Multiple Entries',2,'video',40,NULL::jsonb),
  ('lesson-3','Partial Profits: Locking In Gains Without Exiting the Trade',3,'reading',40,NULL::jsonb),
  ('lesson-4','Trailing Stops: Methods and Psychology',4,'video',40,NULL::jsonb),
  ('lesson-5','Design a Scaling Plan for a Running Trade',5,'canvas_exercise',60,
   '{"ticker":"GBPUSD","timeframe":"H4","exercise_prompt":"You entered long at the marked level and price has moved in your favour. Draw: (1) a line showing where you take your first partial profit (25%), (2) where you move your stop to break-even, (3) where you take a second partial (another 50%), (4) your final trailing stop method on the chart. Calculate the blended R:R across all exits.","reference_line":{"x1":20,"y1":70,"x2":100,"y2":25},"steps":[{"id":"1","label":"Mark first partial profit","completed":false},{"id":"2","label":"Mark break-even stop","completed":false},{"id":"3","label":"Mark second partial and trailing stop","completed":false}]}'::jsonb),
  ('lesson-6','When NOT to Scale: The Averaging Down Trap',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='scaling-positions' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Why the Open Is the Highest Edge Window of the Day',1,'reading',40,NULL::jsonb),
  ('lesson-2','The London Open: Structure, Volatility, and Common Patterns',2,'video',40,NULL::jsonb),
  ('lesson-3','The New York Open: Overlap Session and News Reactions',3,'reading',40,NULL::jsonb),
  ('lesson-4','End-of-Day and Weekly Close: Institutional Rebalancing Flows',4,'reading',40,NULL::jsonb),
  ('lesson-5','Trade the London Open Breakout',5,'canvas_exercise',60,
   '{"ticker":"GBPUSD","timeframe":"M15","exercise_prompt":"The chart shows the Asian session range on GBP/USD and the London open candle is marked. Draw the Asian session high and low as horizontal lines. Then draw your breakout entry trigger (above the high or below the low), stop loss (inside the range), and a measured target (range height projected from breakout). Calculate R:R.","reference_line":{"x1":60,"y1":35,"x2":100,"y2":22},"steps":[{"id":"1","label":"Mark Asian session range","completed":false},{"id":"2","label":"Draw breakout entry trigger","completed":false},{"id":"3","label":"Set stop and measured target","completed":false}]}'::jsonb),
  ('lesson-6','Avoiding the False Open: When to Stand Aside',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='session-edge' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Volatility-Based Position Sizing: ATR as a Size Modifier',1,'reading',40,NULL::jsonb),
  ('lesson-2','Quality-Based Sizing: Risking More on A-Grade Setups',2,'reading',40,NULL::jsonb),
  ('lesson-3','The Drawdown Death Spiral and How to Break Out of It',3,'video',40,NULL::jsonb),
  ('lesson-4','The Half-Kelly Floor: When to Halve Size in a Drawdown',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build a Dynamic Sizing Table',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Using the dynamic sizing framework, build a table on the chart that shows your position size across three drawdown states and three setup grades. Draw horizontal lines on the equity curve at -5% (reduce to 75% size), -10% (reduce to 50% size), and -15% (reduce to 25% size). Mark today''s equity state and calculate your current allowed size.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Draw drawdown threshold lines","completed":false},{"id":"2","label":"Map size reduction at each level","completed":false},{"id":"3","label":"Calculate current allowed size","completed":false}]}'::jsonb),
  ('lesson-6','Comeback Mathematics: The Exact Steps Back from Any Drawdown',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='advanced-dynamic-risk' ON CONFLICT (course_id,slug) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 6: THE QUANT
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Makes a Strategy Systematic: The Five Components',1,'reading',40,NULL::jsonb),
  ('lesson-2','Universe Selection: What Markets to Trade and Why',2,'reading',40,NULL::jsonb),
  ('lesson-3','Signal Design: Translating Discretionary Insights into Rules',3,'video',40,NULL::jsonb),
  ('lesson-4','Filters: Regime Detection to Avoid Low-Edge Environments',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build a Systematic Signal from a Discretionary Setup',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Your discretionary setup is: long when price pulls back to a rising 20 EMA and forms a bullish candle. Formalise it: draw the 20 EMA on the chart, then for each of the last 12 months draw a vertical line at every point where your rule would have triggered an entry. Mark each as win (green arrow) or loss (red arrow). Count the sample and calculate win rate.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":35},"steps":[{"id":"1","label":"Identify all signal occurrences","completed":false},{"id":"2","label":"Mark wins and losses","completed":false},{"id":"3","label":"Calculate win rate","completed":false}]}'::jsonb),
  ('lesson-6','Execution Rules and Order Types for Systematic Strategies',6,'reading',40,NULL::jsonb),
  ('lesson-7','Exit Logic: Why Most System Builders Underestimate the Exit',7,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='systematic-strategy-design' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Setting Up a Trade Analysis Spreadsheet from Scratch',1,'video',40,NULL::jsonb),
  ('lesson-2','The 8 Statistics Every Trader Must Calculate on Their Own Data',2,'reading',40,NULL::jsonb),
  ('lesson-3','Visualising Performance: Equity Curves, Drawdown Charts, MAE/MFE',3,'reading',40,NULL::jsonb),
  ('lesson-4','Identify Your Best and Worst Setup Types',4,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A 60-trade performance dataset is shown on the chart with each trade marked. Using the filter panel, isolate trades taken (a) at HTF support/resistance vs not, and (b) with RSI confirmation vs without. For each subset, draw a segment of an equity curve showing how that group performed. Which combination produces the best equity curve shape?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Filter by trade type","completed":false},{"id":"2","label":"Draw subset equity curves","completed":false},{"id":"3","label":"Identify best combination","completed":false}]}'::jsonb),
  ('lesson-5','Removing Losing Subsets: How Saying No to One Setup Type Changes Everything',5,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='data-analysis-for-traders' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Why In-Sample Optimisation Lies: The Overfitting Problem',1,'reading',40,NULL::jsonb),
  ('lesson-2','Walk-Forward Testing: The Methodology Step by Step',2,'video',40,NULL::jsonb),
  ('lesson-3','Walk-Forward Efficiency Ratio: What Good Looks Like',3,'reading',40,NULL::jsonb),
  ('lesson-4','Anchor vs Rolling Windows: Choosing Your Walk-Forward Structure',4,'reading',40,NULL::jsonb),
  ('lesson-5','Run a Walk-Forward Test on a Moving Average Strategy',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A 5-year EUR/USD dataset is split into 5 one-year windows (each year shown as a differently coloured band on the chart). For each window, the optimal EMA crossover period is shown. Draw a line on the parameter chart connecting the optimal period across each window. Is the optimal parameter stable (small variation) or unstable (large variation)? What does this tell you about robustness?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Plot optimal parameter per window","completed":false},{"id":"2","label":"Connect the parameter dots","completed":false},{"id":"3","label":"Assess robustness","completed":false}]}'::jsonb),
  ('lesson-6','Accepting an Imperfect but Robust System Over a Perfect But Fragile One',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='walk-forward-robustness' ON CONFLICT (course_id,slug) DO NOTHING;

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

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Statistical Arbitrage Actually Means',1,'reading',40,NULL::jsonb),
  ('lesson-2','Pairs Trading: Finding Cointegrated Instruments',2,'video',40,NULL::jsonb),
  ('lesson-3','The Spread: Calculating and Normalising the Pairs Relationship',3,'reading',40,NULL::jsonb),
  ('lesson-4','Entry and Exit Rules for a Mean-Reversion Pairs Trade',4,'reading',40,NULL::jsonb),
  ('lesson-5','Trade a Pairs Setup on a Correlated Chart',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Two correlated instruments are shown side by side: EUR/USD (blue) and AUD/USD (orange). Their spread ratio is plotted in a panel below. Draw a horizontal line at +2 standard deviations and -2 standard deviations on the spread panel. When the spread reaches +2 SD (EUR/USD expensive relative to AUD/USD), draw your entry arrows: short EUR/USD and long AUD/USD. Draw your exit at the mean.","reference_line":{"x1":40,"y1":20,"x2":100,"y2":50},"steps":[{"id":"1","label":"Draw spread SD bands","completed":false},{"id":"2","label":"Mark pair entry arrows","completed":false},{"id":"3","label":"Mark exit at mean reversion","completed":false}]}'::jsonb),
  ('lesson-6','Risks in Statistical Arbitrage: Spread Divergence and Regime Change',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='statistical-arbitrage-intro' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Defining Your System''s Universe, Objective, and Constraints',1,'reading',40,NULL::jsonb),
  ('lesson-2','Signal, Filter, and Exit: Writing the Full Rule Set',2,'reading',40,NULL::jsonb),
  ('lesson-3','Backtesting Your System: Methodology Checklist',3,'video',40,NULL::jsonb),
  ('lesson-4','Stress-Testing Against Different Market Regimes',4,'reading',40,NULL::jsonb),
  ('lesson-5','Document and Validate Your Complete System',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Your complete system is run on 5 years of EUR/USD data. Four regime periods are colour-coded on the chart: trending bull (green), trending bear (red), range (grey), high volatility (orange). Draw your equity curve on each regime panel separately. Identify which regime(s) your system struggles with and draw a horizontal line showing your acceptable drawdown ceiling in each.","reference_line":{"x1":0,"y1":40,"x2":100,"y2":40},"steps":[{"id":"1","label":"Identify regime performance","completed":false},{"id":"2","label":"Draw equity curve per regime","completed":false},{"id":"3","label":"Mark acceptable drawdown ceilings","completed":false}]}'::jsonb),
  ('lesson-6','Live Deployment: The First 90 Days of Running a System',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='building-personal-system' ON CONFLICT (course_id,slug) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 7: THE MACRO TRADER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Economic Cycle: Four Phases and Which Assets Win in Each',1,'reading',40,NULL::jsonb),
  ('lesson-2','Capital Flow Theory: Why Money Moves Between Countries',2,'video',40,NULL::jsonb),
  ('lesson-3','The Global Macro Dashboard: 10 Numbers to Watch Every Week',3,'reading',40,NULL::jsonb),
  ('lesson-4','Building a Top-Down Macro Thesis',4,'reading',40,NULL::jsonb),
  ('lesson-5','Construct a Macro Trade Thesis',5,'canvas_exercise',60,
   '{"ticker":"USDJPY","timeframe":"W1","exercise_prompt":"The macro scenario: US rates are rising, Japan rates are near zero. Draw an arrow on the USD/JPY weekly chart showing your expected directional bias from this rate differential. Then mark the key technical level that would confirm the macro thesis is playing out, and the level that would invalidate it.","reference_line":{"x1":0,"y1":60,"x2":100,"y2":20},"steps":[{"id":"1","label":"Draw directional bias arrow","completed":false},{"id":"2","label":"Mark confirmation level","completed":false},{"id":"3","label":"Mark invalidation level","completed":false}]}'::jsonb),
  ('lesson-6','When Macro and Technical Conflict: Which Wins and When',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='global-macro-framework' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Federal Reserve: Dual Mandate, FOMC, and the Dot Plot',1,'reading',40,NULL::jsonb),
  ('lesson-2','The ECB and BOE: How European Central Banking Differs',2,'reading',40,NULL::jsonb),
  ('lesson-3','The Bank of Japan: Yield Curve Control and Why It Matters Globally',3,'video',40,NULL::jsonb),
  ('lesson-4','Forward Guidance: How Central Banks Communicate Intent',4,'reading',40,NULL::jsonb),
  ('lesson-5','React to a Central Bank Rate Decision',5,'canvas_exercise',60,
   '{"ticker":"USDJPY","timeframe":"H1","exercise_prompt":"The Fed just raised rates 25bps but signalled a pause ahead. Draw on the USD/JPY H1 chart how you expect the market to react over the next 24 hours: (1) the initial spike direction as an arrow, (2) the expected retracement as a second arrow, (3) the likely medium-term direction based on the pause signal. Justify each stage in the text box.","reference_line":{"x1":50,"y1":40,"x2":100,"y2":50},"steps":[{"id":"1","label":"Draw initial reaction","completed":false},{"id":"2","label":"Draw retracement expectation","completed":false},{"id":"3","label":"Draw medium-term direction","completed":false}]}'::jsonb),
  ('lesson-6','The Importance of What Central Bankers Don''t Say',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='central-bank-playbooks' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Interest Rate Differentials: The Engine Behind Long-Term Currency Moves',1,'reading',40,NULL::jsonb),
  ('lesson-2','The Carry Trade: Borrowing Low to Invest High',2,'video',40,NULL::jsonb),
  ('lesson-3','Carry Trade Unwind: When Carry Collapses and What Triggers It',3,'reading',40,NULL::jsonb),
  ('lesson-4','Purchasing Power Parity: The Long-Run Anchor for Currency Valuation',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build a Currency Carry Trade Analysis',5,'canvas_exercise',60,
   '{"ticker":"AUDJPY","timeframe":"W1","exercise_prompt":"AUD/JPY is a classic carry pair: Australia has high rates, Japan has low rates. Draw a vertical bar chart showing the current interest rate differential. Then on the AUD/JPY weekly chart, draw a line showing the carry trade''s fair value drift direction. Mark any period on the chart where you see a carry unwind (rapid decline) and draw a circle at the trigger event.","reference_line":{"x1":0,"y1":30,"x2":100,"y2":50},"steps":[{"id":"1","label":"Draw rate differential bar","completed":false},{"id":"2","label":"Mark fair value drift direction","completed":false},{"id":"3","label":"Identify carry unwind period","completed":false}]}'::jsonb),
  ('lesson-6','Currency Wars: Competitive Devaluation and Safe Haven Flows',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='currency-wars-rates' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Drives Oil: OPEC, US Shale, and the Supply-Demand Balance',1,'reading',40,NULL::jsonb),
  ('lesson-2','Gold as a Macro Signal: Real Rates, Dollar, and Safe Haven Demand',2,'video',40,NULL::jsonb),
  ('lesson-3','Agricultural Commodities: Weather, Crop Reports, and Seasonal Patterns',3,'reading',40,NULL::jsonb),
  ('lesson-4','The Commodity Supercycle: What It Is and Where We Are Now',4,'reading',40,NULL::jsonb),
  ('lesson-5','Read a Commodity as a Macro Indicator',5,'canvas_exercise',60,
   '{"ticker":"XAUUSD","timeframe":"W1","exercise_prompt":"Gold and US real yields (10-year TIPS) are shown on the same chart — gold price (yellow line) and inverted real yields (blue line). They should move together when the relationship holds. Circle the three periods on the chart where gold and real yields diverge most. At each divergence, draw an arrow showing which variable you think will mean-revert to the other and why.","reference_line":{"x1":0,"y1":40,"x2":100,"y2":35},"steps":[{"id":"1","label":"Identify the three divergences","completed":false},{"id":"2","label":"Draw mean reversion arrows","completed":false},{"id":"3","label":"Justify each prediction","completed":false}]}'::jsonb),
  ('lesson-6','Using Commodity Signals as Macro Filters for FX and Equity Trades',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='commodity-supercycles' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','How to Price Geopolitical Risk: Probability, Severity, and Duration',1,'reading',40,NULL::jsonb),
  ('lesson-2','Elections: How to Position Before, During, and After',2,'video',40,NULL::jsonb),
  ('lesson-3','Trade Wars and Tariffs: Sector and Currency Impacts',3,'reading',40,NULL::jsonb),
  ('lesson-4','Sanctions and Energy Shocks: The 2022 Playbook',4,'reading',40,NULL::jsonb),
  ('lesson-5','Position Around a Known Geopolitical Event',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"A major EU election is 10 days away. Polls show 40% chance of a market-friendly outcome vs 60% for a populist outcome. Draw on the EUR/USD chart: (1) a rectangle showing your expected pre-event drift, (2) two scenario arrows from election day — one for each outcome, (3) your position sizing adjustment line (showing you reduce size before the event). Explain in one sentence how you manage the gap risk.","reference_line":{"x1":70,"y1":50,"x2":100,"y2":30},"steps":[{"id":"1","label":"Draw pre-event drift expectation","completed":false},{"id":"2","label":"Draw both scenario outcomes","completed":false},{"id":"3","label":"Show position size reduction","completed":false}]}'::jsonb),
  ('lesson-6','The Unexpected Event: Managing Open Positions When Headlines Hit',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='geopolitical-risk-trading' ON CONFLICT (course_id,slug) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 8: THE VOLATILITY TRADER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Vertical Spreads: Bull Call Spread and Bear Put Spread',1,'video',40,NULL::jsonb),
  ('lesson-2','The Straddle and Strangle: Trading Volatility Direction-Neutral',2,'reading',40,NULL::jsonb),
  ('lesson-3','The Iron Condor: Selling Volatility in a Range',3,'reading',40,NULL::jsonb),
  ('lesson-4','The Butterfly: A Defined-Risk Volatility Sale',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build an Iron Condor Around an Earnings Event',5,'canvas_exercise',60,
   '{"ticker":"AAPL","timeframe":"D1","exercise_prompt":"Apple earnings are in 5 days. The expected move (from options pricing) is +/- 4%. The stock is at $190. Draw on the payoff diagram: (1) your short call strike (mark above expected move), (2) your long call hedge above it, (3) your short put strike (below expected move), (4) your long put below it. Calculate your max profit (net premium), max loss, and break-even points on both sides.","reference_line":{"x1":40,"y1":50,"x2":60,"y2":50},"steps":[{"id":"1","label":"Draw short call and long call strikes","completed":false},{"id":"2","label":"Draw short put and long put strikes","completed":false},{"id":"3","label":"Calculate P&L metrics","completed":false}]}'::jsonb),
  ('lesson-6','Choosing the Right Strategy for Your Volatility View',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='options-strategies-advanced' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Implied Volatility: How the Market Prices Future Uncertainty',1,'reading',40,NULL::jsonb),
  ('lesson-2','Historical Realised Volatility vs IV: The Core Trade',2,'video',40,NULL::jsonb),
  ('lesson-3','The VIX: What It Measures, What It Doesn''t, and How to Use It',3,'reading',40,NULL::jsonb),
  ('lesson-4','IV Rank and IV Percentile: Is Vol Cheap or Expensive Right Now?',4,'reading',40,NULL::jsonb),
  ('lesson-5','Identify a Volatility Mispricing',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"The chart shows 30-day implied volatility (blue line) and 30-day realised volatility (orange line) for the S&P 500 over the past year. When IV is significantly above realised vol, options are expensive (sell bias). When below, options are cheap (buy bias). Draw rectangles on the chart around the three periods where the gap was largest. For each, draw an arrow showing the trade direction implied (sell vol or buy vol).","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Identify the three largest vol gaps","completed":false},{"id":"2","label":"Draw rectangles around each period","completed":false},{"id":"3","label":"Mark trade direction for each","completed":false}]}'::jsonb),
  ('lesson-6','Volatility Mean Reversion: The Statistical Tendency Sellers Rely On',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='implied-vs-realised-vol' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Volatility Surface: A Map of Market Fear Across Strikes and Expiries',1,'reading',40,NULL::jsonb),
  ('lesson-2','Volatility Skew: Why Out-of-the-Money Puts Are Always Expensive',2,'video',40,NULL::jsonb),
  ('lesson-3','Term Structure: When Near-Term Vol Exceeds Long-Term Vol (and Why)',3,'reading',40,NULL::jsonb),
  ('lesson-4','Reading the Surface for Directional Clues',4,'reading',40,NULL::jsonb),
  ('lesson-5','Analyse Skew Across Two Market Regimes',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"Two vol surfaces are shown: one from a low-volatility period (left) and one from a high-stress period (right). On each surface diagram, draw: (1) a circle around the area of steepest skew, (2) an arrow showing the direction of term structure steepness. Compare the two: draw a line chart showing how skew steepness changed from period 1 to period 2. What does this tell you about market participants'' hedging behaviour?","reference_line":{"x1":50,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Circle steepest skew on each surface","completed":false},{"id":"2","label":"Mark term structure direction","completed":false},{"id":"3","label":"Plot skew change over time","completed":false}]}'::jsonb),
  ('lesson-6','Trading the Skew: Risk Reversals and Their Directional Bias Signal',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='volatility-surface' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Delta: The Probability Proxy and Hedge Ratio',1,'reading',40,NULL::jsonb),
  ('lesson-2','Dynamic Delta Hedging: Rebalancing as Price Moves',2,'video',40,NULL::jsonb),
  ('lesson-3','Gamma: The Risk That Accelerates',3,'reading',40,NULL::jsonb),
  ('lesson-4','Gamma Scalping: The Theoretical Edge in Dynamic Hedging',4,'reading',40,NULL::jsonb),
  ('lesson-5','Manage Delta Across a Simulated Position',5,'canvas_exercise',60,
   '{"ticker":"AAPL","timeframe":"H1","exercise_prompt":"You are long a straddle on Apple. As price moves, your delta changes. The chart shows Apple moving +5% over 3 hours. At each hourly bar, the options panel shows your updated delta. Draw vertical lines on the price chart at the points where you would rebalance your hedge (when delta exceeds +/- 0.20). For each rebalance, draw an arrow showing whether you buy or sell the underlying to return to delta-neutral.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":30},"steps":[{"id":"1","label":"Track delta at each hour","completed":false},{"id":"2","label":"Mark rebalance trigger points","completed":false},{"id":"3","label":"Draw buy/sell hedge arrows","completed":false}]}'::jsonb),
  ('lesson-6','Vega and Theta: The Tug of War in Every Options Position',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='delta-gamma-hedging' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Protective Put: The Simplest Portfolio Hedge',1,'reading',40,NULL::jsonb),
  ('lesson-2','The Collar: Capping Upside to Fund Downside Protection',2,'reading',40,NULL::jsonb),
  ('lesson-3','How Much Does Hedging Cost? The True Drag on Returns',3,'video',40,NULL::jsonb),
  ('lesson-4','Tail Risk Hedging: OTM Puts as Crash Insurance',4,'reading',40,NULL::jsonb),
  ('lesson-5','Design a Hedge for a Real Portfolio',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"W1","exercise_prompt":"You hold a £100,000 portfolio that broadly tracks the S&P 500. You want downside protection below -10% for the next 3 months. On the payoff diagram, draw your current unhedged position (straight diagonal line). Then draw the protective put payoff that kicks in at -10%. Calculate: (1) cost of the hedge as % of portfolio, (2) the break-even level above which the hedge costs you performance.","reference_line":{"x1":0,"y1":30,"x2":100,"y2":70},"steps":[{"id":"1","label":"Draw unhedged payoff line","completed":false},{"id":"2","label":"Draw hedged payoff with put floor","completed":false},{"id":"3","label":"Calculate hedge cost and break-even","completed":false}]}'::jsonb),
  ('lesson-6','When NOT to Hedge: The Hidden Cost of Chronic Insurance Buying',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='options-portfolio-protection' ON CONFLICT (course_id,slug) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 9: THE BOOK RUNNER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Why Multiple Uncorrelated Strategies Beat One Great Strategy',1,'reading',40,NULL::jsonb),
  ('lesson-2','Strategy Selection: Diversifying Across Edge Types',2,'reading',40,NULL::jsonb),
  ('lesson-3','Capital Allocation Between Strategies: Equal Weight vs Risk Parity',3,'video',40,NULL::jsonb),
  ('lesson-4','Correlation Between Strategies: Why It Changes in a Crisis',4,'reading',40,NULL::jsonb),
  ('lesson-5','Allocate Capital Across a 3-Strategy Portfolio',5,'canvas_exercise',60,
   '{"ticker":"EURUSD","timeframe":"D1","exercise_prompt":"Three strategy equity curves are shown: Trend Following (steady, low Sharpe), Mean Reversion (spiky, high short-term Sharpe), and Macro Carry (slow, low drawdown). A correlation matrix is displayed. Allocate capital across the three: draw a pie chart showing your proposed weights. Then draw the blended equity curve that would result. Does diversification meaningfully improve the Sharpe vs your best single strategy?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Analyse correlation matrix","completed":false},{"id":"2","label":"Draw capital allocation pie","completed":false},{"id":"3","label":"Draw blended equity curve","completed":false}]}'::jsonb),
  ('lesson-6','Strategy Lifecycle: When to Turn Off a Strategy That''s Stopped Working',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='multi-strategy-portfolio' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Is a Factor? The Academic Evidence for Systematic Premia',1,'reading',40,NULL::jsonb),
  ('lesson-2','The Value Factor: Buying Cheap Assets and the Risk It Carries',2,'reading',40,NULL::jsonb),
  ('lesson-3','The Momentum Factor: Why Winners Keep Winning (Until They Don''t)',3,'video',40,NULL::jsonb),
  ('lesson-4','Quality and Low Volatility: The Defensive Factors',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build a Simple Factor-Tilted Portfolio',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"M1","exercise_prompt":"A universe of 20 stocks is shown with their factor scores: Value (P/E rank), Momentum (12-1 month return rank), and Quality (ROE rank). Draw circles around the 5 stocks that score highest across all three factors. Then draw a portfolio allocation bar chart showing how you would weight them. Compare this to an equal-weight alternative — does factor tilt meaningfully change the expected characteristics?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Identify top multi-factor stocks","completed":false},{"id":"2","label":"Draw allocation bar chart","completed":false},{"id":"3","label":"Compare to equal-weight","completed":false}]}'::jsonb),
  ('lesson-6','Factor Crowding: When Everyone Owns the Same Trade',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='factor-investing' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','What Attribution Is and Why Most Traders Skip It',1,'reading',40,NULL::jsonb),
  ('lesson-2','Brinson-Hood-Beebower: The Standard Attribution Framework',2,'video',40,NULL::jsonb),
  ('lesson-3','Separating Alpha from Beta: Are You Actually Skilled or Just Long the Market?',3,'reading',40,NULL::jsonb),
  ('lesson-4','Timing vs Selection: Which Is Your Actual Edge?',4,'reading',40,NULL::jsonb),
  ('lesson-5','Run Attribution on a 3-Month Portfolio',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"A 3-month portfolio statement shows 12 closed trades across 4 sectors. The SPX returned +8% in the same period; your portfolio returned +11%. Attribute the 3% alpha: draw a waterfall chart showing how much came from (1) sector allocation vs benchmark, (2) individual stock selection within sectors, (3) timing (entry/exit timing vs holding the position throughout). Which component was your genuine edge?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Calculate benchmark comparison","completed":false},{"id":"2","label":"Break down by attribution source","completed":false},{"id":"3","label":"Identify primary edge source","completed":false}]}'::jsonb),
  ('lesson-6','Using Attribution to Cut What Doesn''t Work and Scale What Does',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='portfolio-attribution' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Why Historical Drawdowns Underestimate Future Risk',1,'reading',40,NULL::jsonb),
  ('lesson-2','Scenario Construction: What Would 2008 Do to Your Book Today?',2,'video',40,NULL::jsonb),
  ('lesson-3','Correlation Breakdown: Why Diversification Fails in a Crisis',3,'reading',40,NULL::jsonb),
  ('lesson-4','Liquidity Risk: When You Can''t Exit at the Price on the Screen',4,'reading',40,NULL::jsonb),
  ('lesson-5','Stress Test Your Portfolio Against a Historical Scenario',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"W1","exercise_prompt":"The 2020 COVID crash scenario is loaded: S&P -34% in 33 days, VIX to 85, USD surges, gold initially falls then rallies. Apply this scenario to your current multi-asset portfolio. For each position, draw the expected P&L impact as a bar (up = profit, down = loss). What is your total portfolio P&L in this scenario? Draw the stressed equity curve and mark whether you stay within your max drawdown limit.","reference_line":{"x1":0,"y1":30,"x2":100,"y2":60},"steps":[{"id":"1","label":"Apply stress scenario to each position","completed":false},{"id":"2","label":"Draw individual P&L bars","completed":false},{"id":"3","label":"Draw stressed equity curve","completed":false}]}'::jsonb),
  ('lesson-6','Pre-Planning Crisis Responses: The Pre-Mortem for Your Portfolio',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='stress-testing-scenarios' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The Monthly Tear Sheet: What to Include and How to Present It',1,'reading',40,NULL::jsonb),
  ('lesson-2','GIPS Standards: Why Global Performance Standards Exist',2,'reading',40,NULL::jsonb),
  ('lesson-3','Benchmarking: Choosing the Right Comparator for Your Strategy',3,'video',40,NULL::jsonb),
  ('lesson-4','Communicating Drawdowns to Investors vs Communicating Them to Yourself',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build a Professional Monthly Report',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"Using the report builder, construct a one-page monthly performance summary: (1) draw your equity curve for the month on the chart, marking the peak and trough, (2) calculate and enter: monthly return, YTD return, Sharpe (annualised), and max drawdown, (3) write a two-sentence narrative explaining the month''s performance. This report format will save to your Tradecuity profile.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Draw monthly equity curve","completed":false},{"id":"2","label":"Calculate all performance metrics","completed":false},{"id":"3","label":"Write performance narrative","completed":false}]}'::jsonb),
  ('lesson-6','What Investors Actually Want to See: Honesty Over Spin',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='performance-reporting' ON CONFLICT (course_id,slug) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════════════════
-- LESSONS — LEVEL 10: THE GENERAL PARTNER
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','The LP/GP Model: How Capital and Control Are Split',1,'reading',40,NULL::jsonb),
  ('lesson-2','Management Fees vs Performance Fees: The 2-and-20 Structure and Its Variants',2,'reading',40,NULL::jsonb),
  ('lesson-3','High-Water Marks and Hurdle Rates: Protecting Investors',3,'video',40,NULL::jsonb),
  ('lesson-4','Fund Legal Structures: Ltd Partnership, SICAV, Cayman Fund',4,'reading',40,NULL::jsonb),
  ('lesson-5','Model a Fund P&L Across Different Fee Structures',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"A fund generates 25% gross return on £10M AUM. Calculate the LP net return under three fee structures: (A) 2% management / 20% performance, (B) 1% management / 15% performance with 6% hurdle, (C) 0% management / 30% performance above 8% hurdle. Draw a bar chart comparing investor net return under each structure. Which structure is most LP-friendly in a great year? In a flat year?","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Calculate net return for structure A","completed":false},{"id":"2","label":"Calculate net return for B and C","completed":false},{"id":"3","label":"Draw comparison bar chart","completed":false}]}'::jsonb),
  ('lesson-6','Side Pockets, Gates, and Redemption Terms: Protecting the Fund''s Liquidity',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='hedge-fund-structure' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','How Institutional Allocators Think: Endowments, Family Offices, FOFs',1,'reading',40,NULL::jsonb),
  ('lesson-2','The DDQ (Due Diligence Questionnaire): What Every Allocator Will Ask',2,'reading',40,NULL::jsonb),
  ('lesson-3','Track Record from Zero: Trading Your Own Capital to Attract Seeders',3,'video',40,NULL::jsonb),
  ('lesson-4','The Seeder Model: What Seeders Expect and What They Get',4,'reading',40,NULL::jsonb),
  ('lesson-5','Build a One-Page Manager Pitch',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"Using the pitch builder, create a one-page manager summary: (1) draw your strategy''s equity curve, (2) calculate and mark your Sharpe, max drawdown, and best/worst month, (3) in one sentence describe your edge (what market inefficiency do you exploit?), (4) in one sentence describe your risk controls. The system will score your pitch against a standard allocator checklist of 8 criteria.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Draw your equity curve","completed":false},{"id":"2","label":"Add key performance metrics","completed":false},{"id":"3","label":"Write edge and risk statements","completed":false}]}'::jsonb),
  ('lesson-6','Why Most Emerging Managers Fail to Raise Capital (And How Not to Be One)',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='capital-raising' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','FCA Authorisation: When You Need It and How to Get It',1,'reading',40,NULL::jsonb),
  ('lesson-2','MiFID II: Best Execution, Reporting, and Research Unbundling',2,'reading',40,NULL::jsonb),
  ('lesson-3','The AIFMD (Alternative Investment Fund Managers Directive) in Plain English',3,'video',40,NULL::jsonb),
  ('lesson-4','SEC Registration: What US Advisers Must Know',4,'reading',40,NULL::jsonb),
  ('lesson-5','Compliance Audit: Spot the Violation',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"Five compliance scenarios are presented as case studies on the timeline chart. For each scenario — (1) fund manager trades personal account before client accounts, (2) research report shared without MiFID II attribution, (3) best execution policy not documented, (4) investor receives quarterly report 45 days late, (5) fund AUM grows past registration threshold without updating regulator — draw a red flag on the timeline at each violation and classify it by regulation type (FCA/MiFID/AIFMD).","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Identify all five violations","completed":false},{"id":"2","label":"Mark each on the timeline","completed":false},{"id":"3","label":"Classify by regulation type","completed":false}]}'::jsonb),
  ('lesson-6','Compliance Infrastructure for a Lean Fund: What You Actually Need',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='regulatory-compliance' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','Prime Brokerage: What a PB Provides and How to Choose One',1,'reading',40,NULL::jsonb),
  ('lesson-2','Fund Administrators: NAV Calculation, Investor Statements, and Oversight',2,'reading',40,NULL::jsonb),
  ('lesson-3','Technology Stack for a Lean Fund: OMS, PMS, and Risk Systems',3,'video',40,NULL::jsonb),
  ('lesson-4','Counterparty Risk: Managing Exposure to Your Brokers and Banks',4,'reading',40,NULL::jsonb),
  ('lesson-5','Design a Fund Operations Structure',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"D1","exercise_prompt":"Using the org chart builder, draw the operational structure for a £25M single-manager fund: place the GP, LP investors, prime broker, fund administrator, auditor, and legal counsel in their correct positions. Draw arrows showing the flow of: (1) capital, (2) reporting, (3) trade execution instructions, (4) fee payments. Identify the single point of failure in your structure and explain how to mitigate it.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":50},"steps":[{"id":"1","label":"Draw the org structure","completed":false},{"id":"2","label":"Add flow arrows","completed":false},{"id":"3","label":"Identify and mitigate single point of failure","completed":false}]}'::jsonb),
  ('lesson-6','Operational Due Diligence: What Allocators Check When They Visit',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='fund-operations' ON CONFLICT (course_id,slug) DO NOTHING;

INSERT INTO lessons (course_id,slug,title,order_index,type,xp_value,content)
SELECT c.id,l.slug,l.title,l.order_index,l.type,l.xp_value,l.content FROM courses c
CROSS JOIN (VALUES
  ('lesson-1','How Legendary Macro Funds Maintained Edge Across Decades',1,'reading',40,NULL::jsonb),
  ('lesson-2','Institutional Memory: Documenting Process So the Firm Survives Any Individual',2,'reading',40,NULL::jsonb),
  ('lesson-3','Building a Research Culture: How the Best Funds Stay Curious',3,'video',40,NULL::jsonb),
  ('lesson-4','Succession and Scale: Moving from Trader to Investor to Manager of Managers',4,'reading',40,NULL::jsonb),
  ('lesson-5','Define Your 10-Year Vision',5,'canvas_exercise',60,
   '{"ticker":"SPX","timeframe":"W1","exercise_prompt":"Using the vision builder, plot your fund''s roadmap on a 10-year timeline: (1) draw a bar at year 1 showing your initial AUM target, (2) draw a bar at year 3 showing your institutional-ready AUM threshold, (3) draw a bar at year 5 showing your first external hire milestone, (4) draw a bar at year 10 showing your long-term AUM goal. For each milestone, write one sentence on the biggest risk that could prevent you reaching it.","reference_line":{"x1":0,"y1":50,"x2":100,"y2":30},"steps":[{"id":"1","label":"Plot AUM milestones","completed":false},{"id":"2","label":"Mark key operational milestones","completed":false},{"id":"3","label":"Write risk statements for each","completed":false}]}'::jsonb),
  ('lesson-6','The Trader''s Final Lesson: Continuous Learning as the Only Durable Edge',6,'reading',40,NULL::jsonb)
) AS l(slug,title,order_index,type,xp_value,content)
WHERE c.slug='building-your-legacy' ON CONFLICT (course_id,slug) DO NOTHING;
