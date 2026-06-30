interface LogoProps {
  /** pixel height of the mark */
  size?: number
  withWordmark?: boolean
  /** light wordmark for dark backgrounds */
  dark?: boolean
  className?: string
}

/** The Mango Insurance mark: a bold, solid amber→orange checkmark. */
export function MangoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="mg-check" x1="18" y1="82" x2="74" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F26B1F" />
          <stop offset="0.5" stopColor="#F5871F" />
          <stop offset="1" stopColor="#FBB540" />
        </linearGradient>
      </defs>
      {/* Mango mark: bold upright checkmark — short lower-left arm, tall steep right arm */}
      <polyline
        points="14,38 32,78 72,10"
        fill="none"
        stroke="url(#mg-check)"
        strokeWidth="18"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
    </svg>
  )
}

export default function Logo({ size = 34, withWordmark = true, dark = false, className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
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
