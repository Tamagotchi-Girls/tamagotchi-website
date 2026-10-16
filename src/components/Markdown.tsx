import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// Small Markdown renderer for novedades: headings, paragraphs, lists, quotes, images,
// **bold**, *italic*, `code` and [links](url). Builds React elements, never raw HTML.

function safeHref(href: string): string | null {
  return /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : null
}

const INLINE = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  let i = 0
  for (const m of text.matchAll(INLINE)) {
    if (m.index! > last) nodes.push(text.slice(last, m.index))
    const key = `${keyPrefix}-${i++}`
    if (m[2]) nodes.push(<strong key={key}>{m[2]}</strong>)
    else if (m[3]) nodes.push(<em key={key}>{m[3]}</em>)
    else if (m[4]) nodes.push(<code key={key} className="font-mono text-[0.9em] px-1 bg-[#d4f5fb] border border-black/20">{m[4]}</code>)
    else {
      const href = safeHref(m[6])
      const linkClass = 'underline decoration-2 decoration-[#c5a0e8] hover:bg-[#ffe857]'
      if (!href) nodes.push(m[5])
      else if (href.startsWith('/')) nodes.push(<Link key={key} to={href} className={linkClass}>{m[5]}</Link>)
      else nodes.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{m[5]}</a>)
    }
    last = m.index! + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\r?\n\s*\r?\n/).map(b => b.trim()).filter(Boolean)

  return (
    <div className="font-body text-sm md:text-base text-black/80 leading-relaxed space-y-4">
      {blocks.map((block, bi) => {
        const key = `b${bi}`
        const lines = block.split(/\r?\n/)

        const heading = block.match(/^(#{1,3})\s+(.*)$/)
        if (heading && lines.length === 1) {
          const content = renderInline(heading[2], key)
          if (heading[1].length === 1) return <h2 key={key} className="font-pixel text-[12px] md:text-[14px] leading-relaxed text-black pt-2">{content}</h2>
          if (heading[1].length === 2) return <h3 key={key} className="font-pixel text-[10px] md:text-[12px] leading-relaxed text-black pt-2">{content}</h3>
          return <h4 key={key} className="font-mono font-bold text-sm text-black pt-1">{content}</h4>
        }

        const image = block.match(/^!\[([^\]]+)\]\(([^)\s]+)\)$/)
        if (image && safeHref(image[2])) {
          return (
            <figure key={key} className="border-2 border-black bg-[#d4f5fb]">
              <img src={image[2]} alt={image[1]} loading="lazy" className="w-full aspect-video object-contain block" />
            </figure>
          )
        }

        if (lines.every(l => /^[-*]\s+/.test(l))) {
          return (
            <ul key={key} className="space-y-1 pl-1">
              {lines.map((l, li) => (
                <li key={li} className="flex gap-2"><span className="text-[#f5a0c8]" aria-hidden="true">♥</span><span>{renderInline(l.replace(/^[-*]\s+/, ''), `${key}-${li}`)}</span></li>
              ))}
            </ul>
          )
        }

        if (lines.every(l => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={key} className="list-decimal pl-6 space-y-1">
              {lines.map((l, li) => <li key={li}>{renderInline(l.replace(/^\d+\.\s+/, ''), `${key}-${li}`)}</li>)}
            </ol>
          )
        }

        if (lines.every(l => l.startsWith('>'))) {
          return (
            <blockquote key={key} className="border-l-4 border-[#c5a0e8] bg-[#f5f0fb] px-4 py-2 italic">
              {renderInline(lines.map(l => l.replace(/^>\s?/, '')).join(' '), key)}
            </blockquote>
          )
        }

        return <p key={key}>{renderInline(lines.join(' '), key)}</p>
      })}
    </div>
  )
}
