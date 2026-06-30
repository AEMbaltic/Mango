import { ClipboardCheck, ScanLine, ShieldCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Photo from './ui/Photo'
import { MEDIA } from '../lib/media'

const STEPS = [
  {
    icon: ScanLine,
    title: 'Enter your plate',
    body: 'We pull your car straight from the vehicle registry — make, model, year and VIN. No forms.',
  },
  {
    icon: ClipboardCheck,
    title: 'Choose your cover',
    body: 'Pick Comfort, Deluxe or Diamond and tailor the duration, mileage and deductible. Price updates live.',
  },
  {
    icon: ShieldCheck,
    title: 'Drive protected',
    body: 'Pay securely and your e-policy lands in your inbox instantly. Make a claim in a tap, anytime.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="container-pad scroll-mt-24 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* photo */}
        <Reveal className="order-last lg:order-first">
          <div className="relative">
            <Photo
              src={MEDIA.howItWorks}
              alt="A driver getting their car covered online in minutes"
              ratio="aspect-[4/3]"
              className="rounded-4xl shadow-lift"
            />
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3.5 shadow-soft">
              <span className="font-display text-2xl font-extrabold text-mango-500">2 min</span>
              <span className="text-[13px] leading-tight text-ink-500">
                from licence plate
                <br />
                to covered
              </span>
            </div>
          </div>
        </Reveal>

        {/* steps */}
        <div>
          <SectionHeading
            eyebrow="How it works"
            title="From plate to protected in three steps"
            subtitle="No phone calls. No paperwork. No waiting for a callback — unless you want one."
          />
          <div className="mt-9 flex flex-col gap-7">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mango-100 text-mango-600">
                      <s.icon size={22} strokeWidth={2} />
                    </div>
                    {i < STEPS.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-line-mid" />}
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-mango-500">0{i + 1}</span>
                      <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                    </div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
