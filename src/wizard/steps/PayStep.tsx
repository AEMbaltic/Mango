import { Car, Lock } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import { RadioDot, StepHead } from '../ui'
import { PLANS, calcPrice, eur } from '../../lib/pricing'

export default function PayStep({ q }: { q: QuoteApi }) {
  const { state, set } = q
  const v = state.vehicle
  const plan = PLANS[state.plan]
  const price = calcPrice(state.plan, state.years, state.mileagePerYear, state.deductible)
  const yearsLabel = state.years + (state.years > 1 ? ' years' : ' year')
  const plate = state.plate.trim() ? state.plate.toUpperCase() : 'KMG 482'

  return (
    <div className="animate-fadeUp">
      <StepHead title="Review & pay" />

      <div className="rounded-3xl border border-line bg-white p-4">
        <div className="flex items-center gap-3 border-b border-sand-300 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
            <Car size={20} />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold text-ink">{v ? `${v.make} ${v.model}` : 'Your car'}</div>
            <div className="font-mono text-[11.5px] text-ink-400">
              {plate} · {state.mileage} km
            </div>
          </div>
        </div>
        <Row label="Plan" value={plan.name} bold />
        <Row label="Duration" value={yearsLabel} />
        <Row label="Deductible" value={`€${state.deductible} / claim`} />
        <div className="flex items-center justify-between pt-3">
          <span className="text-[14px] font-bold text-ink">Total ({yearsLabel})</span>
          <span className="font-mono text-[22px] font-extrabold text-ink">{eur(price.total)}</span>
        </div>
        <div className="text-right text-[11px] text-ink-400">{eur(price.monthly)}/mo · billed annually</div>
      </div>

      <div className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-ink-500">
        Payment method
      </div>
      <div className="flex flex-col gap-2.5">
        <PayOption
          active={state.payMethod === 'card'}
          onClick={() => set({ payMethod: 'card' })}
          title="Card · Stripe"
          note="VISA · MC"
        />
        <PayOption
          active={state.payMethod === 'paysera'}
          onClick={() => set({ payMethod: 'paysera' })}
          title="Bank link · Paysera"
          note="SEB · Swedbank"
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[11.5px] text-ink-400">
        <Lock size={13} /> Secure PCI-DSS payment · e-policy issued instantly
      </div>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between border-b border-sand-200 py-2.5">
      <span className="text-[13px] text-ink-500">{label}</span>
      <span className={`text-[13px] text-ink ${bold ? 'font-bold' : 'font-semibold'}`}>{value}</span>
    </div>
  )
}

function PayOption({
  active,
  onClick,
  title,
  note,
}: {
  active: boolean
  onClick: () => void
  title: string
  note: string
}) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-colors ${
        active ? 'border-mango-500 bg-mango-100' : 'border-line-mid bg-white hover:border-mango-300'
      }`}
    >
      <RadioDot active={active} />
      <span className="flex-1 text-[14px] font-semibold text-ink">{title}</span>
      <span className="font-mono text-[11px] font-bold text-ink-400">{note}</span>
    </button>
  )
}
