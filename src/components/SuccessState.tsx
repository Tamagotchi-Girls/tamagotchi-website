import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

export default function SuccessState() {
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
          <div className="flex items-center justify-between px-3 py-2" style={{ background: '#a8e890' }}>
            <div className="flex gap-1">
              <div className="w-2 h-2 border border-black/20" style={{ background: '#f5a0c8' }} />
              <div className="w-2 h-2 border border-black/20" style={{ background: '#ffe857' }} />
              <div className="w-2 h-2 border border-black/20" style={{ background: '#a8e890' }} />
            </div>
            <span className="font-mono text-black text-[9px]">success.exe</span>
            <span className="font-mono text-black text-[8px]">✓ OK</span>
          </div>

          <div className="p-8 flex flex-col items-center text-center gap-5">
            {/* Floating mascot */}
            <motion.img
              src="/logosofcorg/logo-icon.png"
              alt="Tamagotchi Girls celebrando"
              className="w-24 h-24"
              style={{ imageRendering: 'pixelated' }}
              animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Celebration particles */}
            <div className="relative h-8 w-full">
              {['♥', '★', '✦', '♦', '✿', '♥', '★'].map((char, i) => (
                <motion.span
                  key={i}
                  className="absolute font-pixel text-xs"
                  style={{
                    left: `${8 + i * 13}%`,
                    color: ['#f5a0c8', '#ffe857', '#a8e890', '#c5a0e8', '#5de8f0'][i % 5],
                  }}
                  animate={{ y: [0, -16, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Main message */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-pixel text-[16px] md:text-[18px] leading-relaxed text-black mb-1">
                ¡Solicitud exitosa! :D
              </h1>
              <div className="w-12 h-1 bg-[#a8e890] mx-auto mt-2 mb-4" />
              <p className="font-body text-sm text-black/70 leading-relaxed max-w-sm mx-auto">
                A continuación, en tu correo electrónico podrás ver los detalles de tu solicitud.
                Porfavor, revisa tu bandeja de entrada y la carpeta de spam para asegurarte de recibir la confirmación.
              </p>
            </motion.div>

            {/* System messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full border-2 border-black p-3"
              style={{ background: '#1a1a2e' }}
            >
              <p className="font-mono text-[8px] text-[#a8e890] mb-1">{'>'} APLICACIÓN RECIBIDA! ✓</p>
              <p className="font-mono text-[8px] text-[#5de8f0] mb-1">{'>'} CORREO DE CONFIRMACIÓN ENVIADO ✓</p>
              <p className="font-mono text-[8px] text-white/60">{'>'} STATUS: EN REVISIÓN...</p>
              <p className="font-mono text-[8px] text-[#ffe857] blink mt-1">{'>'} GRACIAS :D ♥</p>
            </motion.div>

            {/* Back button */}
            <motion.button
              onClick={() => navigate('/')}
              className="pixel-btn font-pixel text-[9px] px-5 py-2.5 border-2 border-black cursor-pointer"
              style={{ background: '#ffe857', boxShadow: '4px 4px 0 #1a1a2e' }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97, x: 2, y: 2, boxShadow: '2px 2px 0 #1a1a2e' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              VOLVER AL INICIO ↩
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
