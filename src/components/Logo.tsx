interface LogoProps {
  /** pixel size of the mark */
  size?: number
  /** show the "mango / insurance" wordmark next to the mark */
  withWordmark?: boolean
  /** light wordmark for dark backgrounds */
  dark?: boolean
  className?: string
}

/** The Mango Insurance mark: a mango fruit with a leaf, plus optional wordmark. */
export function MangoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 6px 12px rgba(245,96,31,.35))' }}
    >
      <defs>
        <linearGradient id="mg-body" x1="6" y1="6" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8A45" />
          <stop offset="1" stopColor="#F5601F" />
        </linearGradient>
        <linearGradient id="mg-leaf" x1="24" y1="3" x2="34" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#48C088" />
          <stop offset="1" stopColor="#2FA56B" />
        </linearGradient>
      </defs>
      {/* mango body */}
      <ellipse cx="20" cy="23.5" rx="13.2" ry="14.4" transform="rotate(-13 20 23.5)" fill="url(#mg-body)" />
      {/* soft highlight */}
      <ellipse cx="14.5" cy="17" rx="3.6" ry="5.4" transform="rotate(-13 14.5 17)" fill="#fff" opacity="0.28" />
      {/* leaf */}
      <path
        d="M25.5 5.2c4.8-2.1 8.2 0.4 6.7 5.2-4.6 1.9-8.3-0.6-6.7-5.2Z"
        fill="url(#mg-leaf)"
      />
      <path
        d="M27 8.4c1.7 0.3 3 1.2 3.9 2.6"
        stroke="#15623F"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
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
            className={`text-[19px] font-extrabold tracking-[-0.02em] ${dark ? 'text-white' : 'text-ink'}`}
          >
            mango
          </span>
          <span
            className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${
              dark ? 'text-sand-400/80' : 'text-ink-300'
            }`}
          >
            insurance
          </span>
        </span>
      )}
    </span>
  )
}
