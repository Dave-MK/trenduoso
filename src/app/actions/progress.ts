'use server'
import { createClient } from '@/lib/supabase/server'
import { xpForScore } from '@/lib/xp'

export async function completeLesson(
  courseSlug: string,
  lessonSlug: string,
  score: number
): Promise<{ earned: number; newStreak: number } | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Resolve lesson ID from slugs
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, xp_value, courses!inner(slug)')
    .eq('slug', lessonSlug)
    .eq('courses.slug', courseSlug)
    .single()

  if (!lesson) return { error: 'Lesson not found' }

  const earned = xpForScore(score, lesson.xp_value)
  const now = new Date().toISOString()

  // Check for existing progress
  const { data: existing } = await supabase
    .from('user_progress')
    .select('id, score, attempts, completed')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .maybeSingle()

  const isFirstCompletion = !existing?.completed

  if (existing) {
    await supabase
      .from('user_progress')
      .update({
        score: Math.max(score, existing.score ?? 0),
        completed: true,
        completed_at: now,
        attempts: (existing.attempts ?? 0) + 1,
      })
      .eq('id', existing.id)
  } else {
    await supabase
      .from('user_progress')
      .insert({
        user_id: user.id,
        lesson_id: lesson.id,
        completed: true,
        score,
        completed_at: now,
        attempts: 1,
      })
  }

  // Only award XP on first completion
  if (!isFirstCompletion) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('streak')
      .eq('id', user.id)
      .single()
    return { earned: 0, newStreak: profile?.streak ?? 0 }
  }

  // Update profile: XP + streak
  const today = new Date().toISOString().split('T')[0]
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, streak, last_active')
    .eq('id', user.id)
    .single()

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  const lastActive = profile?.last_active ?? null
  let newStreak: number
  if (!lastActive) {
    newStreak = 1
  } else if (lastActive === today) {
    newStreak = profile?.streak ?? 1
  } else if (lastActive === yesterdayStr) {
    newStreak = (profile?.streak ?? 0) + 1
  } else {
    newStreak = 1
  }

  await supabase
    .from('profiles')
    .update({
      xp: (profile?.xp ?? 0) + earned,
      streak: newStreak,
      last_active: today,
    })
    .eq('id', user.id)

  return { earned, newStreak }
}
