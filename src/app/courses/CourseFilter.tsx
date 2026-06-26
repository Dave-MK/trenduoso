'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Track } from '@/types/course'

const TRACK_COLORS: Record<Track, string> = {
  foundations: 'text-acuity-blue bg-acuity-blue/10',
  technical:   'text-acuity-teal bg-acuity-teal/10',
  fundamental: 'text-amber bg-amber/10',
  risk:        'text-ghost bg-ghost/10',
  strategy:    'text-amber bg-amber/10',
}

const LEVEL_META: Record<number, { name: string; color: string; textColor: string; bg: string; badge: string }> = {
  1:  { name: 'The Apprentice',        color: '#4DD9EC', textColor: 'text-[#4DD9EC]', bg: 'bg-[#4DD9EC]/10', badge: '/level-1.png' },
  2:  { name: 'The Operator',          color: '#00C4DC', textColor: 'text-[#00C4DC]', bg: 'bg-[#00C4DC]/10', badge: '/level-2.png' },
  3:  { name: 'The Analyst',           color: '#00A8BE', textColor: 'text-[#00A8BE]', bg: 'bg-[#00A8BE]/10', badge: '/level-3.png' },
  4:  { name: 'The Allocator',         color: '#00A090', textColor: 'text-[#00A090]', bg: 'bg-[#00A090]/10', badge: '/level-4.png' },
  5:  { name: 'The Tactician',         color: '#009480', textColor: 'text-[#009480]', bg: 'bg-[#009480]/10', badge: '/level-5.png' },
  6:  { name: 'The Quant',             color: '#007888', textColor: 'text-[#007888]', bg: 'bg-[#007888]/10', badge: '/level-6.png' },
  7:  { name: 'The Macro Trader',      color: '#5AADBE', textColor: 'text-[#5AADBE]', bg: 'bg-[#5AADBE]/10', badge: '/level-7.png' },
  8:  { name: 'The Volatility Trader', color: '#A8D8DF', textColor: 'text-[#A8D8DF]', bg: 'bg-[#A8D8DF]/10', badge: '/level-8.png' },
  9:  { name: 'The Book Runner',       color: '#E0B84A', textColor: 'text-[#E0B84A]', bg: 'bg-[#E0B84A]/10', badge: '/level-9.png' },
  10: { name: 'The General Partner',   color: '#F5C842', textColor: 'text-[#F5C842]', bg: 'bg-[#F5C842]/10', badge: '/level-10.png' },
}

type EnrichedCourse = {
  id: string
  slug: string
  title: string
  track: Track
  description: string
  lesson_count: number
  hours: number
  is_free: boolean
  completed_lessons: number
  level: number
  level_name: string
}

type Props = {
  courses: EnrichedCourse[]
}

const LEVEL_TABS = [
  { key: 0,  label: 'All' },
  { key: 1,  label: 'The Apprentice' },
  { key: 2,  label: 'The Operator' },
  { key: 3,  label: 'The Analyst' },
  { key: 4,  label: 'The Allocator' },
  { key: 5,  label: 'The Tactician' },
  { key: 6,  label: 'The Quant' },
  { key: 7,  label: 'The Macro Trader' },
  { key: 8,  label: 'The Volatility Trader' },
  { key: 9,  label: 'The Book Runner' },
  { key: 10, label: 'The General Partner' },
] as const

const TRACK_FILTERS = ['All', 'Foundations', 'Technical', 'Fundamental', 'Risk', 'Strategy'] as const

function CourseCard({ c }: { c: EnrichedCourse }) {
  const pct = c.lesson_count > 0
    ? Math.round((c.completed_lessons / c.lesson_count) * 100)
    : 0
  const isComplete   = pct === 100 && c.lesson_count > 0
  const isInProgress = pct > 0 && !isComplete
  const levelMeta = LEVEL_META[c.level] ?? LEVEL_META[2]

  return (
    <Link
      href={`/courses/${c.slug}`}
      className={`bg-slate border rounded-xl p-5 flex flex-col gap-3 transition-colors hover:border-acuity-blue
        ${isInProgress ? 'border-acuity-blue' : 'border-steel'}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Image
            src={levelMeta.badge}
            alt={levelMeta.name}
            width={36}
            height={36}
            style={{ width: 36, height: 36 }}
            className="rounded flex-shrink-0"
          />
          <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded ${levelMeta.textColor} ${levelMeta.bg}`}>
            {levelMeta.name}
          </span>
          <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded ${TRACK_COLORS[c.track]}`}>
            {c.track}
          </span>
        </div>
        <span className="font-mono text-[11px] text-ghost">{c.hours.toFixed(1)} hrs</span>
      </div>

      <div>
        <h3 className="font-display font-semibold text-chalk text-sm mb-1 leading-snug">{c.title}</h3>
        <p className="font-body text-ghost text-[12px] leading-relaxed line-clamp-3">{c.description}</p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-ghost font-body">{c.lesson_count} lessons</span>
          <span className={`text-[11px] font-display font-medium
            ${isComplete    ? 'text-acuity-teal' :
              isInProgress  ? 'text-acuity-blue' : 'text-ghost'}`}>
            {isComplete ? 'Complete' : isInProgress ? `${pct}% done` : 'Not started'}
          </span>
        </div>
        <div className="h-0.5 bg-steel rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${isComplete ? 'bg-acuity-teal' : 'bg-acuity-blue'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </Link>
  )
}

export function CourseFilter({ courses }: Props) {
  const [activeLevel, setActiveLevel] = useState<number>(0)
  const [activeTrack, setActiveTrack] = useState<string>('All')

  if (courses.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-ghost font-body text-sm">No courses available yet — check back soon.</p>
      </div>
    )
  }

  const byLevel = activeLevel === 0 ? courses : courses.filter((c) => c.level === activeLevel)
  const filtered = activeTrack === 'All'
    ? byLevel
    : byLevel.filter((c) => c.track === activeTrack.toLowerCase())

  return (
    <>
      {/* Level tabs — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 mt-6 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
        {LEVEL_TABS.map((tab) => {
          const meta = tab.key !== 0 ? LEVEL_META[tab.key] : null
          const isActive = activeLevel === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => { setActiveLevel(tab.key); setActiveTrack('All') }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-display font-medium transition-colors border flex-shrink-0
                ${isActive
                  ? meta
                    ? 'text-obsidian border-transparent'
                    : 'bg-acuity-blue text-white border-transparent'
                  : 'bg-slate border-steel text-ghost hover:text-chalk hover:border-acuity-blue'
                }`}
              style={isActive && meta ? { backgroundColor: meta.color, borderColor: meta.color } : undefined}
            >
              {meta && (
                <Image
                  src={meta.badge}
                  alt=""
                  width={20}
                  height={20}
                  style={{ width: 20, height: 20 }}
                  className="rounded flex-shrink-0"
                />
              )}
              <span className="whitespace-nowrap">{tab.key === 0 ? 'All' : `L${tab.key}`}</span>
              <span className="hidden sm:inline whitespace-nowrap">{tab.key !== 0 ? ` — ${tab.label}` : ''}</span>
            </button>
          )
        })}
      </div>

      {/* Track filters */}
      <div className="flex gap-2 flex-wrap mt-3">
        {TRACK_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveTrack(f)}
            className={`px-3 py-1 rounded-md text-xs font-display font-medium transition-colors border
              ${activeTrack === f
                ? 'bg-steel text-chalk border-steel'
                : 'bg-transparent border-steel/50 text-ghost hover:text-chalk'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* When All Levels selected: group by level */}
      {activeLevel === 0 ? (
        <div className="mt-8 space-y-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => {
            const meta = LEVEL_META[lvl]
            const lvlCourses = filtered.filter((c) => c.level === lvl)
            if (lvlCourses.length === 0) return null
            return (
              <section key={lvl}>
                <div className="flex items-center gap-3 mb-5">
                  <Image
                    src={meta.badge}
                    alt={meta.name}
                    width={56}
                    height={56}
                    style={{ width: 56, height: 56 }}
                    className="rounded flex-shrink-0"
                  />
                  <div>
                    <p className="text-[10px] font-display font-medium tracking-widest uppercase mb-0.5" style={{ color: meta.color }}>
                      Level {lvl}
                    </p>
                    <h2 className="font-display font-semibold text-chalk text-lg leading-none">
                      {meta.name}
                    </h2>
                    <p className="text-ghost font-body text-xs mt-0.5">{lvlCourses.length} courses</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lvlCourses.map((c) => <CourseCard key={c.slug} c={c} />)}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filtered.length === 0 ? (
            <p className="col-span-full text-ghost font-body text-sm text-center py-8">
              No courses match this filter.
            </p>
          ) : (
            filtered.map((c) => <CourseCard key={c.slug} c={c} />)
          )}
        </div>
      )}
    </>
  )
}
