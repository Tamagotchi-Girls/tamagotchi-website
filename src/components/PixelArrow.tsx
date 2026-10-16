// Pixel triangle arrow drawn in SVG. Press Start 2P (as served by Google Fonts) has no ▸ ◂ ▶ ◀ glyphs,
// so the browser fell back to a system font. Sized in em and colored with currentColor to sit like a glyph.
export default function PixelArrow({ direction = 'right', className = '' }: { direction?: 'left' | 'right'; className?: string }) {
  return (
    <svg
      viewBox="0 0 4 7"
      width="0.5em"
      height="0.875em"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={`inline-block align-baseline shrink-0 ${className}`}
      style={direction === 'left' ? { transform: 'scaleX(-1)' } : undefined}
    >
      <rect x="0" y="0" width="1" height="7" />
      <rect x="1" y="1" width="1" height="5" />
      <rect x="2" y="2" width="1" height="3" />
      <rect x="3" y="3" width="1" height="1" />
    </svg>
  )
}
