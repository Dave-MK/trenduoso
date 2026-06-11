import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
          <Image src="/logo-colour.webp" width={28} height={28} alt="tradecuity" style={{ width: 28, height: 28 }} />
          <span className="font-display font-bold tracking-[-0.03em] text-2xl">
            <span className="text-chalk">trade</span><span className="text-acuity-blue">cuity</span>
          </span>
        </Link>

        <div className="bg-slate border border-steel rounded-2xl p-8">
          <h1 className="font-display font-bold text-chalk text-xl mb-1">Welcome back</h1>
          <p className="text-ghost text-sm font-body mb-6">Sign in to continue learning</p>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-ghost text-sm font-body mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-acuity-blue hover:underline">Start for free</Link>
        </p>
      </div>
    </div>
  )
}
