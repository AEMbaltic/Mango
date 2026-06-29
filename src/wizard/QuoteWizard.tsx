import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Car, X } from 'lucide-react'
import type { QuoteApi } from './useQuote'
import Stepper from './Stepper'
import Logo from '../components/Logo'
import LangSwitcher from '../components/LangSwitcher'
import { useScrollLock } from '../lib/hooks'
import { calcPrice, eur, PLANS } from '../lib/pricing'

import PlateStep from './steps/PlateStep'
import VehicleStep from './steps/VehicleStep'
import LeadStep from './steps/LeadStep'
import PlanStep from './steps/PlanStep'
import ConfigureStep from './steps/ConfigureStep'
import DetailsStep from './steps/DetailsStep'
import PayStep from './steps/PayStep'
import DoneStep from './steps/DoneStep'

interface FooterCfg {
  show: boolean
  label: string
  disabled: boolean
  back: boolean
  onBack: () => void
  onPrimary: () => void
  priceShow: boolean
  priceMain: string
  priceSub: string
  hint?: string
}

export default function QuoteWizard({
  open,
  onClose,
  q,
}: {
  open: boolean
  onClose: () => void
  q: QuoteApi
}) {
  const { state, set, goTo, startLookup, reset } = q
  const scrollRef = useRef<HTMLDivElement>(null)
  useScrollLock(open)

  // reset scroll on each step change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [state.step])

  // close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const price = calcPrice(state.plan, state.years, state.mileagePerYear, state.deductible)
  const planName = PLANS[state.plan].name
  const showProgress = ['vehicle', 'plan', 'configure', 'details', 'pay'].includes(state.step)

  const footer = buildFooter()

  function buildFooter(): FooterCfg {
    const base: FooterCfg = {
      show: true,
      label: 'Continue',
      disabled: false,
      back: false,
      onBack: () => {},
      onPrimary: () => {},
      priceShow: false,
      priceMain: '',
      priceSub: '',
    }
    switch (state.step) {
      case 'plate':
        return {
          ...base,
          label: 'Get my price',
          disabled: !state.plate.trim(),
          onPrimary: () => startLookup(state.plate),
          hint: 'Free · no obligation · takes 2 minutes',
        }
      case 'vehicle':
        return {
          ...base,
          label: 'Continue',
          disabled: state.mwValid === null,
          back: true,
          onBack: () => goTo('plate'),
          onPrimary: () => (state.mwValid ? goTo('plan') : set({ step: 'lead', leadDone: false })),
        }
      case 'lead':
        if (state.leadDone)
          return { ...base, label: 'Back to start', onPrimary: () => reset() }
        return {
          ...base,
          label: 'Request call-back',
          disabled: !(state.leadName.trim() && state.leadPhone.trim()),
          back: true,
          onBack: () => goTo('vehicle'),
          onPrimary: () => set({ leadDone: true }),
        }
      case 'plan':
        return {
          ...base,
          back: true,
          onBack: () => goTo('vehicle'),
          onPrimary: () => goTo('configure'),
          priceShow: true,
          priceMain: eur(price.monthly),
          priceSub: `/mo · ${planName}`,
        }
      case 'configure':
        return {
          ...base,
          back: true,
          onBack: () => goTo('plan'),
          onPrimary: () => goTo('details'),
          priceShow: true,
          priceMain: eur(price.monthly),
          priceSub: `${eur(price.total)} total`,
        }
      case 'details':
        return {
          ...base,
          label: 'Continue to payment',
          disabled: !(state.cName.trim() && state.cPhone.trim() && state.cEmail.trim() && state.consent),
          back: true,
          onBack: () => goTo('configure'),
          onPrimary: () => goTo('pay'),
        }
      case 'pay':
        return {
          ...base,
          label: `Pay ${eur(price.total)}`,
          back: true,
          onBack: () => goTo('details'),
          onPrimary: () => goTo('done'),
        }
      case 'done':
        return { ...base, show: false }
      default:
        return base
    }
  }

  function renderStep() {
    switch (state.step) {
      case 'plate':
        return <PlateStep q={q} />
      case 'vehicle':
        return <VehicleStep q={q} />
      case 'lead':
        return <LeadStep q={q} />
      case 'plan':
        return <PlanStep q={q} />
      case 'configure':
        return <ConfigureStep q={q} />
      case 'details':
        return <DetailsStep q={q} />
      case 'pay':
        return <PayStep q={q} />
      case 'done':
        return <DoneStep q={q} />
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-stretch justify-center bg-ink-900/55 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Get your insurance quote"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full max-w-[460px] flex-col overflow-hidden bg-sand-100 shadow-phone sm:h-auto sm:max-h-[92vh] sm:rounded-4xl"
          >
            {/* header */}
            <div className="flex shrink-0 items-center justify-between border-b border-line bg-white px-5 py-3.5">
              <Logo size={30} />
              <div className="flex items-center gap-2">
                <LangSwitcher />
                <button
                  onClick={onClose}
                  className="focus-ring rounded-full p-2 text-ink-500 hover:bg-sand-200"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* progress */}
            {showProgress && (
              <div className="shrink-0 border-b border-line bg-white px-5 py-3">
                <Stepper step={state.step} />
              </div>
            )}

            {/* content */}
            <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto px-5 py-6">
              <div key={state.step}>{renderStep()}</div>
            </div>

            {/* footer */}
            {footer.show && (
              <div className="shrink-0 border-t border-line bg-white px-5 pb-6 pt-3.5 shadow-[0_-8px_24px_-16px_rgba(40,28,16,.2)]">
                <div className="flex items-center gap-3">
                  {footer.back && (
                    <button
                      onClick={footer.onBack}
                      className="focus-ring flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-line-mid bg-white text-ink hover:border-mango-300"
                      aria-label="Back"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  {footer.priceShow && (
                    <div className="shrink-0 leading-tight">
                      <div className="font-mono text-[22px] font-extrabold text-ink">{footer.priceMain}</div>
                      <div className="text-[10px] text-ink-400">{footer.priceSub}</div>
                    </div>
                  )}
                  <motion.button
                    whileTap={footer.disabled ? undefined : { scale: 0.98 }}
                    onClick={footer.onPrimary}
                    disabled={footer.disabled}
                    className={`focus-ring h-[52px] flex-1 rounded-2xl text-[15.5px] font-bold text-white transition-colors ${
                      footer.disabled
                        ? 'cursor-not-allowed bg-sand-500 text-ink-300'
                        : 'bg-mango-500 shadow-mango-sm hover:bg-mango-600'
                    }`}
                  >
                    {footer.label}
                  </motion.button>
                </div>
                {footer.hint && (
                  <div className="mt-2.5 text-center text-[11px] text-ink-400">{footer.hint}</div>
                )}
              </div>
            )}

            {/* lookup overlay */}
            <AnimatePresence>
              {state.looking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-sand-100/95"
                >
                  <div className="relative h-16 w-16">
                    <div className="absolute inset-0 animate-spinSlow rounded-full border-4 border-sand-400 border-t-mango-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-ink">
                      <Car size={24} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[15px] font-bold text-ink">Checking the vehicle registry…</div>
                    <div className="mt-1 animate-pulseSoft font-mono text-[12.5px] text-ink-400">
                      {state.plate.toUpperCase() || 'LT PLATE'}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
