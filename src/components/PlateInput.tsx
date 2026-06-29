import { ArrowRight } from 'lucide-react'
import Button from './ui/Button'

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

/** EU-style licence plate field with the LT country flag block. */
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
      <div className="flex flex-1 items-stretch overflow-hidden rounded-2xl border-2 border-line-mid bg-white shadow-card transition-colors focus-within:border-mango-500">
        {/* LT country block */}
        <div className="flex flex-col items-center justify-center gap-0.5 bg-[#1B3A8B] px-3 text-white">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#FACC3D] text-[7px] leading-none text-[#FACC3D]">
            ★
          </span>
          <span className="font-mono text-[9px] font-bold">LT</span>
        </div>
        <input
          id={id}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ABC 123"
          maxLength={9}
          aria-label="Licence plate"
          className={`min-w-0 flex-1 bg-transparent font-mono font-semibold uppercase tracking-[0.08em] text-ink outline-none placeholder:text-ink-300 ${
            tall ? 'px-4 py-4 text-2xl' : 'px-4 py-3 text-xl'
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
