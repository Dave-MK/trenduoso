import type { Config } from "tailwindcss"

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian:      '#111c2e',
        slate:         '#141820',
        steel:         '#1E2530',
        'acuity-blue': '#2B7FFF',
        'acuity-teal': '#00C4A0',
        chalk:         '#E8EDF4',
        ghost:         '#8B95A4',
        muted:         '#4A5568',
        cloud:         '#F0F4FA',
        'bear-red':    '#FF6B6B',
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
