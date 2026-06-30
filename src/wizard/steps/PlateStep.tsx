import { ShieldCheck } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import PlateInput from '../../components/PlateInput'
import { Field } from '../ui'
import { BRAND } from '../../lib/brand'

export default function PlateStep({ q }: { q: QuoteApi }) {
  const { state, set, startLookup } = q
  return (
    <div className="animate-fadeUp">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-mango-100 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
        <span className="text-[11.5px] font-semibold text-mango-700">
          Your manufacturer warranty is expiring soon?
        </span>
      </div>
      <h2 className="font-display text-[26px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
        Keep driving. We&apos;ll handle the <span className="text-mango-600">what-ifs</span>.
      </h2>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-500">
        Enter your licence plate — we&apos;ll find your car and show your exact price instantly. No
        call, no paperwork.
      </p>

      <div className="mt-5">
        <PlateInput
          id="plate-wizard"
          value={state.plate}
          onChange={(v) => set({ plate: v })}
          onSubmit={() => startLookup(state.plate)}
          showButton={false}
          autoFocus
        />
      </div>

      <div className="mt-3.5">
        <Field
          label="Email"
          hint="— optional, save your quote"
          value={state.email}
          onChange={(v) => set({ email: v })}
          placeholder="you@email.com"
          inputMode="email"
        />
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-leaf-100 bg-leaf-50 px-4 py-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-leaf-500 text-white">
          <ShieldCheck size={18} />
        </div>
        <div className="leading-snug">
          <div className="text-[12.5px] font-bold text-ink">
            Backed by {BRAND.underwriter.split(' ')[0]} · {BRAND.rating}
          </div>
          <div className="text-[11.5px] text-leaf-700/80">
            Regulated insurer. {BRAND.dealerPartners} dealer partners across the Baltics.
          </div>
        </div>
      </div>
    </div>
  )
}
