'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function reject() {
    localStorage.setItem('cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-slate border-t border-steel px-4 py-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-ghost text-[12px] font-body leading-relaxed flex-1">
          We use strictly necessary cookies to keep you signed in. We don&apos;t use advertising or tracking cookies.{' '}
          <Link href="/privacy#cookies" className="text-acuity-blue hover:underline">Learn more</Link>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 rounded-lg text-[12px] font-display font-medium text-ghost border border-steel hover:border-acuity-blue hover:text-chalk transition-colors"
          >
            Reject non-essential
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg text-[12px] font-display font-medium bg-acuity-blue text-white hover:bg-acuity-blue/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
