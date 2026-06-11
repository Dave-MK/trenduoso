export function xpForLevel(level: number): number {
  return level * 300
}

export function levelFromXp(xp: number): { level: number; progress: number; nextLevelXp: number } {
  let level = 1
  let accumulated = 0
  while (accumulated + xpForLevel(level) <= xp) {
    accumulated += xpForLevel(level)
    level++
  }
  const nextLevelXp = xpForLevel(level)
  const progress = Math.round(((xp - accumulated) / nextLevelXp) * 100)
  return { level, progress, nextLevelXp }
}

export function xpForScore(score: number, baseXp: number = 50): number {
  if (score >= 90) return Math.round(baseXp * 1.5)
  if (score >= 70) return baseXp
  if (score >= 50) return Math.round(baseXp * 0.75)
  return Math.round(baseXp * 0.5)
}
