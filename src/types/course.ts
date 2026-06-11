export type Track = 'foundations' | 'technical' | 'fundamental' | 'risk' | 'strategy'

export interface Course {
  id: string
  slug: string
  title: string
  track: Track
  order_index: number
  is_free: boolean
  description?: string
  lesson_count?: number
  hours?: number
  progress?: number
}
