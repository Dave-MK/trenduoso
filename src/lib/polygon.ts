export interface Candle {
  t: number  // timestamp ms
  o: number  // open
  h: number  // high
  l: number  // low
  c: number  // close
  v: number  // volume
}

export async function fetchCandles(
  ticker: string,
  timespan: string = 'day',
  from: string,
  to: string
): Promise<Candle[]> {
  const res = await fetch(
    `/api/candles?ticker=${ticker}&timespan=${timespan}&from=${from}&to=${to}`
  )
  if (!res.ok) throw new Error('Failed to fetch candles')
  const data = await res.json()
  return data.results ?? []
}
