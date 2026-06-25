'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  show: boolean
  level: number
  onClose: () => void
}

const LEVEL_NAMES: Record<number, string> = {
  1:  'The Apprentice',
  2:  'The Operator',
  3:  'The Analyst',
  4:  'The Allocator',
  5:  'The Tactician',
  6:  'The Quant',
  7:  'The Macro Trader',
  8:  'The Volatility Trader',
  9:  'The Book Runner',
  10: 'The General Partner',
}

const LEVEL_COLORS: Record<number, string> = {
  1: '#4DD9EC', 2: '#00C4DC', 3: '#00A8BE', 4: '#00A090',
  5: '#009480', 6: '#007888', 7: '#5AADBE', 8: '#A8D8DF',
  9: '#E0B84A', 10: '#F5C842',
}

export function LevelUpModal({ show, level, onClose }: Props) {
  const safeLevel = Math.min(Math.max(level, 1), 10)

  useEffect(() => {
    if (!show) return
    const t = setTimeout(onClose, 6000)
    return () => clearTimeout(t)
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 24 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{    scale: 0.9,  opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate border rounded-2xl px-10 py-10 max-w-sm w-full mx-4 text-center overflow-hidden"
            style={{ borderColor: `${LEVEL_COLORS[safeLevel]}40` }}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: `0 0 80px ${LEVEL_COLORS[safeLevel]}20` }} />

            {/* Level badge image */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.12, type: 'spring', stiffness: 380, damping: 18 }}
              className="mx-auto mb-5 w-24 h-24"
            >
              <Image
                src={`/level-${safeLevel}.png`}
                alt={LEVEL_NAMES[safeLevel] ?? ''}
                width={96}
                height={96}
                style={{ width: 96, height: 96 }}
                className="rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              <p className="text-[10px] font-display font-medium tracking-widest uppercase mb-1"
                style={{ color: LEVEL_COLORS[safeLevel] }}>
                Level {safeLevel} unlocked
              </p>
              <h2 className="font-display font-bold text-chalk text-2xl mb-1">
                {LEVEL_NAMES[safeLevel] ?? `Level ${safeLevel}`}
              </h2>
              <p className="text-ghost text-sm font-body">
                Keep building your edge.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              onClick={onClose}
              className="mt-7 text-obsidian font-display font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              style={{ backgroundColor: LEVEL_COLORS[safeLevel] }}
            >
              Keep going →
            </motion.button>

            {/* Particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale:   [0, 1.2, 0],
                  x: Math.cos((i / 10) * Math.PI * 2) * 90,
                  y: Math.sin((i / 10) * Math.PI * 2) * 90,
                }}
                transition={{ delay: 0.08 + i * 0.04, duration: 0.9, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                style={{ marginTop: -4, marginLeft: -4, backgroundColor: LEVEL_COLORS[safeLevel] }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
