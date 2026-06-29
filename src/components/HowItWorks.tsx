import { ClipboardCheck, ScanLine, ShieldCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const STEPS = [
  {
    icon: ScanLine,
    title: 'Enter your plate',
    body: 'We pull your car straight from the vehicle registry — make, model, year and VIN. No forms to fill in.',
  },
  {
    icon: ClipboardCheck,
    title: 'Choose your cover',
    body: 'Pick Comfort, Deluxe or Diamond and tailor the duration, mileage and deductible. Your price updates live.',
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
      <SectionHeading
        eyebrow="How it works"
        title="From plate to protected in three steps"
        subtitle="No phone calls. No paperwork. No waiting for a callback — unless you want one."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="group relative h-full rounded-4xl border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-soft">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mango-100 text-mango-600 transition-colors group-hover:bg-mango-500 group-hover:text-white">
                <s.icon size={26} strokeWidth={2} />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-mango-500">0{i + 1}</span>
                <h3 className="text-xl font-bold text-ink">{s.title}</h3>
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
