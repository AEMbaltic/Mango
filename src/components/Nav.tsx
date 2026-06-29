import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from './ui/Button'
import LangSwitcher from './LangSwitcher'
import { BRAND } from '../lib/brand'

const LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#cover', label: 'Cover' },
  { href: '#plans', label: 'Plans' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav({ onGetPrice }: { onGetPrice: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line/70 bg-sand-100/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-pad flex h-16 items-center justify-between sm:h-[72px]">
        <a href="#top" className="focus-ring rounded-xl" aria-label="Mango Insurance home">
          <Logo size={34} />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="focus-ring rounded-md text-sm font-semibold text-ink-600 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={BRAND.b2bUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-md text-sm font-semibold text-ink-400 transition-colors hover:text-ink"
          >
            For dealers ↗
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <LangSwitcher />

          <div className="hidden sm:block">
            <Button size="sm" onClick={onGetPrice}>
              Get my price
            </Button>
          </div>

          {/* mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="focus-ring rounded-xl border border-line bg-sand-100 p-2 lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-sand-100/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-pad flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-ink-700 hover:bg-sand-200"
                >
                  {l.label}
                </a>
              ))}
              <Button
                className="mt-2"
                full
                onClick={() => {
                  setMenuOpen(false)
                  onGetPrice()
                }}
              >
                Get my price
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
