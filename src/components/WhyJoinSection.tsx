import { motion } from 'motion/react'

const REASONS = [
  { text: 'Aprende haciendo.', icon: '/Icons/flower1.png', color: '#ffe857' },
  { text: 'Construye proyectos reales.', icon: '/Icons/flower2.png', color: '#a8e890' },
  { text: 'Colabora con otras chicas interesadas en tecnología.', icon: '/Icons/flower3.png', color: '#c5a0e8' },
  { text: 'Agrega experiencia a tu CV y portafolio.', icon: '/Icons/flower4.png', color: '#5de8f0' },
  { text: 'Conoce nuevas áreas de tecnología.', icon: '/Icons/flower5.png', color: '#f5a0c8' },
  { text: 'Convierte tus ideas en algo que puedas mostrar.', icon: '/Icons/flower6.png', color: '#ffe857' },
]

export default function WhyJoinSection() {
  return (
    <section id="unete" className="py-20 px-4 md:px-8 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 border-2 border-black px-3 py-1 mb-4" style={{ background: '#ffe857' }}>
            <span className="font-mono text-black text-[10px]">CONSTRUYENDO COSITAS COOL :D...</span>
          </div>
          <h2 className="font-pixel text-[18px] md:text-[24px] leading-relaxed text-black">
            ¿POR QUE<br />
            <span style={{ color: '#c5a0e8' }}>UNIRTE?</span>
          </h2>
          <div className="w-16 h-1 bg-black mt-2" />
        </motion.div>

        {/* Reason windows grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 22, delay: i * 0.07 }}
              whileHover={{ y: -5, rotate: i % 3 === 0 ? -1 : i % 3 === 1 ? 0 : 1 }}
              className="retro-window"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-black" style={{ background: reason.color }}>
                <img src={reason.icon} className="w-5 h-5" style={{ imageRendering: 'pixelated' }} alt="" />
                <span className="font-mono text-black text-[10px]">motivo_{String(i + 1).padStart(2, '0')}.txt</span>
              </div>
              <div className="p-5">
                <p className="font-body text-sm leading-relaxed text-black">{reason.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
