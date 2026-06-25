'use client'
import { useState, useTransition } from 'react'
import { Reorder } from 'framer-motion'
import Link from 'next/link'
import { reorderCourses, deleteCourse, syncStaticContentToDb } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'

type Course = {
  id: string
  slug: string
  title: string
  track: string
  level: number
  order_index: number
  is_free: boolean
  lesson_count: number
  description: string | null
}

export function CourseManager({ initialCourses }: { initialCourses: Course[] }) {
  const [courses, setCourses] = useState(initialCourses)
  const [dirty, setDirty] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleReorder = (newOrder: Course[]) => {
    setCourses(newOrder)
    setDirty(true)
  }

  const saveOrder = () => {
    startTransition(async () => {
      await reorderCourses(courses.map((c) => c.id))
      setDirty(false)
      setMessage('Order saved')
      setTimeout(() => setMessage(''), 2000)
      router.refresh()
    })
  }

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}" and all its lessons? This cannot be undone.`)) return
    startTransition(async () => {
      const result = await deleteCourse(id)
      if (result.error) { setMessage(`Error: ${result.error}`); return }
      setCourses((prev) => prev.filter((c) => c.id !== id))
      setMessage('Course deleted')
      setTimeout(() => setMessage(''), 2000)
    })
  }

  const handleSync = () => {
    startTransition(async () => {
      setMessage('Syncing static content to DB…')
      const result = await syncStaticContentToDb()
      setMessage(`Synced ${result.synced} lessons (${result.skipped} already had DB content)`)
      setTimeout(() => setMessage(''), 5000)
    })
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        {dirty && (
          <button
            onClick={saveOrder}
            disabled={isPending}
            className="text-sm bg-acuity-teal text-black font-display font-semibold px-4 py-1.5 rounded-lg disabled:opacity-50"
          >
            Save order
          </button>
        )}
        <button
          onClick={handleSync}
          disabled={isPending}
          title="Push all static lesson content from lessonActivities.ts into the database for any lesson with no DB content yet"
          className="text-xs text-ghost hover:text-chalk border border-steel px-3 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
        >
          ⟳ Sync static → DB
        </button>
        {message && <span className="text-xs text-acuity-teal font-body">{message}</span>}
      </div>

      <div className="bg-slate border border-steel rounded-xl overflow-hidden overflow-x-auto">
        <div className="grid grid-cols-[2rem_1fr_6rem_5rem_5rem_4rem_5rem] gap-2 px-4 py-2.5 border-b border-steel text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">
          <span></span>
          <span>Title</span>
          <span>Track</span>
          <span>Level</span>
          <span>Lessons</span>
          <span>Free</span>
          <span></span>
        </div>

        <Reorder.Group axis="y" values={courses} onReorder={handleReorder} className="divide-y divide-steel/40">
          {courses.map((course) => (
            <Reorder.Item
              key={course.id}
              value={course}
              className="grid grid-cols-[2rem_1fr_6rem_5rem_5rem_4rem_5rem] gap-2 px-4 py-3 items-center hover:bg-steel/20 cursor-default"
            >
              <span className="text-ghost text-lg cursor-grab active:cursor-grabbing select-none">⠿</span>
              <div>
                <p className="text-chalk text-sm font-body font-medium">{course.title}</p>
                <p className="text-ghost text-[11px] font-mono">{course.slug}</p>
              </div>
              <span className="text-ghost text-xs font-body">{course.track}</span>
              <span className="text-ghost text-xs font-body">L{course.level}</span>
              <span className="font-mono text-xs text-ghost">{course.lesson_count}</span>
              <span className="text-xs">{course.is_free ? <span className="text-acuity-teal">✓ Free</span> : <span className="text-ghost">—</span>}</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/courses/${course.slug}`}
                  className="text-xs text-acuity-blue hover:text-acuity-blue/80 font-display font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(course.id, course.title)}
                  disabled={isPending}
                  className="text-xs text-ghost hover:text-red-400 transition-colors disabled:opacity-30"
                >
                  Del
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  )
}
