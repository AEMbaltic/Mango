import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

interface ScrollScrubProps {
  /** the tall, position:relative section this canvas scrubs across */
  sectionRef: RefObject<HTMLElement>
  /** when false, just paints a single static frame (mobile / reduced-motion) */
  enabled: boolean
  frameCount?: number
  baseUrl?: string
  staticIndex?: number
  className?: string
}

/**
 * Scroll-scrubbed frame-sequence background, rendered to a single <canvas>
 * (cover-fit, DPR-aware). Adapted from the bundled scroll-scrub.js reference.
 * Preloads the sequence only when scrubbing is enabled; otherwise loads one
 * representative frame so mobile doesn't fetch ~24 MB.
 */
export default function ScrollScrub({
  sectionRef,
  enabled,
  frameCount = 121,
  baseUrl = '/scrub/desktop',
  staticIndex = 70,
  className = '',
}: ScrollScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const images: HTMLImageElement[] = new Array(frameCount)
    let current = -1
    let naturalW = 0
    let naturalH = 0
    let raf = 0

    const url = (i: number) => `${baseUrl}/frame_${String(i + 1).padStart(4, '0')}.webp`

    function draw(frame: number) {
      const img = images[frame]
      if (!ctx || !img || !img.complete || !naturalW) return
      current = frame
      const cw = canvas!.width
      const ch = canvas!.height
      const scale = Math.max(cw / naturalW, ch / naturalH)
      const dw = naturalW * scale
      const dh = naturalH * scale
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.max(1, Math.round(canvas!.clientWidth * dpr))
      canvas!.height = Math.max(1, Math.round(canvas!.clientHeight * dpr))
      draw(current < 0 ? (enabled ? 0 : staticIndex) : current)
    }

    function frameForScroll() {
      const scrollable = section!.offsetHeight - window.innerHeight
      if (scrollable <= 0) return 0
      const progress = Math.min(Math.max(-section!.getBoundingClientRect().top / scrollable, 0), 1)
      return Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)))
    }

    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const f = frameForScroll()
        if (f !== current) draw(f)
      })
    }

    const loadFrame = (i: number, paintFirst = false) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (!naturalW) {
          naturalW = img.naturalWidth
          naturalH = img.naturalHeight
        }
        if (paintFirst) {
          resize()
          draw(i)
        }
      }
      img.src = url(i)
      images[i] = img
    }

    if (enabled) {
      // paint the first frame ASAP, then preload the rest
      loadFrame(0, true)
      for (let i = 1; i < frameCount; i++) loadFrame(i)
      window.addEventListener('scroll', onScroll, { passive: true })
    } else {
      loadFrame(staticIndex, true)
    }
    window.addEventListener('resize', resize)
    resize()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sectionRef, enabled, frameCount, baseUrl, staticIndex])

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
