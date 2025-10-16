'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useResultsCalculations } from '@/hooks/use-results-calculations'
import type { CalculationResult, CostFormValues } from '@/lib/types'
import { ResultsCardHeader } from '../results/results-card-header'
import { ResultsEmptyState } from '../results/results-empty-state'
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
  const {
    yearlyCosts,
    breakevenPoint,
    onPremDisplay,
    cloudDisplay,
    savingsDisplay,
    winningOption,
    displayTitle,
  } = useResultsCalculations(results, calculationMode)

  if (!results) {
    return <ResultsEmptyState />
  }

  return (
    <Card>
      <ResultsCardHeader
        title="Cumulative Costs"
        displayTitle={displayTitle}
        breakevenPoint={breakevenPoint}
        yearlyCosts={yearlyCosts}
      />
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
