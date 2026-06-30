import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Clock, ShieldCheck, Sparkles } from 'lucide-react'
import ScrollScrub from './ScrollScrub'
import PlateInput from './PlateInput'
import Rating from './ui/Rating'
import FortegraLogo from './FortegraLogo'
import { BRAND } from '../lib/brand'

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  const [plate, setPlate] = useState('')
  const ref = useRef<HTMLElement>(null)

  // Scrub everywhere except when the user prefers reduced motion; pick the
  // resolution-appropriate frame set (desktop 1600px / mobile 960px). Lazy
  // initial state avoids a layout flash on mount.
  const mq = (q: string) => typeof window !== 'undefined' && window.matchMedia(q).matches
  const [scrub, setScrub] = useState(() => !mq('(prefers-reduced-motion: reduce)'))
  const [baseUrl, setBaseUrl] = useState(() => (mq('(min-width: 1024px)') ? '/scrub/desktop' : '/scrub/mobile'))

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setScrub(!reduce.matches)
      setBaseUrl(wide.matches ? '/scrub/desktop' : '/scrub/mobile')
    }
    update()
    wide.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      wide.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.78], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.78], [0, -60])

  const content = (
    <div className="w-full min-w-0 max-w-2xl text-white">
      <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Rating tone="light" showCount={false} />
        <span className="hidden h-4 w-px bg-white/25 sm:block" />
        <span className="flex items-center gap-2 text-[13px] text-white/75">
          Insured by
          <FortegraLogo light variant="wordmark" height={15} />
          <span className="hidden sm:inline">· a top-rated insurer</span>
        </span>
      </motion.div>

      <motion.div
        custom={1}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mango-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-mango-400" />
        </span>
        <span className="text-[12.5px] font-semibold text-white">Manufacturer warranty expiring soon?</span>
      </motion.div>

      <motion.h1
        custom={2}
        variants={fade}
        initial="hidden"
        animate="show"
        className="font-display text-balance text-[2.7rem] font-extrabold leading-[1.02] tracking-[-0.025em] sm:text-[4.3rem]"
      >
        Keep driving.
        <br />
        We&apos;ll handle the{' '}
        <span className="bg-gradient-to-r from-mango-400 to-mango-500 bg-clip-text text-transparent">
          what-ifs
        </span>
        .
      </motion.h1>

      <motion.p custom={3} variants={fade} initial="hidden" animate="show" className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/80">
        Extended car warranty for cars with or without factory warranty — simple, fast and online.
      </motion.p>

      <motion.div
        custom={4}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-7 max-w-lg rounded-3xl border border-white/15 bg-white/95 p-3.5 shadow-lift backdrop-blur sm:p-4"
      >
        <PlateInput id="plate-hero" value={plate} onChange={setPlate} onSubmit={() => onGetPrice(plate)} />
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 px-1 text-[13px] text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={14} className="text-mango-500" /> Free &amp; no obligation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-mango-500" /> ~2 minutes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-leaf-500" /> Instant e-policy
          </span>
        </div>
      </motion.div>

      <motion.p custom={5} variants={fade} initial="hidden" animate="show" className="mt-4 text-[13px] text-white/60">
        {BRAND.dealerPartners} dealer partners · {BRAND.markets.join(' · ')}
      </motion.p>
    </div>
  )

  const scrims = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/45 to-ink-900/10" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-900/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-sand-300 to-transparent" />
    </>
  )

  if (scrub) {
    return (
      <section ref={ref} id="top" className="relative h-[210vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-ink-900">
          <div className="absolute inset-0">
            <ScrollScrub sectionRef={ref} enabled baseUrl={baseUrl} />
          </div>
          {scrims}
          <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 h-full">
            <div className="container-pad flex h-full items-start pt-24 sm:pt-28">{content}</div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="top" className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink-900">
      <div className="absolute inset-0">
        <ScrollScrub sectionRef={ref} enabled={false} baseUrl={baseUrl} />
      </div>
      {scrims}
      <div className="container-pad relative z-10 w-full pb-16 pt-28 sm:pt-32">{content}</div>
    </section>
  )
}
