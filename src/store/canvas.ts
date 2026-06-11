import { create } from 'zustand'
import type { DrawnLine } from '@/lib/grading'
import type { GradingResult } from '@/types/lesson'

export type DrawingTool = 'trendline' | 'horizontal' | 'rectangle' | 'select'

interface CanvasState {
  activeTool: DrawingTool
  lines: DrawnLine[]
  isDrawing: boolean
  currentLine: DrawnLine | null
  gradingResult: GradingResult | null
  setActiveTool: (tool: DrawingTool) => void
  startLine: (x: number, y: number) => void
  updateLine: (x: number, y: number) => void
  finishLine: () => void
  clearLines: () => void
  setGradingResult: (result: GradingResult | null) => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  activeTool: 'trendline',
  lines: [],
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
    set((s) => ({
      isDrawing: false,
      lines: s.currentLine ? [...s.lines, s.currentLine] : s.lines,
      currentLine: null,
    })),

  clearLines: () => set({ lines: [], currentLine: null, gradingResult: null }),

  setGradingResult: (result) => set({ gradingResult: result }),
}))
