import Reveal from './Reveal'

interface Props {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  center?: boolean
}

export default function SectionHeading({ eyebrow, title, subtitle, center = true }: Props) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-mango-200 bg-mango-50 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-mango-700">
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-[2.6rem] sm:leading-[1.08]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-[16px] leading-relaxed text-ink-500">{subtitle}</p>}
    </Reveal>
  )
}
