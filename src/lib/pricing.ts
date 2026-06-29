// Pricing model for the extended-warranty quote flow.
// Kept deliberately simple and transparent: base rate per plan, adjusted by
// cover duration, expected annual mileage and the chosen deductible.

export type PlanId = 'comfort' | 'deluxe' | 'diamond'

export interface PlanMeta {
  id: PlanId
  name: string
  tag: string
  perClaim: string
  components: string
  blurb: string
  base: number
}

export const PLANS: Record<PlanId, PlanMeta> = {
  comfort: {
    id: 'comfort',
    name: 'Comfort',
    tag: 'Essential',
    perClaim: '€3,000',
    components: '28',
    blurb: 'Core drivetrain — engine, gearbox & turbo.',
    base: 18,
  },
  deluxe: {
    id: 'deluxe',
    name: 'Deluxe',
    tag: 'Most chosen',
    perClaim: '€5,000',
    components: '85',
    blurb: 'Adds electrics, cooling & fuel systems.',
    base: 27,
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    tag: 'Comprehensive',
    perClaim: '€8,000',
    components: '150+',
    blurb: 'Full mechanical & electronic protection.',
    base: 38,
  },
}

export const PLAN_ORDER: PlanId[] = ['comfort', 'deluxe', 'diamond']

// Coverage comparison matrix shown on the plan step and landing page.
export const COVERAGE_MATRIX: { label: string; comfort: string; deluxe: string; diamond: string }[] = [
  { label: 'Covered components', comfort: '28', deluxe: '85', diamond: '150+' },
  { label: 'Payout per claim', comfort: '€3,000', deluxe: '€5,000', diamond: '€8,000' },
  { label: 'Mechanical & electrical', comfort: 'Core', deluxe: 'Extended', diamond: 'Full' },
  { label: 'Courtesy car', comfort: '—', deluxe: '✓', diamond: '✓' },
  { label: 'EU-wide cover', comfort: '—', deluxe: '—', diamond: '✓' },
  { label: 'Claims handling', comfort: 'Standard', deluxe: 'Priority', diamond: 'Concierge' },
]

export const DURATIONS = [1, 2, 3] as const
export const MILEAGES = [15000, 20000, 25000, 30000] as const
export const DEDUCTIBLES = [0, 50, 150] as const

export type Years = (typeof DURATIONS)[number]
export type Mileage = (typeof MILEAGES)[number]
export type Deductible = (typeof DEDUCTIBLES)[number]

const YEAR_MULT: Record<number, number> = { 1: 1.15, 2: 1, 3: 0.92 }
const MILEAGE_MULT: Record<number, number> = { 15000: 0.92, 20000: 1, 25000: 1.1, 30000: 1.22 }
const DEDUCTIBLE_MULT: Record<number, number> = { 0: 1.18, 50: 1, 150: 0.88 }

export interface Price {
  monthly: number
  total: number
}

export function calcPrice(plan: PlanId, years: number, mileage: number, deductible: number): Price {
  const base = PLANS[plan].base
  const monthly = Math.round(
    base * (YEAR_MULT[years] ?? 1) * (MILEAGE_MULT[mileage] ?? 1) * (DEDUCTIBLE_MULT[deductible] ?? 1),
  )
  return { monthly, total: monthly * 12 * years }
}

export function eur(n: number): string {
  return '€' + n.toLocaleString('en-US')
}
