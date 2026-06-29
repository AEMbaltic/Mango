import { Star } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const REVIEWS = [
  {
    quote:
      'My turbo failed three weeks after the factory warranty ended. Mango paid €2,400 — I paid my €50 deductible. One photo from my phone and it was done.',
    name: 'Rasa K.',
    car: 'VW Passat',
    city: 'Vilnius',
  },
  {
    quote:
      'Bought it on my phone during a lunch break. The price was exactly what the quote said — no hidden fees, no salesperson calling me back.',
    name: 'Mārtiņš B.',
    car: 'Audi A4',
    city: 'Riga',
  },
  {
    quote:
      'They sorted a courtesy car the same day my XC60 went in. Honestly felt like a premium service, not an insurance claim.',
    name: 'Kati T.',
    car: 'Volvo XC60',
    city: 'Tallinn',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="container-pad scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        center
        eyebrow="Loved by drivers"
        title={
          <>
            Rated <span className="text-gradient-mango">4.8 / 5</span> across the Baltics
          </>
        }
        subtitle="Thousands of cars covered, thousands of claims paid. Here's what it feels like when it matters."
      />

      {/* trustpilot-style strip */}
      <Reveal className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-line bg-white px-5 py-3 shadow-card">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-leaf-500">
              <Star size={15} className="fill-white text-white" />
            </span>
          ))}
        </div>
        <span className="text-[14px] font-bold text-ink">Excellent</span>
        <span className="text-[13px] text-ink-400">2,100+ reviews</span>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col rounded-4xl border border-line bg-white p-7 shadow-card">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={17} className="fill-mango-500 text-mango-500" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">“{r.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-300 font-display font-bold text-ink-600">
                  {r.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <div className="text-[14px] font-bold text-ink">{r.name}</div>
                  <div className="text-[12.5px] text-ink-400">
                    {r.car} · {r.city}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
