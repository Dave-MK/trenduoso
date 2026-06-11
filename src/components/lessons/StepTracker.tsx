import type { LessonStep } from '@/types/lesson'

interface StepTrackerProps {
  steps: LessonStep[]
  currentStepIndex: number
}

export function StepTracker({ steps, currentStepIndex }: StepTrackerProps) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2.5">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-mono
            ${step.completed
              ? 'bg-acuity-teal text-obsidian'
              : i === currentStepIndex
              ? 'border-2 border-acuity-blue text-acuity-blue'
              : 'border border-steel text-ghost'
            }`}
          >
            {step.completed ? '✓' : i + 1}
          </div>
          <span className={`text-[12px] font-body ${step.completed ? 'text-ghost line-through' : i === currentStepIndex ? 'text-chalk' : 'text-ghost'}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
