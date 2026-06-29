import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Clock, ShieldCheck, Sparkles, Star } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import PlateInput from './PlateInput'
import { MangoMark } from './Logo'
import { BRAND } from '../lib/brand'

export default function Hero({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  const [plate, setPlate] = useState('')

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <AnimatedBackground />

      <div className="container-pad relative grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
        {/* ---- copy + plate ---- */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-mango-200 bg-mango-100 px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-500" />
            </span>
            <span className="text-[12.5px] font-semibold text-mango-700">
              Manufacturer warranty expiring soon?
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl"
          >
            Keep your car covered the day the{' '}
            <span className="text-gradient-mango">factory warranty</span> ends.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-500"
          >
            Enter your licence plate — we'll find your car and show your exact price instantly.
            No call, no paperwork. Buy online in under 5 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-7"
          >
            <PlateInput id="plate-hero" value={plate} onChange={setPlate} onSubmit={() => onGetPrice(plate)} />
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={14} className="text-mango-500" /> Free &amp; no obligation
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-mango-500" /> Takes ~2 minutes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-leaf-500" /> Instant e-policy
              </span>
            </div>
          </motion.div>

          {/* trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center gap-3 border-t border-line/70 pt-5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-leaf-500 text-white">
              <ShieldCheck size={18} />
            </div>
            <p className="text-[13px] leading-tight text-ink-500">
              <span className="font-bold text-ink">Backed by {BRAND.underwriter.split(' ')[0]} · {BRAND.rating}</span>
              <br />
              Regulated insurer · {BRAND.dealerPartners} dealer partners across the Baltics.
            </p>
          </motion.div>
        </div>

        {/* ---- floating quote card ---- */}
        <div className="relative mx-auto hidden w-full max-w-sm lg:block">
          <FloatingQuoteCard />
        </div>
      </div>
    </section>
  )
}

function FloatingQuoteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* main card */}
      <div className="rounded-4xl border border-line bg-white/90 p-6 shadow-lift backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-ink-400">
            <MangoMark size={20} /> Instant quote
          </span>
          <span className="rounded-full bg-leaf-50 px-2.5 py-1 text-[11px] font-bold text-leaf-600">
            Live price
          </span>
        </div>

        {/* car */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-ink to-ink-700 p-4 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <Car size={24} />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold">Audi Q5 40 TFSI</div>
            <div className="font-mono text-[11px] text-sand-400/90">KMG 482 · 2021</div>
          </div>
        </div>

        {/* plan + price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-extrabold text-ink">Deluxe</span>
              <span className="rounded-full bg-mango-500 px-2 py-0.5 text-[10px] font-bold text-white">
                ★ Most chosen
              </span>
            </div>
            <div className="mt-1 text-[12px] text-ink-400">Up to €5,000 per claim</div>
          </div>
          <div className="text-right leading-none">
            <div className="font-mono text-3xl font-extrabold text-ink">€27</div>
            <div className="text-[11px] text-ink-400">/ month</div>
          </div>
        </div>

        <div className="mt-5 h-12 rounded-2xl bg-mango-500 text-center text-[15px] font-bold leading-[3rem] text-white shadow-mango-sm">
          Continue →
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-5 -top-5 flex items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-soft"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-leaf-50 text-leaf-600">
          <ShieldCheck size={16} />
        </div>
        <span className="text-[12px] font-bold text-ink">Cancel anytime</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-4 -bottom-5 flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-soft"
      >
        <Star size={14} className="fill-mango-500 text-mango-500" />
        <span className="text-[12px] font-bold text-ink">4.8/5</span>
        <span className="text-[11px] text-ink-400">· 2,100 reviews</span>
      </motion.div>
    </motion.div>
  )
}
