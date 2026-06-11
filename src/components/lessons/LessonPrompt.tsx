interface LessonPromptProps {
  prompt: string
}

export function LessonPrompt({ prompt }: LessonPromptProps) {
  const parts = prompt.split(/\*\*(.*?)\*\*/)
  return (
    <div className="px-4 py-2 border-b border-steel bg-obsidian/80">
      <span className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mr-3">Exercise</span>
      <span className="text-[13px] text-chalk font-body">
        {parts.map((p, i) =>
          i % 2 === 1 ? <strong key={i} className="text-chalk font-semibold">{p}</strong> : p
        )}
      </span>
    </div>
  )
}
