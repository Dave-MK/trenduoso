'use client'
import { useState, useTransition } from 'react'
import { createCourse } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewCoursePage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await createCourse(formData)
      if (result.error) { setError(result.error); return }
      router.push('/admin/courses')
    })
  }

  return (
    <div className="p-8 max-w-xl">
      <Link href="/admin/courses" className="text-sm text-ghost hover:text-chalk mb-6 inline-block">← Back to courses</Link>
      <h1 className="font-display font-bold text-2xl text-chalk mb-6">New course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Title" name="title" required placeholder="e.g. Reading Candlestick Charts" />
        <Field label="Slug (URL key)" name="slug" required placeholder="e.g. reading-candlestick-charts" />
        <div>
          <label className="block text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1.5">Track</label>
          <select name="track" required className="input-field w-full">
            <option value="foundations">Foundations</option>
            <option value="technical">Technical</option>
            <option value="fundamental">Fundamental</option>
            <option value="risk">Risk</option>
            <option value="strategy">Strategy</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1.5">Level (1–10)</label>
          <input type="number" name="level" min="1" max="10" defaultValue="1" required className="input-field w-full" />
        </div>
        <Field label="Description" name="description" placeholder="Short course description…" />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_free" id="is_free" value="true" className="rounded" />
          <label htmlFor="is_free" className="text-sm text-ghost font-body">Free course (visible without Pro)</label>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isPending}
            className="bg-acuity-blue text-white text-sm font-display font-medium px-6 py-2.5 rounded-lg disabled:opacity-50">
            {isPending ? 'Creating…' : 'Create course'}
          </button>
          <Link href="/admin/courses" className="text-sm text-ghost hover:text-chalk px-4 py-2.5">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1.5">{label}</label>
      <input type="text" name={name} required={required} placeholder={placeholder}
        className="input-field w-full" />
    </div>
  )
}
