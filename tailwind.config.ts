import type { Config } from "tailwindcss"

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian:      '#0B1219',
        slate:         '#111820',
        steel:         '#1A2330',
        'acuity-blue': '#00C4DC',
        'acuity-teal': '#00A090',
        'acuity-deep': '#007888',
        chalk:         '#E8EDF4',
        ghost:         '#8B95A4',
        muted:         '#4A5568',
        cloud:         '#F0F4FA',
        'bear-red':    '#FF5A5A',
        amber:         '#F5A623',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
