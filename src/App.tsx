import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import HowItWorks from './components/HowItWorks'
import Products from './components/Products'
import Coverage from './components/Coverage'
import PlansPreview from './components/PlansPreview'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import QuoteWizard from './wizard/QuoteWizard'
import { useQuote } from './wizard/useQuote'

export default function App() {
  const q = useQuote()
  const [wizardOpen, setWizardOpen] = useState(false)

  /** Open the purchase flow. If a plate is supplied, jump straight to lookup. */
  const openWizard = (plate?: string) => {
    q.reset()
    if (plate && plate.trim()) q.startLookup(plate)
    setWizardOpen(true)
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav onGetPrice={() => openWizard()} />

      <main>
        <Hero onGetPrice={openWizard} />
        <TrustBar />
        <HowItWorks />
        <Products onGetPrice={openWizard} />
        <Coverage />
        <PlansPreview onGetPrice={openWizard} />
        <Testimonials />
        <FAQ />
        <FinalCTA onGetPrice={openWizard} />
      </main>

      <Footer />

      <QuoteWizard open={wizardOpen} onClose={() => setWizardOpen(false)} q={q} />
    </div>
  )
}
