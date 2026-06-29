import { Cog, Droplets, Globe, Headset, Car, Zap } from 'lucide-react'
import Reveal from './ui/Reveal'
import { ELIGIBILITY } from '../lib/brand'

const BENEFITS = [
  { icon: Cog, title: 'Engine, gearbox & turbo', body: 'The expensive core — fully covered on every plan.' },
  { icon: Zap, title: 'Electrics & electronics', body: 'Sensors, control units and wiring from Deluxe up.' },
  { icon: Droplets, title: 'Cooling & fuel systems', body: 'Pumps, radiators and injection components.' },
  { icon: Car, title: 'Courtesy car', body: 'Stay mobile while your car is in the workshop.' },
  { icon: Globe, title: 'EU-wide cover', body: 'Breakdowns handled anywhere in the EU on Diamond.' },
  { icon: Headset, title: 'Priority claims', body: 'Register a claim in a tap — most settled in 48 h.' },
]

export default function Coverage() {
  return (
    <section id="cover" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <div className="container-pad grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-mango-300">
              Real protection
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-[-0.02em] sm:text-[2.6rem] sm:leading-[1.08]">
              When something breaks, we pay the bill — not you.
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-sand-400/90">
              Mango covers the mechanical and electronic failures that hurt most after the factory
              warranty ends. Genuine parts, approved workshops, payouts up to €8,000 per claim.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="flex gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mango-500/15 text-mango-300">
                    <b.icon size={21} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold">{b.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-sand-400/80">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* eligibility card */}
        <Reveal delay={0.1}>
          <div className="rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 backdrop-blur-sm">
            <h3 className="text-xl font-bold">Is my car eligible?</h3>
            <p className="mt-1.5 text-[14px] text-sand-400/80">
              We cover most cars on the road. Eligibility is set by age and mileage:
            </p>
            <ul className="mt-6 space-y-3">
              {ELIGIBILITY.map((t, i) => (
                <li
                  key={t.age}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mango-500 font-mono text-[12px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[15px] font-semibold">First reg. {t.age}</span>
                  </span>
                  <span className="font-mono text-[14px] font-bold text-mango-300">{t.km}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-mango-500/10 p-4">
              <span className="text-lg">🛠️</span>
              <p className="text-[13px] leading-relaxed text-sand-400/90">
                Past your factory warranty? No problem — we&apos;ll arrange a quick 15-minute workshop
                inspection and get you covered.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
