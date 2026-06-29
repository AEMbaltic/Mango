# Mango Insurance — B2C web app

A conversion-focused **direct-to-consumer** experience for buying **extended car
warranty** (plus GAP and MOT cover) online in minutes. Built as a separate B2C
product alongside Mango's existing B2B/dealer site at
[mangouw.eu](https://mangouw.eu/en).

It pairs a polished marketing landing page with a full, app-like **quote → buy**
wizard:

> Enter licence plate → confirm vehicle → choose plan → tailor cover → details →
> pay → instant e-policy.

## Highlights

- **On-brand** — Mango's mango-orange / leaf-green / warm-sand palette, the
  mango-with-leaf logo (crisp SVG), Schibsted Grotesk + IBM Plex Mono.
- **Animated, lightweight hero** — CSS/SVG gradient mesh with floating "mango"
  orbs and a live floating quote card. No heavy video; fully GPU-friendly.
- **Conversion-oriented UX** — instant plate-to-price entry in the hero, trust
  signals (Fortegra, AM Best A−), animated stats, social proof, transparent
  comparison, FAQ, sticky live pricing and a focused checkout.
- **Accessible & responsive** — semantic markup, keyboard-friendly controls,
  visible focus rings, and a global `prefers-reduced-motion` override.
- **Real product facts** — coverage tiers and eligibility (first reg. up to
  6/8/10/15 yrs, 160k–300k km) reflect Mango's actual extended-warranty product;
  underwriting disclosure for LT/LV/EE in the footer.

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (brand tokens in `tailwind.config.js`)
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals, the wizard
  and micro-interactions
- [lucide-react](https://lucide.dev/) icons

## Getting started

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run build     # type-check + production build to /dist
npm run preview   # serve the production build (http://localhost:4173)
```

## Project structure

```
src/
  App.tsx                 # page composition + wizard open/close state
  components/             # landing sections (Nav, Hero, Products, Coverage, …)
    ui/                   # Button, Reveal, SectionHeading
    Logo.tsx              # SVG mango mark + wordmark
    PlateInput.tsx        # reusable licence-plate field
    AnimatedBackground.tsx# hero gradient-mesh backdrop
  wizard/
    QuoteWizard.tsx       # checkout overlay + context-aware footer
    useQuote.ts           # quote state machine
    Stepper.tsx           # progress indicator
    steps/                # one component per step (plate → done)
  lib/
    brand.ts              # brand facts, stats, eligibility, languages
    pricing.ts            # plans, coverage matrix, price calculation
    vehicle.ts            # mock plate → vehicle lookup
    hooks.ts              # count-up + scroll-lock helpers
```

## Notes / next steps

This is a **front-end demo** — it does not yet sell live policies. To take it to
production you'd wire up:

- a real **plate-lookup API** (replace `lib/vehicle.ts`),
- **payments** (Stripe / Paysera) and policy issuance on the success step,
- **i18n** — the language switcher and centralised copy are in place; LT/LV/ET
  translations can be dropped in (currently English ships, switcher sets the
  active locale label).
