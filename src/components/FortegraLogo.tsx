interface FortegraLogoProps {
  /** total pixel height of the lockup */
  height?: number
  /** render white, for dark backgrounds */
  light?: boolean
  variant?: 'full' | 'wordmark'
  className?: string
}

/**
 * Faithful SVG recreation of the Fortegra logo (navy mountain peaks +
 * "FORTEGRA" wordmark). The underwriter's official asset can be dropped in
 * later; this keeps the brand lockup crisp and theme-able in the meantime.
 */
export default function FortegraLogo({
  height = 34,
  light = false,
  variant = 'full',
  className = '',
}: FortegraLogoProps) {
  const color = light ? '#FFFFFF' : '#16385C'
  return (
    <span
      className={`inline-flex flex-col items-center justify-center leading-none ${className}`}
      style={{ height }}
      aria-label="Fortegra"
      role="img"
    >
      {variant === 'full' && (
        <svg
          viewBox="0 0 130 60"
          height={height * 0.5}
          fill="none"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <path d="M2 56 L44 22 L62 38 L86 6 L128 56 Z" fill={color} />
        </svg>
      )}
      <span
        className="font-sans font-extrabold uppercase"
        style={{
          color,
          fontSize: variant === 'full' ? height * 0.34 : height * 0.62,
          letterSpacing: '0.02em',
          lineHeight: 1,
          marginTop: variant === 'full' ? height * 0.08 : 0,
        }}
      >
        Fortegra
      </span>
    </span>
  )
}
