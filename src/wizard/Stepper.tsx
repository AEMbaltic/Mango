import { Check } from 'lucide-react'
import type { Step } from './useQuote'

const ORDER: { id: Step; label: string }[] = [
  { id: 'vehicle', label: 'Vehicle' },
  { id: 'plan', label: 'Plan' },
  { id: 'configure', label: 'Setup' },
  { id: 'details', label: 'Details' },
  { id: 'pay', label: 'Pay' },
]

export default function Stepper({ step }: { step: Step }) {
  // The "lead" branch maps back onto the vehicle column.
  const current: Step = step === 'lead' ? 'vehicle' : step
  const ci = ORDER.findIndex((s) => s.id === current)

  return (
    <div className="flex items-center justify-between px-1">
      {ORDER.map((s, i) => {
        const done = i < ci
        const active = i === ci
        return (
          <div key={s.id} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-center">
              <span className={`h-0.5 flex-1 ${i === 0 ? 'bg-transparent' : i <= ci ? 'bg-mango-500' : 'bg-sand-500'}`} />
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold transition-colors ${
                  done
                    ? 'border-mango-500 bg-mango-500 text-white'
                    : active
                      ? 'border-mango-500 bg-white text-mango-600'
                      : 'border-sand-500 bg-white text-ink-300'
                }`}
              >
                {done ? <Check size={12} strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`h-0.5 flex-1 ${
                  i === ORDER.length - 1 ? 'bg-transparent' : i < ci ? 'bg-mango-500' : 'bg-sand-500'
                }`}
              />
            </div>
            <span
              className={`text-[9px] font-semibold ${done || active ? 'text-ink' : 'text-ink-300'}`}
            >
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
