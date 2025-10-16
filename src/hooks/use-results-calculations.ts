import { useMemo } from 'react'
import type { CalculationResult, CostFormValues } from '@/lib/types'

export function useResultsCalculations(
  results: CalculationResult | null,
  calculationMode: CostFormValues['calculationMode'],
) {
  const onPremTCO = results?.onPremTCO ?? 0
  const cloudTCO = results?.cloudTCO ?? 0
  const savings = results?.savings ?? 0
  const yearlyCosts = results?.yearlyCosts ?? []
  const analysisPeriod = results?.analysisPeriod ?? 1
  const breakevenPoint = results?.breakevenPoint ?? null

  const winningOption = useMemo(
    () => (savings > 0 ? 'Cloud' : 'On-Premise'),
    [savings],
  )

  const winningSavings = useMemo(
    () => (savings > 0 ? savings : -savings),
    [savings],
  )

  const onPremDisplay = useMemo(
    () =>
      calculationMode === 'amortized' ? onPremTCO / analysisPeriod : onPremTCO,
    [calculationMode, onPremTCO, analysisPeriod],
  )

  const cloudDisplay = useMemo(
    () =>
      calculationMode === 'amortized' ? cloudTCO / analysisPeriod : cloudTCO,
    [calculationMode, cloudTCO, analysisPeriod],
  )

  const savingsDisplay = useMemo(
    () =>
      calculationMode === 'amortized'
        ? winningSavings / analysisPeriod
        : winningSavings,
    [calculationMode, winningSavings, analysisPeriod],
  )

  const displayTitle =
    calculationMode === 'amortized'
      ? `Amortized Cost Per Year over ${analysisPeriod} years`
      : `Total Cost of Ownership (TCO) over ${analysisPeriod} years`

  return {
    onPremTCO,
    cloudTCO,
    savings,
    yearlyCosts,
    analysisPeriod,
    breakevenPoint,
    winningOption,
    winningSavings,
    onPremDisplay,
    cloudDisplay,
    savingsDisplay,
    displayTitle,
  }
}
