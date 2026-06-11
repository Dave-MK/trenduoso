import { Navbar } from '@/components/nav/Navbar'

const STATS = [
  { label: 'Avg Score',    value: '82%',  color: 'text-acuity-blue' },
  { label: 'Exercises',    value: '47',   color: 'text-chalk' },
  { label: 'Best Streak',  value: '12 🔥', color: 'text-acuity-teal' },
  { label: 'Hours Spent',  value: '14.2', color: 'text-chalk' },
]

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Course complete', sub: 'Foundations track',        color: 'text-amber' },
  { icon: '🔥', title: 'Week warrior',    sub: '7-day streak',              color: 'text-bear-red' },
  { icon: '🎯', title: 'Sharp eye',       sub: 'Scored 90+ on an exercise', color: 'text-acuity-blue' },
  { icon: '📊', title: 'Analyst',         sub: 'Completed 20 lessons',      color: 'text-acuity-teal' },
]

const COURSES_PROGRESS = [
  { track: 'FOUNDATIONS', trackColor: 'text-acuity-blue',  title: 'Reading price structure',  progress: 100, label: 'Complete',   labelColor: 'text-acuity-teal' },
  { track: 'TECHNICAL',   trackColor: 'text-acuity-teal',  title: 'Trendlines and channels',  progress: 18,  label: '18%',        labelColor: 'text-acuity-blue' },
  { track: 'RISK',        trackColor: 'text-ghost',         title: 'Position sizing and R:R',  progress: 0,   label: 'Not started', labelColor: 'text-ghost' },
]

const SCORE_POINTS = [42, 55, 58, 53, 65, 62, 72, 75, 68, 80, 78, 85, 88]

export default function ProfilePage() {
  const maxScore = Math.max(...SCORE_POINTS)
  const minScore = Math.min(...SCORE_POINTS)
  const range = maxScore - minScore || 1

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-53px)]">
        {/* Left sidebar */}
        <aside className="w-64 border-r border-steel bg-slate flex-shrink-0 px-6 py-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-acuity-blue flex items-center justify-center text-white text-2xl font-display font-bold mb-3">
              AJ
            </div>
            <h2 className="font-display font-bold text-chalk text-lg">Alex Johnson</h2>
            <p className="text-ghost text-[12px] font-body mt-0.5">Pro member · since Jan 2026</p>
          </div>

          <div className="flex justify-center gap-6 py-4 border-y border-steel mb-6">
            {[{ v: '1,240', l: 'XP', c: 'text-acuity-blue' }, { v: '7', l: 'Streak', c: 'text-chalk' }, { v: '24', l: 'Lessons', c: 'text-chalk' }].map((s) => (
              <div key={s.l} className="text-center">
                <p className={`font-mono font-medium text-lg ${s.c}`}>{s.v}</p>
                <p className="text-ghost text-[10px] font-display font-medium tracking-widest uppercase mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Achievements</p>
          <div className="space-y-3">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="flex items-center gap-2.5 py-2 border-b border-steel/50 last:border-0">
                <span className="text-xl">{a.icon}</span>
                <div>
                  <p className={`text-[12px] font-display font-medium ${a.color}`}>{a.title}</p>
                  <p className="text-ghost text-[10px] font-body">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 px-8 py-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {STATS.map((s) => (
              <div key={s.label} className="bg-slate border border-steel rounded-xl p-5">
                <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">{s.label}</p>
                <p className={`font-mono font-medium text-2xl ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Score history chart */}
          <div className="bg-slate border border-steel rounded-xl p-6 mb-8">
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-4">Score history</p>
            <div className="relative h-40">
              <svg viewBox={`0 0 ${SCORE_POINTS.length * 60} 120`} className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2B7FFF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2B7FFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Fill */}
                <path
                  d={`M 0 120 ${SCORE_POINTS.map((p, i) => `L ${i * 60 + 30} ${120 - ((p - minScore) / range) * 100}`).join(' ')} L ${(SCORE_POINTS.length - 1) * 60 + 30} 120 Z`}
                  fill="url(#scoreGrad)"
                />
                {/* Line */}
                <polyline
                  points={SCORE_POINTS.map((p, i) => `${i * 60 + 30},${120 - ((p - minScore) / range) * 100}`).join(' ')}
                  fill="none"
                  stroke="#2B7FFF"
                  strokeWidth="1.5"
                />
                {/* Dots */}
                {SCORE_POINTS.map((p, i) => (
                  <circle
                    key={i}
                    cx={i * 60 + 30}
                    cy={120 - ((p - minScore) / range) * 100}
                    r="3"
                    fill="#2B7FFF"
                  />
                ))}
                {/* Reference line at 75 */}
                <line
                  x1="0" y1={120 - ((75 - minScore) / range) * 100}
                  x2={(SCORE_POINTS.length - 1) * 60 + 60}
                  y2={120 - ((75 - minScore) / range) * 100}
                  stroke="#1E2530" strokeDasharray="4,4" strokeWidth="1"
                />
                <text x="5" y={120 - ((75 - minScore) / range) * 100 - 4} fill="#4A5568" fontSize="9" fontFamily="JetBrains Mono, monospace">75</text>
              </svg>
            </div>
          </div>

          {/* Course progress */}
          <div>
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-4">Course progress</p>
            <div className="space-y-4">
              {COURSES_PROGRESS.map((c) => (
                <div key={c.title} className="flex items-center gap-4">
                  <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded w-24 text-center flex-shrink-0
                    ${c.trackColor} ${c.trackColor.replace('text-', 'bg-')}/10`}>
                    {c.track}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-chalk text-sm">{c.title}</span>
                      <span className={`font-display font-medium text-[12px] ${c.labelColor}`}>{c.label}</span>
                    </div>
                    <div className="h-0.5 bg-steel rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.progress === 100 ? 'bg-acuity-teal' : 'bg-acuity-blue'}`}
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
