import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { CookieBanner } from '@/components/CookieBanner'
import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'tradecuity — Trading Intelligence',
  description: 'Interactive trading education. Draw on real charts, get graded, build real analytical edge.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-obsidian text-chalk font-body antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
