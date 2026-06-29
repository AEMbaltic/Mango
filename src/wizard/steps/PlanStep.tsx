import { Check, Star } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import { StepHead } from '../ui'
import { COVERAGE_MATRIX, PLANS, PLAN_ORDER, calcPrice, eur, type PlanId } from '../../lib/pricing'

export default function PlanStep({ q }: { q: QuoteApi }) {
  const { state, set } = q
  const v = state.vehicle
  const car = v ? `${v.make} ${v.model}` : 'car'

  return (
    <div className="animate-fadeUp">
      <StepHead
        title="Choose your cover"
        sub={`Your ${car} qualifies for every plan. We picked the best fit for its age & mileage.`}
      />

      <div className="flex flex-col gap-3">
        {PLAN_ORDER.map((id) => {
          const plan = PLANS[id]
          const price = calcPrice(id, state.years, state.mileagePerYear, state.deductible)
          const selected = state.plan === id
          const recommended = id === 'deluxe'
          return (
            <button
              key={id}
              onClick={() => set({ plan: id })}
              className={`focus-ring relative rounded-3xl border-2 p-4 text-left transition-all ${
                selected
                  ? 'border-mango-500 bg-white shadow-mango-sm'
                  : 'border-line-mid bg-white hover:border-mango-300'
              }`}
            >
              {recommended && (
                <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-mango-500 px-2.5 py-1 text-[10px] font-bold text-white">
                  <Star size={10} className="fill-white" /> Recommended for you
                </span>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                        selected ? 'border-mango-500 bg-mango-500 text-white' : 'border-line-mid'
                      }`}
                    >
                      {selected && <Check size={11} strokeWidth={3} />}
                    </span>
                    <span className="text-[17px] font-extrabold text-ink">{plan.name}</span>
                    <span className="text-[11px] font-semibold text-ink-400">{plan.tag}</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-ink-500">{plan.blurb}</p>
                  <div className="mt-2 flex gap-4">
                    <Metric value={plan.perClaim} label="per claim" />
                    <Metric value={plan.components} label="components" />
                  </div>
                </div>
                <div className="shrink-0 text-right leading-none">
                  <div className="font-mono text-[22px] font-extrabold text-ink">{eur(price.monthly)}</div>
                  <div className="text-[10.5px] text-ink-400">/ month</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* compact comparison */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-white">
        <div className="border-b border-sand-300 px-4 py-3 text-[13px] font-bold text-ink">What&apos;s covered</div>
        <div className="flex bg-sand-100 px-4 py-2.5">
          <span className="flex-[1.4] text-[11px] text-ink-400" />
          {PLAN_ORDER.map((id) => (
            <span
              key={id}
              className={`flex-1 text-center text-[11px] font-bold ${
                state.plan === id ? 'text-mango-600' : 'text-ink-400'
              }`}
            >
              {PLANS[id].name}
            </span>
          ))}
        </div>
        {COVERAGE_MATRIX.map((row) => (
          <div key={row.label} className="flex items-center border-b border-sand-200 px-4 py-2.5 last:border-0">
            <span className="flex-[1.4] text-[12px] text-ink-600">{row.label}</span>
            {(['comfort', 'deluxe', 'diamond'] as PlanId[]).map((id) => (
              <span key={id} className="flex-1 text-center text-[12px] font-semibold text-ink-700">
                {row[id]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="leading-tight">
      <div className="font-mono text-[13px] font-bold text-ink">{value}</div>
      <div className="text-[10px] text-ink-400">{label}</div>
    </div>
  )
}
