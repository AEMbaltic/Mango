import { motion } from 'framer-motion'
import { ArrowRight, Car, Coins, Wrench } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Photo from './ui/Photo'
import { MEDIA } from '../lib/media'

const PRODUCTS = [
  {
    icon: Car,
    img: MEDIA.heroPoster,
    name: 'Extended Warranty',
    featured: true,
    desc: 'Mechanical breakdown cover that picks up where the manufacturer warranty stops — up to €8,000 per claim.',
    points: ['Engine, gearbox, electrics & more', 'Up to 150+ components', 'Cars up to 15 yrs / 300,000 km'],
    cta: 'Get my price',
  },
  {
    icon: Coins,
    img: MEDIA.keys,
    name: 'GAP Insurance',
    featured: false,
    desc: 'If your car is written off, GAP pays the gap between its market value and what you originally paid.',
    points: ['Covers the depreciation shortfall', 'Up to 36 months', 'Works alongside your motor policy'],
    cta: 'Learn more',
  },
  {
    icon: Wrench,
    img: MEDIA.garage,
    name: 'MOT / Service Cover',
    featured: false,
    desc: 'Budget for the predictable. Spread the cost of inspections and routine servicing across the year.',
    points: ['Annual roadworthiness test', 'Routine maintenance visits', 'Fixed, predictable monthly cost'],
    cta: 'Learn more',
  },
]

export default function Products({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  return (
    <section id="products" className="scroll-mt-24 bg-sand-100 py-20 sm:py-28">
      <div className="container-pad">
        <SectionHeading
          center
          eyebrow="What we cover"
          title="Three ways to protect your car"
          subtitle="Start with extended warranty, then bolt on GAP or MOT cover in a single tap at checkout."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`flex h-full flex-col overflow-hidden rounded-4xl border bg-white ${
                  p.featured ? 'border-mango-300 shadow-soft ring-1 ring-mango-200' : 'border-line shadow-card'
                }`}
              >
                <div className="relative">
                  <Photo src={p.img} alt={p.name} ratio="aspect-[16/10]" overlay="bottom" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-mango-600 shadow-card backdrop-blur">
                    <p.icon size={22} strokeWidth={2} />
                  </div>
                  {p.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-mango-500 px-3 py-1 text-[11px] font-bold text-white shadow-mango-sm">
                      Most popular
                    </span>
                  )}
                  <h3 className="absolute bottom-3 left-4 font-display text-2xl font-extrabold text-white drop-shadow">
                    {p.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[15px] leading-relaxed text-ink-500">{p.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-[10px] font-bold text-leaf-600">
                          ✓
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <button
                      onClick={() => onGetPrice()}
                      className={`focus-ring group inline-flex items-center gap-1.5 text-[15px] font-bold ${
                        p.featured ? 'text-mango-700' : 'text-ink'
                      }`}
                    >
                      {p.cta}
                      <ArrowRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <p className="mt-7 text-center text-[13px] text-ink-400">
          GAP and MOT cover are offered as optional add-ons during the warranty checkout.
        </p>
      </div>
    </section>
  )
}
