import type { GradingResult, ReferenceLine } from '@/types/lesson'
import type { Candle } from './polygon'

export interface DrawnLine {
  x1: number
  y1: number
  x2: number
  y2: number
}

export function gradeLine(
  drawn: DrawnLine,
  reference: ReferenceLine,
  candles: Candle[],
  priceMin: number,
  priceMax: number
): GradingResult {
  const drawnAngle = Math.atan2(drawn.y2 - drawn.y1, drawn.x2 - drawn.x1) * (180 / Math.PI)
  const refAngle = Math.atan2(reference.y2 - reference.y1, reference.x2 - reference.x1) * (180 / Math.PI)
  const angleDiff = Math.abs(drawnAngle - refAngle)
  const accuracy = Math.max(0, 100 - angleDiff * 5)

  const touchPoints = countTouchPoints(drawn, candles, priceMin, priceMax)
  const touchPointsMax = 3
  const bodyCuts = checkBodyCuts(drawn, candles, priceMin, priceMax)

  let score = accuracy * 0.6 + (touchPoints / touchPointsMax) * 100 * 0.3
  if (bodyCuts) score -= 15
  score = Math.max(0, Math.min(100, Math.round(score)))

  return {
    score,
    accuracy: Math.round(accuracy),
    touch_points: touchPoints,
    touch_points_max: touchPointsMax,
    body_cuts: bodyCuts,
    feedback: buildFeedback(score, angleDiff, touchPoints, bodyCuts),
  }
}

function countTouchPoints(
  line: DrawnLine,
  candles: Candle[],
  priceMin: number,
  priceMax: number
): number {
  let count = 0
  const priceRange = priceMax - priceMin
  candles.forEach((c, i) => {
    const t = i / (candles.length - 1)
    const linePrice = priceMin + priceRange * (1 - (line.y1 + (line.y2 - line.y1) * t) / 100)
    if (Math.abs(c.l - linePrice) / priceRange < 0.005) count++
  })
  return Math.min(3, count)
}

function checkBodyCuts(
  line: DrawnLine,
  candles: Candle[],
  priceMin: number,
  priceMax: number
): boolean {
  const priceRange = priceMax - priceMin
  return candles.some((c, i) => {
    const t = i / (candles.length - 1)
    const linePrice = priceMin + priceRange * (1 - (line.y1 + (line.y2 - line.y1) * t) / 100)
    const bodyHigh = Math.max(c.o, c.c)
    const bodyLow = Math.min(c.o, c.c)
    return linePrice > bodyLow && linePrice < bodyHigh
  })
}

function buildFeedback(score: number, angleDiff: number, touchPoints: number, bodyCuts: boolean): string {
  if (score >= 90) return 'Excellent line. Perfect precision on touch points and angle.'
  if (bodyCuts) return 'Line cuts through candle bodies — redraw below the lows.'
  if (touchPoints < 2) return 'Fewer than 2 valid touch points. Extend the line to connect more lows.'
  if (angleDiff > 4) return `Good line. Slope is ${Math.round(angleDiff)}° steeper than reference — watch for overextension.`
  return 'Solid line. Minor angle deviation — review the key lows.'
}
