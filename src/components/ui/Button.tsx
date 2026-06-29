import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  size?: Size
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
  full?: boolean
  'aria-label'?: string
}

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-2xl font-bold tracking-[-0.01em] transition-colors focus-ring disabled:cursor-not-allowed select-none'

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
}

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-mango-500 hover:bg-mango-600 shadow-mango-sm disabled:bg-sand-500 disabled:text-ink-300 disabled:shadow-none',
  dark: 'text-white bg-ink hover:bg-ink-700 shadow-lift',
  secondary:
    'text-ink bg-white border border-line-mid hover:border-mango-400 hover:text-mango-700 shadow-card',
  ghost: 'text-ink hover:bg-sand-200',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  type = 'button',
  className = '',
  full,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}
      aria-label={rest['aria-label']}
    >
      {children}
    </motion.button>
  )
}
