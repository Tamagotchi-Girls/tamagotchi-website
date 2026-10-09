import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import PixelButton from './PixelButton'

const KOYA_FRAMES = [
  '/koyaicon/framexp1koya.png',
  '/koyaicon/frame2xpkoya.png',
  '/koyaicon/frame3xpkoya.png',
]

const WALLPAPER_FRAMES = [
  '/Wallpapers/FramesW1/FrameW1.jpg',
  '/Wallpapers/FramesW1/FrameW2.jpg',
  '/Wallpapers/FramesW1/FrameW3.jpg',
  '/Wallpapers/FramesW1/FrameW4.jpg',
  '/Wallpapers/FramesW1/FrameW5.jpg',
  '/Wallpapers/FramesW1/FrameW6.jpg',
  '/Wallpapers/FramesW1/FrameW7.jpg',
]

const PIXEL_PARTICLES = [
  { x: '8%', y: '20%', color: '#ffe857', size: 6, delay: 0 },
  { x: '90%', y: '15%', color: '#f5a0c8', size: 5, delay: 0.5 },
  { x: '15%', y: '70%', color: '#a8e890', size: 7, delay: 0.8 },
  { x: '85%', y: '65%', color: '#c5a0e8', size: 5, delay: 0.3 },
  { x: '50%', y: '10%', color: '#5de8f0', size: 4, delay: 1.0 },
  { x: '75%', y: '80%', color: '#ffe857', size: 6, delay: 0.6 },
  { x: '25%', y: '85%', color: '#f5a0c8', size: 4, delay: 1.2 },
]

const STARS = [
  { x: '12%', y: '12%', delay: 0 },
  { x: '88%', y: '22%', delay: 0.7 },
  { x: '40%', y: '8%', delay: 1.1 },
  { x: '70%', y: '75%', delay: 0.4 },
  { x: '20%', y: '55%', delay: 0.9 },
  { x: '92%', y: '50%', delay: 1.4 },
]

function PixelStar({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute font-pixel text-[#ffe857] select-none pointer-events-none"
      style={{ left: x, top: y, fontSize: '10px' }}
      animate={{ opacity: [1, 0.2, 1], scale: [1, 0.6, 1] }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      ✦
    </motion.div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const charY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  const scrollToNext = () => {
    document.getElementById('quienes')?.scrollIntoView({ behavior: 'smooth' })
  }

  const [koyaFrame, setKoyaFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setKoyaFrame((prev) => (prev + 1) % KOYA_FRAMES.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const [wallpaperFrame, setWallpaperFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaperFrame((prev) => (prev + 1) % WALLPAPER_FRAMES.length)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-28 pb-16"
    >
      {/* Wallpaper parallax layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <img
          src={WALLPAPER_FRAMES[wallpaperFrame]}
          alt=""
          className="w-full h-full object-cover opacity-15 object-[center_15%] md:object-[center_25%]"
          style={{ imageRendering: 'pixelated' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Pixel particles */}
      {PIXEL_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: p.x, top: p.y }}
          animate={{ y: [-4, 4, -4], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3 + i * 0.4, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{ width: p.size, height: p.size, background: p.color, border: '1px solid #1a1a2e' }} />
        </motion.div>
      ))}

      {/* Stars */}
      {STARS.map((s, i) => <PixelStar key={i} {...s} />)}

      {/* Floating pixel cursor */}
      <motion.div
        className="absolute pointer-events-none text-black font-pixel text-xl hidden md:block"
        style={{ right: '8%', top: '35%' }}
        animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ▸
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Main retro window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
          className="flex-1 w-full max-w-2xl"
        >
          <div className="retro-window">
            {/* Window bar */}
            <div className="flex items-center justify-between px-3 py-1.5" style={{ background: '#1a1a2e' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2" style={{ background: '#f5a0c8', border: '1px solid rgba(255,255,255,0.3)' }} />
                <div className="w-2 h-2" style={{ background: '#ffe857', border: '1px solid rgba(255,255,255,0.3)' }} />
                <div className="w-2 h-2" style={{ background: '#a8e890', border: '1px solid rgba(255,255,255,0.3)' }} />
              </div>
              <span className="font-mono text-[11px] text-white/70">tamagotchi-girls.exe</span>
              <span className="font-mono text-[#5de8f0] text-[11px] blink">▮</span>
            </div>

            {/* Address bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-black" style={{ background: '#d4f5fb' }}>
              <span className="font-mono text-[11px] text-black/50">◀ ▶ ↺</span>
              <div className="flex-1 border-2 border-black px-2 py-0.5 bg-white">
                <span className="font-mono text-[11px] text-black/60">https://tamagotchi-girls.dev/</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <div
                  className="border-2 border-black px-2 py-0.5 font-mono text-[10px]"
                  style={{ background: '#a8e890' }}
                >
                  ● SISTEMA LISTO :D!
                </div>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 150, damping: 20 }}
                className="font-pixel text-[16px] md:text-[20px] leading-relaxed text-black mb-4"
              >
                ¡DALE VIDA<br />A NUESTRO<br />
                <span style={{ color: '#c5a0e8' }}>TAMAGOTCHI!</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-mono text-[11px] md:text-[13px] text-black mb-2 leading-relaxed"
              >
                Diseño, código y hardware creado por chicas.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="font-body text-sm text-black/70 mb-6 leading-relaxed max-w-lg"
              >
                Somos una organización estudiantil que busca crear tecnología mientras aprendemos,
                colaboramos y construimos proyectos reales.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-3"
              >
                <PixelButton
                  variant="yellow"
                  size="md"
                  onClick={() => navigate('/solicitud')}
                >
                  ME INTERESA UNIRME
                </PixelButton>
                <PixelButton
                  variant="outline"
                  size="md"
                  onClick={scrollToNext}
                >
                  CONOCE EL PROYECTO ↓
                </PixelButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tamagotchi character window */}
        <motion.div
          style={{ y: charY }}
          className="flex-shrink-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.4 }}
          >
            <div className="retro-window w-64 md:w-72">
              <div className="flex items-center justify-between px-2 py-1" style={{ background: '#c5a0e8' }}>
                <span className="font-mono text-black text-[10px]">tamagotchi.pet</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 border border-black/30" style={{ background: '#f5a0c8' }} />
                  <div className="w-2 h-2 border border-black/30" style={{ background: '#ffe857' }} />
                  <div className="w-2 h-2 border border-black/30" style={{ background: '#a8e890' }} />
                </div>
              </div>
              <div className="p-5 flex flex-col items-center gap-3" style={{ background: '#f0f8ff' }}>
                <motion.img
                  src={KOYA_FRAMES[koyaFrame]}
                  alt="Tamagotchi Girls mascot"
                  className="w-28 h-28"
                  style={{ imageRendering: 'pixelated' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="w-full border-2 border-black p-2 flex items-center justify-center" style={{ background: '#ffe857' }}>
                  <img
                    src="/koyaicon/statBarsWeb.png"
                    alt="HP, sed, sueño y felicidad"
                    className="h-6"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                {/* Speech bubble */}
                <div className="relative w-full">
                  <div className="border-2 border-black px-3 py-2 bg-white relative">
                    <span className="font-mono text-[11px]"> KOYA: ¡Hola! Unete a nosotrxs </span>
                    {/* Bubble tail */}
                    <div className="absolute -top-2 left-6 w-0 h-0"
                      style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '8px solid #1a1a2e' }} />
                    <div className="absolute -top-1 left-6 w-0 h-0"
                      style={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '7px solid white', marginLeft: '1px' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small floating elements */}
          <motion.div
            className="absolute -right-4 -top-4 font-pixel text-xs text-[#f5a0c8]"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ♥
          </motion.div>
          <motion.div
            className="absolute -left-3 -bottom-3 font-pixel text-xs text-[#ffe857]"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            ★
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
