import { Navbar } from '@/components/nav/Navbar'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Track } from '@/types/course'

const TRACK_COLORS: Record<Track, string> = {
  foundations: 'text-acuity-blue bg-acuity-blue/10',
  technical:   'text-acuity-teal bg-acuity-teal/10',
  fundamental: 'text-amber bg-amber/10',
  risk:        'text-ghost bg-ghost/10',
  strategy:    'text-amber bg-amber/10',
}

const LEVEL_COLORS: Record<number, string> = {
  1: '#4DD9EC', 2: '#00C4DC', 3: '#00A8BE', 4: '#00A090',
  5: '#009480', 6: '#007888', 7: '#5AADBE', 8: '#A8D8DF',
  9: '#E0B84A', 10: '#F5C842',
}

const TYPE_LABEL: Record<string, string> = {
  reading:          'Reading',
  video:            'Video',
  canvas_exercise:  'Exercise',
}
const TYPE_COLOR: Record<string, string> = {
  reading:          'text-ghost',
  video:            'text-acuity-blue',
  canvas_exercise:  'text-acuity-teal',
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!course) notFound()

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, slug, title, order_index, type, xp_value')
    .eq('course_id', course.id)
    .order('order_index')

  // Get user progress for this course
  let completedIds = new Set<string>()
  if (user && (lessons ?? []).length > 0) {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('completed', true)
      .in('lesson_id', (lessons ?? []).map((l) => l.id))

    completedIds = new Set((progress ?? []).map((p) => p.lesson_id))
  }

  const lessonList = lessons ?? []
  const completedCount = lessonList.filter((l) => completedIds.has(l.id)).length
  const pct = lessonList.length > 0 ? Math.round((completedCount / lessonList.length) * 100) : 0
  const track = course.track as Track

  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 py-12 max-w-3xl">
        <div className="mb-4">
          <Link href="/courses" className="text-ghost text-sm font-body hover:text-chalk">← All courses</Link>
        </div>

        <div className="flex items-center gap-3 mb-3">
          {course.level && (
            <Image
              src={`/level-${course.level}.png`}
              alt={course.level_name ?? ''}
              width={80}
              height={80}
              style={{ width: 80, height: 80 }}
              className="rounded flex-shrink-0"
            />
          )}
          <div className="flex flex-col gap-1">
            {course.level_name && (
              <span
                className="text-[10px] font-display font-medium tracking-widest uppercase"
                style={{ color: LEVEL_COLORS[course.level] ?? '#00C4DC' }}
              >
                Level {course.level} — {course.level_name}
              </span>
            )}
            <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded w-fit ${TRACK_COLORS[track]}`}>
              {course.track}
            </span>
          </div>
        </div>
        <h1 className="font-display font-bold text-3xl text-chalk mb-1">{course.title}</h1>
        <p className="text-ghost font-body text-sm mb-4">{course.description}</p>

        <div className="flex gap-6 text-[12px] text-ghost font-body mb-2">
          <span>{lessonList.length || course.lesson_count} lessons</span>
          <span>{Number(course.hours).toFixed(1)} hrs</span>
          {pct > 0 && (
            <span className={pct === 100 ? 'text-acuity-teal' : 'text-acuity-blue'}>
              {pct === 100 ? 'Complete' : `${pct}% complete`}
            </span>
          )}
        </div>

        {pct > 0 && (
          <div className="h-0.5 bg-steel rounded-full overflow-hidden mb-8">
            <div
              className={`h-full rounded-full ${pct === 100 ? 'bg-acuity-teal' : 'bg-acuity-blue'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}

        {lessonList.length === 0 ? (
          <p className="text-ghost text-sm font-body mt-8">Lessons coming soon.</p>
        ) : (
          <div className="space-y-2 mt-6">
            {lessonList.map((l, i) => {
              const done = completedIds.has(l.id)
              const prevDone = i === 0 || completedIds.has(lessonList[i - 1].id)
              const locked = !done && !prevDone && user != null

              return (
                <Link
                  key={l.slug}
                  href={locked ? '#' : `/courses/${slug}/${l.slug}`}
                  aria-disabled={locked}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors
                    ${done
                      ? 'bg-slate border-steel opacity-60 hover:opacity-100 hover:border-acuity-blue'
                      : locked
                      ? 'bg-slate border-steel opacity-40 pointer-events-none'
                      : 'bg-slate border-steel hover:border-acuity-blue'
                    }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono flex-shrink-0
                    ${done ? 'bg-acuity-teal text-obsidian' : 'border border-steel text-ghost'}`}>
                    {done ? '✓' : l.order_index}
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-medium text-chalk text-sm">{l.title}</p>
                    <span className={`text-[10px] font-display font-medium ${TYPE_COLOR[l.type]}`}>
                      {TYPE_LABEL[l.type]}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-ghost">+{l.xp_value} XP</span>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
