import type { Track } from '@/types/course'

const TRACK_STYLES: Record<Track, string> = {
  foundations: 'text-acuity-blue bg-acuity-blue/10',
  technical:   'text-acuity-teal bg-acuity-teal/10',
  fundamental: 'text-amber bg-amber/10',
  risk:        'text-ghost bg-ghost/10',
  strategy:    'text-amber bg-amber/10',
}

interface BadgeProps {
  track: Track
  className?: string
}

export function TrackBadge({ track, className = '' }: BadgeProps) {
  return (
    <span
      className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded ${TRACK_STYLES[track]} ${className}`}
    >
      {track}
    </span>
  )
}
