import { ShieldCheck } from 'lucide-react'
import Reveal from './ui/Reveal'
import { useCountUp } from '../lib/hooks'
import { BRAND, STATS } from '../lib/brand'

function Stat({ value, prefix, suffix, label, decimals }: { value: number; prefix?: string; suffix?: string; label: string; decimals: number }) {
  const { ref, value: v } = useCountUp(value)
  const shown = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')
  return (
    <div className="text-center">
      <div className="font-mono text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {prefix}
        <span ref={ref}>{shown}</span>
        {suffix}
      </div>
      <div className="mt-1 text-[13px] font-medium text-ink-400">{label}</div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <section className="relative z-10 -mt-2">
      <div className="container-pad">
        <Reveal>
          <div className="rounded-4xl border border-line bg-white/80 px-6 py-8 shadow-soft backdrop-blur-sm sm:px-10">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <Stat
                  key={s.label}
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  label={s.label}
                  decimals={Number.isInteger(s.value) ? 0 : 1}
                />
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-line/70 pt-6 text-center text-[13px] text-ink-500">
              <ShieldCheck size={16} className="text-leaf-500" />
              <span className="font-semibold text-ink">Underwritten by {BRAND.underwriter}</span>
              <span className="text-ink-300">·</span>
              <span>{BRAND.rating}</span>
              <span className="text-ink-300">·</span>
              <span>{BRAND.markets.join(' · ')}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
