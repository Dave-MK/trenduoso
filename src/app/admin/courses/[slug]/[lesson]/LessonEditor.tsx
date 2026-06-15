'use client'
import { useState, useTransition } from 'react'
import { updateLesson, deleteLesson } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { LessonContent, ActivityType } from '@/types/lesson'

interface LessonMeta {
  id: string
  slug: string
  title: string
  type: string
  xp_value: number
  order_index: number
}

interface Props {
  lesson: LessonMeta
  courseSlug: string
  courseId: string
  initialContent: LessonContent | null
}

export function LessonEditor({ lesson, courseSlug, courseId, initialContent }: Props) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // Meta
  const [title, setTitle] = useState(lesson.title)
  const [lessonType, setLessonType] = useState(lesson.type)
  const [xpValue, setXpValue] = useState(lesson.xp_value)

  // Reading content
  const [introText, setIntroText] = useState(initialContent?.intro_text ?? '')
  const [keyPoints, setKeyPoints] = useState<string[]>(
    initialContent?.key_points?.length ? initialContent.key_points : ['']
  )

  // Video
  const [videoUrl, setVideoUrl] = useState(initialContent?.video_url ?? '')
  const [videoProvider, setVideoProvider] = useState<'youtube' | 'vimeo' | 'direct'>(
    initialContent?.video_provider ?? 'youtube'
  )

  // Activity
  const [activityType, setActivityType] = useState<ActivityType | ''>(
    initialContent?.activity_type ?? ''
  )

  // Multi-choice
  const [mcQuestion, setMcQuestion] = useState(initialContent?.question ?? '')
  const [mcOptions, setMcOptions] = useState<string[]>(
    initialContent?.options?.length === 4 ? initialContent.options : ['', '', '', '']
  )
  const [mcCorrectIndex, setMcCorrectIndex] = useState(initialContent?.correct_index ?? 0)
  const [mcExplanation, setMcExplanation] = useState(initialContent?.explanation ?? '')

  // Calculation
  const [calcProblem, setCalcProblem] = useState(initialContent?.problem ?? '')
  const [calcAnswer, setCalcAnswer] = useState(initialContent?.correct_answer ?? '')
  const [calcTolerance, setCalcTolerance] = useState(initialContent?.tolerance ?? 0.05)
  const [calcUnit, setCalcUnit] = useState(initialContent?.unit ?? '')
  const [calcHint, setCalcHint] = useState(initialContent?.hint ?? '')
  const [calcSteps, setCalcSteps] = useState<string[]>(
    initialContent?.solution_steps?.length ? initialContent.solution_steps : ['']
  )

  // Canvas
  const [canvasPrompt, setCanvasPrompt] = useState(initialContent?.exercise_prompt ?? '')
  const [canvasTicker, setCanvasTicker] = useState(initialContent?.ticker ?? 'C:EURUSD')
  const [canvasTimeframe, setCanvasTimeframe] = useState(initialContent?.timeframe ?? 'day')
  const [refX1, setRefX1] = useState(initialContent?.reference_line?.x1 ?? 0)
  const [refY1, setRefY1] = useState(initialContent?.reference_line?.y1 ?? 85)
  const [refX2, setRefX2] = useState(initialContent?.reference_line?.x2 ?? 100)
  const [refY2, setRefY2] = useState(initialContent?.reference_line?.y2 ?? 20)

  // Free text
  const [reflectionPrompt, setReflectionPrompt] = useState(initialContent?.reflection_prompt ?? '')

  const buildContent = (): LessonContent => {
    const content: LessonContent = {}

    if (introText.trim()) content.intro_text = introText.trim()
    const kps = keyPoints.filter((k) => k.trim())
    if (kps.length) content.key_points = kps

    if (lessonType === 'video' && videoUrl.trim()) {
      content.video_url = videoUrl.trim()
      content.video_provider = videoProvider
    }

    if (activityType) {
      content.activity_type = activityType as ActivityType
      if (activityType === 'multi_choice') {
        content.question = mcQuestion
        content.options = mcOptions
        content.correct_index = mcCorrectIndex
        content.explanation = mcExplanation
      } else if (activityType === 'calculation') {
        content.problem = calcProblem
        content.correct_answer = calcAnswer
        content.tolerance = calcTolerance
        content.unit = calcUnit
        if (calcHint.trim()) content.hint = calcHint
        const steps = calcSteps.filter((s) => s.trim())
        if (steps.length) content.solution_steps = steps
      } else if (activityType === 'draw_trendline' || activityType === 'draw_horizontal') {
        content.exercise_prompt = canvasPrompt
        content.ticker = canvasTicker
        content.timeframe = canvasTimeframe
        content.reference_line = { x1: refX1, y1: refY1, x2: refX2, y2: refY2 }
      } else if (activityType === 'free_text') {
        content.reflection_prompt = reflectionPrompt
      }
    }

    return content
  }

  const handleSave = () => {
    setError('')
    startTransition(async () => {
      const result = await updateLesson(lesson.id, {
        title: title.trim(),
        type: lessonType,
        xp_value: xpValue,
        content: buildContent(),
      })
      if (result.error) {
        setError(result.error)
      } else {
        setMessage('Saved successfully')
        setTimeout(() => setMessage(''), 3000)
        router.refresh()
      }
    })
  }

  const handleDelete = () => {
    if (!confirm(`Delete "${lesson.title}"? This cannot be undone.`)) return
    startTransition(async () => {
      const result = await deleteLesson(lesson.id, courseId)
      if (result.error) { setError(result.error); return }
      router.push(`/admin/courses/${courseSlug}`)
    })
  }

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-acuity-blue text-white text-sm font-display font-medium px-6 py-2.5 rounded-lg disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Save changes'}
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-sm text-ghost hover:text-red-400 transition-colors disabled:opacity-30"
        >
          Delete lesson
        </button>
        {message && <span className="text-xs text-acuity-teal font-body">{message}</span>}
        {error && <span className="text-xs text-red-400 font-body">{error}</span>}
      </div>

      {/* Lesson settings */}
      <Section title="Lesson settings">
        <Label label="Title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-field w-full" />
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <Label label="Type">
            <select value={lessonType} onChange={(e) => setLessonType(e.target.value)} className="input-field w-full">
              <option value="reading">Reading</option>
              <option value="video">Video</option>
              <option value="canvas_exercise">Canvas exercise</option>
            </select>
          </Label>
          <Label label="XP value">
            <input
              type="number"
              value={xpValue}
              onChange={(e) => setXpValue(parseInt(e.target.value) || 50)}
              min={10} max={500} step={10}
              className="input-field w-full"
            />
          </Label>
        </div>
      </Section>

      {/* Reading content */}
      <Section title="Reading content">
        <Label label="Introduction text (separate paragraphs with a blank line)">
          <textarea
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            rows={10}
            className="input-field w-full resize-y"
            placeholder="Write the lesson content here…"
          />
        </Label>
        <Label label="Key takeaways">
          <div className="space-y-2">
            {keyPoints.map((kp, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={kp}
                  onChange={(e) => {
                    const next = [...keyPoints]
                    next[i] = e.target.value
                    setKeyPoints(next)
                  }}
                  placeholder={`Takeaway ${i + 1}`}
                  className="input-field flex-1"
                />
                {keyPoints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setKeyPoints(keyPoints.filter((_, j) => j !== i))}
                    className="text-ghost hover:text-red-400 text-base px-2 leading-none"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setKeyPoints([...keyPoints, ''])}
              className="text-xs text-acuity-blue hover:text-acuity-blue/80 font-display font-medium"
            >
              + Add takeaway
            </button>
          </div>
        </Label>
      </Section>

      {/* Video */}
      {lessonType === 'video' && (
        <Section title="Video">
          <Label label="Provider">
            <select
              value={videoProvider}
              onChange={(e) => setVideoProvider(e.target.value as 'youtube' | 'vimeo' | 'direct')}
              className="input-field w-56"
            >
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="direct">Direct URL (MP4)</option>
            </select>
          </Label>
          <Label label="Video URL">
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder={
                videoProvider === 'youtube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : videoProvider === 'vimeo'
                  ? 'https://vimeo.com/...'
                  : 'https://example.com/video.mp4'
              }
              className="input-field w-full"
            />
          </Label>
        </Section>
      )}

      {/* Exercise builder */}
      <Section title="Interactive exercise">
        <Label label="Activity type">
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value as ActivityType | '')}
            className="input-field w-full"
          >
            <option value="">No exercise — reading / video only</option>
            <option value="multi_choice">Multiple choice quiz</option>
            <option value="calculation">Calculation</option>
            <option value="draw_trendline">Canvas — draw trendline</option>
            <option value="draw_horizontal">Canvas — draw support / resistance</option>
            <option value="free_text">Free-text reflection</option>
          </select>
        </Label>

        {/* Multiple choice */}
        {activityType === 'multi_choice' && (
          <div className="space-y-4 border-t border-steel/40 pt-4 mt-2">
            <Label label="Question">
              <textarea
                value={mcQuestion}
                onChange={(e) => setMcQuestion(e.target.value)}
                rows={2}
                className="input-field w-full resize-none"
              />
            </Label>
            <div>
              <p className="text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-2">
                Options — click the radio to mark the correct answer
              </p>
              <div className="space-y-2">
                {mcOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="mc_correct"
                      checked={mcCorrectIndex === i}
                      onChange={() => setMcCorrectIndex(i)}
                      className="accent-acuity-blue"
                    />
                    <input
                      value={opt}
                      onChange={(e) => {
                        const next = [...mcOptions]
                        next[i] = e.target.value
                        setMcOptions(next)
                      }}
                      placeholder={`Option ${i + 1}`}
                      className="input-field flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Label label="Explanation (shown after answering)">
              <textarea
                value={mcExplanation}
                onChange={(e) => setMcExplanation(e.target.value)}
                rows={2}
                className="input-field w-full resize-none"
              />
            </Label>
          </div>
        )}

        {/* Calculation */}
        {activityType === 'calculation' && (
          <div className="space-y-4 border-t border-steel/40 pt-4 mt-2">
            <Label label="Problem statement">
              <textarea
                value={calcProblem}
                onChange={(e) => setCalcProblem(e.target.value)}
                rows={3}
                className="input-field w-full resize-none"
              />
            </Label>
            <div className="grid grid-cols-3 gap-4">
              <Label label="Correct answer">
                <input value={calcAnswer} onChange={(e) => setCalcAnswer(e.target.value)} className="input-field w-full" />
              </Label>
              <Label label="Tolerance (±)">
                <input
                  type="number"
                  value={calcTolerance}
                  onChange={(e) => setCalcTolerance(parseFloat(e.target.value) || 0)}
                  step={0.01} min={0}
                  className="input-field w-full"
                />
              </Label>
              <Label label="Unit (e.g. %)">
                <input value={calcUnit} onChange={(e) => setCalcUnit(e.target.value)} className="input-field w-full" />
              </Label>
            </div>
            <Label label="Hint (optional — shown on request)">
              <input
                value={calcHint}
                onChange={(e) => setCalcHint(e.target.value)}
                placeholder="One sentence hint"
                className="input-field w-full"
              />
            </Label>
            <Label label="Solution steps (shown after submission)">
              <div className="space-y-2">
                {calcSteps.map((step, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={step}
                      onChange={(e) => {
                        const next = [...calcSteps]
                        next[i] = e.target.value
                        setCalcSteps(next)
                      }}
                      placeholder={`Step ${i + 1}`}
                      className="input-field flex-1"
                    />
                    {calcSteps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setCalcSteps(calcSteps.filter((_, j) => j !== i))}
                        className="text-ghost hover:text-red-400 text-base px-2 leading-none"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setCalcSteps([...calcSteps, ''])}
                  className="text-xs text-acuity-blue hover:text-acuity-blue/80 font-display font-medium"
                >
                  + Add step
                </button>
              </div>
            </Label>
          </div>
        )}

        {/* Canvas drawing */}
        {(activityType === 'draw_trendline' || activityType === 'draw_horizontal') && (
          <div className="space-y-4 border-t border-steel/40 pt-4 mt-2">
            <Label label="Exercise prompt (instruction shown to student)">
              <textarea
                value={canvasPrompt}
                onChange={(e) => setCanvasPrompt(e.target.value)}
                rows={3}
                className="input-field w-full resize-none"
                placeholder="Draw a valid uptrend line connecting at least three higher lows…"
              />
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Label label="Ticker (e.g. C:EURUSD)">
                <input value={canvasTicker} onChange={(e) => setCanvasTicker(e.target.value)} className="input-field w-full" />
              </Label>
              <Label label="Timeframe">
                <select value={canvasTimeframe} onChange={(e) => setCanvasTimeframe(e.target.value)} className="input-field w-full">
                  <option value="minute">1 minute</option>
                  <option value="hour">1 hour</option>
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                </select>
              </Label>
            </div>
            <div>
              <p className="text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1">
                Reference line (% of canvas — 0 = top-left, 100 = bottom-right)
              </p>
              <p className="text-xs text-ghost/60 font-body mb-2">Y=0 is top of chart. For an uptrend: Start X=0, Y=85 (low) → End X=100, Y=20 (higher)</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Start X%', val: refX1, set: setRefX1 },
                  { label: 'Start Y%', val: refY1, set: setRefY1 },
                  { label: 'End X%',   val: refX2, set: setRefX2 },
                  { label: 'End Y%',   val: refY2, set: setRefY2 },
                ].map(({ label, val, set }) => (
                  <Label key={label} label={label}>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => set(Number(e.target.value))}
                      min={0} max={100}
                      className="input-field w-full"
                    />
                  </Label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Free text */}
        {activityType === 'free_text' && (
          <div className="space-y-4 border-t border-steel/40 pt-4 mt-2">
            <Label label="Reflection prompt">
              <textarea
                value={reflectionPrompt}
                onChange={(e) => setReflectionPrompt(e.target.value)}
                rows={3}
                className="input-field w-full resize-none"
                placeholder="What did you learn from this lesson? How would you apply this concept to your trading?"
              />
            </Label>
          </div>
        )}
      </Section>

      {/* Bottom save */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-acuity-blue text-white text-sm font-display font-medium px-6 py-2.5 rounded-lg disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Save changes'}
        </button>
        <Link href={`/admin/courses/${courseSlug}`} className="text-sm text-ghost hover:text-chalk">
          ← Back to lessons
        </Link>
        {message && <span className="text-xs text-acuity-teal font-body">{message}</span>}
        {error && <span className="text-xs text-red-400 font-body">{error}</span>}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate border border-steel rounded-xl p-6 space-y-4">
      <h2 className="font-display font-semibold text-xs text-chalk uppercase tracking-wider pb-1 border-b border-steel/50">
        {title}
      </h2>
      {children}
    </div>
  )
}

function Label({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1.5">{label}</p>
      {children}
    </div>
  )
}
