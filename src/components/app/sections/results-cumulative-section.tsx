'use client'

import { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CalculationResult, CostFormValues } from '@/lib/types'
import { ExportButton } from '../results/export-button'
import { SummaryCards } from '../results/summary-cards'
import { ResultsTable } from '../results-table'

interface ResultsCumulativeSectionProps {
  results: CalculationResult | null
  calculationMode: CostFormValues['calculationMode']
}

export function ResultsCumulativeSection({
  results,
  calculationMode,
}: ResultsCumulativeSectionProps) {
  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">No Results Yet</CardTitle>
          <CardDescription>
            Please fill in the form and click Calculate to see results.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline">Cumulative Costs</CardTitle>
            <CardDescription>{displayTitle}</CardDescription>
            {breakevenPoint && (
              <p className="text-sm text-muted-foreground mt-2">
                Breakeven Point: {breakevenPoint}
              </p>
            )}
          </div>
          <ExportButton yearlyCosts={yearlyCosts} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <SummaryCards
          onPremDisplay={onPremDisplay}
          cloudDisplay={cloudDisplay}
          savingsDisplay={savingsDisplay}
          winningOption={winningOption}
          calculationMode={calculationMode}
        />
        <ResultsTable data={yearlyCosts} />
      </CardContent>
    </Card>
  )
}
