'use client'
import { useState, useCallback, useEffect } from 'react'
import { TrenduosoWordmark } from '@/components/TrenduosoWordmark'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChartCanvas } from '@/components/canvas/ChartCanvas'
import { DrawingTools } from '@/components/canvas/DrawingTools'
import { GradingPanel } from '@/components/canvas/GradingPanel'
import { StepTracker } from '@/components/lessons/StepTracker'
import { LessonPrompt } from '@/components/lessons/LessonPrompt'
import { MultiChoiceActivity } from '@/components/lessons/MultiChoiceActivity'
import { CalculationActivity } from '@/components/lessons/CalculationActivity'
import { VideoPlayer } from '@/components/lessons/VideoPlayer'
import { FreeTextActivity } from '@/components/lessons/FreeTextActivity'
import { LevelUpModal } from '@/components/LevelUpModal'
import { AchievementToast, checkAchievements } from '@/components/AchievementToast'
import type { Achievement } from '@/components/AchievementToast'
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

function candleDateRange(): { from: string; to: string } {
  const to = new Date()
  to.setDate(to.getDate() - 1)
  const from = new Date(to)
  from.setDate(from.getDate() - 60)
  return {
    from: from.toISOString().slice(0, 10),
    to:   to.toISOString().slice(0, 10),
  }
}

interface Props {
  lessonId: string
  courseSlug: string
  lessonSlug: string
  courseTitle: string
  lessonTitle: string
  lessonOrder: number
  lessonCount: number
  xpValue: number
  lessonType: string
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
  lessonType,
  content,
  steps: initialSteps,
  nextLessonSlug,
  alreadyCompleted,
  totalCompleted,
}: Props) {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'activity'>(() =>
    content?.intro_text || content?.video_url ? 'intro' : 'activity'
  )

  // Sync phase when content changes (handles HMR and client-side lesson navigation)
  useEffect(() => {
    setPhase(content?.intro_text || content?.video_url ? 'intro' : 'activity')
  }, [lessonSlug, content?.intro_text, content?.video_url])

  const [candles, setCandles] = useState<Candle[]>(DEMO_CANDLES)
  const [graded, setGraded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [earnedXp, setEarnedXp] = useState(0)
  const [steps, setSteps] = useState<LessonStep[]>(initialSteps)
  const [panelOpen, setPanelOpen] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [levelUpLevel, setLevelUpLevel] = useState(1)
  const [achievement, setAchievement] = useState<Achievement | null>(null)
  const { lines, setGradingResult, gradingResult, clearLines } = useCanvasStore()
  const closeLevelUp = useCallback(() => setShowLevelUp(false), [])
  const closeAchievement = useCallback(() => setAchievement(null), [])

  useEffect(() => {
    const ticker    = content?.ticker    ?? 'C:EURUSD'
    const timeframe = content?.timeframe ?? 'day'
    const { from, to } = candleDateRange()
    fetch(`/api/candles?ticker=${encodeURIComponent(ticker)}&timespan=${timeframe}&from=${from}&to=${to}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.results?.length) setCandles(data.results) })
      .catch(() => { /* keep demo candles */ })
  }, [content?.ticker, content?.timeframe])

  const activityType = content?.activity_type
  // Only show the canvas for explicit canvas_exercise lessons or draw_* activity types.
  // Reading/video/flashcard lessons get their own view below.
  const isPassiveLessonType = lessonType === 'reading' || lessonType === 'video' || lessonType === 'flashcard'
  const isCanvasActivity = !isPassiveLessonType && (!activityType || activityType === 'draw_trendline' || activityType === 'draw_horizontal')

  const prompt = content?.exercise_prompt
    ?? 'Draw a valid uptrend line connecting at least three higher lows. Your line must not cut through candle bodies.'

  const handleActivityComplete = useCallback(async (score: number, gradingRes?: GradingResult) => {
    if (gradingRes) setGradingResult(gradingRes)
    setGraded(true)
    setPanelOpen(true)
    setSteps((prev) => prev.map((s, i) => i === prev.length - 1 ? { ...s, completed: true } : s))

    if (lessonId) {
      setSaving(true)
      const outcome = await completeLesson(courseSlug, lessonSlug, score)
      if ('earned' in outcome) {
        setEarnedXp(outcome.earned)
        if (outcome.leveledUp) {
          setLevelUpLevel(outcome.newLevel)
          setShowLevelUp(true)
        } else {
          const badge = checkAchievements({
            score,
            newStreak: outcome.newStreak,
            earnedXp: outcome.earned,
            totalXp: 0,
            isFirstLesson: !alreadyCompleted && totalCompleted === 0,
          })
          if (badge) setAchievement(badge)
        }
      }
      setSaving(false)
    }
    router.refresh()
  }, [lessonId, courseSlug, lessonSlug, alreadyCompleted, totalCompleted, router])

  const handleGrade = async () => {
    if (lines.length === 0) return

    const line = lines[lines.length - 1]
    const prices = candles.map((c) => c.l)
    const priceMin = Math.min(...prices)
    const priceMax = Math.max(...candles.map((c) => c.h))

    let result: GradingResult
    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drawn: line,
          reference: content?.reference_line ?? { x1: 0, y1: 85, x2: 100, y2: 20 },
          candles,
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

    await handleActivityComplete(result.score, result)
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
      <LevelUpModal show={showLevelUp} level={levelUpLevel} onClose={closeLevelUp} />
      <AchievementToast achievement={achievement} onClose={closeAchievement} />
      {/* Top bar */}
      <header className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-steel bg-slate flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-colour.webp" width={36} height={36} alt="Trenduoso" style={{ width: 36, height: 36 }} />
          <span className="font-display font-bold tracking-[-0.03em] text-base">
            <TrenduosoWordmark />
          </span>
        </Link>
        <nav className="text-[12px] text-ghost font-body hidden md:block">
          <Link href="/courses" className="hover:text-chalk">{courseTitle}</Link>
          <span className="mx-1.5">›</span>
          <span className="text-chalk">{lessonTitle}</span>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 text-[12px] font-body">
          <AnimatePresence>
            {earnedXp > 0 && (
              <motion.span
                key="xp"
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0,  scale: 1   }}
                exit={{    opacity: 0, y:  8,  scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-acuity-teal font-mono font-medium"
              >
                +{earnedXp} XP
              </motion.span>
            )}
          </AnimatePresence>
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

      {/* Exercise prompt — canvas only, activity phase only */}
      {phase === 'activity' && isCanvasActivity && !isPassiveLessonType && <LessonPrompt prompt={prompt} />}

      {/* Body — stacks vertically on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* Main area */}
        {phase === 'intro' && content?.intro_text ? (
          /* ── INTRO / READING PHASE ── */
          <div className="flex-1 overflow-y-auto bg-obsidian">
            <div className="max-w-2xl mx-auto px-6 py-8 md:py-12">
              <p className="text-[11px] font-display font-medium tracking-widest text-acuity-teal/80 uppercase mb-3">
                {lessonType === 'video' ? 'Video lesson' : lessonType === 'reading' ? 'Reading' : 'Before you start'}
              </p>
              <h1 className="font-display font-bold text-chalk text-2xl md:text-3xl leading-tight mb-6">{lessonTitle}</h1>

              {/* Body text */}
              {content.intro_text && (
                <div className="space-y-4 mb-8">
                  {content.intro_text.split('\n\n').map((para, i) => (
                    <p key={i} className="font-body text-ghost text-[15px] leading-[1.75]">{para}</p>
                  ))}
                </div>
              )}

              {/* Video player */}
              {content.video_url && content.video_provider && (
                <div className="mb-8">
                  <VideoPlayer url={content.video_url} provider={content.video_provider} />
                </div>
              )}

              {/* Key points */}
              {content.key_points && content.key_points.length > 0 && (
                <div className="bg-steel/30 border border-steel rounded-xl p-5 mb-8">
                  <p className="text-[10px] font-display font-semibold tracking-widest text-acuity-teal uppercase mb-3">Key takeaways</p>
                  <ul className="space-y-2.5">
                    {content.key_points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-acuity-teal" />
                        <span className="font-body text-chalk text-[13px] leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              {content.activity_type ? (
                <button
                  onClick={() => setPhase('activity')}
                  className="w-full md:w-auto bg-acuity-blue text-white font-display font-medium text-sm px-8 py-3 rounded-xl hover:bg-acuity-blue/90 transition-colors"
                >
                  Start the exercise →
                </button>
              ) : (
                <button
                  onClick={() => handleActivityComplete(100)}
                  disabled={saving}
                  className="w-full md:w-auto bg-acuity-blue text-white font-display font-medium text-sm px-8 py-3 rounded-xl hover:bg-acuity-blue/90 transition-colors disabled:opacity-40"
                >
                  {alreadyCompleted ? 'Already complete — continue →' : 'Mark as complete →'}
                </button>
              )}
            </div>
          </div>
        ) : isPassiveLessonType && !activityType ? (
          /* ── PASSIVE LESSON — reading/video with no content loaded yet ── */
          <div className="flex-1 overflow-y-auto bg-obsidian flex flex-col items-center justify-center px-6 py-10">
            <div className="max-w-lg w-full">
              <p className="text-[11px] font-display font-medium tracking-widest text-acuity-teal/70 uppercase mb-3">
                {lessonType === 'video' ? 'Video lesson' : 'Reading'}
              </p>
              <h2 className="font-display font-bold text-chalk text-2xl mb-4">{lessonTitle}</h2>
              <div className="bg-steel/20 border border-steel/40 rounded-xl p-6 mb-8">
                <p className="text-[13px] text-ghost font-body leading-relaxed">
                  Full lesson content for this module is being added progressively. You can mark this lesson complete and continue through the course — the content will be available on your next visit.
                </p>
              </div>
              <button
                onClick={() => handleActivityComplete(100)}
                disabled={saving}
                className="w-full md:w-auto bg-acuity-blue text-white text-sm font-display font-medium px-8 py-3 rounded-xl hover:bg-acuity-blue/90 transition-colors disabled:opacity-40"
              >
                {alreadyCompleted ? 'Already complete — continue →' : 'Mark as complete →'}
              </button>
            </div>
          </div>
        ) : isCanvasActivity ? (
          <div
            className="flex flex-col overflow-hidden flex-shrink-0 md:flex-1"
            style={{ height: 'clamp(240px, 45vh, 420px)' }}
          >
            <div className="flex-1 overflow-hidden md:h-auto">
              <ChartCanvas candles={candles} onGrade={handleGrade} />
            </div>
            <DrawingTools />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-obsidian">
            {activityType === 'multi_choice' && (
              <MultiChoiceActivity
                question={content?.question ?? ''}
                options={content?.options ?? []}
                correctIndex={content?.correct_index ?? 0}
                explanation={content?.explanation ?? ''}
                onComplete={(score) => handleActivityComplete(score)}
              />
            )}
            {activityType === 'calculation' && (
              <CalculationActivity
                problem={content?.problem ?? ''}
                correctAnswer={content?.correct_answer ?? '0'}
                tolerance={content?.tolerance ?? 0.05}
                unit={content?.unit ?? ''}
                hint={content?.hint}
                solutionSteps={content?.solution_steps}
                onComplete={(score) => handleActivityComplete(score)}
              />
            )}
            {activityType === 'free_text' && (
              <FreeTextActivity
                prompt={content?.reflection_prompt ?? 'What did you learn from this lesson?'}
                onComplete={(score) => handleActivityComplete(score)}
              />
            )}
          </div>
        )}

        {/* Right panel */}
        <aside
          className={`
            md:w-64 md:border-l md:border-steel md:bg-slate md:flex-shrink-0 md:flex md:flex-col md:overflow-y-auto
            border-t border-steel bg-slate overflow-y-auto
            transition-all duration-300
            ${panelOpen || !isCanvasActivity ? 'flex flex-col flex-1 md:flex-none' : 'hidden md:flex'}
          `}
        >
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-steel">
            <span className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase">
              Lesson {lessonOrder}{lessonCount > 0 ? ` / ${lessonCount}` : ''}
            </span>
            <h3 className="font-display font-semibold text-chalk text-sm mt-0.5">{lessonTitle}</h3>
          </div>

          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-steel flex-1">
            <StepTracker
              steps={steps}
              currentStepIndex={graded ? steps.length : phase === 'intro' ? 0 : 1}
            />
          </div>

          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-steel">
            {phase === 'intro' ? (
              <>
                <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">Up next</p>
                <p className="text-[12px] text-ghost font-body leading-relaxed mb-4">
                  {content?.activity_type ? 'Read through, then start the exercise.' : 'Read through and mark complete.'}
                </p>
                {content?.activity_type ? (
                  <button
                    onClick={() => setPhase('activity')}
                    className="w-full bg-acuity-blue text-white text-sm font-display font-medium py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors"
                  >
                    Start exercise →
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivityComplete(100)}
                    disabled={saving}
                    className="w-full bg-acuity-blue text-white text-sm font-display font-medium py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-40"
                  >
                    Mark complete →
                  </button>
                )}
              </>
            ) : isPassiveLessonType && !activityType ? (
              graded || alreadyCompleted ? (
                <>
                  <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Complete</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-mono text-[32px] font-medium text-acuity-teal">✓</span>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full bg-acuity-blue text-white text-sm font-display font-medium py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors"
                  >
                    {nextLessonSlug ? 'Next lesson →' : 'Back to course →'}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">Progress</p>
                  <p className="text-[12px] text-ghost font-body leading-relaxed">
                    {lessonType === 'video' ? 'Watch the lesson then mark complete.' : 'Read through then mark complete.'}
                  </p>
                </>
              )
            ) : isCanvasActivity ? (
              graded && gradingResult ? (
                <GradingPanel result={gradingResult} onNext={handleNext} onShowReference={() => {}} />
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
              )
            ) : graded ? (
              <>
                <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-3">Complete</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-mono text-[32px] font-medium text-acuity-teal">✓</span>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-acuity-blue text-white text-sm font-display font-medium py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors"
                >
                  {nextLessonSlug ? 'Next lesson →' : 'Back to course →'}
                </button>
              </>
            ) : (
              <>
                <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">
                  {activityType === 'calculation' ? 'Enter your answer' : 'Select an answer'}
                </p>
                <p className="text-[12px] text-ghost font-body leading-relaxed">
                  {activityType === 'calculation'
                    ? 'Read the problem, work through the calculation, then type your answer.'
                    : 'Read the question carefully and select the best answer.'}
                </p>
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
