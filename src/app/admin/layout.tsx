import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata = { title: 'Admin — Tradecuity' }

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  return (
    <div className="flex h-screen bg-obsidian text-chalk overflow-hidden">
      {/* Sidebar — hidden on small screens */}
      <aside className="hidden md:flex w-52 flex-shrink-0 bg-slate border-r border-steel flex-col">
        <div className="px-4 py-4 border-b border-steel">
          <span className="text-[10px] font-display font-semibold tracking-widest text-ghost uppercase">Tradecuity</span>
          <p className="text-sm font-display font-bold text-chalk mt-0.5">Admin</p>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5">
          <NavItem href="/admin" label="Dashboard" icon="◈" />
          <NavItem href="/admin/courses" label="Courses" icon="☰" />
          <div className="pt-3 mt-3 border-t border-steel/50">
            <NavItem href="/" label="← Back to app" icon="" />
          </div>
        </nav>

        <div className="px-4 py-3 border-t border-steel">
          <p className="text-[10px] text-ghost font-body">{user.email}</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-steel bg-slate sticky top-0 z-10">
          <span className="text-sm font-display font-bold text-chalk">Admin</span>
          <div className="flex items-center gap-4 text-xs font-body">
            <Link href="/admin" className="text-ghost hover:text-chalk">Dashboard</Link>
            <Link href="/admin/courses" className="text-ghost hover:text-chalk">Courses</Link>
            <Link href="/" className="text-ghost hover:text-chalk">← App</Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-ghost hover:text-chalk hover:bg-steel/60 transition-colors text-sm font-body"
    >
      {icon && <span className="text-base w-4 text-center">{icon}</span>}
      {label}
    </Link>
  )
}
