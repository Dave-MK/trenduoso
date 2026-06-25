'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { LESSON_ACTIVITIES } from '@/data/lessonActivities'
import type { LessonContent } from '@/types/lesson'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) throw new Error('Not authorised')
  return supabase
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const supabase = await requireAdmin()

  const [
    { count: totalUsers },
    { count: newUsers7d },
    { count: totalCompletions },
    { count: activeUsers7d },
    { data: topCourses },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()),
    supabase.from('user_progress').select('*', { count: 'exact', head: true }).eq('completed', true),
    supabase.from('user_progress').select('user_id', { count: 'exact', head: true })
      .eq('completed', true)
      .gte('completed_at', new Date(Date.now() - 7 * 86400000).toISOString()),
    supabase.rpc('admin_top_courses').limit(5),
    supabase.from('profiles').select('display_name, created_at, xp, plan')
      .order('created_at', { ascending: false }).limit(10),
  ])

  return {
    totalUsers: totalUsers ?? 0,
    newUsers7d: newUsers7d ?? 0,
    totalCompletions: totalCompletions ?? 0,
    activeUsers7d: activeUsers7d ?? 0,
    topCourses: topCourses ?? [],
    recentUsers: recentUsers ?? [],
  }
}

// ── Courses ───────────────────────────────────────────────────────────────────

export async function getAllCourses() {
  const supabase = await requireAdmin()
  const { data, error } = await supabase
    .from('courses')
    .select('id, slug, title, track, level, order_index, is_free, lesson_count, description')
    .order('level').order('order_index')
  if (error) throw error
  return data ?? []
}

export async function createCourse(formData: FormData) {
  const supabase = await requireAdmin()

  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-')
  const { data: existing } = await supabase.from('courses').select('id').eq('slug', slug).maybeSingle()
  if (existing) return { error: 'A course with this slug already exists' }

  const { data: maxOrder } = await supabase
    .from('courses').select('order_index').order('order_index', { ascending: false }).limit(1).maybeSingle()

  const { error } = await supabase.from('courses').insert({
    slug,
    title: formData.get('title') as string,
    track: formData.get('track') as string,
    level: parseInt(formData.get('level') as string) || 1,
    description: formData.get('description') as string,
    order_index: (maxOrder?.order_index ?? 0) + 1,
    is_free: formData.get('is_free') === 'true',
    lesson_count: 0,
  })
  if (error) return { error: error.message }

  revalidatePath('/admin/courses')
  return { success: true, slug }
}

export async function updateCourse(id: string, updates: {
  title?: string
  track?: string
  level?: number
  level_name?: string
  description?: string
  is_free?: boolean
  lesson_count?: number
}) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('courses').update(updates).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/courses')
  return { success: true }
}

export async function deleteCourse(id: string) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('courses').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/courses')
  return { success: true }
}

export async function reorderCourses(orderedIds: string[]) {
  const supabase = await requireAdmin()
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from('courses').update({ order_index: i + 1 }).eq('id', id)
    )
  )
  revalidatePath('/admin/courses')
  return { success: true }
}

// ── Lessons ───────────────────────────────────────────────────────────────────

export async function getLessonsForCourse(courseSlug: string) {
  const supabase = await requireAdmin()
  const { data: course } = await supabase.from('courses').select('id, title, slug, lesson_count, track, level, is_free, description').eq('slug', courseSlug).single()
  if (!course) return { course: null, lessons: [] }

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, slug, title, order_index, type, xp_value, content')
    .eq('course_id', course.id)
    .order('order_index')

  return { course, lessons: lessons ?? [] }
}

export async function createLesson(courseId: string, formData: FormData) {
  const supabase = await requireAdmin()

  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-')
  const { data: existing } = await supabase.from('lessons').select('id').eq('course_id', courseId).eq('slug', slug).maybeSingle()
  if (existing) return { error: 'A lesson with this slug already exists in this course' }

  const { data: maxOrder } = await supabase
    .from('lessons').select('order_index').eq('course_id', courseId)
    .order('order_index', { ascending: false }).limit(1).maybeSingle()

  const { error } = await supabase.from('lessons').insert({
    course_id: courseId,
    slug,
    title: formData.get('title') as string,
    type: formData.get('type') as string || 'reading',
    order_index: (maxOrder?.order_index ?? 0) + 1,
    xp_value: parseInt(formData.get('xp_value') as string) || 50,
    content: null,
  })
  if (error) return { error: error.message }

  // Update lesson_count on the course
  const { count: newCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true }).eq('course_id', courseId)
  await supabase.from('courses').update({ lesson_count: newCount ?? 0 }).eq('id', courseId)

  revalidatePath('/admin/courses')
  return { success: true }
}

export async function updateLesson(lessonId: string, updates: {
  title?: string
  type?: string
  xp_value?: number
  content?: LessonContent
}) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('lessons').update(updates).eq('id', lessonId)
  if (error) return { error: error.message }
  revalidatePath('/admin')
  return { success: true }
}

export async function deleteLesson(lessonId: string, courseId: string) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('lessons').delete().eq('id', lessonId)
  if (error) return { error: error.message }

  // Update lesson_count on the course
  const { count: newCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true }).eq('course_id', courseId)
  await supabase.from('courses').update({ lesson_count: newCount ?? 0 }).eq('id', courseId)

  revalidatePath('/admin')
  return { success: true }
}

export async function reorderLessons(courseId: string, orderedIds: string[]) {
  const supabase = await requireAdmin()
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from('lessons').update({ order_index: i + 1 }).eq('id', id)
    )
  )
  revalidatePath('/admin')
  return { success: true }
}

export async function createLessonForCourse(courseSlug: string, formData: FormData) {
  const supabase = await requireAdmin()
  const { data: course } = await supabase.from('courses').select('id').eq('slug', courseSlug).maybeSingle()
  if (!course) return { error: 'Course not found' }

  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-')
  const { data: existing } = await supabase.from('lessons').select('id').eq('course_id', course.id).eq('slug', slug).maybeSingle()
  if (existing) return { error: 'A lesson with this slug already exists in this course' }

  const { data: maxOrder } = await supabase
    .from('lessons').select('order_index').eq('course_id', course.id)
    .order('order_index', { ascending: false }).limit(1).maybeSingle()

  const { error } = await supabase.from('lessons').insert({
    course_id: course.id,
    slug,
    title: formData.get('title') as string,
    type: formData.get('type') as string || 'reading',
    order_index: (maxOrder?.order_index ?? 0) + 1,
    xp_value: parseInt(formData.get('xp_value') as string) || 50,
    content: null,
  })
  if (error) return { error: error.message }

  const { count } = await supabase.from('lessons').select('*', { count: 'exact', head: true }).eq('course_id', course.id)
  await supabase.from('courses').update({ lesson_count: count ?? 0 }).eq('id', course.id)

  revalidatePath(`/admin/courses/${courseSlug}`)
  revalidatePath('/admin/courses')
  return { success: true }
}

// ── Static content sync ────────────────────────────────────────────────────────

export async function syncStaticContentToDb(courseSlug?: string) {
  const supabase = await requireAdmin()

  const coursesQuery = supabase.from('courses').select('id, slug')
  if (courseSlug) coursesQuery.eq('slug', courseSlug)
  const { data: courses } = await coursesQuery

  let synced = 0
  let skipped = 0

  for (const course of courses ?? []) {
    const staticForCourse = LESSON_ACTIVITIES[course.slug]
    if (!staticForCourse) continue

    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, slug, content')
      .eq('course_id', course.id)

    for (const lesson of lessons ?? []) {
      if (lesson.content && Object.keys(lesson.content).length > 0) {
        skipped++
        continue
      }
      const staticContent = staticForCourse[lesson.slug]
      if (!staticContent) continue

      await supabase.from('lessons').update({ content: staticContent }).eq('id', lesson.id)
      synced++
    }
  }

  revalidatePath('/admin')
  return { synced, skipped }
}
