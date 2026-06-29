import type { RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MEDIA } from '../lib/media'
import Photo from './ui/Photo'

/**
 * Full-bleed hero backdrop. Plays a generated cinematic clip (muted, looped),
 * and ties its motion to scroll: as you scroll through the hero the footage
 * parallaxes down, zooms in, and the scrim darkens. Falls back to a poster
 * image / branded navy gradient when the video is unavailable or the user
 * prefers reduced motion.
 */
export default function HeroVideo({ scrollTarget }: { scrollTarget: RefObject<HTMLElement> }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ['start start', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const scrim = useTransform(scrollYProgress, [0, 1], [0.4, 0.82])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* branded base — always visible, covers any media gap */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-ink-900 to-navy-700" />

      <motion.div className="absolute inset-[-12%]" style={reduce ? undefined : { y, scale }}>
        {MEDIA.heroVideo && !reduce ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={MEDIA.heroPoster || undefined}
            className="h-full w-full object-cover"
          >
            <source src={MEDIA.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Photo src={MEDIA.heroPoster} alt="" fill eager fallback="navy" />
        )}
      </motion.div>

      {/* scrolling scrim (darkens as you scroll) */}
      <motion.div className="absolute inset-0 bg-ink-900" style={reduce ? { opacity: 0.55 } : { opacity: scrim }} />
      {/* constant left scrim for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/40 to-transparent" />
      {/* blend into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sand-300 to-transparent" />
    </div>
  )
}
