import type { GradingResult } from '@/types/lesson'
import { GradeBar } from '@/components/ui/GradeBar'

interface GradingPanelProps {
  result: GradingResult
  onNext?: () => void
  onShowReference?: () => void
}

export function GradingPanel({ result, onNext, onShowReference }: GradingPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-2">Your Score</p>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-[32px] font-medium text-acuity-blue">{result.score}</span>
          <span className="font-mono text-[13px] text-ghost">/ 100</span>
        </div>
      </div>

      <div>
        <GradeBar label="Accuracy" value={result.accuracy} max={100} />
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-ghost font-display">Touch points</span>
            <span className="font-mono text-[11px] text-acuity-blue">
              {result.touch_points} / {result.touch_points_max}
            </span>
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-[11px] text-ghost font-display">Body cuts</span>
          <span className={`font-mono text-[11px] ${result.body_cuts ? 'text-bear-red' : 'text-acuity-teal'}`}>
            {result.body_cuts ? 'Fail' : 'Pass'}
          </span>
        </div>
      </div>

      {result.feedback && (
        <p className="text-[12px] text-chalk font-body leading-relaxed border-t border-steel pt-3">
          {result.feedback}
        </p>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="w-full bg-acuity-blue text-white text-sm font-display font-medium py-3 rounded-lg hover:bg-acuity-blue/90 transition-colors"
        >
          Next lesson →
        </button>
      )}
      {onShowReference && (
        <button
          onClick={onShowReference}
          className="w-full text-ghost text-[12px] font-body hover:text-chalk transition-colors py-1"
        >
          Show reference answer
        </button>
      )}
    </div>
  )
}
