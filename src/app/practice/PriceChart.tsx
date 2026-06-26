'use client'
import { useEffect, useRef, useCallback } from 'react'

interface PriceChartProps {
  prices: number[]
  decimals: number
}

const PAD = { top: 16, right: 60, bottom: 20, left: 12 }
const BUCKET = 3 // ticks per candle

type Candle = { o: number; h: number; l: number; c: number }

function buildCandles(prices: number[]): Candle[] {
  const candles: Candle[] = []
  for (let i = 0; i < prices.length; i += BUCKET) {
    const slice = prices.slice(i, i + BUCKET)
    if (slice.length === 0) continue
    candles.push({
      o: slice[0],
      c: slice[slice.length - 1],
      h: Math.max(...slice),
      l: Math.min(...slice),
    })
  }
  return candles
}

export function PriceChart({ prices, decimals }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)

    const candles = buildCandles(prices)
    if (candles.length === 0) return

    const highs = candles.map((c) => c.h)
    const lows = candles.map((c) => c.l)
    let max = Math.max(...highs)
    let min = Math.min(...lows)
    const span = max - min || max * 0.001 || 1
    max += span * 0.08
    min -= span * 0.08
    const range = max - min

    const toY = (price: number) =>
      PAD.top + ((max - price) / range) * (height - PAD.top - PAD.bottom)
    const plotW = width - PAD.left - PAD.right
    const toX = (i: number) =>
      PAD.left + (i / Math.max(candles.length - 1, 1)) * plotW

    // Grid + price labels
    ctx.font = '10px JetBrains Mono, monospace'
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (i / 4) * (height - PAD.top - PAD.bottom)
      ctx.strokeStyle = '#1E2530'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(PAD.left, y)
      ctx.lineTo(width - PAD.right, y)
      ctx.stroke()
      const price = max - (i / 4) * range
      ctx.fillStyle = '#4A5568'
      ctx.fillText(price.toFixed(decimals), width - PAD.right + 6, y + 3)
    }

    // Candles
    const cw = Math.max(2, (plotW / candles.length) * 0.6)
    candles.forEach((c, i) => {
      const x = toX(i)
      const bull = c.c >= c.o
      const color = bull ? '#00C4A0' : '#FF6B6B'

      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, toY(c.h))
      ctx.lineTo(x, toY(c.l))
      ctx.stroke()

      ctx.fillStyle = color
      const bodyTop = Math.min(toY(c.o), toY(c.c))
      const bodyH = Math.max(1, Math.abs(toY(c.o) - toY(c.c)))
      ctx.fillRect(x - cw / 2, bodyTop, cw, bodyH)
    })

    // Last-price marker line + label
    const last = candles[candles.length - 1].c
    const lastUp = last >= candles[candles.length - 1].o
    const lastColor = lastUp ? '#00C4A0' : '#FF6B6B'
    const ly = toY(last)
    ctx.strokeStyle = lastColor
    ctx.lineWidth = 0.75
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    ctx.moveTo(PAD.left, ly)
    ctx.lineTo(width - PAD.right, ly)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = lastColor
    ctx.fillRect(width - PAD.right, ly - 8, PAD.right, 16)
    ctx.fillStyle = '#0B0E14'
    ctx.font = '10px JetBrains Mono, monospace'
    ctx.fillText(last.toFixed(decimals), width - PAD.right + 6, ly + 3)
  }, [prices, decimals])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    draw()
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      draw()
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [draw])

  return <canvas ref={canvasRef} className="w-full h-full block bg-obsidian" />
}
