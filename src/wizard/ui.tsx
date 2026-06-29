import type { ReactNode } from 'react'

/** Labelled card-style text input used across the wizard. */
export function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  mono,
  type = 'text',
  inputMode,
  autoFocus,
  id,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
  type?: string
  inputMode?: 'numeric' | 'email' | 'tel' | 'text'
  autoFocus?: boolean
  id?: string
}) {
  return (
    <label className="block rounded-2xl border border-line bg-white px-4 py-3 transition-colors focus-within:border-mango-500">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-500">
        {label}
        {hint && <span className="ml-1 font-medium normal-case tracking-normal text-ink-300">{hint}</span>}
      </span>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-300 ${
          mono ? 'font-mono' : ''
        }`}
      />
    </label>
  )
}

/** Segmented-control style toggle button. */
export function Seg({
  active,
  onClick,
  children,
  mono,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  mono?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring flex-1 rounded-2xl border-2 px-2 py-3 text-[14px] font-bold transition-colors ${
        mono ? 'font-mono' : ''
      } ${
        active
          ? 'border-mango-500 bg-mango-100 text-mango-700'
          : 'border-line-mid bg-white text-ink-600 hover:border-mango-300'
      }`}
    >
      {children}
    </button>
  )
}

/** Radio indicator dot. */
export function RadioDot({ active }: { active: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        active ? 'border-mango-500 bg-mango-500' : 'border-line-mid bg-white'
      }`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
    </span>
  )
}

/** Step heading used at the top of each wizard screen. */
export function StepHead({ title, sub }: { title: string; sub?: ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-[22px] font-extrabold tracking-[-0.01em] text-ink">{title}</h2>
      {sub && <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{sub}</p>}
    </div>
  )
}
