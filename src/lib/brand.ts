// Central source of truth for Mango Insurance brand facts and reusable copy.
// Figures reflect Mango's real positioning: underwritten by Fortegra Europe
// Insurance Company SE (AM Best A− "Excellent"), operating across the Baltics.

export const BRAND = {
  name: 'Mango Insurance',
  wordmark: { strong: 'mango', sub: 'insurance' },
  tagline: 'Keep your car covered the day the factory warranty ends.',
  underwriter: 'Fortegra Europe Insurance Company SE',
  rating: 'AM Best A− (Excellent)',
  markets: ['Lithuania', 'Latvia', 'Estonia'],
  dealerPartners: '300+',
  email: 'hello@mangouw.eu',
  phone: '+370 5 214 0000',
  b2bUrl: 'https://mangouw.eu/en',
} as const

// Headline stats used in the trust bar (animated count-ups).
export const STATS: { value: number; suffix?: string; prefix?: string; label: string }[] = [
  { value: 32000, suffix: '+', label: 'Drivers covered' },
  { value: 300, suffix: '+', label: 'Dealer partners' },
  { value: 4.8, label: 'Average rating', suffix: '/5' },
  { value: 5, label: 'Minutes to buy', prefix: '<' },
]

// Eligibility tiers — Mango's real age/mileage bands.
export const ELIGIBILITY = [
  { age: 'up to 6 yrs', km: '160,000 km' },
  { age: 'up to 8 yrs', km: '200,000 km' },
  { age: 'up to 10 yrs', km: '250,000 km' },
  { age: 'up to 15 yrs', km: '300,000 km' },
]

export type Lang = { code: string; name: string }
export const LANGS: Lang[] = [
  { code: 'EN', name: 'English' },
  { code: 'LT', name: 'Lietuvių' },
  { code: 'LV', name: 'Latviešu' },
  { code: 'ET', name: 'Eesti' },
]
