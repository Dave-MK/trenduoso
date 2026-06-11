'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-obsidian text-chalk flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="font-display font-medium text-chalk mb-4">Something went wrong.</p>
          <button
            onClick={reset}
            className="bg-acuity-blue text-white text-sm font-display px-4 py-2 rounded-lg"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
