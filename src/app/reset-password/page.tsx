import Link from 'next/link'
import Image from 'next/image'
import { ResetForm } from './ResetForm'

export const metadata = { title: 'Set new password — tradecuity' }

export default function ResetPasswordPage() {
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
          <h1 className="font-display font-bold text-chalk text-xl mb-1">Set a new password</h1>
          <p className="text-ghost text-sm font-body mb-6">Choose something strong — 8 characters minimum.</p>
          <ResetForm />
        </div>
      </div>
    </div>
  )
}
