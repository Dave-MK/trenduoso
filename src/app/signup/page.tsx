'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: { display_name: displayName },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // If email confirmation is disabled in Supabase, session is returned immediately
    if (data.session) {
      router.push('/dashboard')
      router.refresh()
      return
    }

    setConfirmed(true)
    setLoading(false)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="font-display font-bold text-chalk text-xl mb-2">Check your email</h2>
          <p className="text-ghost font-body text-sm leading-relaxed">
            We sent a confirmation link to <span className="text-chalk">{email}</span>. Click it to activate your account.
          </p>
          <Link href="/login" className="inline-block mt-6 text-acuity-blue text-sm font-body hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
          <Image src="/logo-colour.webp" width={44} height={44} alt="tradecuity" style={{ width: 44, height: 44 }} />
          <span className="font-display font-bold tracking-[-0.03em] text-2xl">
            <span className="text-chalk">trade</span><span className="text-acuity-blue">cuity</span>
          </span>
        </Link>

        <div className="bg-slate border border-steel rounded-2xl p-8">
          <h1 className="font-display font-bold text-chalk text-xl mb-1">Start learning</h1>
          <p className="text-ghost text-sm font-body mb-6">Free account — no card required</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                placeholder="Alex Johnson"
                className="w-full bg-obsidian border border-steel rounded-lg px-4 py-2.5 text-chalk text-sm font-body placeholder:text-muted focus:outline-none focus:border-acuity-blue transition-colors"
              />
            </div>

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
              <label className="block text-[11px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">
                Password
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

            {error && (
              <p className="text-bear-red text-sm font-body">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-acuity-blue text-white font-display font-medium text-sm py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account…' : 'Create free account'}
            </button>
          </form>

          <p className="text-ghost text-[11px] font-body text-center mt-4 leading-relaxed">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-acuity-blue hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-acuity-blue hover:underline">Privacy Policy</Link>
          </p>
        </div>

        <p className="text-center text-ghost text-sm font-body mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-acuity-blue hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
