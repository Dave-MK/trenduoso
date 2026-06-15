'use client'
import { useState, useTransition } from 'react'
import { createLessonForCourse } from '@/app/actions/admin'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewLessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await createLessonForCourse(slug, formData)
      if (result.error) { setError(result.error); return }
      router.push(`/admin/courses/${slug}`)
    })
  }

  return (
    <div className="p-8 max-w-xl">
      <Link href={`/admin/courses/${slug}`} className="text-sm text-ghost hover:text-chalk mb-6 inline-block">
        ← Back to lessons
      </Link>
      <h1 className="font-display font-bold text-2xl text-chalk mb-6">New lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Title" name="title" required placeholder="e.g. Identifying Uptrend Lines" />
        <Field label="Slug (URL key)" name="slug" required placeholder="e.g. identifying-uptrend-lines" />

        <div>
          <label className="block text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1.5">
            Type
          </label>
          <select name="type" className="input-field w-full">
            <option value="reading">Reading</option>
            <option value="video">Video</option>
            <option value="canvas_exercise">Canvas exercise</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1.5">
            XP value
          </label>
          <input type="number" name="xp_value" defaultValue={50} min={10} max={500} step={10}
            className="input-field w-full" />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isPending}
            className="bg-acuity-blue text-white text-sm font-display font-medium px-6 py-2.5 rounded-lg disabled:opacity-50">
            {isPending ? 'Creating…' : 'Create lesson'}
          </button>
          <Link href={`/admin/courses/${slug}`} className="text-sm text-ghost hover:text-chalk px-4 py-2.5">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, required, placeholder }: {
  label: string; name: string; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input type="text" name={name} required={required} placeholder={placeholder}
        className="input-field w-full" />
    </div>
  )
}
