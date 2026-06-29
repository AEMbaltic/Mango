import { useState } from 'react'

type Overlay = 'none' | 'scrim' | 'scrim-left' | 'duotone' | 'bottom'
type Fallback = 'warm' | 'navy'

interface PhotoProps {
  src?: string
  alt: string
  /** aspect-ratio utility, e.g. 'aspect-[3/2]' (ignored if fill) */
  ratio?: string
  /** fill the parent (parent must be relative + sized) */
  fill?: boolean
  overlay?: Overlay
  fallback?: Fallback
  eager?: boolean
  className?: string
  imgClassName?: string
}

const FALLBACKS: Record<Fallback, string> = {
  warm: 'bg-gradient-to-br from-mango-200 via-sand-300 to-mango-100',
  navy: 'bg-gradient-to-br from-navy-700 via-navy-900 to-ink-900',
}

const OVERLAYS: Record<Overlay, string> = {
  none: '',
  scrim: 'bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent',
  'scrim-left': 'bg-gradient-to-r from-ink-900/85 via-ink-900/45 to-transparent',
  duotone: 'bg-navy-900/60 mix-blend-multiply',
  bottom: 'bg-gradient-to-t from-ink-900/80 to-transparent',
}

/**
 * Image with a branded gradient placeholder behind it. If `src` is missing or
 * fails to load, the gradient stays — the layout never shows a broken image.
 */
export default function Photo({
  src,
  alt,
  ratio = 'aspect-[3/2]',
  fill = false,
  overlay = 'none',
  fallback = 'warm',
  eager = false,
  className = '',
  imgClassName = '',
}: PhotoProps) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`relative overflow-hidden ${fill ? 'h-full w-full' : ratio} ${FALLBACKS[fallback]} ${className}`}>
      {src && ok && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setOk(false)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
      {overlay !== 'none' && <div className={`pointer-events-none absolute inset-0 ${OVERLAYS[overlay]}`} />}
    </div>
  )
}
