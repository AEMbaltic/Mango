import { motion } from 'framer-motion'
import { ArrowRight, Car, Coins, Wrench } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const PRODUCTS = [
  {
    icon: Car,
    name: 'Extended Warranty',
    status: 'Buy online',
    featured: true,
    desc: 'Mechanical breakdown cover that picks up where the manufacturer warranty stops — up to €8,000 per claim.',
    points: ['Engine, gearbox, electrics & more', 'Up to 150+ components', 'Cars up to 15 yrs / 300,000 km'],
  },
  {
    icon: Coins,
    name: 'GAP Insurance',
    status: 'Add at checkout',
    featured: false,
    desc: 'If your car is written off, GAP pays the gap between its market value and what you originally paid.',
    points: ['Covers the depreciation shortfall', 'Up to 36 months', 'Works alongside your motor policy'],
  },
  {
    icon: Wrench,
    name: 'MOT / Service Cover',
    status: 'Add at checkout',
    featured: false,
    desc: 'Budget for the predictable. Spread the cost of inspections and routine servicing across the year.',
    points: ['Annual roadworthiness test', 'Routine maintenance visits', 'Fixed, predictable monthly cost'],
  },
]

export default function Products({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  return (
    <section id="products" className="scroll-mt-24 bg-sand-100 py-20 sm:py-28">
      <div className="container-pad">
        <SectionHeading
          eyebrow="What we cover"
          title="One mango, three ways to protect your car"
          subtitle="Start with extended warranty, then bolt on GAP or MOT cover in a single tap at checkout."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`relative flex h-full flex-col overflow-hidden rounded-4xl border p-7 ${
                  p.featured
                    ? 'border-mango-300 bg-gradient-to-br from-white to-mango-50 shadow-soft'
                    : 'border-line bg-white shadow-card'
                }`}
              >
                {p.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-mango-500 px-3 py-1 text-[11px] font-bold text-white">
                    Most popular
                  </span>
                )}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    p.featured ? 'bg-mango-500 text-white' : 'bg-sand-200 text-ink-600'
                  }`}
                >
                  <p.icon size={26} strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-ink">{p.name}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{p.desc}</p>
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
                    className={`focus-ring inline-flex items-center gap-1.5 text-[15px] font-bold ${
                      p.featured ? 'text-mango-700' : 'text-ink'
                    } group`}
                  >
                    {p.featured ? 'Get my price' : 'Learn more'}
                    <ArrowRight
                      size={17}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
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
