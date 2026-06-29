import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ShieldCheck, Sparkles } from 'lucide-react'
import HeroVideo from './HeroVideo'
import PlateInput from './PlateInput'
import Rating from './ui/Rating'
import FortegraLogo from './FortegraLogo'
import { BRAND } from '../lib/brand'

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Hero({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  const [plate, setPlate] = useState('')
  const ref = useRef<HTMLElement>(null)

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
      <HeroVideo scrollTarget={ref} />

      <div className="container-pad relative z-10 w-full pb-16 pt-28 sm:pt-32">
        <div className="max-w-2xl text-white">
          {/* trust row */}
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <Rating tone="light" showCount={false} />
            <span className="hidden h-4 w-px bg-white/25 sm:block" />
            <span className="flex items-center gap-2 text-[13px] text-white/75">
              Underwritten by
              <FortegraLogo light variant="wordmark" height={15} />
              <span className="hidden sm:inline">· {BRAND.rating}</span>
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
            className="font-display text-balance text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.025em] sm:text-[4.1rem]"
          >
            Keep your car covered the day the{' '}
            <span className="bg-gradient-to-r from-mango-400 to-mango-500 bg-clip-text text-transparent">
              factory warranty
            </span>{' '}
            ends.
          </motion.h1>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/80"
          >
            Enter your licence plate — we&apos;ll find your car and show your exact price in seconds.
            No call, no paperwork. Buy online in under 5 minutes.
          </motion.p>

          {/* plate card */}
          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-xl rounded-3xl border border-white/15 bg-white/95 p-3.5 shadow-lift backdrop-blur sm:p-4"
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

          <motion.p
            custom={5}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-4 text-[13px] text-white/60"
          >
            {BRAND.dealerPartners} dealer partners · {BRAND.markets.join(' · ')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
