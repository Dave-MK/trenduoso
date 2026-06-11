'use client'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const BASE = 'inline-flex items-center justify-center font-display font-medium rounded-lg transition-colors cursor-pointer'

const VARIANTS = {
  primary:   'bg-acuity-blue text-white hover:bg-acuity-blue/90',
  secondary: 'bg-steel text-chalk border border-steel hover:border-acuity-blue',
  ghost:     'text-ghost hover:text-chalk',
}

const SIZES = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-sm px-6 py-3',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
