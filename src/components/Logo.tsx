interface LogoProps {
  /** pixel height of the logo */
  size?: number
  className?: string
}

// Official Mango Insurance logo (white wordmark + orange mark, transparent).
// Designed for dark backgrounds — every placement sits on a dark surface.
const ASPECT = 1000 / 205

export default function Logo({ size = 34, className = '' }: LogoProps) {
  return (
    <img
      src="/mango-logo-white.png"
      alt="Mango Insurance"
      width={Math.round(size * ASPECT)}
      height={size}
      style={{ height: size, width: 'auto' }}
      className={`block max-w-full ${className}`}
      draggable={false}
    />
  )
}
