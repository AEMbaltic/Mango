import { Car } from 'lucide-react'
import type { QuoteApi } from '../useQuote'
import { Field, RadioDot, StepHead } from '../ui'

const FALLBACK = {
  make: 'Audi',
  model: 'Q5 40 TFSI',
  year: '2021',
  firstReg: '03 / 2021',
  vin: 'WAUZZZ8R•••092183',
  fuel: 'Petrol mild-hybrid',
}

export default function VehicleStep({ q }: { q: QuoteApi }) {
  const { state, set } = q
  const v = state.vehicle ?? FALLBACK
  const plate = state.plate.trim() ? state.plate.toUpperCase() : 'KMG 482'

  return (
    <div className="animate-fadeUp">
      <StepHead title="Is this your car?" sub="Pulled from the vehicle registry. Confirm the details below." />

      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <div className="flex items-center gap-3.5 bg-gradient-to-br from-ink to-ink-700 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
            <Car size={24} />
          </div>
          <div className="leading-tight">
            <div className="text-[18px] font-extrabold text-white">
              {v.make} {v.model}
            </div>
            <div className="font-mono text-[12px] text-sand-400/90">
              {plate} · {v.year}
            </div>
          </div>
        </div>
        <dl className="px-4">
          {[
            ['First registration', v.firstReg, true],
            ['VIN', v.vin, true],
            ['Fuel', v.fuel, false],
          ].map(([k, val, mono], i, arr) => (
            <div
              key={k as string}
              className={`flex justify-between py-3 ${i < arr.length - 1 ? 'border-b border-sand-300' : ''}`}
            >
              <dt className="text-[13px] text-ink-500">{k}</dt>
              <dd className={`text-[13px] font-semibold text-ink ${mono ? 'font-mono' : ''}`}>{val}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-5">
        <Field
          label="Confirm mileage (km)"
          value={state.mileage}
          onChange={(val) => set({ mileage: val.replace(/[^0-9]/g, '') })}
          mono
          inputMode="numeric"
        />
      </div>

      <div className="mt-6">
        <div className="text-[14px] font-bold text-ink">Is the car still under manufacturer warranty?</div>
        <div className="mb-3 mt-0.5 text-[12px] text-ink-500">
          Standard factory warranty in the Baltics is 5 years.
        </div>
        <div className="flex gap-2.5">
          <WarrantyCard
            active={state.mwValid === true}
            title="Yes"
            sub="Buy cover online now"
            onClick={() => set({ mwValid: true })}
          />
          <WarrantyCard
            active={state.mwValid === false}
            title="No / expired"
            sub="Needs a quick inspection"
            onClick={() => set({ mwValid: false })}
          />
        </div>
      </div>
    </div>
  )
}

function WarrantyCard({
  active,
  title,
  sub,
  onClick,
}: {
  active: boolean
  title: string
  sub: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring flex-1 rounded-2xl border-2 p-3.5 text-left transition-colors ${
        active ? 'border-mango-500 bg-mango-100' : 'border-line-mid bg-white hover:border-mango-300'
      }`}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[14px] font-bold text-ink">{title}</span>
        <RadioDot active={active} />
      </div>
      <div className="text-[11px] leading-snug text-ink-500">{sub}</div>
    </button>
  )
}
