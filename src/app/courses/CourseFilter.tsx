'use client'
import { useState } from 'react'
import type { Track } from '@/types/course'

const TRACK_COLORS: Record<Track, string> = {
  foundations: 'text-acuity-blue bg-acuity-blue/10',
  technical:   'text-acuity-teal bg-acuity-teal/10',
  fundamental: 'text-amber bg-amber/10',
  risk:        'text-ghost bg-ghost/10',
  strategy:    'text-amber bg-amber/10',
}

const COURSES = [
  { slug: 'reading-price-structure',  track: 'foundations' as Track, title: 'Reading price structure',  desc: 'Learn to identify highs, lows, structure shifts and market phases from raw price action.',          lessons: 18, hours: '4.2', progress: 100, status: 'Complete' as const },
  { slug: 'trendlines-and-channels',  track: 'technical' as Track,   title: 'Trendlines and channels',  desc: 'Draw valid trendlines, identify channels, and grade your accuracy against reference answers.',     lessons: 24, hours: '5.8', progress: 18,  status: 'in-progress' as const },
  { slug: 'support-and-resistance',   track: 'technical' as Track,   title: 'Support and resistance',   desc: 'Identify key price levels, understand confluence, and practice marking them on live charts.',       lessons: 20, hours: '4.6', progress: 0,   status: 'not-started' as const },
  { slug: 'candlestick-patterns',     track: 'technical' as Track,   title: 'Candlestick patterns',     desc: 'Master the 12 most reliable candlestick patterns with graded recognition exercises.',               lessons: 16, hours: '3.8', progress: 0,   status: 'not-started' as const },
  { slug: 'position-sizing-rr',       track: 'risk' as Track,        title: 'Position sizing and R:R',  desc: 'Calculate position sizes, set stop losses, and build a risk-first trading mindset.',                lessons: 12, hours: '2.9', progress: 0,   status: 'not-started' as const },
  { slug: 'strategy-building',        track: 'strategy' as Track,    title: 'Strategy building',        desc: 'Define your edge, backtest setups, and build a repeatable trading process from scratch.',          lessons: 28, hours: '6.2', progress: 0,   status: 'locked' as const },
]

const FILTERS = ['All', 'Foundations', 'Technical', 'Risk', 'Strategy'] as const

export function CourseFilter() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered = activeFilter === 'All'
    ? COURSES
    : COURSES.filter((c) => c.track === activeFilter.toLowerCase())

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-display font-medium transition-colors
              ${activeFilter === f
                ? 'bg-acuity-blue text-white'
                : 'bg-slate border border-steel text-ghost hover:text-chalk hover:border-acuity-blue'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {filtered.map((c) => (
          <a
            key={c.slug}
            href={`/courses/${c.slug}`}
            className={`bg-slate border rounded-xl p-6 flex flex-col gap-3 hover:border-acuity-blue transition-colors
              ${c.status === 'in-progress' ? 'border-acuity-blue' : 'border-steel'}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded ${TRACK_COLORS[c.track]}`}>
                {c.track}
              </span>
              <span className="font-mono text-[11px] text-ghost">{c.hours} hrs</span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-chalk text-base mb-1">{c.title}</h3>
              <p className="font-body text-ghost text-[12px] leading-relaxed">{c.desc}</p>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-ghost font-body">{c.lessons} lessons</span>
                <span className={`text-[11px] font-display font-medium
                  ${c.status === 'Complete' ? 'text-acuity-teal' :
                    c.status === 'in-progress' ? 'text-acuity-blue' :
                    c.status === 'locked' ? 'text-muted' : 'text-ghost'}`}>
                  {c.status === 'Complete' ? 'Complete' : c.status === 'in-progress' ? `${c.progress}% done` : c.status === 'locked' ? 'Locked' : 'Not started'}
                </span>
              </div>
              <div className="h-0.5 bg-steel rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${c.status === 'Complete' ? 'bg-acuity-teal' : 'bg-acuity-blue'}`} style={{ width: `${c.progress}%` }} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}
