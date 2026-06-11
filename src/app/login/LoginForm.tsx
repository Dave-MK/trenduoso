'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <>
      {searchParams.get('error') && (
        <div className="bg-bear-red/10 border border-bear-red/20 rounded-lg px-4 py-3 mb-4">
          <p className="text-bear-red text-sm font-body">Authentication failed. Please try again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">
            Email
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

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="block text-[11px] font-display font-medium tracking-widest text-ghost uppercase">
              Password
            </label>
            <Link href="/forgot-password" className="text-[11px] text-acuity-blue hover:underline font-body">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full bg-obsidian border border-steel rounded-lg px-4 py-2.5 text-chalk text-sm font-body placeholder:text-muted focus:outline-none focus:border-acuity-blue transition-colors"
          />
        </div>

        {error && <p className="text-bear-red text-sm font-body">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-acuity-blue text-white font-display font-medium text-sm py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </>
  )
}
