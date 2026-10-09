import { motion } from 'motion/react'
import RetroWindow from './RetroWindow'

const KEYWORDS = [
  { label: 'DISEÑO', icon: '/Icons/colorpaleteicon.png', color: '#f5a0c8', desc: 'Pixel art, interfaces y experiencias visuales.' },
  { label: 'CODIGO', icon: '/Icons/laptopicon.png', color: '#5de8f0', desc: 'Apps móviles y software que cobra vida.' },
  { label: 'HARDWARE', icon: '/Icons/embebidosicon.png', color: '#a8e890', desc: 'Electrónica, Arduino y sistemas embebidos.' },
  { label: 'COMUNIDAD', icon: '/Icons/hearticon.png', color: '#c5a0e8', desc: 'Aprender juntas, crecer juntas.' },
]

export default function AboutSection() {
  return (
    <section id="quienes" className="py-20 px-4 md:px-8 relative">
      {/* Decorative retro status bar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 border-2 border-black px-3 py-1" style={{ background: '#1a1a2e' }}>
          <span className="font-mono text-[#5de8f0] text-[10px]">▶ USUARIA DETECTADA :0 —  contando nuestra historia...</span>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-pixel text-[18px] md:text-[24px] leading-relaxed text-black mb-2">
            ¿QUIENES<br />
            <span style={{ color: '#c5a0e8' }}>SOMOS?</span>
          </h2>
          <div className="w-16 h-1 bg-black mt-2" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Main description windows */}
          <RetroWindow title="Sobre nosotras.txt" barColor="#1a1a2e" delay={0}>
            <div className="p-6">
              <p className="font-body text-sm leading-relaxed text-black/80 mb-4">
                <span className="font-mono text-[12px] text-[#c5a0e8] block mb-2">README.md</span>
                Tamagotchi Girls es una organización estudiantil creada para conectar chicas
                interesadas en tecnología, diseño y hardware.
              </p>
              <p className="font-body text-sm leading-relaxed text-black/80">
                Queremos crear un espacio donde podamos aprender juntas, colaborar en proyectos
                reales y convertir nuestras ideas en tecnología.
              </p>
            </div>
          </RetroWindow>

          <RetroWindow title="mision.exe" barColor="#c5a0e8" delay={0.1}>
            <div className="p-6">
              <div className="font-mono text-[11px] mb-3" style={{ color: '#1a1a2e' }}>
                {'>'} CARGANDO: MISSION...<br />
                {'>'} STATUS: ACTIVA ✓
              </div>
              <div className="space-y-2">
                {['Aprender haciendo proyectos reales.', 'Conectar diseño, código y hardware.', 'Construir una comunidad inclusiva.', 'Crear tecnología con identidad propia.'].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="font-pixel text-[10px] text-[#a8e890] mt-0.5">▸</span>
                    <span className="font-body text-sm text-black/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </RetroWindow>
        </div>

        {/* Keyword cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KEYWORDS.map((kw, i) => (
            <motion.div
              key={kw.label}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.08 }}
              whileHover={{ y: -4, rotate: i % 2 === 0 ? -1 : 1 }}
              className="retro-window cursor-default"
            >
              <div className="h-2" style={{ background: kw.color }} />
              <div className="p-5 flex flex-col items-center gap-2 text-center">
                <motion.img
                  src={kw.icon}
                  alt=""
                  className="w-12 h-12"
                  style={{ imageRendering: 'pixelated' }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <span className="font-pixel text-[11px] text-black leading-tight">{kw.label}</span>
                <span className="font-body text-xs text-black/60 leading-tight">{kw.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
