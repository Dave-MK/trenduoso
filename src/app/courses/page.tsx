import { Navbar } from '@/components/nav/Navbar'
import { CourseFilter } from './CourseFilter'
import { createClient } from '@/lib/supabase/server'
import type { Track } from '@/types/course'

export default async function CoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: courses } = await supabase.from('courses').select('*').order('order_index')

  // Build completed-lesson count per course from user_progress
  let progressMap: Record<string, number> = {}
  if (user && (courses ?? []).length > 0) {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('completed, lessons(course_id)')
      .eq('user_id', user.id)
      .eq('completed', true)

    for (const p of (progress ?? [])) {
      const lesson = p.lessons as unknown as { course_id: string } | null
      if (lesson?.course_id) {
        progressMap[lesson.course_id] = (progressMap[lesson.course_id] ?? 0) + 1
      }
    }
  }

  const enriched = (courses ?? []).map((c) => ({
    id: c.id as string,
    slug: c.slug as string,
    title: c.title as string,
    track: c.track as Track,
    description: (c.description ?? '') as string,
    lesson_count: (c.lesson_count ?? 0) as number,
    hours: (c.hours ?? 0) as number,
    is_free: (c.is_free ?? false) as boolean,
    completed_lessons: progressMap[c.id] ?? 0,
    level: (c.level ?? 2) as number,
    level_name: (c.level_name ?? 'Live Trader') as string,
  }))

  const totalHours = enriched.reduce((s, c) => s + c.hours, 0)

  return (
    <>
      <Navbar />
      <main className="px-6 sm:px-8 md:px-16 py-12">
        <div className="mb-2">
          <h1 className="font-display font-bold text-4xl text-chalk mb-1">All courses</h1>
          <p className="text-ghost font-body text-sm">
            {totalHours > 0
              ? `${totalHours.toFixed(0)} hours of structured trading education`
              : 'Structured trading education'}
          </p>
        </div>
        <CourseFilter courses={enriched} />
      </main>
    </>
  )
}
