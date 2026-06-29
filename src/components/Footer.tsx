import Logo from './Logo'
import FortegraLogo from './FortegraLogo'
import { BRAND } from '../lib/brand'

const COLS = [
  {
    title: 'Cover',
    links: [
      { label: 'Extended Warranty', href: '#products' },
      { label: 'GAP Insurance', href: 'https://mangouw.eu/en/gap-insurance' },
      { label: 'MOT / Service cover', href: '#products' },
      { label: 'Plans & pricing', href: '#plans' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Mango', href: 'https://mangouw.eu/en' },
      { label: 'Meet the team', href: 'https://mangouw.eu/en/team' },
      { label: 'For dealers', href: 'https://mangouw.eu/en' },
      { label: 'Contact', href: 'https://mangouw.eu/en/contacts' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Register a claim', href: 'https://mangouw.eu/en/claim-registration' },
      { label: 'How it works', href: '#how' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Documents', href: 'https://mangouw.eu/en/documents' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-900 text-sand-400/80">
      <div className="container-pad py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo size={34} dark />
            <p className="mt-4 text-[14px] leading-relaxed text-sand-400/70">
              Extended car warranty, GAP and MOT cover you can buy online in minutes — built for
              drivers across the Baltics.
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-sand-400/60">
                Underwritten by
              </span>
              <FortegraLogo light variant="wordmark" height={16} />
            </div>
            <div className="mt-5 space-y-1 text-[13px]">
              <a href={`mailto:${BRAND.email}`} className="block transition-colors hover:text-white">
                {BRAND.email}
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="block transition-colors hover:text-white">
                {BRAND.phone}
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-sand-400/60">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const external = l.href.startsWith('http')
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className="text-[14px] transition-colors hover:text-white"
                      >
                        {l.label}
                        {external && ' ↗'}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* regulatory disclosure */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[12px] leading-relaxed text-sand-400/60">
          Mango Insurance arranges extended warranty cover underwritten by {BRAND.underwriter}, rated{' '}
          {BRAND.rating} by AM Best. In Lithuania, Mango Insurance acts as a direct insurance agent; in
          Latvia, as an insurance broker licensed by Latvijas Banka; in Estonia, on a Freedom of Service
          basis. This site is a demo B2C experience and does not yet sell live policies.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] sm:flex-row">
          <span>© {year} Mango Insurance. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="https://mangouw.eu/en/documents" target="_blank" rel="noreferrer" className="hover:text-white">
              Privacy
            </a>
            <a href="https://mangouw.eu/en/documents" target="_blank" rel="noreferrer" className="hover:text-white">
              Terms
            </a>
            <a href="https://mangouw.eu/en/documents" target="_blank" rel="noreferrer" className="hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
