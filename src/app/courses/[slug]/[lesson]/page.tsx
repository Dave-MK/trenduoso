import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LessonClient } from './LessonClient'
import type { LessonContent, LessonStep } from '@/types/lesson'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>
}) {
  const { slug, lesson: lessonSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, lesson_count')
    .eq('slug', slug)
    .single()

  const { data: lesson } = course
    ? await supabase
        .from('lessons')
        .select('id, title, order_index, type, content, xp_value')
        .eq('course_id', course.id)
        .eq('slug', lessonSlug)
        .single()
    : { data: null }

  // Get all lesson slugs for next-lesson navigation
  const { data: allLessons } = course
    ? await supabase
        .from('lessons')
        .select('id, slug, title, order_index')
        .eq('course_id', course.id)
        .order('order_index')
    : { data: null }

  // User's completed lessons in this course
  const { data: progress } = allLessons?.length
    ? await supabase
        .from('user_progress')
        .select('lesson_id, completed')
        .eq('user_id', user.id)
        .in('lesson_id', allLessons.map((l) => l.id))
    : { data: null }

  const completedIds = new Set((progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id))

  const currentIndex = (allLessons ?? []).findIndex((l) => l.slug === lessonSlug)
  const nextLesson = currentIndex >= 0 ? (allLessons ?? [])[currentIndex + 1] : null

  // Build steps from lesson content, or default
  const content = lesson?.content as LessonContent | null
  const steps: LessonStep[] = content?.steps ?? [
    { id: '1', label: 'Watch intro video',   completed: false },
    { id: '2', label: 'Draw your trendline', completed: false },
    { id: '3', label: 'Review feedback',     completed: false },
  ]

  return (
    <LessonClient
      lessonId={lesson?.id ?? ''}
      courseSlug={slug}
      lessonSlug={lessonSlug}
      courseTitle={course?.title ?? 'Course'}
      lessonTitle={lesson?.title ?? 'Lesson'}
      lessonOrder={lesson?.order_index ?? 1}
      lessonCount={course?.lesson_count ?? 0}
      xpValue={lesson?.xp_value ?? 50}
      content={content}
      steps={steps}
      nextLessonSlug={nextLesson?.slug ?? null}
      alreadyCompleted={lesson ? completedIds.has(lesson.id) : false}
      totalCompleted={completedIds.size}
    />
  )
}
