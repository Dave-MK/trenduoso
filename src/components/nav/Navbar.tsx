import Image from 'next/image'
import { TrenduosoWordmark } from '@/components/TrenduosoWordmark'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { MobileNav } from './MobileNav'

export async function Navbar() {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // env vars not set — render unauthenticated navbar
  }

  const initials = user?.user_metadata?.display_name
    ? user.user_metadata.display_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?'

  return (
    <nav className="relative flex items-center justify-between px-4 md:px-6 py-3 border-b border-steel bg-slate sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo-colour.webp" width={44} height={44} alt="Trenduoso" style={{ width: 44, height: 44, display: 'block', marginTop: '-3px' }} />
        <span className="font-display font-bold tracking-[-0.03em] text-xl md:text-2xl leading-none">
          <TrenduosoWordmark />
        </span>
      </Link>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-6 text-ghost text-sm font-body">
        <Link href="/courses"   className="hover:text-chalk transition-colors">Courses</Link>
        <Link href="/practice"  className="hover:text-chalk transition-colors">Practice</Link>
        <Link href="/community" className="hover:text-chalk transition-colors">Community</Link>
        <Link href="/pricing"   className="hover:text-chalk transition-colors">Pricing</Link>
      </div>

      {/* Right: user actions + mobile menu */}
      <div className="flex items-center gap-2 md:gap-3">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="w-10 h-10 rounded-full bg-acuity-blue flex items-center justify-center text-white text-xs font-display font-bold hover:bg-acuity-blue/90 transition-colors"
              title="Dashboard"
            >
              {initials}
            </Link>
            <form action={signOut} className="hidden sm:block">
              <button
                type="submit"
                className="text-ghost text-sm font-body hover:text-chalk transition-colors"
              >
                Sign out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="text-ghost text-sm font-body hover:text-chalk transition-colors hidden sm:block">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-acuity-blue text-white text-sm font-display font-medium px-3 md:px-4 py-2 rounded-lg hover:bg-acuity-blue/90 transition-colors"
            >
              Start free
            </Link>
          </>
        )}

        {/* Mobile hamburger */}
        <MobileNav isLoggedIn={!!user} />
      </div>
    </nav>
  )
}

