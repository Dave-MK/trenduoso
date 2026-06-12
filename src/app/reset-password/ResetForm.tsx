'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function ResetForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">
          New password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          placeholder="Min. 8 characters"
          className="w-full bg-obsidian border border-steel rounded-lg px-4 py-2.5 text-chalk text-sm font-body placeholder:text-muted focus:outline-none focus:border-acuity-blue transition-colors"
        />
      </div>

      <div>
        <label className="block text-[11px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">
          Confirm password
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          placeholder="Re-enter password"
          className="w-full bg-obsidian border border-steel rounded-lg px-4 py-2.5 text-chalk text-sm font-body placeholder:text-muted focus:outline-none focus:border-acuity-blue transition-colors"
        />
      </div>

      {error && <p className="text-bear-red text-sm font-body">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-acuity-blue text-white font-display font-medium text-sm py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving…' : 'Set new password'}
      </button>
    </form>
  )
}
