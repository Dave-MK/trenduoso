'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChartCanvas } from '@/components/canvas/ChartCanvas'
import { DrawingTools } from '@/components/canvas/DrawingTools'
import { GradingPanel } from '@/components/canvas/GradingPanel'
import { StepTracker } from '@/components/lessons/StepTracker'
import { LessonPrompt } from '@/components/lessons/LessonPrompt'
import { useCanvasStore } from '@/store/canvas'
import { completeLesson } from '@/app/actions/progress'
import type { LessonContent, LessonStep, GradingResult } from '@/types/lesson'
import type { Candle } from '@/lib/polygon'

const DEMO_CANDLES: Candle[] = [
  { t: 0,  o: 1.0740, h: 1.0760, l: 1.0725, c: 1.0755, v: 1200 },
  { t: 1,  o: 1.0755, h: 1.0780, l: 1.0740, c: 1.0770, v: 980 },
  { t: 2,  o: 1.0770, h: 1.0790, l: 1.0750, c: 1.0760, v: 1100 },
  { t: 3,  o: 1.0760, h: 1.0800, l: 1.0755, c: 1.0795, v: 1350 },
  { t: 4,  o: 1.0795, h: 1.0820, l: 1.0780, c: 1.0810, v: 900 },
  { t: 5,  o: 1.0810, h: 1.0840, l: 1.0800, c: 1.0830, v: 1050 },
  { t: 6,  o: 1.0830, h: 1.0855, l: 1.0815, c: 1.0820, v: 1200 },
  { t: 7,  o: 1.0820, h: 1.0845, l: 1.0810, c: 1.0840, v: 870 },
  { t: 8,  o: 1.0840, h: 1.0870, l: 1.0830, c: 1.0860, v: 1400 },
  { t: 9,  o: 1.0860, h: 1.0890, l: 1.0848, c: 1.0875, v: 1100 },
  { t: 10, o: 1.0875, h: 1.0900, l: 1.0855, c: 1.0865, v: 950 },
  { t: 11, o: 1.0865, h: 1.0895, l: 1.0860, c: 1.0888, v: 1050 },
  { t: 12, o: 1.0888, h: 1.0920, l: 1.0875, c: 1.0910, v: 1300 },
]

interface Props {
  lessonId: string
  courseSlug: string
  lessonSlug: string
  courseTitle: string
  lessonTitle: string
  lessonOrder: number
  lessonCount: number
  xpValue: number
  content: LessonContent | null
  steps: LessonStep[]
  nextLessonSlug: string | null
  alreadyCompleted: boolean
  totalCompleted: number
}

export function LessonClient({
  lessonId,
  courseSlug,
  lessonSlug,
  courseTitle,
  lessonTitle,
  lessonOrder,
  lessonCount,
  xpValue,
  content,
  steps: initialSteps,
  nextLessonSlug,
  alreadyCompleted,
  totalCompleted,
}: Props) {
  const router = useRouter()
  const [graded, setGraded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [earnedXp, setEarnedXp] = useState(0)
  const [steps, setSteps] = useState<LessonStep[]>(initialSteps)
  const [panelOpen, setPanelOpen] = useState(false)
  const { lines, setGradingResult, gradingResult, clearLines } = useCanvasStore()

  const prompt = content?.exercise_prompt
    ?? 'Draw a valid uptrend line connecting at least three higher lows. Your line must not cut through candle bodies.'

  const handleGrade = async () => {
    if (lines.length === 0) return

    const line = lines[lines.length - 1]
    const prices = DEMO_CANDLES.map((c) => c.l)
    const priceMin = Math.min(...prices)
    const priceMax = Math.max(...DEMO_CANDLES.map((c) => c.h))

    let result: GradingResult
    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drawn: line,
          reference: content?.reference_line ?? { x1: 0, y1: 85, x2: 100, y2: 20 },
          candles: DEMO_CANDLES,
          priceMin,
          priceMax,
        }),
      })
      result = await res.json()
    } catch {
      result = {
        score: 75, accuracy: 80, touch_points: 2, touch_points_max: 3,
        body_cuts: false, feedback: 'Good effort — could not connect to grading server.',
      }
    }

    setGradingResult(result)
    setGraded(true)
    setPanelOpen(true)

    setSteps((prev) => prev.map((s, i) => i === 2 ? { ...s, completed: true } : s))

    if (lessonId) {
      setSaving(true)
      const outcome = await completeLesson(courseSlug, lessonSlug, result.score)
      if ('earned' in outcome) setEarnedXp(outcome.earned)
      setSaving(false)
    }

    router.refresh()
  }

  const handleNext = () => {
    clearLines()
    if (nextLessonSlug) {
      router.push(`/courses/${courseSlug}/${nextLessonSlug}`)
    } else {
      router.push(`/courses/${courseSlug}`)
    }
  }

  const pct = lessonCount > 0 ? Math.round((totalCompleted / lessonCount) * 100) : 0

  return (
    <div className="flex flex-col h-[100dvh] bg-obsidian overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-steel bg-slate flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-colour.webp" width={28} height={28} alt="tradecuity" style={{ width: 28, height: 28 }} />
          <span className="font-display font-bold tracking-[-0.03em] text-base">
            <span className="text-chalk">trade</span><span className="text-acuity-blue">cuity</span>
          </span>
        </Link>
        <nav className="text-[12px] text-ghost font-body hidden md:block">
          <Link href="/courses" className="hover:text-chalk">{courseTitle}</Link>
          <span className="mx-1.5">›</span>
          <span className="text-chalk">{lessonTitle}</span>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 text-[12px] font-body">
          {earnedXp > 0 && (
            <span className="text-acuity-teal font-mono animate-pulse">+{earnedXp} XP</span>
          )}
          {saving && <span className="text-ghost font-mono text-[11px]">Saving…</span>}
          {alreadyCompleted && !graded && (
            <span className="text-acuity-teal text-[11px]">✓ Done</span>
          )}
          {/* Mobile panel toggle */}
          <button
            onClick={() => setPanelOpen(v => !v)}
            className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-steel/50 text-ghost hover:text-chalk text-[11px] font-display font-medium transition-colors"
          >
            {panelOpen ? 'Hide panel' : 'Show panel'}
          </button>
        </div>
      </header>

      {/* Exercise prompt */}
      <LessonPrompt prompt={prompt} />

      {/* Body — stacks vertically on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Canvas — fixed height on mobile, flex on desktop */}
        <div
          className="flex flex-col overflow-hidden flex-shrink-0 md:flex-1"
          style={{ height: 'clamp(240px, 45vh, 420px)' }}
        >
          <div className="flex-1 overflow-hidden md:h-auto">
            <ChartCanvas candles={DEMO_CANDLES} onGrade={handleGrade} />
          </div>
          <DrawingTools />
        </div>

        {/* Right panel — slide up on mobile, always visible on desktop */}
        <aside
          className={`
            md:w-64 md:border-l md:border-steel md:bg-slate md:flex-shrink-0 md:flex md:flex-col md:overflow-y-auto
            border-t border-steel bg-slate overflow-y-auto
            transition-all duration-300
            ${panelOpen ? 'flex flex-col flex-1' : 'hidden md:flex'}
          `}
        >
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-steel">
            <span className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase">
              Lesson {lessonOrder}{lessonCount > 0 ? ` / ${lessonCount}` : ''}
            </span>
            <h3 className="font-display font-semibold text-chalk text-sm mt-0.5">{lessonTitle}</h3>
          </div>

          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-steel flex-1">
            <StepTracker steps={steps} currentStepIndex={graded ? 3 : 2} />
          </div>

          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-steel">
            {graded && gradingResult ? (
              <GradingPanel
                result={gradingResult}
                onNext={handleNext}
                onShowReference={() => {}}
              />
            ) : (
              <>
                <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Your score</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-mono text-[32px] font-medium text-muted">—</span>
                  <span className="font-mono text-[13px] text-ghost">/ 100</span>
                </div>
                <button
                  onClick={handleGrade}
                  disabled={lines.length === 0}
                  className="w-full bg-acuity-blue text-white text-sm font-display font-medium py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {lines.length === 0 ? 'Draw a line first' : 'Grade my line →'}
                </button>
              </>
            )}
          </div>

          <div className="px-4 sm:px-5 py-3">
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1">Course progress</p>
            <p className="font-mono text-[11px] text-ghost">{totalCompleted}/{lessonCount}</p>
            <div className="h-0.5 bg-steel rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-acuity-blue rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
