interface GradeBarProps {
  label: string
  value: number
  max: number
  color?: string
}

export function GradeBar({ label, value, max, color = 'acuity-blue' }: GradeBarProps) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-[11px] text-ghost font-display">{label}</span>
        <span className="font-mono text-[11px] text-acuity-blue">
          {value}/{max}
        </span>
      </div>
      <div className="h-0.5 bg-steel rounded-full overflow-hidden">
        <div
          className={`h-full bg-${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
