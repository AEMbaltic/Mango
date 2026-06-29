import { useState } from 'react'
import { Clock, Lock, Sparkles } from 'lucide-react'
import Reveal from './ui/Reveal'
import Photo from './ui/Photo'
import PlateInput from './PlateInput'
import { MEDIA } from '../lib/media'

export default function FinalCTA({ onGetPrice }: { onGetPrice: (plate?: string) => void }) {
  const [plate, setPlate] = useState('')

  return (
    <section className="container-pad py-12 sm:py-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2.5rem] px-7 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          {/* photo + branded scrim */}
          <div className="absolute inset-0 -z-10">
            <Photo src={MEDIA.heroPoster} alt="" fill fallback="navy" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-mango-600/92 via-mango-700/85 to-navy-900/90" />

          <div className="relative mx-auto max-w-xl">
            <h2 className="font-display text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.7rem]">
              The next breakdown isn&apos;t a question of{' '}
              <em className="not-italic underline decoration-white/40 underline-offset-4">if</em> — it&apos;s when.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/90">
              Lock in today&apos;s price before your factory warranty runs out. It takes two minutes.
            </p>

            <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-white/95 p-3 shadow-lift backdrop-blur">
              <PlateInput id="plate-cta" value={plate} onChange={setPlate} onSubmit={() => onGetPrice(plate)} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-white/90">
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
