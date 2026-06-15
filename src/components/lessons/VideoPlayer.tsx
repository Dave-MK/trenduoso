'use client'

interface Props {
  url: string
  provider: 'youtube' | 'vimeo' | 'direct'
}

export function VideoPlayer({ url, provider }: Props) {
  if (provider === 'youtube') {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)
    const id = match?.[1]
    if (!id) return <p className="text-ghost text-sm font-body">Invalid YouTube URL.</p>
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          className="absolute inset-0 w-full h-full rounded-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Lesson video"
        />
      </div>
    )
  }

  if (provider === 'vimeo') {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    const id = match?.[1]
    if (!id) return <p className="text-ghost text-sm font-body">Invalid Vimeo URL.</p>
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://player.vimeo.com/video/${id}`}
          className="absolute inset-0 w-full h-full rounded-xl"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Lesson video"
        />
      </div>
    )
  }

  return (
    <video
      src={url}
      controls
      className="w-full rounded-xl bg-black"
      title="Lesson video"
    />
  )
}
