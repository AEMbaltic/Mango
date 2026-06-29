import { ShieldCheck } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import { Seg, StepHead } from '../ui'
import {
  DEDUCTIBLES,
  DURATIONS,
  MILEAGES,
  PLANS,
  calcPrice,
  eur,
  type Deductible,
  type Mileage,
  type Years,
} from '../../lib/pricing'

export default function ConfigureStep({ q }: { q: QuoteApi }) {
  const { state, set } = q
  const plan = PLANS[state.plan]
  const price = calcPrice(state.plan, state.years, state.mileagePerYear, state.deductible)
  const yearsLabel = state.years + (state.years > 1 ? ' years' : ' year')

  return (
    <div className="animate-fadeUp">
      <StepHead title={`Tailor your ${plan.name} plan`} sub="Your price updates as you go." />

      <Group label="Cover duration">
        {DURATIONS.map((y) => (
          <Seg key={y} active={state.years === y} onClick={() => set({ years: y as Years })}>
            {y} {y > 1 ? 'years' : 'year'}
          </Seg>
        ))}
      </Group>

      <Group label="Expected mileage / year">
        {MILEAGES.map((m) => (
          <Seg key={m} active={state.mileagePerYear === m} onClick={() => set({ mileagePerYear: m as Mileage })} mono>
            {m / 1000}k
          </Seg>
        ))}
      </Group>

      <Group label="Deductible per claim" hint="A higher deductible lowers your monthly price.">
        {DEDUCTIBLES.map((d) => (
          <Seg key={d} active={state.deductible === d} onClick={() => set({ deductible: d as Deductible })} mono>
            €{d}
          </Seg>
        ))}
      </Group>

      {/* live price */}
      <div className="mt-6 rounded-3xl bg-ink p-5 text-white">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[12px] text-sand-400/80">
              {plan.name} · {yearsLabel}
            </div>
            <div className="font-mono text-[34px] font-extrabold leading-tight">
              {eur(price.monthly)}
              <span className="text-[14px] font-medium text-sand-400/80">/mo</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-sand-400/70">Total</div>
            <div className="font-mono text-[17px] font-bold">{eur(price.total)}</div>
          </div>
        </div>
        <div className="mt-3.5 flex items-center gap-2 border-t border-white/10 pt-3.5">
          <ShieldCheck size={15} className="text-mango-300" />
          <span className="text-[11.5px] text-sand-400/80">
            Up to {plan.perClaim} per claim · cancel anytime
          </span>
        </div>
      </div>
    </div>
  )
}

function Group({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-ink-500">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
      {hint && <div className="mt-2 text-[11.5px] text-ink-400">{hint}</div>}
    </div>
  )
}
