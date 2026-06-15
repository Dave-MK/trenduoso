import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: totalUsers },
    { count: newUsers7d },
    { count: totalCompletions },
    { data: recentUsers },
    { data: topCourses },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()),
    supabase.from('user_progress').select('*', { count: 'exact', head: true }).eq('completed', true),
    supabase.from('profiles').select('display_name, created_at, xp, plan')
      .order('created_at', { ascending: false }).limit(8),
    supabase.from('courses').select('title, slug, lesson_count').order('order_index').limit(10),
  ])

  return (
    <div className="p-8">
      <h1 className="font-display font-bold text-2xl text-chalk mb-1">Dashboard</h1>
      <p className="text-sm text-ghost font-body mb-8">Platform overview</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total users" value={totalUsers ?? 0} />
        <StatCard label="New this week" value={newUsers7d ?? 0} />
        <StatCard label="Lesson completions" value={totalCompletions ?? 0} />
        <StatCard label="Courses" value={topCourses?.length ?? 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent signups */}
        <section>
          <h2 className="font-display font-semibold text-sm text-chalk mb-3 uppercase tracking-wider">Recent signups</h2>
          <div className="bg-slate border border-steel rounded-xl overflow-hidden">
            {(recentUsers ?? []).length === 0 ? (
              <p className="text-ghost text-sm p-4">No users yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-steel">
                    <th className="text-left px-4 py-2.5 text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">Plan</th>
                    <th className="text-right px-4 py-2.5 text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">XP</th>
                    <th className="text-right px-4 py-2.5 text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentUsers ?? []).map((u, i) => (
                    <tr key={i} className="border-b border-steel/40 last:border-0">
                      <td className="px-4 py-2.5 text-chalk font-body">{u.display_name ?? '—'}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] font-display font-semibold uppercase px-1.5 py-0.5 rounded ${
                          u.plan === 'pro' || u.plan === 'annual' ? 'bg-acuity-teal/20 text-acuity-teal' : 'bg-steel text-ghost'
                        }`}>
                          {u.plan}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-ghost text-xs">{u.xp}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-ghost text-xs">
                        {new Date(u.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Courses overview */}
        <section>
          <h2 className="font-display font-semibold text-sm text-chalk mb-3 uppercase tracking-wider">Courses</h2>
          <div className="bg-slate border border-steel rounded-xl overflow-hidden">
            {(topCourses ?? []).length === 0 ? (
              <p className="text-ghost text-sm p-4">No courses yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-steel">
                    <th className="text-left px-4 py-2.5 text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">Course</th>
                    <th className="text-right px-4 py-2.5 text-[10px] font-display font-semibold text-ghost uppercase tracking-wider">Lessons</th>
                  </tr>
                </thead>
                <tbody>
                  {(topCourses ?? []).map((c) => (
                    <tr key={c.slug} className="border-b border-steel/40 last:border-0">
                      <td className="px-4 py-2.5 text-chalk font-body text-xs">{c.title}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-ghost text-xs">{c.lesson_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-slate border border-steel rounded-xl p-5">
      <p className="text-[10px] font-display font-semibold text-ghost uppercase tracking-wider mb-1">{label}</p>
      <p className="font-mono text-3xl font-medium text-chalk">{value.toLocaleString()}</p>
    </div>
  )
}
