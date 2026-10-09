import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import RetroWindow from './RetroWindow'

const WALLPAPER_FRAMES = [
  '/Wallpapers/FramesW2/frame1.png',
  '/Wallpapers/FramesW2/frame2.jpg',
  '/Wallpapers/FramesW2/frame3.jpg',
  '/Wallpapers/FramesW2/frame4.jpg',
  '/Wallpapers/FramesW2/frame5.jpg',
  '/Wallpapers/FramesW2/frame6.jpg',
  '/Wallpapers/FramesW2/frame7.jpg',
]

const VIDEOS = [
  { src: '/videos/koyahardwarefisico.mp4', label: 'koyahardwarefisico.mp4' },
  { src: '/videos/koyasimulationvideo.mp4', label: 'koyasimulationvideo.mp4' },
]

const AREAS = [
  {
    num: '01',
    title: 'DISEÑO',
    tags: ['PIXEL ART', 'FIGMA', 'UI / UX'],
    desc: 'Diseñamos los avatares, personajes e interfaces que forman parte de la experiencia.',
    color: '#f5a0c8',
    icon: '/Icons/notebookicon.png',
  },
  {
    num: '02',
    title: 'DESARROLLO MÓVIL',
    tags: ['REACT NATIVE'],
    desc: 'Construimos la aplicación móvil que permitirá interactuar con nuestro Tamagotchi.',
    color: '#5de8f0',
    icon: '/Icons/celphoneicon.png',
  },
  {
    num: '03',
    title: 'HARDWARE',
    tags: ['C++', 'ARDUINO', 'SISTEMAS EMBEBIDOS'],
    desc: 'Programamos el hardware que hará posible que nuestro Tamagotchi cobre vida.',
    color: '#a8e890',
    icon: '/Icons/embebidosicon.png',
  },
]

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const [wallpaperFrame, setWallpaperFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaperFrame((prev) => (prev + 1) % WALLPAPER_FRAMES.length)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const [activeVideo, setActiveVideo] = useState(0)
  const goPrevVideo = () => setActiveVideo((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length)
  const goNextVideo = () => setActiveVideo((prev) => (prev + 1) % VIDEOS.length)

  return (
    <section id="que-hacemos" ref={sectionRef} className="py-20 px-4 md:px-8 relative overflow-hidden" style={{ background: '#1a1a2e' }}>
      {/* Animated wallpaper bg */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <img src={WALLPAPER_FRAMES[wallpaperFrame]} alt="" className="w-full h-full object-cover opacity-10" aria-hidden="true" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="border-2 border-[#5de8f0] px-3 py-1 inline-flex items-center gap-2" style={{ background: 'rgba(93,232,240,0.1)' }}>
            <span className="font-mono text-[#5de8f0] text-[10px]">NUEVO PROYECTO ENCONTRADO!! — inicializando...</span>
            <span className="blink text-[#5de8f0] font-mono text-[10px]">▮</span>
          </div>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="font-pixel text-[18px] md:text-[22px] leading-relaxed text-white mb-2">
            ¿QUE ESTAMOS<br />
            <span style={{ color: '#5de8f0' }}>CREANDO?</span>
          </h2>
          <div className="w-16 h-1 mt-2" style={{ background: '#5de8f0' }} />
          <p className="font-body text-sm text-white/70 mt-4 max-w-xl">
            Estamos desarrollando nuestro propio Tamagotchi combinando diseño, desarrollo móvil y sistemas embebidos.
          </p>
        </motion.div>

        {/* Video + area cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Simulation video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="h-full"
          >
            <div className="retro-window h-full flex flex-col">
              <div className="flex items-center justify-between px-3 py-1.5" style={{ background: '#5de8f0' }}>
                <span className="font-mono text-black text-[11px]">{VIDEOS[activeVideo].label}</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 border border-black/30" style={{ background: '#f5a0c8' }} />
                  <div className="w-2 h-2 border border-black/30" style={{ background: '#ffe857' }} />
                  <div className="w-2 h-2 border border-black/30" style={{ background: '#a8e890' }} />
                </div>
              </div>
              <div className="flex-1 relative" style={{ background: '#0d0d1a' }}>
                <video
                  key={activeVideo}
                  src={VIDEOS[activeVideo].src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-contain block"
                />
                <button
                  onClick={goPrevVideo}
                  aria-label="Video anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center border-2 border-black bg-[#ffe857] font-pixel text-[10px] cursor-pointer"
                  style={{ boxShadow: '2px 2px 0 #1a1a2e' }}
                >
                  ◀
                </button>
                <button
                  onClick={goNextVideo}
                  aria-label="Video siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center border-2 border-black bg-[#ffe857] font-pixel text-[10px] cursor-pointer"
                  style={{ boxShadow: '2px 2px 0 #1a1a2e' }}
                >
                  ▶
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 py-2 border-t-2 border-black" style={{ background: '#0d0d1a' }}>
                {VIDEOS.map((v, i) => (
                  <button
                    key={v.src}
                    onClick={() => setActiveVideo(i)}
                    aria-label={v.label}
                    className="w-2.5 h-2.5 border border-black cursor-pointer"
                    style={{ background: i === activeVideo ? '#5de8f0' : 'rgba(255,255,255,0.2)' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Area cards */}
          <div className="grid grid-cols-1 gap-6">
            {AREAS.map((area, i) => (
              <motion.div
                key={area.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <div className="border-2 h-full" style={{ borderColor: area.color, boxShadow: `4px 4px 0 ${area.color}`, background: '#0d0d1a' }}>
                  {/* Bar */}
                  <div className="flex items-center justify-between px-3 py-1.5" style={{ background: area.color }}>
                    <span className="font-mono text-black text-[11px]">{area.num} — {area.title}</span>
                    <img src={area.icon} alt="" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {area.tags.map((tag) => (
                        <span key={tag} className="border px-2 py-0.5 font-mono text-[10px]"
                          style={{ borderColor: area.color, color: area.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-body text-sm text-white/70 leading-relaxed">{area.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
