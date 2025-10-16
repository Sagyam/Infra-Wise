export type CostBreakdown = {
  [key: string]: number | undefined
}

export type YearlyCost = {
  year: number
  onPremCost: number
  cloudCost: number
  cumulativeOnPrem: number
  cumulativeCloud: number
  onPremBreakdown: CostBreakdown
  cloudBreakdown: CostBreakdown
}

export type CalculationResult = {
  yearlyCosts: YearlyCost[]
  onPremTCO: number
  cloudTCO: number
  savings: number
  breakevenPoint: string | null
  calculationMode: 'tco' | 'amortized'
  analysisPeriod: number
}
