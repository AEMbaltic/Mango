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

const PARTNERS = ['Fortegra', 'Stripe', 'Paysera', 'SEB', 'Swedbank']

export default function Testimonials() {
  return (
    <section id="reviews" className="container-pad scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Loved by drivers"
        title={
          <>
            Rated <span className="text-gradient-mango">4.8 / 5</span> by drivers across the Baltics
          </>
        }
        subtitle="Thousands of cars covered, thousands of claims paid. Here's what it feels like when it matters."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col rounded-4xl border border-line bg-white p-7 shadow-card">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={17} className="fill-mango-500 text-mango-500" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-300 font-bold text-ink-600">
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

      {/* partners strip */}
      <Reveal className="mt-14">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-400">
            Underwriting &amp; payments handled by
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PARTNERS.map((p) => (
              <span key={p} className="text-lg font-extrabold tracking-tight text-ink-300">
                {p}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
