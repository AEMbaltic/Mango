import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { BRAND } from '../lib/brand'

const FAQS = [
  {
    q: 'What exactly does an extended warranty cover?',
    a: 'It covers the cost of repairing mechanical and electronic failures after your manufacturer warranty ends — engine, gearbox, turbo, electrics, cooling, fuel systems and more, depending on your plan. Comfort covers the core drivetrain; Diamond covers 150+ components with payouts up to €8,000 per claim.',
  },
  {
    q: 'Is my car too old or high-mileage?',
    a: 'We cover cars with a first registration up to 15 years ago and up to 300,000 km. Younger, lower-mileage cars qualify for every plan instantly. If your car is past its factory warranty, we simply arrange a quick 15-minute workshop inspection before cover starts.',
  },
  {
    q: 'How fast are claims paid?',
    a: 'You can register a claim in the app in under a minute — usually just a photo and a short description. Most straightforward claims are approved within 48 hours, and we settle directly with the approved workshop where possible, so you are not left out of pocket.',
  },
  {
    q: 'Can I cancel any time?',
    a: 'Yes. There are no lock-in penalties — cancel whenever you like and you will only have paid for the cover you used. You also get a 14-day cooling-off period after purchase for a full refund if you change your mind.',
  },
  {
    q: 'Who actually insures the policy?',
    a: `Your policy is underwritten by ${BRAND.underwriter}, rated ${BRAND.rating} by AM Best — a strong, regulated insurer. Mango Insurance arranges and services the cover and handles your claims.`,
  },
  {
    q: 'Which countries do you cover?',
    a: `We operate across ${BRAND.markets.join(', ')}. Diamond plans also include EU-wide breakdown cover, so you stay protected when you drive abroad.`,
  },
]

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <button
        onClick={onToggle}
        className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[16px] font-bold text-ink">{q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
            open ? 'rotate-45 bg-mango-500 text-white' : 'bg-sand-200 text-ink-600'
          }`}
        >
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="container-pad scroll-mt-24 py-20 sm:py-28">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      <div className="mx-auto mt-12 grid max-w-3xl gap-3.5">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <Item q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
