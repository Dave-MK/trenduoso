export type Plan = 'free' | 'pro' | 'annual'

export interface Profile {
  id: string
  username: string | null
  display_name: string | null
  xp: number
  streak: number
  last_active: string | null
  plan: Plan
  created_at: string
}

export interface Achievement {
  id: string
  user_id: string
  type: AchievementType
  awarded_at: string
}

export type AchievementType =
  | 'first_trendline'
  | 'streak_7'
  | 'streak_30'
  | 'course_complete'
  | 'score_90'
  | 'analyst'
