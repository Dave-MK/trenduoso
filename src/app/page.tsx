import { Navbar } from '@/components/nav/Navbar'
import { TrenduosoWordmark } from '@/components/TrenduosoWordmark'
import { BadgeCarousel } from '@/components/BadgeCarousel'
import { createClient } from '@/lib/supabase/server'

const POPULAR_COURSES = [
  { track: 'FOUNDATIONS', title: 'Reading price structure', lessons: 18, hours: '4.2', progress: 100, color: 'acuity-teal' },
  { track: 'TECHNICAL',   title: 'Trendlines and channels',  lessons: 24, hours: '5.8', progress: 18,  color: 'acuity-blue' },
  { track: 'RISK',        title: 'Position sizing and R:R',  lessons: 12, hours: '2.9', progress: 0,   color: 'steel' },
]

const FEATURES = [
  {
    icon: '↗',
    title: 'Draw on real charts',
    desc: 'Practice trendlines and patterns on historical data. Scored every time.',
  },
  {
    icon: '◎',
    title: 'Graded exercises',
    desc: 'Every drawing scored against a reference — accuracy, touch points, execution.',
  },
  {
    icon: '🧠',
    title: 'Build real edge',
    desc: 'Five tracks from foundations through strategy building. No shortcuts.',
  },
]

const TESTIMONIALS = [
  {
    initials: 'JH',
    name: 'James H.',
    role: 'Forex trader',
    quote: '"First platform that made me actually draw things. The grading is brutally honest."',
    color: 'bg-acuity-blue',
  },
  {
    initials: 'SR',
    name: 'Sarah R.',
    role: 'Equities learner',
    quote: '"Scored 43 on my first trendline. Now consistently above 85. The feedback loop is what makes this different."',
    color: 'bg-acuity-teal',
  },
  {
    initials: 'MT',
    name: 'Marco T.',
    role: 'Crypto & futures',
    quote: '"The risk management track changed how I size positions completely."',
    color: 'bg-amber',
  },
]

export default async function LandingPage() {
  let firstLessonHref = '/courses'
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('lessons')
      .select('slug, courses!inner(slug)')
      .order('order_index')
      .limit(1)
      .single()
    if (data) {
      const courseSlug = (data.courses as unknown as { slug: string }).slug
      firstLessonHref = `/courses/${courseSlug}/${data.slug}`
    }
  } catch { /* no DB or no lessons — fall back to /courses */ }

  return (
    <>
      <Navbar />

      {/* Hero — background-attachment:fixed keeps the photo stationary while page scrolls */}
      <section className="relative overflow-hidden px-6 md:px-16 pt-20 pb-24">
        {/* B&W photo layer — filter applied to the div so background-image inherits it */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1) brightness(0.3)',
          }}
        />
        {/* Obsidian overlay for depth */}
        <div className="absolute inset-0 bg-obsidian/55 pointer-events-none" />

        {/* Decorative logo-black — large, right half off viewport, vertically centred in hero */}
        <div
          className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 pointer-events-none select-none"
          style={{ right: 0, zIndex: 1 }}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-black.webp" alt="" style={{ width: 920, height: 920, opacity: 0.45 }} />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left: copy + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 bg-acuity-teal/10 border border-acuity-teal/20 rounded-full px-3 py-1 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-acuity-teal" />
              <span className="text-[11px] font-display font-medium tracking-widest text-acuity-teal uppercase">Now in early access</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-chalk mb-6">
              Develop real<br />
              <span className="text-acuity-blue">trading acuity.</span><br />
              Not luck.
            </h1>

            <p className="font-body text-ghost text-base md:text-lg max-w-md leading-relaxed mb-10">
              Interactive lessons and graded chart exercises that build the analytical edge most platforms skip. Draw trendlines, get scored, learn to read markets.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="/signup"
                className="bg-acuity-blue text-white font-display font-medium text-sm px-6 py-3 rounded-lg hover:bg-acuity-blue/90 transition-colors"
              >
                Start learning — it&apos;s free
              </a>
              <a
                href={firstLessonHref}
                className="flex items-center gap-2 text-ghost text-sm font-body hover:text-chalk transition-colors"
              >
                <span className="text-acuity-blue">▶</span> Watch a lesson
              </a>
            </div>
          </div>

          {/* Right: badge carousel — desktop only */}
          <div className="hidden md:flex justify-center">
            <BadgeCarousel />
          </div>

        </div>
      </section>

      <div className="bg-obsidian">

      {/* Stats bar */}
      <section className="border-y border-steel bg-slate">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-steel">
          {[
            { value: '14', unit: 'K',   label: 'Active learners',   color: 'text-acuity-teal' },
            { value: '94', unit: '%',   label: 'Completion rate',   color: 'text-acuity-blue' },
            { value: '48', unit: 'hrs', label: 'Of content',        color: 'text-acuity-teal' },
            { value: '5',  unit: 'K+',  label: 'Exercises graded',  color: 'text-acuity-blue' },
          ].map((s) => (
            <div key={s.label} className="px-4 sm:px-8 py-5 sm:py-6">
              <div className="font-mono text-3xl font-medium text-chalk">
                {s.value}<span className={s.color}>{s.unit}</span>
              </div>
              <div className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular courses */}
      <section className="px-6 md:px-16 py-16">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase">Popular courses</span>
          <a href="/courses" className="text-acuity-blue text-sm font-body hover:underline">Browse all →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {POPULAR_COURSES.map((c) => (
            <div
              key={c.title}
              className="bg-slate border border-steel rounded-xl p-5 hover:border-acuity-blue transition-colors cursor-pointer"
            >
              <span className={`text-[9px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded
                ${c.track === 'FOUNDATIONS' ? 'text-acuity-blue bg-acuity-blue/10' :
                  c.track === 'TECHNICAL'   ? 'text-acuity-teal bg-acuity-teal/10' :
                                              'text-ghost bg-ghost/10'}`}>
                {c.track}
              </span>
              <h3 className="font-display font-semibold text-chalk text-sm mt-3 mb-1 leading-snug">{c.title}</h3>
              <div className="text-[11px] text-muted flex gap-2 mb-3">
                <span>{c.lessons} lessons</span><span>·</span><span>{c.hours} hrs</span>
              </div>
              <div className="h-0.5 bg-steel rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${c.color} rounded-full`}
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              {c.progress > 0 && (
                <p className="font-mono text-[9px] text-muted mt-1">{c.progress}% complete</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-slate border border-steel rounded-xl p-6">
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-display font-semibold text-chalk text-sm mb-2">{f.title}</h3>
              <p className="font-body text-ghost text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 pb-20 border-t border-steel pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-slate border border-steel rounded-xl p-5">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber text-xs">★</span>
                ))}
              </div>
              <p className="font-body text-chalk text-sm leading-relaxed mb-4">{t.quote}</p>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white text-[11px] font-display font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-chalk text-[12px]">{t.name}</p>
                  <p className="text-ghost text-[11px] font-body">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-steel px-6 md:px-16 py-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <span className="font-display font-bold tracking-[-0.03em] text-xl">
            <TrenduosoWordmark />
          </span>
          <div className="flex items-center gap-6 text-ghost text-xs font-body">
            <a href="/terms" className="hover:text-chalk transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-chalk transition-colors">Privacy Policy</a>
            <a href="mailto:hello@trenduoso.com" className="hover:text-chalk transition-colors">Contact</a>
          </div>
          <span className="text-ghost text-xs font-body">© 2026 Trenduoso.</span>
        </div>
        {/* Legal disclaimer */}
        <div className="border-t border-steel/50 pt-5">
          <p className="text-[11px] text-muted font-body leading-relaxed max-w-4xl">
            <strong className="text-ghost font-medium">Important:</strong> Trenduoso is an educational platform only. All content is provided for learning purposes and does not constitute financial advice, investment advice, or a recommendation to buy or sell any financial instrument. Trading financial markets involves a significant risk of loss and is not suitable for all investors. Past performance shown in examples is not indicative of future results. You should not invest money you cannot afford to lose. Always seek independent financial advice before making investment decisions. Trenduoso is not authorised or regulated by the Financial Conduct Authority (FCA). If you are unsure about any aspect of trading, please consult a qualified financial adviser. Users must be 18 or over to register.
          </p>
        </div>
      </footer>
      </div> {/* /bg-obsidian */}
    </>
  )
}
