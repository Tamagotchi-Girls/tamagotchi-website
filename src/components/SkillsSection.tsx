import { motion } from 'motion/react'

const SKILLS = [
  {
    title: 'PIXEL ART',
    emoji: '/Icons/notebookicon.png',
    desc: 'Dibuja los avatares y elementos visuales del Tamagotchi.',
    color: '#f5a0c8',
    tag: 'VISUAL',
  },
  {
    title: 'FIGMA',
    emoji: '/Icons/designdeappicon.png',
    desc: 'Diseña interfaces y experiencias para la aplicación móvil.',
    color: '#c5a0e8',
    tag: 'DESIGN',
  },
  {
    title: 'REACT NATIVE',
    emoji: '/Icons/celphoneicon.png',
    desc: 'Desarrolla la aplicación móvil.',
    color: '#5de8f0',
    tag: 'DEV',
  },
  {
    title: 'C++ / ARDUINO',
    emoji: '/Icons/embebidosicon.png',
    desc: 'Programa el hardware y sistemas embebidos.',
    color: '#a8e890',
    tag: 'HW',
  },
]

export default function SkillsSection() {
  return (
    <section className="py-20 px-4 md:px-8 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 border-2 border-black px-3 py-1 mb-4" style={{ background: '#a8e890' }}>
            <span className="font-mono text-black text-[10px]">AREAS — escoge tu área</span>
          </div>
          <h2 className="font-pixel text-[18px] md:text-[22px] leading-relaxed text-black">
            ÁREAS DE<br />
            <span style={{ color: '#5de8f0' }}>CONTRIBUCIÓN</span>
          </h2>
          <div className="w-16 h-1 bg-black mt-2" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="retro-window group"
            >
              <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-black" style={{ background: skill.color }}>
                <span className="font-mono text-black text-[10px]">{skill.title}</span>
                <span className="font-mono text-black text-[10px] border border-black/30 px-1">{skill.tag}</span>
              </div>
              <div className="p-6 flex flex-col items-center gap-3 text-center">
                <motion.img
                  src={skill.emoji}
                  alt=""
                  className="w-16 h-16"
                  style={{ imageRendering: 'pixelated' }}
                  whileHover={{ scale: 1.3, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <p className="font-body text-xs text-black/70 leading-relaxed">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="retro-window max-w-xl mx-auto"
        >
          <div className="px-3 py-1.5 border-b-2 border-black" style={{ background: '#1a1a2e' }}>
            <span className="font-mono text-[#ffe857] text-[10px]">note.txt</span>
          </div>
          <div className="p-6 text-center">
            <p className="font-pixel text-[12px] leading-relaxed text-black mb-2">
              NO NECESITAS SABERLO TODO.
            </p>
            <p className="font-body text-sm text-black/70">
              Buscamos personas con curiosidad, ganas de aprender y ganas de crear.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
