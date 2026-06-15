'use client'
import { useCanvasStore, type DrawingTool } from '@/store/canvas'

const TOOLS: { id: DrawingTool; label: string; icon: string }[] = [
  { id: 'trendline',  label: 'Trendline',  icon: '/' },
  { id: 'horizontal', label: 'Horizontal', icon: '—' },
  { id: 'rectangle',  label: 'Rectangle',  icon: '▭' },
]

export function DrawingTools() {
  const { activeTool, setActiveTool, clearLines, undo, history } = useCanvasStore()

  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-slate border-t border-steel">
      {TOOLS.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTool(t.id)}
          title={t.label}
          className={`w-9 h-9 rounded-lg font-mono text-sm flex items-center justify-center transition-colors
            ${activeTool === t.id
              ? 'bg-acuity-blue text-white'
              : 'text-ghost hover:text-chalk hover:bg-steel'
            }`}
        >
          {t.icon}
        </button>
      ))}

      <div className="w-px h-5 bg-steel mx-1" />

      <button
        onClick={undo}
        disabled={history.length === 0}
        title="Undo last line (Ctrl+Z)"
        className="w-9 h-9 rounded-lg font-mono text-sm flex items-center justify-center transition-colors
          text-ghost hover:text-chalk hover:bg-steel disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ↩
      </button>

      <button
        onClick={clearLines}
        title="Clear all"
        className="w-9 h-9 rounded-lg font-mono text-sm flex items-center justify-center transition-colors
          text-ghost hover:text-chalk hover:bg-steel"
      >
        ✕
      </button>

      <span className="ml-auto text-[10px] font-display font-medium tracking-widest text-ghost uppercase">
        {activeTool.toUpperCase()} ACTIVE
      </span>
    </div>
  )
}
