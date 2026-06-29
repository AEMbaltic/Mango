import { useState } from 'react'
import { Clock, Lock, Sparkles } from 'lucide-react'
import Reveal from './ui/Reveal'
import PlateInput from './PlateInput'

export default function FinalCTA({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  const [plate, setPlate] = useState('')

  return (
    <section className="container-pad py-12 sm:py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-mango-500 to-mango-600 px-7 py-14 text-center shadow-mango sm:px-12 sm:py-20">
          {/* decorative orbs */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-ink/10 blur-3xl" />

          <div className="relative mx-auto max-w-xl">
            <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.7rem]">
              The next breakdown isn&apos;t a question of <em className="not-italic underline decoration-white/40 underline-offset-4">if</em> — it&apos;s when.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/85">
              Lock in today&apos;s price before your factory warranty runs out. It takes two minutes.
            </p>

            <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-white/12 p-3 backdrop-blur-sm">
              <PlateInput id="plate-cta" value={plate} onChange={setPlate} onSubmit={() => onGetPrice(plate)} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={15} /> No obligation
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} /> 14-day money-back
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock size={15} /> Secure checkout
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
