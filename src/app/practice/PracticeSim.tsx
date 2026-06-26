'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PriceChart } from './PriceChart'

const HISTORY_LEN = 90

// Seed a plausible recent price series so the chart isn't empty on load
function seedSeries(base: number, pip: number, isJpy: boolean): number[] {
  const series: number[] = []
  let p = base - pip * 30
  for (let i = 0; i < HISTORY_LEN; i++) {
    p += (Math.random() - 0.5) * pip * 8
    series.push(parseFloat(p.toFixed(isJpy ? 2 : 5)))
  }
  series[series.length - 1] = base
  return series
}

const INSTRUMENTS = [
  { symbol: 'EURUSD', price: 1.0847, pip: 0.0001, spread: 0.2 },
  { symbol: 'GBPUSD', price: 1.2634, pip: 0.0001, spread: 0.3 },
  { symbol: 'USDJPY', price: 149.85, pip: 0.01,   spread: 0.4 },
  { symbol: 'XAUUSD', price: 2318.5, pip: 0.1,    spread: 0.5 },
  { symbol: 'SPX500', price: 5241.0, pip: 0.1,    spread: 0.4 },
  { symbol: 'NAS100', price: 18350.0, pip: 0.1,   spread: 0.5 },
  { symbol: 'BTCUSD', price: 67430.0, pip: 1.0,   spread: 5.0 },
]

type Position = {
  id: number
  symbol: string
  direction: 'BUY' | 'SELL'
  size: number
  entryPrice: number
  openedAt: string
}

type TradeHistory = Position & {
  closePrice: number
  pnl: number
  closedAt: string
}

const STARTING_BALANCE = 10000

function formatPnl(v: number) {
  const sign = v >= 0 ? '+' : ''
  return `${sign}£${Math.abs(v).toFixed(2)}`
}

function calcPnl(pos: Position, currentPrice: number): number {
  const diff = pos.direction === 'BUY'
    ? currentPrice - pos.entryPrice
    : pos.entryPrice - currentPrice
  return parseFloat((diff * pos.size * 1000).toFixed(2))
}

export function PracticeSim({ plan, isLoggedIn }: { plan: string; isLoggedIn: boolean }) {
  const [balance, setBalance]       = useState(STARTING_BALANCE)
  const [positions, setPositions]   = useState<Position[]>([])
  const [history, setHistory]       = useState<TradeHistory[]>([])
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [sizeInput, setSizeInput]   = useState('0.1')
  const [prices, setPrices]         = useState(INSTRUMENTS.map((i) => i.price))
  const [histories, setHistories]   = useState<number[][]>(
    () => INSTRUMENTS.map((i) => seedSeries(i.price, i.pip, i.symbol.includes('JPY')))
  )
  const [nextId, setNextId]         = useState(1)

  const instrument = INSTRUMENTS[selectedIdx]

  // Simulate price movement every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = prev.map((p, i) => {
          const inst = INSTRUMENTS[i]
          const move = (Math.random() - 0.5) * inst.pip * 8
          return parseFloat((p + move).toFixed(inst.symbol.includes('JPY') ? 2 : 5))
        })
        setHistories((hist) =>
          hist.map((series, i) => [...series, next[i]].slice(-HISTORY_LEN))
        )
        return next
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const decimals = instrument.symbol.includes('JPY') ? 2 : instrument.pip < 0.1 ? 5 : 1
  const currentPrice = prices[selectedIdx]
  const askPrice = currentPrice + instrument.spread * instrument.pip
  const bidPrice = currentPrice - instrument.spread * instrument.pip

  function openTrade(direction: 'BUY' | 'SELL') {
    const size = parseFloat(sizeInput)
    if (isNaN(size) || size <= 0) return

    const pos: Position = {
      id: nextId,
      symbol: instrument.symbol,
      direction,
      size,
      entryPrice: direction === 'BUY' ? askPrice : bidPrice,
      openedAt: new Date().toLocaleTimeString(),
    }
    setNextId((n) => n + 1)
    setPositions((prev) => [...prev, pos])
  }

  function closeTrade(pos: Position) {
    const closePrice = pos.direction === 'BUY'
      ? prices[INSTRUMENTS.findIndex((i) => i.symbol === pos.symbol)]
      : prices[INSTRUMENTS.findIndex((i) => i.symbol === pos.symbol)]
    const pnl = calcPnl(pos, closePrice)
    const trade: TradeHistory = {
      ...pos,
      closePrice,
      pnl,
      closedAt: new Date().toLocaleTimeString(),
    }
    setHistory((prev) => [trade, ...prev])
    setPositions((prev) => prev.filter((p) => p.id !== pos.id))
    setBalance((b) => parseFloat((b + pnl).toFixed(2)))
  }

  const floatingPnl = positions.reduce((sum, pos) => {
    const idx = INSTRUMENTS.findIndex((i) => i.symbol === pos.symbol)
    return sum + calcPnl(pos, prices[idx])
  }, 0)

  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-53px)] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-4xl mb-4">🎯</p>
          <h1 className="font-display font-bold text-chalk text-xl mb-2">Paper Trading Practice</h1>
          <p className="text-ghost font-body text-sm leading-relaxed mb-6">
            Sign in to access the paper trading simulator and practice without risking real money.
          </p>
          <Link href="/signup" className="inline-block bg-acuity-blue text-white font-display font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors">
            Start free →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-53px)]">

      {/* Left: instrument selector + chart placeholder */}
      <div className="flex-1 flex flex-col">
        {/* Instrument tabs */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-steel bg-slate px-4 py-2 gap-1">
          {INSTRUMENTS.map((inst, i) => {
            const price = prices[i]
            const prev  = INSTRUMENTS[i].price
            const up    = price >= prev
            return (
              <button
                key={inst.symbol}
                onClick={() => setSelectedIdx(i)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-left transition-colors
                  ${i === selectedIdx ? 'bg-acuity-blue/10 border border-acuity-blue' : 'hover:bg-steel/50 border border-transparent'}`}
              >
                <p className="font-mono font-medium text-[11px] text-chalk">{inst.symbol}</p>
                <p className={`font-mono text-[10px] ${up ? 'text-acuity-teal' : 'text-bear-red'}`}>
                  {price.toFixed(inst.symbol.includes('JPY') ? 2 : inst.pip < 0.1 ? 5 : 1)}
                </p>
              </button>
            )
          })}
        </div>

        {/* Live chart */}
        <div className="flex-1 bg-obsidian min-h-[300px] lg:min-h-0 relative">
          <PriceChart prices={histories[selectedIdx]} decimals={decimals} />

          {/* Symbol + price overlay */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <p className="font-display font-semibold text-chalk text-sm">{instrument.symbol}</p>
            <p className="font-mono text-xl text-chalk">{currentPrice.toFixed(decimals)}</p>
          </div>

          {/* Floating P&L badge */}
          {positions.length > 0 && (
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg font-mono text-sm font-medium
              ${floatingPnl >= 0 ? 'bg-acuity-teal/10 text-acuity-teal border border-acuity-teal/20' : 'bg-bear-red/10 text-bear-red border border-bear-red/20'}`}>
              Float: {formatPnl(floatingPnl)}
            </div>
          )}
        </div>
      </div>

      {/* Right: order panel + positions */}
      <aside className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-steel bg-slate flex flex-col overflow-y-auto">

        {/* Account summary */}
        <div className="px-4 py-4 border-b border-steel">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase">Balance</span>
            <span className="font-mono font-medium text-chalk">£{balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase">Equity</span>
            <span className={`font-mono font-medium text-sm ${(balance + floatingPnl) >= STARTING_BALANCE ? 'text-acuity-teal' : 'text-bear-red'}`}>
              £{(balance + floatingPnl).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Order entry */}
        <div className="px-4 py-4 border-b border-steel">
          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">New order — {instrument.symbol}</p>

          <div className="flex justify-between text-[11px] font-mono mb-3">
            <span className="text-bear-red">BID {bidPrice.toFixed(instrument.symbol.includes('JPY') ? 2 : 5)}</span>
            <span className="text-acuity-teal">ASK {askPrice.toFixed(instrument.symbol.includes('JPY') ? 2 : 5)}</span>
          </div>

          <div className="mb-3">
            <label className="block text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1">Size (lots)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="w-full bg-obsidian border border-steel rounded-lg px-3 py-2 text-chalk text-sm font-mono focus:outline-none focus:border-acuity-blue transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => openTrade('BUY')}
              className="py-2.5 bg-acuity-teal text-white font-display font-medium text-sm rounded-lg hover:bg-acuity-teal/90 transition-colors">
              BUY
            </button>
            <button onClick={() => openTrade('SELL')}
              className="py-2.5 bg-bear-red text-white font-display font-medium text-sm rounded-lg hover:bg-bear-red/90 transition-colors">
              SELL
            </button>
          </div>
        </div>

        {/* Open positions */}
        <div className="px-4 py-4 flex-1">
          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">
            Open positions ({positions.length})
          </p>
          {positions.length === 0 ? (
            <p className="text-ghost text-[12px] font-body">No open positions.</p>
          ) : (
            <div className="space-y-2">
              {positions.map((pos) => {
                const idx = INSTRUMENTS.findIndex((i) => i.symbol === pos.symbol)
                const pnl = calcPnl(pos, prices[idx])
                return (
                  <div key={pos.id} className="bg-obsidian border border-steel rounded-lg px-3 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-1.5 py-0.5 rounded
                          ${pos.direction === 'BUY' ? 'text-acuity-teal bg-acuity-teal/10' : 'text-bear-red bg-bear-red/10'}`}>
                          {pos.direction}
                        </span>
                        <span className="font-mono text-[11px] text-chalk">{pos.symbol}</span>
                      </div>
                      <span className={`font-mono text-[11px] font-medium ${pnl >= 0 ? 'text-acuity-teal' : 'text-bear-red'}`}>
                        {formatPnl(pnl)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-ghost text-[10px] font-mono">{pos.size} lots @ {pos.entryPrice.toFixed(5)}</span>
                      <button onClick={() => closeTrade(pos)}
                        className="text-[10px] font-display text-ghost hover:text-bear-red transition-colors">
                        Close ×
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Trade history */}
          {history.length > 0 && (
            <div className="mt-6">
              <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">History</p>
              <div className="space-y-1.5">
                {history.slice(0, 10).map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-1 border-b border-steel/40 last:border-0">
                    <div>
                      <span className={`text-[9px] font-display font-medium mr-1.5 ${t.direction === 'BUY' ? 'text-acuity-teal' : 'text-bear-red'}`}>
                        {t.direction}
                      </span>
                      <span className="font-mono text-[10px] text-chalk">{t.symbol}</span>
                    </div>
                    <span className={`font-mono text-[10px] ${t.pnl >= 0 ? 'text-acuity-teal' : 'text-bear-red'}`}>
                      {formatPnl(t.pnl)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-steel">
          <p className="text-[10px] text-muted font-body leading-relaxed">
            Paper trading only — no real funds involved. Prices are simulated.
          </p>
        </div>
      </aside>
    </div>
  )
}
