import Reveal from './ui/Reveal'
import Rating from './ui/Rating'
import FortegraLogo from './FortegraLogo'
import { useCountUp } from '../lib/hooks'
import { STATS } from '../lib/brand'

function Stat({
  value,
  prefix,
  suffix,
  label,
  decimals,
}: {
  value: number
  prefix?: string
  suffix?: string
  label: string
  decimals: number
}) {
  const { ref, value: v } = useCountUp(value)
  const shown = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')
  return (
    <div>
      <div className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {prefix}
        <span ref={ref}>{shown}</span>
        {suffix}
      </div>
      <div className="mt-0.5 text-[12.5px] font-medium text-ink-400">{label}</div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-pad py-7">
        <Reveal className="flex flex-col items-center justify-between gap-5 border-b border-line/70 pb-6 lg:flex-row">
          <div className="flex items-center gap-3 text-[14px] text-ink-500">
            <span className="font-semibold text-ink">Underwritten by</span>
            <FortegraLogo height={30} />
            <span className="hidden text-ink-300 sm:inline">·</span>
            <span className="hidden font-semibold text-navy-700 sm:inline">AM Best A− (Excellent)</span>
          </div>
          <Rating />
        </Reveal>

        <Reveal className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
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
        </Reveal>
      </div>
    </section>
  )
}
