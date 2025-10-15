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

interface ResultsBreakdownSectionProps {
  results: CalculationResult | null
}

export function ResultsBreakdownSection({
  results,
}: ResultsBreakdownSectionProps) {
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

  const yearlyCosts = results.yearlyCosts ?? []
  const analysisPeriod = results.analysisPeriod ?? 1

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Detailed Cost Breakdown</CardTitle>
        <CardDescription>
          Itemized cost breakdown over {analysisPeriod} years
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BreakdownTable data={yearlyCosts} />
      </CardContent>
    </Card>
  )
}
