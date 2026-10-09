import { motion } from 'motion/react'

const CAREERS = [
  'INGENIERÍA EN COMPUTACIÓN',
  'INGENIERÍA EN INFORMÁTICA',
  'INGENIERÍA ELECTRÓNICA Y TELECOMUNICACIONES',
  'INGENIERÍA MECATRÓNICA',
  'INGENIERÍA BIOMÉDICA',
  'OTRAS INGENIERÍAS Y CARRERAS AFINES',
]

export default function CareersSection() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ background: '#d4f5fb' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-pixel text-[18px] md:text-[22px] leading-relaxed text-black">
            ¿QUIENES PUEDEN<br />
            <span style={{ color: '#5de8f0' }}>PARTICIPAR?</span>
          </h2>
          <div className="w-16 h-1 bg-black mt-2" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Careers window */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="retro-window"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-black" style={{ background: '#1a1a2e' }}>
              <div className="flex gap-1">
                <div className="w-2 h-2" style={{ background: '#f5a0c8' }} />
                <div className="w-2 h-2" style={{ background: '#ffe857' }} />
                <div className="w-2 h-2" style={{ background: '#a8e890' }} />
              </div>
              <span className="font-mono text-white text-[10px]">careers.list</span>
            </div>
            <div className="p-5">
              <p className="font-body text-sm text-black/70 mb-4">
                Buscamos chicas interesadas en tecnología, diseño y creación de proyectos.
              </p>
              <div className="space-y-2">
                {CAREERS.map((career, i) => (
                  <motion.div
                    key={career}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-2 border-2 border-black px-3 py-2"
                    style={{ background: i % 2 === 0 ? '#ffffff' : '#f0f8ff' }}
                  >
                    <span className="font-mono text-[10px] text-[#c5a0e8]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-[11px] text-black">{career}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Extra message */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 20 }}
              className="retro-window"
            >
              <div className="px-3 py-1.5 border-b-2 border-black" style={{ background: '#c5a0e8' }}>
                <span className="font-mono text-black text-[10px]">importantísimo.msg</span>
              </div>
              <div className="p-6">
                <p className="font-pixel text-[12px] leading-relaxed text-black mb-3">
                  ¿Tu carrera no aparece aquí?
                </p>
                <p className="font-body text-sm text-black/80 leading-relaxed">
                  Si te interesa el diseño, la programación, el hardware o aprender algo nuevo,{' '}
                  <strong>también queremos conocerte :D</strong>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 150, damping: 20 }}
              className="retro-window"
            >
              <div className="px-3 py-1.5 border-b-2 border-black" style={{ background: '#ffe857' }}>
                <span className="font-mono text-black text-[10px]">recuerda.txt</span>
              </div>
              <div className="p-6">
                <p className="font-body text-sm text-black/80 leading-relaxed">
                  Lo más importante no es lo que ya sabes, sino las ganas de aprender, explorar y colaborar :D
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
