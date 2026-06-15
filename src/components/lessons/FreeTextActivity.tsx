'use client'
import { useState } from 'react'

interface Props {
  prompt: string
  onComplete: (score: number) => void
}

export function FreeTextActivity({ prompt, onComplete }: Props) {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!text.trim()) return
    setSubmitted(true)
    onComplete(100)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-obsidian">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <p className="text-[10px] font-display font-semibold tracking-widest text-acuity-teal uppercase mb-4">
          Reflection
        </p>
        <p className="font-body text-chalk text-[15px] leading-[1.75] mb-6">{prompt}</p>

        {submitted ? (
          <div className="bg-acuity-teal/10 border border-acuity-teal/30 rounded-xl p-5">
            <p className="text-acuity-teal font-display font-medium text-sm mb-3">Response saved ✓</p>
            <p className="text-ghost font-body text-[13px] leading-relaxed whitespace-pre-wrap">{text}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your thoughts here…"
              rows={7}
              className="w-full bg-steel/40 border border-steel rounded-xl px-4 py-3 text-chalk text-[14px] font-body leading-relaxed placeholder:text-ghost/40 focus:outline-none focus:border-acuity-blue/60 resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="bg-acuity-blue text-white font-display font-medium text-sm px-8 py-3 rounded-xl hover:bg-acuity-blue/90 transition-colors disabled:opacity-40"
            >
              Submit reflection →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
