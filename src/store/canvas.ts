import { create } from 'zustand'
import type { DrawnLine } from '@/lib/grading'
import type { GradingResult } from '@/types/lesson'

export type DrawingTool = 'trendline' | 'horizontal' | 'rectangle' | 'select'

interface CanvasState {
  activeTool: DrawingTool
  lines: DrawnLine[]
  history: DrawnLine[][]  // undo stack — each entry is a full snapshot of lines before that draw
  isDrawing: boolean
  currentLine: DrawnLine | null
  gradingResult: GradingResult | null
  setActiveTool: (tool: DrawingTool) => void
  startLine: (x: number, y: number) => void
  updateLine: (x: number, y: number) => void
  finishLine: () => void
  undo: () => void
  clearLines: () => void
  setGradingResult: (result: GradingResult | null) => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  activeTool: 'trendline',
  lines: [],
  history: [],
  isDrawing: false,
  currentLine: null,
  gradingResult: null,

  setActiveTool: (tool) => set({ activeTool: tool }),

  startLine: (x, y) =>
    set({ isDrawing: true, currentLine: { x1: x, y1: y, x2: x, y2: y } }),

  updateLine: (x, y) =>
    set((s) =>
      s.currentLine ? { currentLine: { ...s.currentLine, x2: x, y2: y } } : {}
    ),

  finishLine: () =>
    set((s) => {
      if (!s.currentLine) return { isDrawing: false, currentLine: null }
      return {
        isDrawing: false,
        history: [...s.history, s.lines],  // snapshot before this line
        lines: [...s.lines, s.currentLine],
        currentLine: null,
      }
    }),

  undo: () =>
    set((s) => {
      if (s.history.length === 0) return {}
      return {
        lines: s.history[s.history.length - 1],
        history: s.history.slice(0, -1),
      }
    }),

  clearLines: () => set({ lines: [], currentLine: null, gradingResult: null, history: [] }),

  setGradingResult: (result) => set({ gradingResult: result }),
}))
