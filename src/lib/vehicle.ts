// Mock vehicle-registry lookup. In production this would hit Mango's
// plate-lookup API; here it simulates a network call and returns a sample car.

export interface Vehicle {
  make: string
  model: string
  year: string
  firstReg: string
  vin: string
  fuel: string
}

const ACTIVE: Vehicle = {
  make: 'Audi',
  model: 'Q5 40 TFSI',
  year: '2021',
  firstReg: '03 / 2021',
  vin: 'WAUZZZ8R•••092183',
  fuel: 'Petrol mild-hybrid',
}

const EXPIRED: Vehicle = {
  ...ACTIVE,
  year: '2017',
  firstReg: '05 / 2017',
}

export function lookupPlate(_plate: string, scenario: 'active' | 'expired' = 'active'): Promise<Vehicle> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(scenario === 'expired' ? EXPIRED : ACTIVE), 1500)
  })
}
