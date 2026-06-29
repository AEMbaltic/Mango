interface LogoProps {
  /** pixel height of the mark */
  size?: number
  withWordmark?: boolean
  /** light wordmark for dark backgrounds */
  dark?: boolean
  className?: string
}

/** The Mango Insurance mark: an amber→orange checkmark. */
export function MangoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={(size * 44) / 48}
      height={size}
      viewBox="0 0 44 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mg-check" x1="2" y1="46" x2="42" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F26B1F" />
          <stop offset="0.55" stopColor="#F5871F" />
          <stop offset="1" stopColor="#FBB540" />
        </linearGradient>
      </defs>
      <polyline
        points="4,21 18,44 40,4"
        stroke="url(#mg-check)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Logo({ size = 34, withWordmark = true, dark = false, className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <MangoMark size={size} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[22px] font-extrabold leading-[0.95] tracking-[-0.03em] ${
              dark ? 'text-white' : 'text-ink'
            }`}
          >
            mango
          </span>
          <span className="font-display text-[9px] font-semibold uppercase leading-none tracking-[0.34em] text-mango-500">
            insurance
          </span>
        </span>
      )}
    </span>
  )
}
