import { getAllCourses } from '@/app/actions/admin'
import { CourseManager } from './CourseManager'
import Link from 'next/link'

export default async function AdminCoursesPage() {
  const courses = await getAllCourses()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-chalk mb-0.5">Courses</h1>
          <p className="text-sm text-ghost font-body">{courses.length} courses · drag rows to reorder</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="bg-acuity-blue text-white text-sm font-display font-medium px-4 py-2 rounded-lg hover:bg-acuity-blue/90 transition-colors"
        >
          + New course
        </Link>
      </div>

      <CourseManager initialCourses={courses} />
    </div>
  )
}
