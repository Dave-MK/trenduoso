import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { LessonEditor } from './LessonEditor'
import Link from 'next/link'
import { LESSON_ACTIVITIES } from '@/data/lessonActivities'
import type { LessonContent } from '@/types/lesson'

export default async function AdminLessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>
}) {
  const { slug, lesson: lessonSlug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data: course } = await supabase
    .from('courses')
    .select('id, slug, title')
    .eq('slug', slug)
    .single()
  if (!course) notFound()

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, slug, title, type, xp_value, order_index, content')
    .eq('course_id', course.id)
    .eq('slug', lessonSlug)
    .single()
  if (!lesson) notFound()

  const dbContent = lesson.content as LessonContent | null
  const staticContent = LESSON_ACTIVITIES[slug]?.[lessonSlug] ?? null
  const mergedContent: LessonContent | null =
    (dbContent && Object.keys(dbContent).length > 0) ? dbContent : staticContent

  return (
    <div className="p-8 max-w-3xl">
      <nav className="flex items-center gap-1.5 text-sm font-body mb-6">
        <Link href="/admin/courses" className="text-ghost hover:text-chalk">Courses</Link>
        <span className="text-ghost/40">›</span>
        <Link href={`/admin/courses/${slug}`} className="text-ghost hover:text-chalk">{course.title}</Link>
        <span className="text-ghost/40">›</span>
        <span className="text-chalk">{lesson.title}</span>
      </nav>

      <h1 className="font-display font-bold text-2xl text-chalk mb-1">{lesson.title}</h1>
      <p className="text-sm text-ghost font-body mb-8">
        Lesson {lesson.order_index} · {lesson.type} · {lesson.xp_value} XP
        <Link href={`/courses/${slug}/${lessonSlug}`} target="_blank"
          className="ml-3 text-acuity-blue hover:text-acuity-blue/80">
          View live ↗
        </Link>
      </p>

      <LessonEditor
        lesson={{
          id: lesson.id,
          slug: lesson.slug,
          title: lesson.title,
          type: lesson.type,
          xp_value: lesson.xp_value,
          order_index: lesson.order_index,
        }}
        courseSlug={slug}
        courseId={course.id}
        initialContent={mergedContent}
      />
    </div>
  )
}
