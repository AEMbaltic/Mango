import Reveal from './Reveal'

interface Props {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  center?: boolean
  dark?: boolean
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  dark = false,
  className = '',
}: Props) {
  return (
    <Reveal className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-2.5 ${center ? 'justify-center' : ''}`}>
          <span className="h-[3px] w-7 rounded-full bg-mango-500" />
          <span className={`text-[12px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-mango-300' : 'text-mango-600'}`}>
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-display text-balance text-[1.9rem] font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-[2.6rem] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-[16px] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-500'}`}>{subtitle}</p>
      )}
    </Reveal>
  )
}
