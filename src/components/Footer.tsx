import { motion } from 'motion/react'
import { FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa'

const SOCIAL_LINKS = [
  { label: 'GitHub', Icon: FaGithub, href: 'https://github.com/Tamagotchi-Girls' },
  { label: 'Instagram', Icon: FaInstagram, href: 'https://instagram.com' },
  { label: 'Contacto', Icon: FaEnvelope, href: 'email: TamagotchiGirls@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-black py-8 px-4 md:px-8" style={{ background: '#1a1a2e' }}>
      <div className="max-w-6xl mx-auto">
        {/* Window bar style */}
        <div className="flex items-center gap-1 mb-6 pb-3 border-b border-white/10">
          <div className="w-2 h-2" style={{ background: '#f5a0c8', border: '1px solid rgba(255,255,255,0.2)' }} />
          <div className="w-2 h-2" style={{ background: '#ffe857', border: '1px solid rgba(255,255,255,0.2)' }} />
          <div className="w-2 h-2" style={{ background: '#a8e890', border: '1px solid rgba(255,255,255,0.2)' }} />
          <span className="font-mono text-white/30 text-[10px] ml-2"> Más información: </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Logo */}
          <div className="flex justify-center md:justify-start order-1">
            <img src="/logosofcorg/logo-icon.png" alt="Tamagotchi Girls" className="w-10 h-10" style={{ imageRendering: 'pixelated' }} />
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 order-3 md:order-2">
            {SOCIAL_LINKS.map(({ label, Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group"
                whileHover={{ y: -2 }}
              >
                <div
                  className="w-8 h-8 border-2 border-white/30 flex items-center justify-center text-white/60 group-hover:border-[#5de8f0] group-hover:text-[#5de8f0] transition-colors"
                >
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="font-mono text-[7px] text-white/40 group-hover:text-[#5de8f0] transition-colors">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Tagline */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right order-2 md:order-3">
            <p className="font-pixel text-[12px] text-white leading-tight">Tamagotchi Girls</p>
            <p className="font-mono text-[10px] text-white/50 mt-1">Diseñando, programando y construyendo juntas.</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-[7px] text-white/30">
            © 2025 Tamagotchi Girls — Todos los derechos reservados.
          </span>
          <span className="font-mono text-[7px] text-[#5de8f0]/50 blink">SISTEMA LISTO...▮</span>
        </div>
      </div>
    </footer>
  )
}
