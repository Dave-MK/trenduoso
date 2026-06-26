import { Navbar } from '@/components/nav/Navbar'
import { PracticeSim } from './PracticeSim'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Practice — Trenduoso',
  description: 'Paper trade on simulated market data. No risk, real discipline.',
}

export default async function PracticePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <Navbar />
      <PracticeSim isLoggedIn={!!user} />
    </>
  )
}
