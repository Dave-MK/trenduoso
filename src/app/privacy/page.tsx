import { Navbar } from '@/components/nav/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — tradecuity',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 py-12 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-ghost text-sm font-body hover:text-chalk">← Home</Link>
        </div>
        <h1 className="font-display font-bold text-3xl text-chalk mb-2">Privacy Policy</h1>
        <p className="text-ghost text-sm font-body mb-10">Last updated: June 2026</p>

        <div className="space-y-8 font-body text-ghost text-sm leading-relaxed">

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">1. Who we are</h2>
            <p>tradecuity is the data controller for personal data collected through this platform. If you have questions about how we handle your data, contact us at <span className="text-acuity-blue">privacy@tradecuity.com</span>.</p>
            <p className="mt-3">This policy applies to all users of tradecuity and explains what personal data we collect, why we collect it, and your rights under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">2. Data we collect</h2>

            <h3 className="font-display font-medium text-chalk/80 text-[13px] mb-2 mt-4">Account data</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name and email address (provided at registration)</li>
              <li>Encrypted password (we never see or store your plain-text password)</li>
              <li>Account creation date and subscription plan</li>
            </ul>

            <h3 className="font-display font-medium text-chalk/80 text-[13px] mb-2 mt-4">Usage and learning data</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Lessons completed, scores, and exercise results</li>
              <li>XP earned, streaks, and progress through courses</li>
              <li>Drawing data from chart exercises (stored per-session)</li>
            </ul>

            <h3 className="font-display font-medium text-chalk/80 text-[13px] mb-2 mt-4">Technical data</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>IP address and browser type (collected by our infrastructure provider)</li>
              <li>Session tokens stored in cookies (strictly necessary)</li>
            </ul>

            <h3 className="font-display font-medium text-chalk/80 text-[13px] mb-2 mt-4">Payment data</h3>
            <p>Payment is handled by Stripe. We do not store card numbers or payment details. We only receive a Stripe customer ID and subscription status.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">3. Legal basis for processing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="border-b border-steel">
                    <th className="text-left py-2 pr-4 text-chalk font-display font-medium">Purpose</th>
                    <th className="text-left py-2 text-chalk font-display font-medium">Legal basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel/50">
                  {[
                    ['Providing the service (account, courses)', 'Contract performance'],
                    ['Processing payments', 'Contract performance'],
                    ['Improving the platform', 'Legitimate interests'],
                    ['Sending service emails (e.g. password reset)', 'Contract performance'],
                    ['Marketing emails (if opted in)', 'Consent'],
                    ['Legal compliance', 'Legal obligation'],
                  ].map(([p, b]) => (
                    <tr key={p}>
                      <td className="py-2 pr-4">{p}</td>
                      <td className="py-2 text-chalk/70">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">4. How we share your data</h2>
            <p>We do not sell your personal data. We share it only with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><span className="text-chalk">Supabase</span> — database and authentication infrastructure (data hosted in EU)</li>
              <li><span className="text-chalk">Stripe</span> — payment processing (see <a href="https://stripe.com/gb/privacy" className="text-acuity-blue hover:underline" target="_blank" rel="noopener noreferrer">Stripe&apos;s privacy policy</a>)</li>
              <li><span className="text-chalk">Vercel</span> — platform hosting (see <a href="https://vercel.com/legal/privacy-policy" className="text-acuity-blue hover:underline" target="_blank" rel="noopener noreferrer">Vercel&apos;s privacy policy</a>)</li>
            </ul>
            <p className="mt-3">We may disclose data if required by law or to protect our legal rights.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">5. Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="border-b border-steel">
                    <th className="text-left py-2 pr-4 text-chalk font-display font-medium">Cookie</th>
                    <th className="text-left py-2 pr-4 text-chalk font-display font-medium">Purpose</th>
                    <th className="text-left py-2 text-chalk font-display font-medium">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel/50">
                  {[
                    ['sb-auth-token', 'Keeps you logged in', 'Strictly necessary'],
                    ['cookie-consent', 'Remembers your cookie preference', 'Strictly necessary'],
                  ].map(([name, purpose, type]) => (
                    <tr key={name}>
                      <td className="py-2 pr-4 font-mono text-acuity-blue/80">{name}</td>
                      <td className="py-2 pr-4">{purpose}</td>
                      <td className="py-2 text-chalk/70">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3">We do not currently use advertising or third-party tracking cookies. If this changes, we will update this policy and seek your consent.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">6. How long we keep your data</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Account data: retained while your account is active, then deleted within 30 days of account closure</li>
              <li>Learning progress: retained with your account; deleted on account closure</li>
              <li>Payment records: retained for 7 years to comply with financial record-keeping obligations</li>
              <li>Server logs: 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">7. Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><span className="text-chalk">Access</span> the personal data we hold about you</li>
              <li><span className="text-chalk">Rectify</span> inaccurate data</li>
              <li><span className="text-chalk">Erasure</span> (&quot;right to be forgotten&quot;) — subject to legal retention requirements</li>
              <li><span className="text-chalk">Portability</span> — receive your data in a machine-readable format</li>
              <li><span className="text-chalk">Object</span> to processing based on legitimate interests</li>
              <li><span className="text-chalk">Restrict</span> processing in certain circumstances</li>
              <li><span className="text-chalk">Withdraw consent</span> at any time where processing is based on consent</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email <span className="text-acuity-blue">privacy@tradecuity.com</span>. We will respond within 30 days. You also have the right to lodge a complaint with the <a href="https://ico.org.uk" className="text-acuity-blue hover:underline" target="_blank" rel="noopener noreferrer">Information Commissioner&apos;s Office (ICO)</a>.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">8. Children</h2>
            <p>tradecuity is not directed at anyone under 18. We do not knowingly collect data from minors. If you believe a minor has registered, please contact us and we will delete the account.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">9. Changes to this policy</h2>
            <p>We may update this policy periodically. We will notify you of significant changes by email or a notice on the platform. The &quot;Last updated&quot; date at the top reflects the most recent revision.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-chalk text-base mb-3">10. Contact</h2>
            <p>For any privacy-related questions or data requests: <span className="text-acuity-blue">privacy@tradecuity.com</span></p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-steel flex gap-6 text-sm">
          <Link href="/terms" className="text-acuity-blue hover:underline font-body">Terms of Service</Link>
          <Link href="/" className="text-ghost hover:text-chalk font-body">← Back to home</Link>
        </div>
      </main>
    </>
  )
}
