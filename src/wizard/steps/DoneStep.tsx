import { Check, Plus, ChevronRight } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import { PLANS } from '../../lib/pricing'

export default function DoneStep({ q }: { q: QuoteApi }) {
  const { state } = q
  const v = state.vehicle
  const plan = PLANS[state.plan]
  const coverUntil = `15 / 06 / ${new Date().getFullYear() + state.years}`
  const emailShown = state.cEmail.trim() || 'your email'

  return (
    <div className="flex animate-fadeUp flex-col items-center pt-2 text-center">
      <div className="mb-5 flex h-[84px] w-[84px] animate-pop items-center justify-center rounded-full bg-leaf-50">
        <Check size={40} className="text-leaf-500" strokeWidth={3} />
      </div>
      <h2 className="text-[26px] font-extrabold text-ink">You&apos;re covered.</h2>
      <p className="mt-2 max-w-[290px] text-[14px] leading-relaxed text-ink-500">
        Your {plan.name} warranty for the {v ? `${v.make} ${v.model}` : 'car'} is active. We&apos;ve
        emailed your e-policy PDF to {emailShown}.
      </p>

      <div className="mt-6 w-full rounded-3xl border border-line bg-white p-4 text-left">
        <div className="flex items-center justify-between border-b border-sand-300 pb-3">
          <div>
            <div className="text-[11px] text-ink-400">Policy number</div>
            <div className="font-mono text-[15px] font-bold text-ink">{state.policyNo}</div>
          </div>
          <span className="rounded-full bg-leaf-50 px-3 py-1.5 text-[11px] font-bold text-leaf-600">Active</span>
        </div>
        <div className="flex justify-between pt-3">
          <span className="text-[13px] text-ink-500">Cover until</span>
          <span className="font-mono text-[13px] font-semibold text-ink">{coverUntil}</span>
        </div>
      </div>

      {/* upsell */}
      <button className="focus-ring mt-3.5 flex w-full items-center gap-3 rounded-3xl border border-mango-200 bg-mango-50 p-3.5 text-left">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mango-500 text-white">
          <Plus size={18} strokeWidth={3} />
        </span>
        <span className="flex-1 leading-tight">
          <span className="block text-[13px] font-bold text-ink">Add GAP or MOT cover</span>
          <span className="block text-[11.5px] text-mango-700/80">
            One tap — protect against total loss &amp; inspection costs.
          </span>
        </span>
        <ChevronRight size={18} className="text-mango-600" />
      </button>
    </div>
  )
}
