import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RetroWindowProps {
  title: string
  children: ReactNode
  className?: string
  barColor?: string
  animate?: boolean
  delay?: number
}

export default function RetroWindow({
  title,
  children,
  className = '',
  barColor = '#1a1a2e',
  animate = true,
  delay = 0,
}: RetroWindowProps) {
  const Wrapper = animate ? motion.div : 'div'
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 24, scale: 0.97 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: '-60px' },
        transition: { type: 'spring', stiffness: 200, damping: 22, delay },
      }
    : {}

  return (
    <Wrapper
      {...(animProps as any)}
      className={`retro-window ${className}`}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{ background: barColor }}
      >
        <span className="font-mono text-white text-[9px] truncate">{title}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 border border-white/40" style={{ background: '#f5a0c8' }} />
          <div className="w-2 h-2 border border-white/40" style={{ background: '#ffe857' }} />
          <div className="w-2 h-2 border border-white/40" style={{ background: '#a8e890' }} />
        </div>
      </div>
      {/* Content */}
      <div>{children}</div>
    </Wrapper>
  )
}
