export type LessonType = 'video' | 'reading' | 'canvas_exercise'

export type ActivityType =
  | 'draw_trendline'
  | 'draw_horizontal'
  | 'multi_choice'
  | 'calculation'
  | 'free_text'

export interface Lesson {
  id: string
  course_id: string
  slug: string
  title: string
  order_index: number
  type: LessonType
  content: LessonContent | null
  xp_value: number
}

export interface LessonContent {
  // Teaching phase — shown before the interactive activity
  intro_text?: string      // paragraphs separated by \n\n
  key_points?: string[]    // 3–6 takeaway bullets
  activity_type?: ActivityType
  // video
  video_url?: string
  video_provider?: 'youtube' | 'vimeo' | 'direct'
  // canvas drawing fields
  ticker?: string
  timeframe?: string
  exercise_prompt?: string
  reference_line?: ReferenceLine
  // multiple-choice fields
  question?: string
  options?: string[]
  correct_index?: number
  explanation?: string
  // calculation fields
  problem?: string
  correct_answer?: string
  tolerance?: number
  unit?: string
  hint?: string
  solution_steps?: string[]
  // free-text reflection
  reflection_prompt?: string
  // common
  steps?: LessonStep[]
}

export interface ReferenceLine {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface LessonStep {
  id: string
  label: string
  completed: boolean
}

export interface GradingResult {
  score: number
  accuracy: number
  touch_points: number
  touch_points_max: number
  body_cuts: boolean
  feedback: string
}
