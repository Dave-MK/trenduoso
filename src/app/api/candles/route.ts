import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const ticker = searchParams.get('ticker') ?? 'EURUSD'
  const timespan = searchParams.get('timespan') ?? 'day'
  const from = searchParams.get('from') ?? '2024-01-01'
  const to = searchParams.get('to') ?? '2024-03-01'

  const apiKey = process.env.POLYGON_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key configured' }, { status: 500 })
  }

  try {
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch candles' }, { status: 500 })
  }
}
