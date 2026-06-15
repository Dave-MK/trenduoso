'use client'
import { useState, useTransition } from 'react'
import { Reorder } from 'framer-motion'
import Link from 'next/link'
import { reorderLessons, deleteLesson } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'

type Lesson = {
  id: string
  slug: string
  title: string
  order_index: number
  type: string
  xp_value: number
}

interface Props {
  courseSlug: string
  courseId: string
  initialLessons: Lesson[]
}

export function LessonManager({ courseSlug, courseId, initialLessons }: Props) {
  const [lessons, setLessons] = useState(initialLessons)
  const [dirty, setDirty] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleReorder = (newOrder: Lesson[]) => {
    setLessons(newOrder)
    setDirty(true)
  }

  const saveOrder = () => {
    startTransition(async () => {
      await reorderLessons(courseId, lessons.map((l) => l.id))
      setDirty(false)
      setMessage('Order saved')
      setTimeout(() => setMessage(''), 2000)
      router.refresh()
    })
  }

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete lesson "${title}"? This cannot be undone.`)) return
    startTransition(async () => {
      const result = await deleteLesson(id, courseId)
      if (result.error) { setMessage(`Error: ${result.error}`); return }
      setLessons((prev) => prev.filter((l) => l.id !== id))
      setMessage('Lesson deleted')
      setTimeout(() => setMessage(''), 2000)
    })
  }

  if (lessons.length === 0) {
    return (
      <div className="bg-slate border border-steel rounded-xl p-8 text-center">
        <p className="text-ghost text-sm font-body mb-4">No lessons yet.</p>
        <Link
          href={`/admin/courses/${courseSlug}/new`}
          className="text-acuity-blue hover:text-acuity-blue/80 text-sm font-display font-medium"
        >
          + Create the first lesson
        </Link>
      </div>
    )
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
        {message && <span className="text-xs text-acuity-teal font-body">{message}</span>}
      </div>

      <div className="bg-slate border border-steel rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2rem_0.5fr_1fr_5rem_4rem_5rem] gap-2 px-4 py-2.5 border-b border-steel text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">
          <span></span>
          <span>#</span>
          <span>Title</span>
          <span>Type</span>
          <span>XP</span>
          <span></span>
        </div>

        <Reorder.Group axis="y" values={lessons} onReorder={handleReorder} className="divide-y divide-steel/40">
          {lessons.map((lesson, index) => (
            <Reorder.Item
              key={lesson.id}
              value={lesson}
              className="grid grid-cols-[2rem_0.5fr_1fr_5rem_4rem_5rem] gap-2 px-4 py-3 items-center hover:bg-steel/20 cursor-default"
            >
              <span className="text-ghost text-lg cursor-grab active:cursor-grabbing select-none">⠿</span>
              <span className="font-mono text-xs text-ghost">{index + 1}</span>
              <div>
                <p className="text-chalk text-sm font-body font-medium">{lesson.title}</p>
                <p className="text-ghost text-[11px] font-mono">{lesson.slug}</p>
              </div>
              <span>
                <TypeBadge type={lesson.type} />
              </span>
              <span className="font-mono text-xs text-ghost">{lesson.xp_value}</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/courses/${courseSlug}/${lesson.slug}`}
                  className="text-xs text-acuity-blue hover:text-acuity-blue/80 font-display font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(lesson.id, lesson.title)}
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

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    reading: 'bg-ghost/10 text-ghost',
    video: 'bg-acuity-blue/15 text-acuity-blue',
    canvas_exercise: 'bg-acuity-teal/15 text-acuity-teal',
  }
  const labels: Record<string, string> = {
    reading: 'Reading',
    video: 'Video',
    canvas_exercise: 'Canvas',
  }
  return (
    <span className={`text-[10px] font-display font-semibold uppercase px-1.5 py-0.5 rounded ${styles[type] ?? 'bg-steel text-ghost'}`}>
      {labels[type] ?? type}
    </span>
  )
}
