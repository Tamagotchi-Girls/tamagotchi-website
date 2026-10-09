import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden" style={{ background: '#c5a0e8' }}>
      {/* Pixel grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Decorative elements */}
      {['♥', '★', '✦', '♦', '✿'].map((char, i) => (
        <motion.div
          key={i}
          className="absolute font-pixel text-black/10 text-4xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        >
          {char}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 border-2 border-black px-3 py-1" style={{ background: '#1a1a2e' }}>
            <span className="font-mono text-[#ffe857] text-[10px]">NEW_MEMBER.exe — are you ready?</span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
          className="font-pixel text-[18px] md:text-[22px] leading-relaxed text-black mb-6"
        >
          ¿QUIERES CREARLO<br />CON NOSOTRAS?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-base text-black/80 mb-10 max-w-lg mx-auto leading-relaxed"
        >
          Si quieres aprender, colaborar y formar parte del proyecto, nos encantaría conocerte.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.button
            onClick={() => navigate('/solicitud')}
            className="pixel-btn font-pixel text-[11px] px-6 py-4 border-2 border-black cursor-pointer"
            style={{ background: '#ffe857', boxShadow: '5px 5px 0 #1a1a2e' }}
            whileHover={{ scale: 1.05, y: -2, boxShadow: '7px 7px 0 #1a1a2e' }}
            whileTap={{ scale: 0.97, x: 3, y: 3, boxShadow: '2px 2px 0 #1a1a2e' }}
          >
            ME INTERESA UNIRME A LA ORGANIZACION ▸
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
