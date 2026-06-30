import { ArrowRight } from 'lucide-react'
import Button from './ui/Button'

/** Build a 5-point star polygon's points string centred at (cx, cy). */
function starPoints(cx: number, cy: number, outer: number): string {
  const inner = outer * 0.42
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

/** The EU emblem: 12 gold stars in a circle. */
function EuStars({ size = 17 }: { size?: number }) {
  const c = size / 2
  const ring = size * 0.34
  const star = size * 0.075
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * 2 * Math.PI - Math.PI / 2
        return <polygon key={i} points={starPoints(c + ring * Math.cos(a), c + ring * Math.sin(a), star)} fill="#FFCC00" />
      })}
    </svg>
  )
}

interface PlateInputProps {
  value: string
  onChange: (v: string) => void
  onSubmit?: () => void
  showButton?: boolean
  buttonLabel?: string
  autoFocus?: boolean
  size?: 'md' | 'lg'
  id?: string
}

/** EU-style Lithuanian licence plate: blue band (EU stars + LT) + white plate. */
export default function PlateInput({
  value,
  onChange,
  onSubmit,
  showButton = true,
  buttonLabel = 'Get my price',
  autoFocus,
  size = 'lg',
  id = 'plate',
}: PlateInputProps) {
  const tall = size === 'lg'
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      {/* the plate */}
      <div className="flex flex-1 items-stretch overflow-hidden rounded-[10px] border-2 border-ink/25 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.6)] transition-colors focus-within:border-mango-500">
        {/* EU / LT band */}
        <div className="flex shrink-0 flex-col items-center justify-center gap-0.5 bg-[#1b4da1] px-2.5">
          <EuStars size={tall ? 18 : 16} />
          <span className="font-sans text-[10px] font-bold leading-none tracking-wide text-white">LT</span>
        </div>
        {/* registration */}
        <input
          id={id}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ABC 123"
          maxLength={9}
          aria-label="Licence plate"
          className={`min-w-0 flex-1 bg-transparent text-center font-mono font-bold uppercase tracking-[0.14em] text-[#141414] outline-none placeholder:font-semibold placeholder:text-ink-300 ${
            tall ? 'px-3 py-4 text-[26px]' : 'px-3 py-3 text-xl'
          }`}
        />
      </div>
      {showButton && (
        <Button type="submit" size={tall ? 'lg' : 'md'} className="shrink-0">
          {buttonLabel}
          <ArrowRight size={18} strokeWidth={2.5} />
        </Button>
      )}
    </form>
  )
}
