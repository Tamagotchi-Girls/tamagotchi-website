// Data access layer for /novedades. Views only call getNovedades() / getNovedad(id),
// so the source (local Markdown today, a CMS or API later) can change without touching them.

export interface NovedadImagen {
  src: string
  alt: string
}

export interface NovedadResumen {
  id: string
  titulo: string
  fecha: string // YYYY-MM-DD
  resumen: string
  imagen: string
  alt: string
  placeholder: boolean
}

export interface Novedad extends NovedadResumen {
  cuerpo: string // Markdown
  imagenes: NovedadImagen[]
}

// Bundled at build time; the file name (without .md) is the id used in /novedades/:id.
const FILES = import.meta.glob<string>('../content/novedades/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

type FrontmatterValue = string | Record<string, string>[]

function unquote(value: string): string {
  const v = value.trim()
  if (v.length >= 2 && ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))) {
    return v.slice(1, -1)
  }
  return v
}

// Minimal YAML subset: `key: value` pairs plus lists of objects (`- src: ...` / `  alt: ...`).
function parseFrontmatter(raw: string): { data: Record<string, FrontmatterValue>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, FrontmatterValue> = {}
  let currentList: Record<string, string>[] | null = null

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue

    const item = line.match(/^\s+-\s+(\w+):\s*(.*)$/)
    if (item && currentList) {
      currentList.push({ [item[1]]: unquote(item[2]) })
      continue
    }
    const nested = line.match(/^\s+(\w+):\s*(.*)$/)
    if (nested && currentList && currentList.length > 0) {
      currentList[currentList.length - 1][nested[1]] = unquote(nested[2])
      continue
    }
    const top = line.match(/^(\w+):\s*(.*)$/)
    if (top) {
      if (top[2].trim() === '') {
        currentList = []
        data[top[1]] = currentList
      } else {
        currentList = null
        data[top[1]] = unquote(top[2])
      }
    }
  }

  return { data, body: match[2] }
}

function str(value: FrontmatterValue | undefined): string {
  return typeof value === 'string' ? value : ''
}

function parseNovedad(path: string, raw: string): Novedad | null {
  const id = path.split('/').pop()!.replace(/\.md$/, '')
  const { data, body } = parseFrontmatter(raw)

  const novedad: Novedad = {
    id,
    titulo: str(data.titulo),
    fecha: str(data.fecha),
    resumen: str(data.resumen),
    imagen: str(data.imagen),
    alt: str(data.alt),
    placeholder: str(data.placeholder) === 'true',
    cuerpo: body.trim(),
    imagenes: [],
  }

  const missing = (['titulo', 'fecha', 'resumen', 'imagen', 'alt'] as const).filter(k => !novedad[k])
  if (missing.length > 0 || !/^\d{4}-\d{2}-\d{2}$/.test(novedad.fecha)) {
    console.error(`[novedades] ${id}.md omitida: faltan campos (${missing.join(', ') || 'fecha debe ser YYYY-MM-DD'})`)
    return null
  }

  if (Array.isArray(data.imagenes)) {
    for (const img of data.imagenes) {
      if (img.src && img.alt) novedad.imagenes.push({ src: img.src, alt: img.alt })
      else console.error(`[novedades] ${id}.md: imagen de galería omitida, requiere src y alt`)
    }
  }

  return novedad
}

const ALL: Novedad[] = Object.entries(FILES)
  .map(([path, raw]) => parseNovedad(path, raw))
  .filter((n): n is Novedad => n !== null)
  .sort((a, b) => b.fecha.localeCompare(a.fecha))

export async function getNovedades(): Promise<NovedadResumen[]> {
  return ALL.map(({ cuerpo: _cuerpo, imagenes: _imagenes, ...resumen }) => resumen)
}

export async function getNovedad(id: string): Promise<Novedad | null> {
  return ALL.find(n => n.id === id) ?? null
}

// "2026-10-16" -> "16 de octubre de 2026". Parsed as a local date to avoid the UTC off-by-one.
export function formatFecha(fecha: string): string {
  const [y, m, d] = fecha.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}
