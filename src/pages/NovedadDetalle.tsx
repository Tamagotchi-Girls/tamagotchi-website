import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { getNovedad, formatFecha, type Novedad } from '../lib/novedades'
import Markdown from '../components/Markdown'
import PixelArrow from '../components/PixelArrow'

function BackLink() {
  return (
    <Link
      to="/novedades"
      className="pixel-btn inline-block font-pixel text-[8px] px-3 py-2 border-2 border-black"
      style={{ background: '#ffe857', boxShadow: '3px 3px 0 #1a1a2e' }}
    >
      <PixelArrow direction="left" className="mr-2" />VOLVER A NOVEDADES
    </Link>
  )
}

function WindowBar({ color, title, right }: { color: string; title: string; right: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 border-b-2 border-black" style={{ background: color }}>
      <div className="flex gap-1 shrink-0">
        <div className="w-2 h-2 border border-black/20" style={{ background: '#f5a0c8' }} />
        <div className="w-2 h-2 border border-black/20" style={{ background: '#ffe857' }} />
        <div className="w-2 h-2 border border-black/20" style={{ background: '#a8e890' }} />
      </div>
      <span className="font-mono text-black text-[9px] truncate">{title}</span>
      <span className="font-mono text-black text-[8px] shrink-0">{right}</span>
    </div>
  )
}

export default function NovedadDetalle() {
  const { id = '' } = useParams()
  // undefined = loading, null = not found
  const [novedad, setNovedad] = useState<Novedad | null | undefined>(undefined)

  useEffect(() => {
    window.scrollTo(0, 0)
    setNovedad(undefined)
    getNovedad(id).then(setNovedad)
  }, [id])

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 md:px-8 grid-bg" style={{ background: '#b3eef5' }}>
      <div className="max-w-3xl mx-auto">
        {novedad === undefined ? (
          <p className="font-mono text-[10px] text-black/60">{'>'} CARGANDO<span className="blink">_</span></p>
        ) : novedad === null ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="retro-window max-w-lg mx-auto"
          >
            <WindowBar color="#f5a0c8" title="error.exe" right="404" />
            <div className="p-8 flex flex-col items-center text-center gap-5">
              <h1 className="font-pixel text-[13px] md:text-[15px] leading-relaxed text-black">
                Publicación no encontrada
              </h1>
              <p className="font-body text-sm text-black/70 leading-relaxed">
                Puede que el enlace esté mal escrito o que la publicación ya no exista.
              </p>
              <BackLink />
            </div>
          </motion.div>
        ) : (
          <>
            <div className="mb-6"><BackLink /></div>
            <motion.article
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              className="retro-window"
            >
              <WindowBar color="#c5a0e8" title={`${novedad.id}.md`} right={novedad.placeholder ? 'PLACEHOLDER' : '♥'} />

              <div className="border-b-2 border-black bg-[#d4f5fb]">
                <img
                  src={novedad.imagen}
                  alt={novedad.alt}
                  width={1600}
                  height={900}
                  className="w-full h-auto aspect-video object-cover block"
                />
              </div>

              <div className="p-5 md:p-8">
                <time dateTime={novedad.fecha} className="inline-block font-mono text-[9px] text-black border-2 border-black px-2 py-0.5 mb-4" style={{ background: '#a8e890' }}>
                  {formatFecha(novedad.fecha)}
                </time>
                <h1 className="font-pixel text-[14px] md:text-[18px] leading-relaxed text-black mb-6">
                  {novedad.titulo}
                </h1>

                <Markdown source={novedad.cuerpo} />

                {novedad.imagenes.length > 0 && (
                  <section className="mt-8" aria-label="Galería">
                    <h2 className="font-pixel text-[10px] text-black mb-3">GALERÍA</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {novedad.imagenes.map(img => (
                        <a key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" className="block border-2 border-black bg-[#d4f5fb]" style={{ boxShadow: '3px 3px 0 #1a1a2e' }}>
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            width={800}
                            height={600}
                            className="w-full h-auto aspect-[4/3] object-cover block"
                          />
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </motion.article>
          </>
        )}
      </div>
    </main>
  )
}
