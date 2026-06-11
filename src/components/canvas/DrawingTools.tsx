'use client'
import { useCanvasStore, type DrawingTool } from '@/store/canvas'

const TOOLS: { id: DrawingTool; label: string; icon: string }[] = [
  { id: 'trendline',  label: 'Trendline',  icon: '/' },
  { id: 'horizontal', label: 'Horizontal', icon: '—' },
  { id: 'rectangle',  label: 'Rectangle',  icon: '▭' },
  { id: 'select',     label: 'Clear',      icon: '✕' },
]

export function DrawingTools() {
  const { activeTool, setActiveTool, clearLines } = useCanvasStore()

  const handleClick = (tool: DrawingTool) => {
    if (tool === 'select') {
      clearLines()
    } else {
      setActiveTool(tool)
    }
  }

  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-slate border-t border-steel">
      {TOOLS.map((t) => (
        <button
          key={t.id}
          onClick={() => handleClick(t.id)}
          title={t.label}
          className={`w-9 h-9 rounded-lg font-mono text-sm flex items-center justify-center transition-colors
            ${activeTool === t.id && t.id !== 'select'
              ? 'bg-acuity-blue text-white'
              : 'text-ghost hover:text-chalk hover:bg-steel'
            }`}
        >
          {t.icon}
        </button>
      ))}
      <span className="ml-auto text-[10px] font-display font-medium tracking-widest text-ghost uppercase">
        {activeTool.toUpperCase()} ACTIVE
      </span>
    </div>
  )
}
