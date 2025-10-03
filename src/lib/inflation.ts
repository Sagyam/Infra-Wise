/**
 * Calculate inflation-adjusted cost
 * @param initialCost - The initial cost amount
 * @param inflationRate - Annual inflation rate as decimal (e.g., 0.03 for 3%)
 * @param analysisPeriod - Number of years to project forward
 * @returns Object containing the inflated cost
 */
export function modelInflation({
  initialCost,
  inflationRate,
  analysisPeriod,
}: {
  initialCost: number
  inflationRate: number
  analysisPeriod: number
}): Promise<{ inflatedCost: number }> {
  const inflatedCost = initialCost * Math.pow(1 + inflationRate, analysisPeriod)

  return Promise.resolve({ inflatedCost })
}
