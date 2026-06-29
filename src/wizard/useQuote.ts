import { useCallback, useState } from 'react'
import { lookupPlate, type Vehicle } from '../lib/vehicle'
import type { Deductible, Mileage, PlanId, Years } from '../lib/pricing'

export type Step =
  | 'plate'
  | 'vehicle'
  | 'lead'
  | 'plan'
  | 'configure'
  | 'details'
  | 'pay'
  | 'done'

export interface QuoteState {
  step: Step
  looking: boolean
  plate: string
  email: string
  vehicle: Vehicle | null
  mileage: string
  mwValid: boolean | null
  leadName: string
  leadPhone: string
  leadDone: boolean
  plan: PlanId
  years: Years
  mileagePerYear: Mileage
  deductible: Deductible
  cName: string
  cPhone: string
  cEmail: string
  consent: boolean
  payMethod: 'card' | 'paysera'
  policyNo: string
}

const initial: QuoteState = {
  step: 'plate',
  looking: false,
  plate: '',
  email: '',
  vehicle: null,
  mileage: '62000',
  mwValid: null,
  leadName: '',
  leadPhone: '',
  leadDone: false,
  plan: 'deluxe',
  years: 2,
  mileagePerYear: 20000,
  deductible: 50,
  cName: '',
  cPhone: '',
  cEmail: '',
  consent: false,
  payMethod: 'card',
  policyNo: 'EW-2026-48201',
}

export function useQuote() {
  const [state, setState] = useState<QuoteState>(initial)

  const set = useCallback((patch: Partial<QuoteState>) => {
    setState((s) => ({ ...s, ...patch }))
  }, [])

  const goTo = useCallback((step: Step) => {
    setState((s) => ({ ...s, step }))
  }, [])

  const startLookup = useCallback((plate?: string) => {
    setState((s) => ({ ...s, plate: plate ?? s.plate, looking: true, step: 'plate', mwValid: null }))
    lookupPlate(plate ?? '').then((vehicle) => {
      setState((s) => ({ ...s, looking: false, step: 'vehicle', vehicle }))
    })
  }, [])

  const reset = useCallback(() => setState(initial), [])

  return { state, set, goTo, startLookup, reset }
}

export type QuoteApi = ReturnType<typeof useQuote>
