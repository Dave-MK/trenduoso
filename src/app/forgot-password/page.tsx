import Link from 'next/link'
import Image from 'next/image'
import { ForgotForm } from './ForgotForm'

export const metadata = { title: 'Reset password — tradecuity' }

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
          <Image src="/logo-colour.webp" width={44} height={44} alt="tradecuity" style={{ width: 44, height: 44 }} />
          <span className="font-display font-bold tracking-[-0.03em] text-2xl">
            <span className="text-chalk">trade</span><span className="text-acuity-blue">cuity</span>
          </span>
        </Link>

        <div className="bg-slate border border-steel rounded-2xl p-8">
          <h1 className="font-display font-bold text-chalk text-xl mb-1">Reset your password</h1>
          <p className="text-ghost text-sm font-body mb-6">
            Enter your email and we&apos;ll send you a reset link.
          </p>
          <ForgotForm />
        </div>
      </div>
    </div>
  )
}
