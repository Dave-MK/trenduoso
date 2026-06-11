import Image from 'next/image'
import Link from 'next/link'

const WATCHLIST = [
  { symbol: 'EURUSD', price: '1.0847', change: '+0.23%', bull: true },
  { symbol: 'SPX',    price: '5,241',  change: '−0.41%', bull: false },
  { symbol: 'BTCUSD', price: '67,430', change: '+1.07%', bull: true },
  { symbol: 'GOLD',   price: '2,318',  change: '+0.56%', bull: true },
]

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Course complete', sub: 'Foundations track', color: 'text-amber' },
  { icon: '🔥', title: 'Week warrior',    sub: '7-day streak',      color: 'text-bear-red' },
  { icon: '🎯', title: 'Sharp eye',       sub: 'Score 90+ on exercise', color: 'text-acuity-blue' },
]

const ACTIVITY = [
  { title: 'Trendline drawing — Exercise 4', sub: 'Scored 87/100 · 2h ago',   xp: '+50',  type: 'xp' },
  { title: 'Support & resistance — Lesson 3', sub: 'Completed · Yesterday',   xp: '+30',  type: 'xp' },
  { title: 'Reading price structure',          sub: 'Course complete · 2 days ago', xp: '🏆', type: 'badge' },
]

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', active: true,  icon: '⬛' },
  { label: 'Courses',   href: '/courses',   active: false, icon: '📚' },
  { label: 'Practice',  href: '#',          active: false, icon: '🎯' },
  { label: 'Journal',   href: '#',          active: false, icon: '📓' },
  { label: 'Settings',  href: '#',          active: false, icon: '⚙' },
]

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const XP_DATA = [0, 80, 120, 50, 90, 0, 0]

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-obsidian overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-slate border-r border-steel flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-steel">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-colour.webp" width={20} height={20} alt="tradecuity" style={{ width: 20, height: 20 }} />
            <span className="font-display font-bold tracking-[-0.03em] text-xl">
              <span className="text-chalk">trade</span><span className="text-acuity-blue">cuity</span>
            </span>
          </Link>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-b border-steel">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-acuity-blue flex items-center justify-center text-white text-sm font-display font-bold">
              AJ
            </div>
            <div>
              <p className="font-display font-semibold text-chalk text-[13px]">Alex J.</p>
              <p className="font-mono text-[11px] text-ghost">1,240 XP</p>
            </div>
          </div>
          <div className="h-1 bg-steel rounded-full overflow-hidden mb-1">
            <div className="h-full bg-acuity-blue rounded-full" style={{ width: '68%' }} />
          </div>
          <p className="text-[10px] text-ghost font-body">Level 4 · 68% to next</p>
        </div>

        {/* Nav */}
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

        {/* Streak */}
        <div className="px-4 py-4 border-t border-steel">
          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">Streak</p>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-medium text-3xl text-chalk">7</span>
            <span className="text-2xl">🔥</span>
          </div>
          <p className="text-[11px] text-ghost font-body mt-0.5">days in a row</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Continue learning */}
          <div className="mb-6">
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Continue learning</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* In-progress card */}
              <div className="bg-slate border border-acuity-blue/40 rounded-xl p-5">
                <span className="text-[9px] font-display font-medium tracking-widest text-acuity-teal bg-acuity-teal/10 uppercase px-2 py-1 rounded">
                  Technical
                </span>
                <h3 className="font-display font-semibold text-chalk text-base mt-2 mb-1">Trendlines and channels</h3>
                <p className="text-[11px] text-ghost font-body mb-4">Lesson 4 of 24 · In progress</p>
                <div className="h-0.5 bg-steel rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-acuity-blue rounded-full" style={{ width: '18%' }} />
                </div>
                <Link
                  href="/courses/trendlines-and-channels/lesson-4"
                  className="block w-full text-center bg-acuity-blue text-white text-sm font-display font-medium py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors"
                >
                  Continue →
                </Link>
              </div>

              {/* Complete card */}
              <div className="bg-slate border border-steel rounded-xl p-5">
                <span className="text-[9px] font-display font-medium tracking-widest text-acuity-blue bg-acuity-blue/10 uppercase px-2 py-1 rounded">
                  Foundations
                </span>
                <h3 className="font-display font-semibold text-chalk text-base mt-2 mb-1">Reading price structure</h3>
                <p className="text-[11px] text-ghost font-body mb-4">Completed · 100%</p>
                <div className="h-0.5 bg-acuity-teal rounded-full mb-4" />
                <button className="w-full text-center border border-steel text-ghost text-sm font-display font-medium py-2.5 rounded-lg hover:border-acuity-blue hover:text-chalk transition-colors">
                  Review
                </button>
              </div>
            </div>
          </div>

          {/* XP chart */}
          <div className="bg-slate border border-steel rounded-xl p-5 mb-6">
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-4">XP this week</p>
            <div className="flex items-end justify-between gap-2 h-24">
              {XP_DATA.map((xp, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full rounded-sm bg-acuity-blue/30 border-t border-acuity-blue transition-all"
                    style={{ height: xp > 0 ? `${(xp / 120) * 80}px` : '2px', opacity: xp > 0 ? 1 : 0.3 }}
                  />
                  <span className="text-[10px] text-ghost font-mono">{DAYS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Recent activity</p>
            <div className="space-y-0">
              {ACTIVITY.map((a) => (
                <div key={a.title} className="flex items-center justify-between py-3 border-b border-steel/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-acuity-teal flex-shrink-0" />
                    <div>
                      <p className="text-chalk text-[13px] font-body">{a.title}</p>
                      <p className="text-ghost text-[11px] font-body">{a.sub}</p>
                    </div>
                  </div>
                  {a.type === 'xp' ? (
                    <span className="font-mono text-acuity-teal text-sm font-medium">{a.xp} XP</span>
                  ) : (
                    <span className="text-xl">{a.xp}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="w-56 border-l border-steel bg-slate flex-shrink-0 overflow-y-auto px-4 py-6">
          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Practice Watchlist</p>
          <div className="space-y-0 mb-6">
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

          <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Achievements</p>
          <div className="space-y-3">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="flex items-center gap-2.5">
                <span className="text-xl">{a.icon}</span>
                <div>
                  <p className={`text-[12px] font-display font-medium ${a.color}`}>{a.title}</p>
                  <p className="text-ghost text-[10px] font-body">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
