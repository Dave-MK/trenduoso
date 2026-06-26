import { redirect } from 'next/navigation'
import { Navbar } from '@/components/nav/Navbar'
import { createClient } from '@/lib/supabase/server'
import { SettingsClient } from './SettingsClient'

export const metadata = { title: 'Settings — Trenduoso' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 py-12 max-w-3xl">
        <h1 className="font-display font-bold text-3xl text-chalk mb-8">Settings</h1>
        <SettingsClient
          displayName={profile?.display_name ?? user.email?.split('@')[0] ?? 'Learner'}
          email={user.email ?? ''}
          avatarUrl={profile?.avatar_url}
        />
      </main>
    </>
  )
}
