'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function ForgotForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="font-display font-bold text-chalk text-lg mb-2">Check your email</h2>
        <p className="text-ghost text-sm font-body leading-relaxed mb-6">
          If an account exists for <span className="text-chalk">{email}</span>, you&apos;ll receive a password reset link within a few minutes.
        </p>
        <Link href="/login" className="text-acuity-blue text-sm font-body hover:underline">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full bg-obsidian border border-steel rounded-lg px-4 py-2.5 text-chalk text-sm font-body placeholder:text-muted focus:outline-none focus:border-acuity-blue transition-colors"
        />
      </div>

      {error && <p className="text-bear-red text-sm font-body">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-acuity-blue text-white font-display font-medium text-sm py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending…' : 'Send reset link'}
      </button>

      <p className="text-center text-ghost text-[12px] font-body pt-1">
        <Link href="/login" className="text-acuity-blue hover:underline">Back to sign in</Link>
      </p>
    </form>
  )
}
