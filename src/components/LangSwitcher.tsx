import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { LANGS } from '../lib/brand'

/**
 * Language selector. Mirrors the original prototype's behaviour: switching
 * updates the active locale label. Copy is centralised so real LT/LV/ET
 * translations can be dropped in later without touching components.
 */
export default function LangSwitcher({
  align = 'right',
  dark = false,
}: {
  align?: 'left' | 'right'
  dark?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('EN')

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`focus-ring flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${
          dark
            ? 'border-white/25 bg-white/10 text-white hover:bg-white/15'
            : 'border-line bg-sand-100 text-ink hover:border-line-mid'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {lang}
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-11 z-50 w-44 overflow-hidden rounded-2xl border border-line bg-white shadow-soft ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
            role="listbox"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLang(l.code)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between border-b border-sand-200 px-4 py-3 text-left last:border-0 hover:bg-sand-100"
                  role="option"
                  aria-selected={lang === l.code}
                >
                  <span className="text-sm font-semibold text-ink">{l.name}</span>
                  {lang === l.code ? (
                    <Check size={14} className="text-mango-500" />
                  ) : (
                    <span className="font-mono text-[11px] font-bold text-ink-300">{l.code}</span>
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
