import { Check } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import { Field, StepHead } from '../ui'

export default function LeadStep({ q }: { q: QuoteApi }) {
  const { state, set } = q
  const v = state.vehicle
  const car = v ? `${v.make} ${v.model}` : 'car'

  if (state.leadDone) {
    return (
      <div className="flex animate-fadeUp flex-col items-center pt-6 text-center">
        <div className="mb-4 flex h-[72px] w-[72px] animate-pop items-center justify-center rounded-full bg-leaf-50">
          <Check size={34} className="text-leaf-500" strokeWidth={3} />
        </div>
        <h2 className="text-[22px] font-extrabold text-ink">We&apos;ll call you back</h2>
        <p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-ink-500">
          Thanks. A Mango advisor will call within 1 business day to arrange a quick workshop
          inspection for your {car}.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fadeUp">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-mango-50 px-3 py-1.5">
        <span className="text-[11.5px] font-semibold text-mango-700">
          Cars past factory warranty need a check first
        </span>
      </div>
      <StepHead
        title="Let's arrange your cover"
        sub={
          <>
            Your {car} is eligible after a 15-minute workshop inspection. Leave your details and we&apos;ll
            handle the rest.
          </>
        }
      />
      <div className="flex flex-col gap-3">
        <Field
          label="Full name"
          value={state.leadName}
          onChange={(val) => set({ leadName: val })}
          placeholder="Jonas Petraitis"
        />
        <Field
          label="Phone"
          value={state.leadPhone}
          onChange={(val) => set({ leadPhone: val })}
          placeholder="+370 600 00000"
          mono
          inputMode="tel"
        />
      </div>
    </div>
  )
}
