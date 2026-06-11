'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useCanvasStore } from '@/store/canvas'
import type { Candle } from '@/lib/polygon'

interface ChartCanvasProps {
  candles: Candle[]
  onGrade?: () => void
}

const PAD = { top: 20, right: 20, bottom: 30, left: 60 }

export function ChartCanvas({ candles, onGrade }: ChartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeTool, lines, currentLine, isDrawing, startLine, updateLine, finishLine } = useCanvasStore()

  const priceRange = candles.length
    ? { min: Math.min(...candles.map((c) => c.l)), max: Math.max(...candles.map((c) => c.h)) }
    : { min: 1.07, max: 1.095 }

  const toCanvas = useCallback(
    (candleIndex: number, price: number, width: number, height: number) => {
      const w = width - PAD.left - PAD.right
      const h = height - PAD.top - PAD.bottom
      const x = PAD.left + (candleIndex / Math.max(candles.length - 1, 1)) * w
      const y = PAD.top + ((priceRange.max - price) / (priceRange.max - priceRange.min)) * h
      return { x, y }
    },
    [candles.length, priceRange]
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)

    // Grid
    ctx.strokeStyle = '#1E2530'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (i / 4) * (height - PAD.top - PAD.bottom)
      ctx.beginPath()
      ctx.moveTo(PAD.left, y)
      ctx.lineTo(width - PAD.right, y)
      ctx.stroke()
      const price = priceRange.max - (i / 4) * (priceRange.max - priceRange.min)
      ctx.fillStyle = '#4A5568'
      ctx.font = '10px JetBrains Mono, monospace'
      ctx.fillText(price.toFixed(4), 2, y + 4)
    }

    // Candles
    if (candles.length > 0) {
      const cw = Math.max(2, ((width - PAD.left - PAD.right) / candles.length) * 0.6)
      candles.forEach((c, i) => {
        const { x, y: yH } = toCanvas(i, c.h, width, height)
        const { y: yL } = toCanvas(i, c.l, width, height)
        const { y: yO } = toCanvas(i, c.o, width, height)
        const { y: yC } = toCanvas(i, c.c, width, height)
        const bull = c.c >= c.o
        const color = bull ? '#00C4A0' : '#FF6B6B'

        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, yH)
        ctx.lineTo(x, yL)
        ctx.stroke()

        ctx.fillStyle = color
        const bodyTop = Math.min(yO, yC)
        const bodyH = Math.max(1, Math.abs(yO - yC))
        ctx.fillRect(x - cw / 2, bodyTop, cw, bodyH)
      })
    }

    // Drawn lines
    const allLines = [...lines, ...(currentLine ? [currentLine] : [])]
    allLines.forEach((line) => {
      ctx.strokeStyle = '#2B7FFF'
      ctx.lineWidth = 1.5
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(line.x1, line.y1)
      ctx.lineTo(line.x2, line.y2)
      ctx.stroke()
    })
  }, [candles, lines, currentLine, toCanvas, priceRange])

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

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-crosshair bg-obsidian"
      onMouseDown={(e) => {
        const { x, y } = getPos(e)
        startLine(x, y)
      }}
      onMouseMove={(e) => {
        if (!isDrawing) return
        const { x, y } = getPos(e)
        updateLine(x, y)
        draw()
      }}
      onMouseUp={() => {
        finishLine()
        draw()
      }}
      onMouseLeave={() => {
        if (isDrawing) {
          finishLine()
          draw()
        }
      }}
    />
  )
}
