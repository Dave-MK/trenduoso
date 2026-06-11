export type LessonType = 'video' | 'reading' | 'canvas_exercise'

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
  ticker?: string
  timeframe?: string
  exercise_prompt?: string
  reference_line?: ReferenceLine
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
