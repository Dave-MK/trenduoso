'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function UpgradeToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (searchParams.get('upgraded') === '1') {
      setVisible(true)
      const t = setTimeout(() => {
        setVisible(false)
        // Remove the query param without a full navigation
        const url = new URL(window.location.href)
        url.searchParams.delete('upgraded')
        router.replace(url.pathname)
      }, 5000)
      return () => clearTimeout(t)
    }
  }, [searchParams, router])

  if (!visible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-acuity-teal text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 font-body text-sm animate-fade-in">
      <span className="text-lg">🎉</span>
      <span>Welcome to Pro! All courses are now unlocked.</span>
      <button onClick={() => setVisible(false)} className="ml-2 text-white/70 hover:text-white text-base leading-none">×</button>
    </div>
  )
}
