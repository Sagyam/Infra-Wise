import { modelInflation } from '@/lib/inflation'

export const tbToGb = (tb: number) => tb * 1024

export interface InflationParams {
  cost: number
  inflationRate: number
  year: number
}

export async function applyInflation({
  cost,
  inflationRate,
  year,
}: InflationParams): Promise<number> {
  const { inflatedCost } = await modelInflation({
    initialCost: cost,
    inflationRate,
    analysisPeriod: year - 1,
  })
  return inflatedCost
}

export function calculateHardwareCost(
  enabled: boolean | undefined,
  quantity: number | undefined,
  unitCost: number | undefined,
): number {
  if (!enabled) return 0
  return (quantity || 0) * (unitCost || 0)
}

export function applySalvage(cost: number, salvagePercent: number): number {
  return cost * (salvagePercent / 100)
}
