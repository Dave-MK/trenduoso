'use client'
import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChartCanvas } from '@/components/canvas/ChartCanvas'
import { DrawingTools } from '@/components/canvas/DrawingTools'
import { GradingPanel } from '@/components/canvas/GradingPanel'
import { StepTracker } from '@/components/lessons/StepTracker'
import { LessonPrompt } from '@/components/lessons/LessonPrompt'
import { useCanvasStore } from '@/store/canvas'
import type { LessonStep, GradingResult } from '@/types/lesson'
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

const STEPS: LessonStep[] = [
  { id: '1', label: 'Identify higher lows',  completed: true },
  { id: '2', label: 'Watch intro video',     completed: true },
  { id: '3', label: 'Draw your trendline',   completed: false },
  { id: '4', label: 'Review feedback',       completed: false },
]

const MOCK_RESULT: GradingResult = {
  score: 87,
  accuracy: 91,
  touch_points: 3,
  touch_points_max: 3,
  body_cuts: false,
  feedback: 'Good line. Slope is 4° steeper than reference — watch for overextension.',
}

export default function LessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  use(params)
  const [graded, setGraded] = useState(false)
  const { lines, setGradingResult, gradingResult } = useCanvasStore()

  const handleGrade = () => {
    if (lines.length === 0) return
    setGradingResult(MOCK_RESULT)
    setGraded(true)
  }

  return (
    <div className="flex flex-col h-screen bg-obsidian overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-steel bg-slate flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-colour.webp" width={20} height={20} alt="tradecuity" style={{ width: 20, height: 20 }} />
          <span className="font-display font-bold tracking-[-0.03em] text-base">
            <span className="text-chalk">trade</span><span className="text-acuity-blue">cuity</span>
          </span>
        </Link>
        <nav className="text-[12px] text-ghost font-body">
          <Link href="/courses" className="hover:text-chalk">Technical Analysis</Link>
          <span className="mx-1.5">›</span>
          <Link href="/courses/trendlines-and-channels" className="hover:text-chalk">Trendlines and channels</Link>
          <span className="mx-1.5">›</span>
          <span className="text-chalk">Lesson 4 of 24</span>
        </nav>
        <div className="flex items-center gap-3 text-[12px] font-body">
          <span>🔥 7 day streak</span>
          <span className="text-acuity-teal font-mono">+120 XP today</span>
        </div>
      </header>

      {/* Exercise prompt */}
      <LessonPrompt prompt="Draw a valid **uptrend line** connecting at least three higher lows. Your line must not cut through candle bodies." />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ChartCanvas candles={DEMO_CANDLES} onGrade={handleGrade} />
          </div>
          <DrawingTools />
        </div>

        {/* Right panel */}
        <aside className="w-64 border-l border-steel bg-slate flex-shrink-0 flex flex-col overflow-y-auto">
          <div className="px-5 py-4 border-b border-steel">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase">Lesson 4 / 24</span>
            </div>
            <h3 className="font-display font-semibold text-chalk text-sm">Drawing valid uptrend lines</h3>
          </div>

          <div className="px-5 py-4 border-b border-steel flex-1">
            <StepTracker steps={STEPS} currentStepIndex={2} />
          </div>

          <div className="px-5 py-4 border-b border-steel">
            {graded && gradingResult ? (
              <GradingPanel
                result={gradingResult}
                onNext={() => { /* navigate to next lesson */ }}
                onShowReference={() => { /* show reference */ }}
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

          <div className="px-5 py-3">
            <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1">Course progress</p>
            <p className="font-mono text-[11px] text-ghost">4/24</p>
            <div className="h-0.5 bg-steel rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-acuity-blue rounded-full" style={{ width: `${(4 / 24) * 100}%` }} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
