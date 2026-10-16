import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import PixelArrow from './PixelArrow'

export default function ApplicationsClosed() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 grid-bg pt-28" style={{ background: '#b3eef5' }}>
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 18 }}
          className="retro-window"
        >
          {/* Window bar */}
          <div className="flex items-center justify-between px-3 py-2" style={{ background: '#f5a0c8' }}>
            <div className="flex gap-1">
              <div className="w-2 h-2 border border-black/20" style={{ background: '#f5a0c8' }} />
              <div className="w-2 h-2 border border-black/20" style={{ background: '#ffe857' }} />
              <div className="w-2 h-2 border border-black/20" style={{ background: '#a8e890' }} />
            </div>
            <span className="font-mono text-black text-[9px]">solicitudes.exe</span>
            <span className="font-mono text-black text-[8px]">⏸ PAUSA</span>
          </div>

          <div className="p-8 flex flex-col items-center text-center gap-5">
            {/* Floating mascot */}
            <motion.img
              src="/logosofcorg/logo-icon.png"
              alt="Tamagotchi Girls"
              className="w-24 h-24"
              style={{ imageRendering: 'pixelated' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main message */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-pixel text-[13px] md:text-[16px] leading-relaxed text-black mb-1">
                Por ahora no estamos recibiendo solicitudes
              </h1>
              <div className="w-12 h-1 bg-[#f5a0c8] mx-auto mt-2 mb-4" />
              <p className="font-body text-sm text-black/70 leading-relaxed max-w-sm mx-auto">
                ¡Gracias por tu interés! Mientras volvemos a abrir, puedes ver en qué estamos trabajando
                en nuestra sección de novedades.
              </p>
            </motion.div>

            {/* System messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full border-2 border-black p-3 text-left"
              style={{ background: '#1a1a2e' }}
            >
              <p className="font-mono text-[8px] text-[#f5a0c8] mb-1">{'>'} SOLICITUDES: CERRADAS TEMPORALMENTE</p>
              <p className="font-mono text-[8px] text-white/60 mb-1">{'>'} STATUS: PREPARANDO LA SIGUIENTE CONVOCATORIA...</p>
              <p className="font-mono text-[8px] text-[#ffe857] blink mt-1">{'>'} VUELVE PRONTO ♥</p>
            </motion.div>

            <motion.button
              onClick={() => navigate('/novedades')}
              className="pixel-btn font-pixel text-[9px] px-5 py-2.5 border-2 border-black cursor-pointer"
              style={{ background: '#ffe857', boxShadow: '4px 4px 0 #1a1a2e' }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97, x: 2, y: 2, boxShadow: '2px 2px 0 #1a1a2e' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              VER NOVEDADES<PixelArrow className="ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
