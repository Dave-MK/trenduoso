import Image from 'next/image'
import { TrenduosoWordmark } from '@/components/TrenduosoWordmark'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { levelFromXp } from '@/lib/xp'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', active: true,  icon: '⬛' },
  { label: 'Courses',   href: '/courses',   active: false, icon: '📚' },
  { label: 'Practice',  href: '/practice',  active: false, icon: '🎯' },
  { label: 'Journal',   href: '/journal',   active: false, icon: '📓' },
  { label: 'Settings',  href: '/settings',  active: false, icon: '⚙' },
]

const WATCHLIST = [
  { symbol: 'EURUSD', price: '1.0847', change: '+0.23%', bull: true },
  { symbol: 'SPX',    price: '5,241',  change: '−0.41%', bull: false },
  { symbol: 'BTCUSD', price: '67,430', change: '+1.07%', bull: true },
  { symbol: 'GOLD',   price: '2,318',  change: '+0.56%', bull: true },
]

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function shortName(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length < 2) return name
  return `${parts[0]} ${parts[1][0]}.`
}

function relativeTime(iso: string): string {
  const diffH = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (diffH < 1) return 'Just now'
  if (diffH < 24) return `${diffH}h ago`
  const d = Math.floor(diffH / 24)
  return d === 1 ? 'Yesterday' : `${d} days ago`
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { data: profile },
    { data: recentRows },
    { data: allProgress },
    { data: weekRows },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('display_name, xp, streak, plan')
      .eq('id', user.id)
      .single(),
    supabase
      .from('user_progress')
      .select('score, completed_at, lessons(title, courses(title))')
      .eq('user_id', user.id)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(5),
    supabase
      .from('user_progress')
      .select('completed, lessons(course_id, courses(id, title, slug, track, lesson_count))')
      .eq('user_id', user.id),
    supabase
      .from('user_progress')
      .select('completed_at, lessons(xp_value)')
      .eq('user_id', user.id)
      .not('completed_at', 'is', null)
      .gte('completed_at', new Date(Date.now() - 7 * 86_400_000).toISOString()),
  ])

  const xp = profile?.xp ?? 0
  const streak = profile?.streak ?? 0
  const displayName = profile?.display_name ?? user.email?.split('@')[0] ?? 'Learner'
  const { level, progress: levelProgress } = levelFromXp(xp)

  const xpByDay = [0, 0, 0, 0, 0, 0, 0]
  for (const row of (weekRows ?? [])) {
    if (!row.completed_at) continue
    const day = (new Date(row.completed_at).getDay() + 6) % 7
    const lesson = row.lessons as unknown as { xp_value: number } | null
    xpByDay[day] += lesson?.xp_value ?? 50
  }
  const maxDayXp = Math.max(...xpByDay, 1)

  type CourseRow = { id: string; title: string; slug: string; track: string; lesson_count: number; completed: number }
  const courseMap = new Map<string, CourseRow>()
  for (const p of (allProgress ?? [])) {
    const lesson = p.lessons as unknown as { course_id: string; courses: CourseRow } | null
    if (!lesson?.courses) continue
    const c = lesson.courses
    const existing = courseMap.get(c.id)
    if (!existing) {
      courseMap.set(c.id, { ...c, completed: p.completed ? 1 : 0 })
    } else if (p.completed) {
      existing.completed++
    }
  }
  const courseList = Array.from(courseMap.values())
  const inProgress   = courseList.filter(c => c.completed > 0 && c.completed < c.lesson_count)
  const completedCourses = courseList.filter(c => c.lesson_count > 0 && c.completed >= c.lesson_count)

  type ActivityRow = {
    title: string
    course: string
    score: number | null
    completedAt: string
  }
  const activity: ActivityRow[] = (recentRows ?? []).map((r) => {
    const lesson = r.lessons as unknown as { title: string; courses: { title: string } | null } | null
    return {
      title: lesson?.title ?? 'Lesson',
      course: lesson?.courses?.title ?? '',
      score: r.score,
      completedAt: r.completed_at ?? '',
    }
  })

  return (
    <div className="flex h-screen bg-obsidian overflow-hidden">
      {/* Left sidebar — hidden on mobile */}
      <aside className="hidden lg:flex w-52 bg-slate border-r border-steel flex-col flex-shrink-0">
        <div className="px-4 py-4 border-b border-steel">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-colour.webp" width={44} height={44} alt="Trenduoso" style={{ width: 44, height: 44 }} />
            <span className="font-display font-bold tracking-[-0.03em] text-xl">
              <TrenduosoWordmark />
            </span>
          </Link>
        </div>

        <div className="px-4 py-4 border-b border-steel">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-acuity-blue flex items-center justify-center text-white text-sm font-display font-bold">
              {getInitials(displayName)}
            </div>
            <div>
              <p className="font-display font-semibold text-chalk text-[13px]">{shortName(displayName)}</p>
              <p className="font-mono text-[11px] text-ghost">{xp.toLocaleString()} XP</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <Image
              src={`/level-${Math.min(level, 10)}.png`}
              alt={`Level ${level}`}
              width={36}
              height={36}
              style={{ width: 36, height: 36 }}
              className="rounded flex-shrink-0"
            />
            <p className="text-[10px] text-ghost font-body">Level {level} · {levelProgress}% to next</p>
          </div>
          <div className="h-1 bg-steel rounded-full overflow-hidden">
            <div className="h-full bg-acuity-blue rounded-full" style={{ width: `${levelProgress}%` }} />
          </div>
        </div>

        <nav className="flex-1 px-2 py-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-body mb-0.5 transition-colors
                ${item.active
                  ? 'bg-acuity-blue/10 text-acuity-blue border-l-2 border-acuity-blue'
                  : 'text-ghost hover:text-chalk hover:bg-steel'
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-steel">
          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">Streak</p>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-medium text-3xl text-chalk">{streak}</span>
            <span className="text-2xl">🔥</span>
          </div>
          <p className="text-[11px] text-ghost font-body mt-0.5">days in a row</p>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-steel bg-slate sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-acuity-blue flex items-center justify-center text-white text-xs font-display font-bold">
                {getInitials(displayName)}
              </div>
              <div>
                <p className="font-display font-semibold text-chalk text-[13px]">{shortName(displayName)}</p>
                <p className="font-mono text-[11px] text-ghost">{xp.toLocaleString()} XP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="font-mono font-medium text-lg text-chalk">{streak}</span>
                <span className="text-lg">🔥</span>
              </div>
              <Image
                src={`/level-${Math.min(level, 10)}.png`}
                alt={`Level ${level}`}
                width={32}
                height={32}
                style={{ width: 32, height: 32 }}
                className="rounded"
              />
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
            {/* Continue learning */}
            <div className="mb-6">
              <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Continue learning</p>
              {inProgress.length === 0 && completedCourses.length === 0 ? (
                <div className="bg-slate border border-steel rounded-xl p-6 text-center">
                  <p className="text-ghost text-sm font-body mb-3">No courses started yet.</p>
                  <Link
                    href="/courses"
                    className="inline-block bg-acuity-blue text-white text-sm font-display font-medium px-4 py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors"
                  >
                    Browse courses →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inProgress[0] && (() => {
                    const c = inProgress[0]
                    const pct = Math.round((c.completed / c.lesson_count) * 100)
                    return (
                      <div className="bg-slate border border-acuity-blue/40 rounded-xl p-5">
                        <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded ${c.track === 'technical' ? 'text-acuity-teal bg-acuity-teal/10' : 'text-acuity-blue bg-acuity-blue/10'}`}>
                          {c.track}
                        </span>
                        <h3 className="font-display font-semibold text-chalk text-base mt-2 mb-1">{c.title}</h3>
                        <p className="text-[11px] text-ghost font-body mb-4">Lesson {c.completed} of {c.lesson_count} · In progress</p>
                        <div className="h-0.5 bg-steel rounded-full overflow-hidden mb-4">
                          <div className="h-full bg-acuity-blue rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <Link
                          href={`/courses/${c.slug}`}
                          className="block w-full text-center bg-acuity-blue text-white text-sm font-display font-medium py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors"
                        >
                          Continue →
                        </Link>
                      </div>
                    )
                  })()}

                  {completedCourses[0] && (() => {
                    const c = completedCourses[0]
                    return (
                      <div className="bg-slate border border-steel rounded-xl p-5">
                        <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded ${c.track === 'technical' ? 'text-acuity-teal bg-acuity-teal/10' : 'text-acuity-blue bg-acuity-blue/10'}`}>
                          {c.track}
                        </span>
                        <h3 className="font-display font-semibold text-chalk text-base mt-2 mb-1">{c.title}</h3>
                        <p className="text-[11px] text-ghost font-body mb-4">Completed · 100%</p>
                        <div className="h-0.5 bg-acuity-teal rounded-full mb-4" />
                        <Link
                          href={`/courses/${c.slug}`}
                          className="block w-full text-center border border-steel text-ghost text-sm font-display font-medium py-2.5 rounded-lg hover:border-acuity-blue hover:text-chalk transition-colors"
                        >
                          Review
                        </Link>
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            {/* Mobile watchlist strip */}
            <div className="lg:hidden mb-6">
              <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Watchlist</p>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 sm:-mx-6 px-4 sm:px-6">
                {WATCHLIST.map((t) => (
                  <div key={t.symbol} className="bg-slate border border-steel rounded-xl px-3 py-3 flex-shrink-0 min-w-[100px]">
                    <p className="font-mono text-[11px] font-medium text-chalk">{t.symbol}</p>
                    <p className="font-mono text-[13px] text-chalk mt-1">{t.price}</p>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded mt-1 inline-block ${t.bull ? 'text-acuity-teal bg-acuity-teal/10' : 'text-bear-red bg-bear-red/10'}`}>
                      {t.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* XP chart */}
            <div className="bg-slate border border-steel rounded-xl p-5 mb-6">
              <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-4">XP this week</p>
              <div className="flex items-end justify-between gap-2 h-24">
                {xpByDay.map((dayXp, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full rounded-sm bg-acuity-blue/30 border-t border-acuity-blue transition-all"
                      style={{ height: dayXp > 0 ? `${(dayXp / maxDayXp) * 80}px` : '2px', opacity: dayXp > 0 ? 1 : 0.3 }}
                    />
                    <span className="text-[10px] text-ghost font-mono">{DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Recent activity</p>
              {activity.length === 0 ? (
                <p className="text-ghost text-sm font-body py-4">No activity yet — complete a lesson to see it here.</p>
              ) : (
                <div className="space-y-0">
                  {activity.map((a, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-steel/50 last:border-0 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-acuity-teal flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-chalk text-[13px] font-body truncate">{a.title}</p>
                          <p className="text-ghost text-[11px] font-body truncate">{a.course}{a.course && ' · '}{relativeTime(a.completedAt)}</p>
                        </div>
                      </div>
                      <span className={`font-mono text-sm font-medium flex-shrink-0 ${a.score != null ? 'text-acuity-teal' : 'text-ghost'}`}>
                        {a.score != null ? `+${a.score} XP` : 'Done'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right sidebar — hidden on mobile */}
        <aside className="hidden lg:flex w-56 border-l border-steel bg-slate flex-shrink-0 flex-col overflow-y-auto px-4 py-6">
          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Practice Watchlist</p>
          <div className="space-y-0">
            {WATCHLIST.map((t) => (
              <div key={t.symbol} className="flex items-center justify-between py-2 border-b border-steel/50 last:border-0">
                <span className="font-mono text-[11px] font-medium text-chalk">{t.symbol}</span>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[11px] text-chalk">{t.price}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${t.bull ? 'text-acuity-teal bg-acuity-teal/10' : 'text-bear-red bg-bear-red/10'}`}>
                    {t.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate border-t border-steel z-50 flex">
        {[
          { label: 'Dashboard', href: '/dashboard', icon: '⬛', active: true },
          { label: 'Courses',   href: '/courses',   icon: '📚', active: false },
          { label: 'Practice',  href: '/practice',  icon: '🎯', active: false },
          { label: 'Profile',   href: '/profile',   icon: '👤', active: false },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 text-center transition-colors
              ${item.active ? 'text-acuity-blue' : 'text-ghost hover:text-chalk'}`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="text-[10px] font-display font-medium tracking-wide">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

