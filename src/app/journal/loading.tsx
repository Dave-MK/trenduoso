export default function JournalLoading() {
  return (
    <div className="px-6 md:px-16 py-12 max-w-4xl animate-pulse">
      <div className="h-8 w-40 bg-steel rounded-lg mb-2" />
      <div className="h-4 w-72 bg-steel rounded mb-8" />

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-slate border border-steel rounded-xl p-4">
            <div className="h-3 w-16 bg-steel rounded mb-3" />
            <div className="h-6 w-20 bg-steel rounded" />
          </div>
        ))}
      </div>

      {/* Add trade button */}
      <div className="h-10 w-32 bg-steel rounded-lg mb-6" />

      {/* Rows */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-slate border border-steel rounded-xl p-4 mb-3">
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-steel rounded" />
            <div className="h-4 w-16 bg-steel rounded" />
            <div className="h-4 w-24 bg-steel rounded" />
            <div className="ml-auto h-4 w-16 bg-steel rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
