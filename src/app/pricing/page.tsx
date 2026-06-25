import { Navbar } from '@/components/nav/Navbar'
import { BillingToggle } from './BillingToggle'

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 sm:px-8 md:px-16 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-display font-bold text-4xl text-chalk mb-4">Simple, honest pricing</h1>
          <p className="text-ghost font-body text-base leading-relaxed">
            Start free and upgrade when you&apos;re ready. No hidden fees, no upsells, no gamification dark patterns.
          </p>
        </div>
        <BillingToggle />
      </main>
    </>
  )
}
