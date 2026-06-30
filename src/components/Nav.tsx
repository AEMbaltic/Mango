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
    // Stay transparent while the (possibly tall, pinned) hero is in view; turn
    // solid once the hero has scrolled past the bar.
    const onScroll = () => {
      const hero = document.getElementById('top')
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 80 : window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The logo wordmark is white, so the bar stays dark in every state:
  // transparent over the dark hero, then a dark glass bar once scrolled.
  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-white/10 bg-ink-900/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-pad flex h-16 items-center justify-between sm:h-[72px]">
        <a href="#top" className="focus-ring rounded-xl" aria-label="Mango Insurance home">
          <Logo size={32} />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="focus-ring rounded-md text-sm font-semibold text-white/85 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={BRAND.b2bUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-md text-sm font-semibold text-white/65 transition-colors hover:text-white"
          >
            For dealers ↗
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <LangSwitcher dark />
          <div className="hidden sm:block">
            <Button size="sm" onClick={onGetPrice}>
              Get my price
            </Button>
          </div>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="focus-ring rounded-xl border border-white/25 bg-white/10 p-2 text-white lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-pad flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-white/85 hover:bg-white/10"
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
