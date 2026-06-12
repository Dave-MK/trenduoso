'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    planKey: null,
    cta: 'Get started',
    ctaHref: '/signup',
    ctaVariant: 'secondary',
    popular: false,
    features: [
      { label: '3 free courses',           included: true },
      { label: '50 graded exercises / mo', included: true },
      { label: 'Basic chart canvas',       included: true },
      { label: 'Community access',         included: true },
      { label: 'Full course library',      included: false },
      { label: 'Unlimited exercises',      included: false },
      { label: 'Paper trading sim',        included: false },
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 19, annual: 15 },
    planKey: { monthly: 'pro_monthly', annual: 'pro_annual' },
    cta: 'Start Pro',
    ctaHref: null,
    ctaVariant: 'primary',
    popular: true,
    features: [
      { label: 'Full course library',        included: true },
      { label: 'Unlimited graded exercises', included: true },
      { label: 'Advanced chart canvas',      included: true },
      { label: 'Paper trading simulator',    included: true },
      { label: 'Progress analytics',         included: true },
      { label: 'Community access',           included: true },
      { label: 'Priority support',           included: true },
    ],
  },
  {
    name: 'Team',
    price: { monthly: 49, annual: 39 },
    planKey: null,
    cta: 'Contact us',
    ctaHref: 'mailto:team@tradecuity.com',
    ctaVariant: 'secondary',
    popular: false,
    features: [
      { label: 'Everything in Pro',   included: true },
      { label: 'Team dashboard',      included: true },
      { label: 'Progress tracking',   included: true },
      { label: 'Custom courses',      included: true },
      { label: 'Slack integration',   included: true },
      { label: 'Dedicated support',   included: true },
    ],
  },
]

export function BillingToggle() {
  const router = useRouter()
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState('')

  async function startCheckout(planKey: string) {
    setCheckoutError('')
    setLoadingPlan(planKey)

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: planKey }),
    })

    const data = await res.json()

    if (!res.ok) {
      if (res.status === 401) {
        router.push('/login?next=/pricing')
        return
      }
      setCheckoutError(data.error ?? 'Something went wrong. Please try again.')
      setLoadingPlan(null)
      return
    }

    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="flex bg-slate border border-steel rounded-xl p-1 gap-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-lg text-sm font-display font-medium transition-colors
              ${billing === 'monthly' ? 'bg-acuity-blue text-white' : 'text-ghost hover:text-chalk'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-5 py-2 rounded-lg text-sm font-display font-medium transition-colors flex items-center gap-2
              ${billing === 'annual' ? 'bg-acuity-blue text-white' : 'text-ghost hover:text-chalk'}`}
          >
            Annual
            <span className={`text-[10px] font-mono ${billing === 'annual' ? 'text-white' : 'text-acuity-teal'}`}>−20%</span>
          </button>
        </div>
      </div>

      {checkoutError && (
        <p className="text-center text-bear-red text-sm font-body mb-6">{checkoutError}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PLANS.map((plan) => {
          const planKey = plan.planKey ? plan.planKey[billing] : null
          const isLoading = planKey !== null && loadingPlan === planKey

          return (
            <div key={plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-acuity-blue text-white text-[10px] font-display font-medium tracking-widest uppercase px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}
              <div className={`bg-slate rounded-xl p-7 h-full flex flex-col border ${plan.popular ? 'border-acuity-blue' : 'border-steel'}`}>
                <div className="mb-6">
                  <p className={`font-display font-medium text-sm mb-3 ${plan.popular ? 'text-acuity-blue' : 'text-chalk'}`}>{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-4xl text-chalk">
                      £{billing === 'annual' ? plan.price.annual : plan.price.monthly}
                    </span>
                  </div>
                  <p className="text-ghost text-[12px] font-body mt-1">
                    {plan.price.monthly === 0 ? 'forever' : (plan as { unit?: string }).unit ?? 'per month'}
                  </p>
                </div>

                {/* CTA button */}
                {plan.ctaHref ? (
                  <a
                    href={plan.ctaHref}
                    className={`w-full py-2.5 rounded-lg text-sm font-display font-medium mb-6 transition-colors text-center block
                      ${plan.ctaVariant === 'primary'
                        ? 'bg-acuity-blue text-white hover:bg-acuity-blue/90'
                        : 'border border-steel text-chalk hover:border-acuity-blue'}`}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <button
                    onClick={() => planKey && startCheckout(planKey)}
                    disabled={isLoading}
                    className={`w-full py-2.5 rounded-lg text-sm font-display font-medium mb-6 transition-colors
                      ${plan.ctaVariant === 'primary'
                        ? 'bg-acuity-blue text-white hover:bg-acuity-blue/90'
                        : 'border border-steel text-chalk hover:border-acuity-blue'}
                      disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? 'Redirecting…' : plan.cta}
                  </button>
                )}

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5">
                      <span className={`text-[13px] ${f.included ? 'text-acuity-teal' : 'text-steel'}`}>{f.included ? '✓' : '–'}</span>
                      <span className={`text-[13px] font-body ${f.included ? 'text-chalk' : 'text-muted'}`}>{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-muted text-[11px] font-body mt-8 max-w-lg mx-auto">
        Payments handled securely by Stripe. Cancel any time — no questions asked. UK VAT may apply.
      </p>
    </>
  )
}
