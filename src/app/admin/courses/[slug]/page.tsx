import { getLessonsForCourse } from '@/app/actions/admin'
import { LessonManager } from './LessonManager'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function AdminCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { course, lessons } = await getLessonsForCourse(slug)
  if (!course) notFound()

  return (
    <div className="p-8">
      <div className="flex items-center gap-1.5 text-sm font-body mb-4">
        <Link href="/admin/courses" className="text-ghost hover:text-chalk">Courses</Link>
        <span className="text-ghost/40">›</span>
        <span className="text-chalk">{course.title}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-chalk mb-0.5">{course.title}</h1>
          <p className="text-sm text-ghost font-body">
            {lessons.length} lessons · Level {course.level} · {course.track}
          </p>
        </div>
        <Link
          href={`/admin/courses/${slug}/new`}
          className="bg-acuity-blue text-white text-sm font-display font-medium px-4 py-2 rounded-lg hover:bg-acuity-blue/90 transition-colors"
        >
          + New lesson
        </Link>
      </div>

      <LessonManager courseSlug={slug} courseId={course.id} initialLessons={lessons} />
    </div>
  )
}
