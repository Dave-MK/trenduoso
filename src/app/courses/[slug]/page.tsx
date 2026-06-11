import { Navbar } from '@/components/nav/Navbar'
import Link from 'next/link'

const LESSONS = [
  { slug: 'lesson-1', title: 'What makes a valid trendline?',     type: 'reading',          completed: true,  xp: 30 },
  { slug: 'lesson-2', title: 'Identifying higher lows',            type: 'video',            completed: true,  xp: 30 },
  { slug: 'lesson-3', title: 'Drawing your first trendline',       type: 'canvas_exercise',  completed: true,  xp: 50 },
  { slug: 'lesson-4', title: 'Drawing valid uptrend lines',        type: 'canvas_exercise',  completed: false, xp: 50 },
  { slug: 'lesson-5', title: 'Downtrend lines — mirror technique', type: 'canvas_exercise',  completed: false, xp: 50 },
  { slug: 'lesson-6', title: 'Channel construction',               type: 'reading',          completed: false, xp: 30 },
]

const TYPE_LABEL: Record<string, string> = {
  reading:          'Reading',
  video:            'Video',
  canvas_exercise:  'Exercise',
}

const TYPE_COLOR: Record<string, string> = {
  reading:         'text-ghost',
  video:           'text-acuity-blue',
  canvas_exercise: 'text-acuity-teal',
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 py-12 max-w-3xl">
        <div className="mb-2">
          <Link href="/courses" className="text-ghost text-sm font-body hover:text-chalk">← All courses</Link>
        </div>
        <span className="text-[9px] font-display font-medium tracking-widest text-acuity-teal bg-acuity-teal/10 uppercase px-2 py-1 rounded">
          Technical
        </span>
        <h1 className="font-display font-bold text-3xl text-chalk mt-3 mb-1">Trendlines and channels</h1>
        <p className="text-ghost font-body text-sm mb-6">
          Draw valid trendlines, identify channels, and grade your accuracy against reference answers.
        </p>

        <div className="flex gap-6 text-[12px] text-ghost font-body mb-8">
          <span>24 lessons</span>
          <span>5.8 hrs</span>
          <span className="text-acuity-blue">18% complete</span>
        </div>

        <div className="space-y-2">
          {LESSONS.map((l, i) => (
            <Link
              key={l.slug}
              href={`/courses/${slug}/${l.slug}`}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors
                ${l.completed
                  ? 'bg-slate border-steel opacity-60 hover:opacity-100 hover:border-acuity-blue'
                  : !LESSONS[i - 1]?.completed && i > 0
                  ? 'bg-slate border-steel opacity-40 pointer-events-none cursor-not-allowed'
                  : 'bg-slate border-steel hover:border-acuity-blue'
                }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono flex-shrink-0
                ${l.completed ? 'bg-acuity-teal text-obsidian' : 'border border-steel text-ghost'}`}>
                {l.completed ? '✓' : i + 1}
              </div>
              <div className="flex-1">
                <p className="font-display font-medium text-chalk text-sm">{l.title}</p>
                <span className={`text-[10px] font-display font-medium ${TYPE_COLOR[l.type]}`}>
                  {TYPE_LABEL[l.type]}
                </span>
              </div>
              <span className="font-mono text-[11px] text-ghost">+{l.xp} XP</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
