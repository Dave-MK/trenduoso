'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  isLoggedIn: boolean
}

export function MobileNav({ isLoggedIn }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-ghost hover:text-chalk hover:bg-steel/50 transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M2.5 5.5H15.5M2.5 9H15.5M2.5 12.5H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate border-b border-steel z-50 px-5 pt-4 pb-6">
          <nav className="space-y-1">
            {[
              { href: '/courses',   label: 'Courses',   icon: '📚' },
              { href: '/practice',  label: 'Practice',  icon: '🎯' },
              { href: '/journal',   label: 'Journal',   icon: '📓' },
              { href: '/community', label: 'Community', icon: '👥' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-ghost text-[15px] font-body hover:text-chalk hover:bg-steel/50 transition-colors"
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            <div className="border-t border-steel/60 my-2" />

            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-lg text-ghost text-[15px] font-body hover:text-chalk hover:bg-steel/50 transition-colors">
                  <span className="text-base w-5 text-center">⬛</span> Dashboard
                </Link>
                <Link href="/profile" className="flex items-center gap-3 px-3 py-3 rounded-lg text-ghost text-[15px] font-body hover:text-chalk hover:bg-steel/50 transition-colors">
                  <span className="text-base w-5 text-center">👤</span> Profile
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-3 rounded-lg text-ghost text-[15px] font-body hover:text-chalk hover:bg-steel/50 transition-colors">
                  <span className="text-base w-5 text-center">⚙</span> Settings
                </Link>
              </>
            ) : (
              <Link href="/login" className="flex items-center gap-3 px-3 py-3 rounded-lg text-ghost text-[15px] font-body hover:text-chalk hover:bg-steel/50 transition-colors">
                <span className="text-base w-5 text-center">→</span> Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  )
}
