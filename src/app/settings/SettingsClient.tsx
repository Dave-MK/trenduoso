'use client'
import { useState, useTransition, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { updateDisplayName, deleteAccount, uploadAvatar } from '@/app/actions/settings'

interface Props {
  displayName: string
  email: string
  plan: string
  hasStripeCustomer: boolean
  avatarUrl?: string | null
}

export function SettingsClient({ displayName, email, plan, hasStripeCustomer, avatarUrl }: Props) {
  const [nameValue, setNameValue] = useState(displayName)
  const [nameFeedback, setNameFeedback] = useState<{ ok?: boolean; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl ?? null)
  const [avatarFeedback, setAvatarFeedback] = useState<{ ok?: boolean; msg: string } | null>(null)
  const [avatarPending, startAvatarTransition] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteText, setDeleteText] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deletePending, startDeleteTransition] = useTransition()

  function handleNameSave(e: React.FormEvent) {
    e.preventDefault()
    setNameFeedback(null)
    startTransition(async () => {
      const fd = new FormData()
      fd.set('name', nameValue)
      const result = await updateDisplayName(fd)
      if (result && 'error' in result && result.error) {
        setNameFeedback({ ok: false, msg: result.error })
      } else {
        setNameFeedback({ ok: true, msg: 'Name updated.' })
      }
    })
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
    setAvatarFeedback(null)
    startAvatarTransition(async () => {
      const fd = new FormData()
      fd.set('avatar', file)
      const result = await uploadAvatar(fd)
      if (result && 'error' in result) {
        setAvatarFeedback({ ok: false, msg: result.error })
      } else {
        setAvatarFeedback({ ok: true, msg: 'Avatar updated.' })
      }
    })
  }

  function handleDelete() {
    if (deleteText !== 'DELETE') return
    setDeleteError('')
    startDeleteTransition(async () => {
      const result = await deleteAccount()
      if (result && 'error' in result) setDeleteError(result.error)
    })
  }

  return (
    <div className="space-y-8 max-w-xl">

      {/* Avatar */}
      <section className="bg-slate border border-steel rounded-xl p-6">
        <h2 className="font-display font-semibold text-chalk text-base mb-4">Profile photo</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            className="w-16 h-16 rounded-full bg-acuity-blue/20 border-2 border-steel flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:border-acuity-blue transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            {avatarPreview ? (
              <Image src={avatarPreview} alt="Avatar" width={64} height={64} className="w-full h-full object-cover" unoptimized />
            ) : (
              <span className="font-display font-bold text-acuity-blue text-xl">
                {displayName[0]?.toUpperCase() ?? '?'}
              </span>
            )}
          </div>
          <div>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={avatarPending}
              className="border border-steel text-chalk font-display font-medium text-sm px-4 py-2 rounded-lg hover:border-acuity-blue transition-colors disabled:opacity-40"
            >
              {avatarPending ? 'Uploading…' : 'Change photo'}
            </button>
            <p className="text-ghost text-[11px] font-body mt-1.5">JPEG, PNG or WebP · max 2MB</p>
            {avatarFeedback && (
              <p className={`text-[11px] font-body mt-1 ${avatarFeedback.ok ? 'text-acuity-teal' : 'text-bear-red'}`}>
                {avatarFeedback.msg}
              </p>
            )}
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </section>

      {/* Display name */}
      <section className="bg-slate border border-steel rounded-xl p-6">
        <h2 className="font-display font-semibold text-chalk text-base mb-4">Display name</h2>
        <form onSubmit={handleNameSave} className="space-y-3">
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            minLength={2}
            required
            className="w-full bg-obsidian border border-steel rounded-lg px-4 py-2.5 text-chalk text-sm font-body focus:outline-none focus:border-acuity-blue transition-colors"
          />
          {nameFeedback && (
            <p className={`text-[12px] font-body ${nameFeedback.ok ? 'text-acuity-teal' : 'text-bear-red'}`}>
              {nameFeedback.msg}
            </p>
          )}
          <button
            type="submit"
            disabled={isPending || nameValue === displayName}
            className="bg-acuity-blue text-white font-display font-medium text-sm px-4 py-2 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? 'Saving…' : 'Save name'}
          </button>
        </form>
      </section>

      {/* Account info (read-only) */}
      <section className="bg-slate border border-steel rounded-xl p-6">
        <h2 className="font-display font-semibold text-chalk text-base mb-4">Account</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-steel/50">
            <span className="text-ghost text-[12px] font-display font-medium tracking-widest uppercase">Email</span>
            <span className="text-chalk text-sm font-body">{email}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-ghost text-[12px] font-display font-medium tracking-widest uppercase">Plan</span>
            <span className={`text-sm font-display font-medium capitalize ${plan === 'pro' ? 'text-acuity-teal' : 'text-chalk'}`}>
              {plan}
            </span>
          </div>
        </div>
      </section>

      {/* Password */}
      <section className="bg-slate border border-steel rounded-xl p-6">
        <h2 className="font-display font-semibold text-chalk text-base mb-2">Password</h2>
        <p className="text-ghost text-[13px] font-body mb-4">We&apos;ll email you a secure reset link.</p>
        <Link
          href="/forgot-password"
          className="inline-block border border-steel text-chalk font-display font-medium text-sm px-4 py-2 rounded-lg hover:border-acuity-blue transition-colors"
        >
          Send reset email
        </Link>
      </section>

      {/* Subscription */}
      <section className="bg-slate border border-steel rounded-xl p-6">
        <h2 className="font-display font-semibold text-chalk text-base mb-2">Subscription</h2>
        {plan === 'free' ? (
          <div>
            <p className="text-ghost text-[13px] font-body mb-4">You&apos;re on the free plan. Upgrade to unlock all courses.</p>
            <Link
              href="/pricing"
              className="inline-block bg-acuity-blue text-white font-display font-medium text-sm px-4 py-2 rounded-lg hover:bg-acuity-blue/90 transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        ) : hasStripeCustomer ? (
          <div>
            <p className="text-ghost text-[13px] font-body mb-4">Manage billing, view invoices, or cancel your subscription.</p>
            <a
              href="/api/portal"
              className="inline-block border border-steel text-chalk font-display font-medium text-sm px-4 py-2 rounded-lg hover:border-acuity-blue transition-colors"
            >
              Manage billing →
            </a>
          </div>
        ) : (
          <p className="text-ghost text-[13px] font-body">Pro plan active. Contact support to manage your subscription.</p>
        )}
      </section>

      {/* Danger zone */}
      <section className="bg-slate border border-bear-red/30 rounded-xl p-6">
        <h2 className="font-display font-semibold text-bear-red text-base mb-2">Danger zone</h2>
        <p className="text-ghost text-[13px] font-body mb-4">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="border border-bear-red/50 text-bear-red font-display font-medium text-sm px-4 py-2 rounded-lg hover:bg-bear-red/10 transition-colors"
          >
            Delete account
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-[12px] font-body text-ghost">Type <span className="text-chalk font-mono">DELETE</span> to confirm:</p>
            <input
              type="text"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="DELETE"
              className="w-full bg-obsidian border border-bear-red/40 rounded-lg px-4 py-2.5 text-chalk text-sm font-mono focus:outline-none focus:border-bear-red transition-colors"
            />
            {deleteError && <p className="text-bear-red text-[12px] font-body">{deleteError}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={deleteText !== 'DELETE' || deletePending}
                className="bg-bear-red text-white font-display font-medium text-sm px-4 py-2 rounded-lg hover:bg-bear-red/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deletePending ? 'Deleting…' : 'Permanently delete'}
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeleteText('') }}
                className="border border-steel text-ghost font-display font-medium text-sm px-4 py-2 rounded-lg hover:text-chalk transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
