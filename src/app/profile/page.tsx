import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { Navbar } from '@/components/nav/Navbar'
import { levelFromXp } from '@/lib/xp'

const LEVEL_NAMES: Record<number, string> = {
  1: 'The Apprentice', 2: 'The Operator', 3: 'The Analyst', 4: 'The Allocator',
  5: 'The Tactician', 6: 'The Quant', 7: 'The Macro Trader', 8: 'The Volatility Trader',
  9: 'The Book Runner', 10: 'The General Partner',
}
const LEVEL_COLORS: Record<number, string> = {
  1: '#4DD9EC', 2: '#00C4DC', 3: '#00A8BE', 4: '#00A090',
  5: '#009480', 6: '#007888', 7: '#5AADBE', 8: '#A8D8DF',
  9: '#E0B84A', 10: '#F5C842',
}

const ACHIEVEMENT_META: Record<string, { icon: string; label: string; color: string }> = {
  course_complete:   { icon: '🏆', label: 'Course complete',   color: 'text-amber' },
  week_warrior:      { icon: '🔥', label: 'Week warrior',      color: 'text-bear-red' },
  sharp_eye:         { icon: '🎯', label: 'Sharp eye',         color: 'text-acuity-blue' },
  analyst:           { icon: '📊', label: 'Analyst',           color: 'text-acuity-teal' },
  first_lesson:      { icon: '⭐', label: 'First lesson',      color: 'text-amber' },
  perfect_score:     { icon: '💎', label: 'Perfect score',     color: 'text-acuity-blue' },
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function formatJoinDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { data: profile },
    { data: achievements },
    { data: allProgress },
    { data: scoreHistory },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('display_name, xp, streak, plan, created_at')
      .eq('id', user.id)
      .single(),
    supabase
      .from('achievements')
      .select('type, awarded_at')
      .eq('user_id', user.id)
      .order('awarded_at', { ascending: false }),
    supabase
      .from('user_progress')
      .select('completed, score, lessons(courses(id, title, slug, track, lesson_count))')
      .eq('user_id', user.id),
    supabase
      .from('user_progress')
      .select('score, completed_at')
      .eq('user_id', user.id)
      .not('score', 'is', null)
      .order('completed_at', { ascending: true })
      .limit(20),
  ])

  const xp = profile?.xp ?? 0
  const streak = profile?.streak ?? 0
  const { level } = levelFromXp(xp)
  const clampedLevel = Math.min(Math.max(level, 1), 10)
  const displayName = profile?.display_name ?? user.email?.split('@')[0] ?? 'Learner'
  const plan = profile?.plan ?? 'free'
  const joinDate = profile?.created_at ? formatJoinDate(profile.created_at) : ''

  const completed = (allProgress ?? []).filter(p => p.completed)
  const scoresWithValue = completed.filter(p => p.score != null).map(p => p.score as number)
  const avgScore = scoresWithValue.length
    ? Math.round(scoresWithValue.reduce((a, b) => a + b, 0) / scoresWithValue.length)
    : null
  const hoursSpent = (completed.length * 20 / 60).toFixed(1)

  type CourseRow = { id: string; title: string; slug: string; track: string; lesson_count: number; completed: number }
  const courseMap = new Map<string, CourseRow>()
  for (const p of (allProgress ?? [])) {
    const lesson = p.lessons as unknown as { courses: CourseRow } | null
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

  const scorePoints = (scoreHistory ?? []).map(r => r.score as number)

  const stats = [
    { label: 'Avg Score',   value: avgScore != null ? `${avgScore}%` : '—',   color: 'text-acuity-blue' },
    { label: 'Exercises',   value: String(completed.length),                   color: 'text-chalk' },
    { label: 'Best Streak', value: streak > 0 ? `${streak} 🔥` : '—',         color: 'text-acuity-teal' },
    { label: 'Hours Spent', value: hoursSpent,                                 color: 'text-chalk' },
  ]

  const trackColors: Record<string, string> = {
    foundations: 'text-acuity-blue',
    technical:   'text-acuity-teal',
    fundamental: 'text-amber',
    risk:        'text-ghost',
    strategy:    'text-acuity-blue',
  }

  const maxScore = scorePoints.length ? Math.max(...scorePoints) : 100
  const minScore = scorePoints.length ? Math.min(...scorePoints) : 0
  const range = maxScore - minScore || 1
  const svgW = scorePoints.length * 60

  return (
    <>
      <Navbar />
      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-53px)]">
        {/* Sidebar — stacks on top on mobile, left on desktop */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-steel bg-slate flex-shrink-0 px-4 sm:px-6 py-6 lg:py-8">
          {/* Identity block — row on mobile, column on desktop */}
          <div className="flex flex-row lg:flex-col items-center lg:text-center gap-4 lg:gap-0 mb-6">
            <div className="flex items-center gap-3 lg:flex-col lg:gap-0 lg:mb-0">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-acuity-blue flex items-center justify-center text-white text-xl lg:text-2xl font-display font-bold flex-shrink-0 lg:mb-3">
                {getInitials(displayName)}
              </div>
              <div className="flex flex-col lg:items-center">
                <h2 className="font-display font-bold text-chalk text-base lg:text-lg">{displayName}</h2>
                <p className="text-ghost text-[11px] font-body capitalize">
                  {plan} member{joinDate ? ` · since ${joinDate}` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:flex-col lg:items-center ml-auto lg:ml-0 lg:mt-3">
              <Image
                src={`/level-${clampedLevel}.png`}
                alt={LEVEL_NAMES[clampedLevel] ?? ''}
                width={56}
                height={56}
                style={{ width: 56, height: 56 }}
                className="rounded lg:w-[72px] lg:h-[72px] lg:mb-2"
              />
              <p className="font-display font-semibold text-[12px] lg:text-[13px]" style={{ color: LEVEL_COLORS[clampedLevel] }}>
                {LEVEL_NAMES[clampedLevel]}
              </p>
            </div>
          </div>

          {/* XP / Streak / Lessons — always row */}
          <div className="flex justify-around lg:justify-center gap-4 lg:gap-6 py-4 border-y border-steel mb-6">
            {[
              { v: xp.toLocaleString(), l: 'XP',      c: 'text-acuity-blue' },
              { v: String(streak),       l: 'Streak',  c: 'text-chalk' },
              { v: String(completed.length), l: 'Lessons', c: 'text-chalk' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className={`font-mono font-medium text-lg ${s.c}`}>{s.v}</p>
                <p className="text-ghost text-[10px] font-display font-medium tracking-widest uppercase mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Achievements</p>
          {achievements && achievements.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-0">
              {achievements.map((a) => {
                const meta = ACHIEVEMENT_META[a.type] ?? { icon: '🎖️', label: a.type, color: 'text-chalk' }
                return (
                  <div key={a.type} className="flex items-center gap-2.5 py-2 border-b border-steel/50 last:border-0">
                    <span className="text-xl">{meta.icon}</span>
                    <div>
                      <p className={`text-[12px] font-display font-medium ${meta.color}`}>{meta.label}</p>
                      <p className="text-ghost text-[10px] font-body">
                        {new Date(a.awarded_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-ghost text-[12px] font-body">No achievements yet — keep learning!</p>
          )}
        </aside>

        {/* Main content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-slate border border-steel rounded-xl p-4 lg:p-5">
                <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">{s.label}</p>
                <p className={`font-mono font-medium text-2xl ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Score history chart */}
          <div className="bg-slate border border-steel rounded-xl p-4 lg:p-6 mb-8">
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-4">Score history</p>
            {scorePoints.length < 2 ? (
              <p className="text-ghost text-sm font-body py-6 text-center">
                Complete more exercises to see your score trend.
              </p>
            ) : (
              <div className="relative h-36 lg:h-40">
                <svg viewBox={`0 0 ${svgW} 120`} className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2B7FFF" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#2B7FFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0 120 ${scorePoints.map((p, i) => `L ${i * 60 + 30} ${120 - ((p - minScore) / range) * 100}`).join(' ')} L ${(scorePoints.length - 1) * 60 + 30} 120 Z`}
                    fill="url(#scoreGrad)"
                  />
                  <polyline
                    points={scorePoints.map((p, i) => `${i * 60 + 30},${120 - ((p - minScore) / range) * 100}`).join(' ')}
                    fill="none"
                    stroke="#2B7FFF"
                    strokeWidth="1.5"
                  />
                  {scorePoints.map((p, i) => (
                    <circle
                      key={i}
                      cx={i * 60 + 30}
                      cy={120 - ((p - minScore) / range) * 100}
                      r="3"
                      fill="#2B7FFF"
                    />
                  ))}
                  <line
                    x1="0" y1={120 - ((75 - minScore) / range) * 100}
                    x2={(scorePoints.length - 1) * 60 + 60}
                    y2={120 - ((75 - minScore) / range) * 100}
                    stroke="#1E2530" strokeDasharray="4,4" strokeWidth="1"
                  />
                  <text x="5" y={120 - ((75 - minScore) / range) * 100 - 4} fill="#4A5568" fontSize="9" fontFamily="JetBrains Mono, monospace">75</text>
                </svg>
              </div>
            )}
          </div>

          {/* Course progress */}
          <div>
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-4">Course progress</p>
            {courseList.length === 0 ? (
              <p className="text-ghost text-sm font-body">No courses started yet.</p>
            ) : (
              <div className="space-y-4">
                {courseList.map((c) => {
                  const pct = c.lesson_count > 0 ? Math.round((c.completed / c.lesson_count) * 100) : 0
                  const color = trackColors[c.track] ?? 'text-acuity-blue'
                  return (
                    <div key={c.id} className="flex items-center gap-3 lg:gap-4">
                      <span className={`hidden sm:inline text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded w-24 text-center flex-shrink-0 ${color} ${color.replace('text-', 'bg-')}/10`}>
                        {c.track}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <span className="font-body text-chalk text-sm truncate">{c.title}</span>
                          <span className={`font-display font-medium text-[12px] flex-shrink-0 ${pct === 100 ? 'text-acuity-teal' : 'text-acuity-blue'}`}>
                            {pct === 100 ? 'Complete' : `${pct}%`}
                          </span>
                        </div>
                        <div className="h-0.5 bg-steel rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${pct === 100 ? 'bg-acuity-teal' : 'bg-acuity-blue'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
