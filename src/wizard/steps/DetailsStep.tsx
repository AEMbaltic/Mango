import { Check } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import { Field, StepHead } from '../ui'

export default function DetailsStep({ q }: { q: QuoteApi }) {
  const { state, set } = q
  return (
    <div className="animate-fadeUp">
      <StepHead title="Your details" sub="We'll send your e-policy here the moment payment clears." />
      <div className="flex flex-col gap-3">
        <Field label="Full name" value={state.cName} onChange={(v) => set({ cName: v })} placeholder="Jonas Petraitis" />
        <Field
          label="Phone"
          value={state.cPhone}
          onChange={(v) => set({ cPhone: v })}
          placeholder="+370 600 00000"
          mono
          inputMode="tel"
        />
        <Field
          label="Email"
          value={state.cEmail}
          onChange={(v) => set({ cEmail: v })}
          placeholder="you@email.com"
          inputMode="email"
        />
      </div>

      <button
        onClick={() => set({ consent: !state.consent })}
        className="focus-ring mt-4 flex w-full items-start gap-3 rounded-2xl p-1 text-left"
      >
        <span
          className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
            state.consent ? 'border-mango-500 bg-mango-500 text-white' : 'border-line-mid bg-white'
          }`}
        >
          {state.consent && <Check size={14} strokeWidth={3} />}
        </span>
        <span className="text-[12px] leading-relaxed text-ink-600">
          I agree that Mango Insurance may process my personal data to issue and manage this policy,
          per the <span className="font-semibold text-mango-700">privacy policy</span>.
        </span>
      </button>
    </div>
  )
}
