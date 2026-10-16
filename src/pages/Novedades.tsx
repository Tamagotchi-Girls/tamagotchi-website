import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { getNovedades, formatFecha, type NovedadResumen } from '../lib/novedades'
import PixelArrow from '../components/PixelArrow'

const BAR_COLORS = ['#c5a0e8', '#5de8f0', '#f5a0c8', '#a8e890', '#ffe857']

export default function Novedades() {
  const [novedades, setNovedades] = useState<NovedadResumen[] | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    getNovedades().then(setNovedades)
  }, [])

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 md:px-8 grid-bg" style={{ background: '#b3eef5' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
          <div className="inline-flex items-center gap-2 border-2 border-black px-3 py-1" style={{ background: '#1a1a2e' }}>
            <span className="font-mono text-[#ffe857] text-[10px]">NEWS.log — últimas actualizaciones</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="font-pixel text-[18px] md:text-[22px] leading-relaxed text-black mb-2"
        >
          NOVEDADES
        </motion.h1>
        <p className="font-body text-sm md:text-base text-black/70 mb-10 max-w-lg">
          Lo que está pasando en Tamagotchi Girls: proyectos, eventos y avances del equipo.
        </p>

        {novedades === null ? (
          <p className="font-mono text-[10px] text-black/60">{'>'} CARGANDO<span className="blink">_</span></p>
        ) : novedades.length === 0 ? (
          <p className="font-mono text-[10px] text-black/60">{'>'} Aún no hay publicaciones. Vuelve pronto ♥</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {novedades.map((n, i) => (
              <motion.article
                key={n.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 180, damping: 22 }}
                className="retro-window flex flex-col"
              >
                {/* Window bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b-2 border-black" style={{ background: BAR_COLORS[i % BAR_COLORS.length] }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 border border-black/20" style={{ background: '#f5a0c8' }} />
                    <div className="w-2 h-2 border border-black/20" style={{ background: '#ffe857' }} />
                    <div className="w-2 h-2 border border-black/20" style={{ background: '#a8e890' }} />
                  </div>
                  <time dateTime={n.fecha} className="font-mono text-black text-[9px]">{formatFecha(n.fecha)}</time>
                  {n.placeholder ? <span className="font-mono text-black text-[8px]">PLACEHOLDER</span> : <span className="font-mono text-black text-[8px]">♥</span>}
                </div>

                <Link to={`/novedades/${n.id}`} className="block border-b-2 border-black bg-[#d4f5fb]">
                  <img
                    src={n.imagen}
                    alt={n.alt}
                    loading="lazy"
                    width={1600}
                    height={900}
                    className="w-full h-auto aspect-video object-cover block"
                  />
                </Link>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h2 className="font-pixel text-[11px] md:text-[12px] leading-relaxed text-black">
                    <Link to={`/novedades/${n.id}`} className="hover:underline decoration-2 decoration-[#c5a0e8]">{n.titulo}</Link>
                  </h2>
                  <p className="font-body text-sm text-black/70 leading-relaxed flex-1">{n.resumen}</p>
                  <Link
                    to={`/novedades/${n.id}`}
                    className="pixel-btn self-start font-pixel text-[8px] px-3 py-2 border-2 border-black"
                    style={{ background: '#ffe857', boxShadow: '3px 3px 0 #1a1a2e' }}
                    aria-label={`Leer más: ${n.titulo}`}
                  >
                    LEER MÁS<PixelArrow className="ml-2" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
