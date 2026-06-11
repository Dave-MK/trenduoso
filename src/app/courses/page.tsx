import { Navbar } from '@/components/nav/Navbar'
import { CourseFilter } from './CourseFilter'

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 py-12">
        <div className="flex items-start justify-between flex-wrap gap-6 mb-2">
          <div>
            <h1 className="font-display font-bold text-4xl text-chalk mb-1">All courses</h1>
            <p className="text-ghost font-body text-sm">48 hours of structured trading education</p>
          </div>
        </div>
        <CourseFilter />
      </main>
    </>
  )
}
