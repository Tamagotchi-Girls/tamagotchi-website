import { motion } from 'motion/react'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow' | 'pink' | 'green'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

const variants = {
  primary: { bg: '#1a1a2e', text: '#b3eef5', shadow: '#5de8f0' },
  secondary: { bg: '#5de8f0', text: '#1a1a2e', shadow: '#1a1a2e' },
  outline: { bg: 'transparent', text: '#1a1a2e', shadow: '#1a1a2e' },
  yellow: { bg: '#ffe857', text: '#1a1a2e', shadow: '#1a1a2e' },
  pink: { bg: '#f5a0c8', text: '#1a1a2e', shadow: '#1a1a2e' },
  green: { bg: '#a8e890', text: '#1a1a2e', shadow: '#1a1a2e' },
}

const sizes = {
  sm: 'px-3 py-1.5 text-[8px]',
  md: 'px-4 py-2 text-[9px]',
  lg: 'px-6 py-3 text-[10px]',
}

export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: PixelButtonProps) {
  const v = variants[variant]
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97, x: 2, y: 2, boxShadow: `2px 2px 0 ${v.shadow}` }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`pixel-btn inline-block font-pixel border-2 border-black cursor-pointer ${sizes[size]} ${className}`}
      style={{
        background: v.bg,
        color: v.text,
        boxShadow: `4px 4px 0 ${v.shadow}`,
      }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}
