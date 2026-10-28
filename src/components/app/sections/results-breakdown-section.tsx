'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CalculationResult } from '@/lib/types'
import { BreakdownTable } from '../breakdown-table'
import { ResultsEmptyState } from '../results/results-empty-state'

interface ResultsBreakdownSectionProps {
  results: CalculationResult | null
}

export function ResultsBreakdownSection({
  results,
}: ResultsBreakdownSectionProps) {
  if (!results) {
    return <ResultsEmptyState />
  }

  const yearlyCosts = results.yearlyCosts ?? []
  const analysisPeriod = results.analysisPeriod ?? 1

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Cost breakdown</CardTitle>
        <CardDescription>
          Every category, year by year, over {analysisPeriod} years.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BreakdownTable data={yearlyCosts} />
      </CardContent>
    </Card>
  )
}
