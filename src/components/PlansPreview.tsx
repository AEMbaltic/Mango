import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import { COVERAGE_MATRIX, PLANS, PLAN_ORDER, calcPrice, eur } from '../lib/pricing'

// Preview prices use the wizard's defaults: 2 years, 20k km/yr, €50 deductible.
const DEFAULTS = { years: 2, mileage: 20000, deductible: 50 } as const

export default function PlansPreview({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  return (
    <section id="plans" className="container-pad scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Plans"
        title="Pick the level of protection that fits"
        subtitle="Prices shown for a typical 2-year cover. Your exact quote depends on your car, mileage and deductible."
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {PLAN_ORDER.map((id, i) => {
          const plan = PLANS[id]
          const price = calcPrice(id, DEFAULTS.years, DEFAULTS.mileage, DEFAULTS.deductible)
          const recommended = id === 'deluxe'
          return (
            <Reveal key={id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`relative flex h-full flex-col rounded-4xl border-2 p-7 ${
                  recommended
                    ? 'border-mango-500 bg-white shadow-mango'
                    : 'border-line bg-white shadow-card'
                }`}
              >
                {recommended && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-mango-500 px-3.5 py-1.5 text-[11px] font-bold text-white shadow-mango-sm">
                    <Star size={12} className="fill-white" /> Recommended for most cars
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-extrabold text-ink">{plan.name}</h3>
                  <span className="text-[12px] font-semibold text-ink-400">{plan.tag}</span>
                </div>
                <p className="mt-2 min-h-[42px] text-[14px] leading-relaxed text-ink-500">{plan.blurb}</p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="font-mono text-4xl font-extrabold text-ink">{eur(price.monthly)}</span>
                  <span className="mb-1 text-[14px] text-ink-400">/ month</span>
                </div>
                <div className="mt-1 text-[12px] text-ink-400">
                  {eur(price.total)} total · up to {plan.perClaim} per claim
                </div>

                <Button
                  variant={recommended ? 'primary' : 'secondary'}
                  full
                  className="mt-6"
                  onClick={() => onGetPrice()}
                >
                  Choose {plan.name}
                </Button>

                <ul className="mt-6 space-y-2.5 border-t border-line/70 pt-5">
                  <li className="flex items-center gap-2.5 text-[14px] text-ink-700">
                    <Check size={16} className="text-leaf-500" /> {plan.components} covered components
                  </li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink-700">
                    <Check size={16} className="text-leaf-500" /> Up to {plan.perClaim} per claim
                  </li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink-700">
                    <Check size={16} className="text-leaf-500" /> Cancel anytime, no penalty
                  </li>
                </ul>
              </motion.div>
            </Reveal>
          )
        })}
      </div>

      {/* comparison matrix */}
      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-4xl border border-line bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-sand-100">
                  <th className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-ink-400">
                    What&apos;s covered
                  </th>
                  {PLAN_ORDER.map((id) => (
                    <th
                      key={id}
                      className={`px-4 py-4 text-center text-[14px] font-extrabold ${
                        id === 'deluxe' ? 'text-mango-600' : 'text-ink'
                      }`}
                    >
                      {PLANS[id].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COVERAGE_MATRIX.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? 'bg-sand-100/50' : ''}>
                    <td className="px-6 py-3.5 text-[14px] font-medium text-ink-600">{row.label}</td>
                    {(['comfort', 'deluxe', 'diamond'] as const).map((id) => (
                      <td
                        key={id}
                        className={`px-4 py-3.5 text-center text-[14px] font-semibold ${
                          id === 'deluxe' ? 'bg-mango-50/40 text-ink' : 'text-ink-700'
                        }`}
                      >
                        {row[id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
