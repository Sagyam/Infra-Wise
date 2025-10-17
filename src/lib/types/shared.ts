export type CostBreakdown = {
  [key: string]: number | undefined
}

export type ExpenseType = 'capex' | 'opex'

export type CostBreakdownWithExpenseType = {
  [key: string]: {
    amount: number
    expenseType: ExpenseType
  }
}

export type YearlyCost = {
  year: number
  onPremCost: number
  cloudCost: number
  cumulativeOnPrem: number
  cumulativeCloud: number
  onPremBreakdown: CostBreakdown
  cloudBreakdown: CostBreakdown
  onPremCapEx?: number
  onPremOpEx?: number
  cloudCapEx?: number
  cloudOpEx?: number
}

export type CalculationResult = {
  yearlyCosts: YearlyCost[]
  onPremTCO: number
  cloudTCO: number
  savings: number
  breakevenPoint: string | null
  calculationMode: 'tco' | 'amortized'
  analysisPeriod: number
  totalOnPremCapEx?: number
  totalOnPremOpEx?: number
  totalCloudCapEx?: number
  totalCloudOpEx?: number
}
