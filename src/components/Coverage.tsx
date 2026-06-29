import { Cog, Droplets, Globe, Headset, Car, Zap } from 'lucide-react'
import Reveal from './ui/Reveal'
import Photo from './ui/Photo'
import SectionHeading from './ui/SectionHeading'
import { ELIGIBILITY } from '../lib/brand'
import { MEDIA } from '../lib/media'

const BENEFITS = [
  { icon: Cog, title: 'Engine, gearbox & turbo', body: 'The expensive core — covered on every plan.' },
  { icon: Zap, title: 'Electrics & electronics', body: 'Sensors, control units and wiring from Deluxe up.' },
  { icon: Droplets, title: 'Cooling & fuel systems', body: 'Pumps, radiators and injection components.' },
  { icon: Car, title: 'Courtesy car', body: 'Stay mobile while your car is in the workshop.' },
  { icon: Globe, title: 'EU-wide cover', body: 'Breakdowns handled across the EU on Diamond.' },
  { icon: Headset, title: 'Priority claims', body: 'Register in a tap — most settled in 48 h.' },
]

export default function Coverage() {
  return (
    <section id="cover" className="scroll-mt-24 bg-navy-900 py-20 text-white sm:py-28">
      <div className="container-pad">
        <SectionHeading
          dark
          eyebrow="Real protection"
          title={
            <>
              When something breaks, <span className="text-mango-400">we pay the bill</span> — not you.
            </>
          }
          subtitle="Mango covers the mechanical and electronic failures that hurt most after the factory warranty ends. Genuine parts, approved workshops, payouts up to €8,000 per claim."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* photo */}
          <Reveal>
            <div className="relative">
              <Photo
                src={MEDIA.mechanic}
                alt="A Mango-approved technician inspecting a car engine"
                ratio="aspect-[4/3]"
                overlay="duotone"
                fallback="navy"
                className="rounded-4xl border border-white/10 shadow-lift"
              />
              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/15 bg-navy-900/90 px-5 py-3.5 shadow-lift backdrop-blur sm:-right-5">
                <div className="font-display text-2xl font-extrabold text-mango-400">€8,000</div>
                <div className="text-[12px] text-white/70">max payout / claim</div>
              </div>
            </div>
          </Reveal>

          {/* benefits */}
          <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="flex gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mango-500/15 text-mango-400">
                    <b.icon size={21} />
                  </div>
                  <div>
                    <h3 className="font-display text-[16px] font-bold">{b.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-white/60">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* eligibility tiers */}
        <Reveal className="mt-14">
          <div className="flex flex-col gap-4 rounded-4xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:flex-row lg:items-center">
            <div className="lg:w-64 lg:shrink-0">
              <h3 className="font-display text-xl font-bold">Is my car eligible?</h3>
              <p className="mt-1.5 text-[13.5px] text-white/60">
                We cover most cars on the road — set by age and mileage:
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
              {ELIGIBILITY.map((t, i) => (
                <div key={t.age} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mango-500 font-mono text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-semibold">{t.age}</span>
                  </div>
                  <div className="mt-2 font-mono text-[13px] font-bold text-mango-300">{t.km}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
