import { Star } from 'lucide-react'

interface RatingProps {
  /** 'light' for dark backgrounds */
  tone?: 'dark' | 'light'
  showCount?: boolean
  className?: string
}

/** Trustpilot-style rating lockup: green stars + score + review count. */
export default function Rating({ tone = 'dark', showCount = true, className = '' }: RatingProps) {
  const text = tone === 'light' ? 'text-white' : 'text-ink'
  const sub = tone === 'light' ? 'text-white/70' : 'text-ink-400'
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-leaf-500">
            <Star size={13} className="fill-white text-white" />
          </span>
        ))}
      </div>
      <span className={`text-[14px] font-bold ${text}`}>Excellent</span>
      {showCount && <span className={`text-[13px] ${sub}`}>4.8/5 · 2,100+ reviews</span>}
    </div>
  )
}
