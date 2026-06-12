import { Navbar } from '@/components/nav/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — tradecuity',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 py-12 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-ghost text-sm font-body hover:text-chalk">← Home</Link>
        </div>
        <h1 className="font-display font-bold text-3xl text-chalk mb-2">Terms of Service</h1>
        <p className="text-ghost text-sm font-body mb-10">Last updated: June 2026</p>

        <div className="prose-custom space-y-8 font-body text-ghost text-sm leading-relaxed">

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">1. About tradecuity</h2>
            <p>tradecuity (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an online educational platform that provides structured trading education, interactive chart exercises, and learning resources. By accessing or using tradecuity, you agree to be bound by these Terms of Service.</p>
            <p className="mt-3">tradecuity is not authorised or regulated by the Financial Conduct Authority (FCA). Nothing on this platform constitutes financial advice, investment advice, or a personal recommendation to buy or sell any financial instrument.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">2. Eligibility</h2>
            <p>You must be at least 18 years of age to create an account or use this platform. By registering, you confirm that you meet this age requirement. We reserve the right to terminate accounts where this requirement is not met.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">3. Educational purpose only</h2>
            <p>All content on tradecuity — including courses, lessons, exercises, commentary, and examples — is provided solely for educational and informational purposes. It does not constitute:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Financial or investment advice</li>
              <li>A recommendation to buy, sell, or hold any financial instrument</li>
              <li>A signal or trading strategy endorsement</li>
              <li>Tax, legal, or regulatory guidance</li>
            </ul>
            <p className="mt-3">Trading financial markets carries a significant risk of loss. You should only trade with money you can afford to lose and should seek independent professional advice before making any investment decision. Past performance shown in examples is not indicative of future results.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">4. Your account</h2>
            <p>You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account. You agree to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Provide accurate and truthful information when registering</li>
              <li>Not share your account with others</li>
              <li>Notify us immediately of any unauthorised access</li>
              <li>Not create multiple accounts to circumvent restrictions</li>
            </ul>
            <p className="mt-3">We reserve the right to suspend or terminate accounts that violate these terms, engage in abusive behaviour, or attempt to circumvent payment.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">5. Subscriptions and billing</h2>
            <p>tradecuity offers a free tier and paid subscription plans (&quot;Pro&quot; and &quot;Team&quot;). Paid plans are billed in advance on a monthly or annual basis via Stripe.</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Subscriptions renew automatically unless cancelled before the renewal date</li>
              <li>You may cancel at any time; access continues until the end of the current billing period</li>
              <li>We do not offer refunds for partial billing periods, except where required by law</li>
              <li>Prices are displayed in GBP and are inclusive of any applicable taxes</li>
              <li>We reserve the right to change pricing with 30 days&apos; notice</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">6. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Copy, reproduce, or redistribute course content without written permission</li>
              <li>Attempt to reverse-engineer or scrape the platform</li>
              <li>Use the platform for any unlawful purpose</li>
              <li>Upload content that is defamatory, abusive, or infringes third-party rights</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">7. Intellectual property</h2>
            <p>All content on tradecuity — including course text, exercises, graphics, and software — is owned by or licensed to us and is protected by copyright. You are granted a limited, non-transferable licence to access the content for personal educational use only.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">8. Limitation of liability</h2>
            <p>To the maximum extent permitted by law, tradecuity shall not be liable for any direct, indirect, incidental, or consequential loss arising from:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Reliance on any content, exercise, or example on the platform</li>
              <li>Any trading or investment decisions made after using the platform</li>
              <li>Service interruptions or data loss</li>
            </ul>
            <p className="mt-3">Nothing in these terms limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">9. Governing law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">10. Changes to these terms</h2>
            <p>We may update these terms from time to time. We will notify you of material changes by email or by a prominent notice on the platform. Continued use of tradecuity after changes take effect constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">11. Contact</h2>
            <p>For questions about these terms, please contact us at <span className="text-acuity-blue">legal@tradecuity.com</span>.</p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-steel flex gap-6 text-sm">
          <Link href="/privacy" className="text-acuity-blue hover:underline font-body">Privacy Policy</Link>
          <Link href="/" className="text-ghost hover:text-chalk font-body">← Back to home</Link>
        </div>
      </main>
    </>
  )
}
