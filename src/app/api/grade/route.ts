import { NextRequest, NextResponse } from 'next/server'
import { gradeLine } from '@/lib/grading'
import type { DrawnLine } from '@/lib/grading'
import type { ReferenceLine } from '@/types/lesson'
import type { Candle } from '@/lib/polygon'

interface GradeRequest {
  drawn: DrawnLine
  reference: ReferenceLine
  candles: Candle[]
  priceMin: number
  priceMax: number
}

export async function POST(req: NextRequest) {
  try {
    const body: GradeRequest = await req.json()
    const { drawn, reference, candles, priceMin, priceMax } = body

    if (!drawn || !reference || !candles) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = gradeLine(drawn, reference, candles, priceMin, priceMax)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Grading failed' }, { status: 500 })
  }
}
