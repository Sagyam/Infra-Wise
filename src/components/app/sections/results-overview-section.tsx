'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CalculationResult } from '@/lib/types'
import { CategoryComparison } from '../results/category-comparison'
import { CumulativeChart } from '../results/cumulative-chart'
import { ExportButton } from '../results/export-button'
import { ResultsEmptyState } from '../results/results-empty-state'
import { SpendSplit } from '../results/spend-split'
import { Verdict } from '../results/verdict'
import { YearlyTable } from '../results/yearly-table'

interface ResultsOverviewSectionProps {
  results: CalculationResult | null
}

/** Everything the analysis concludes on one page: the verdict first, then the evidence for it. */
export function ResultsOverviewSection({
  results,
}: ResultsOverviewSectionProps) {
  if (!results) {
    return <ResultsEmptyState />
  }

  const { yearlyCosts, analysisPeriod } = results
  const breakevenYear = results.breakevenPoint
    ? Number(results.breakevenPoint.replace(/\D/g, ''))
    : null
  const years = `${analysisPeriod} ${analysisPeriod === 1 ? 'year' : 'years'}`

  return (
    <div className="space-y-6">
      <Card className="hero-glow overflow-hidden">
        <CardContent className="relative pt-6">
          <div className="absolute top-6 right-6 hidden sm:block">
            <ExportButton yearlyCosts={yearlyCosts} />
          </div>
          <Verdict results={results} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">
            Cumulative cost
          </CardTitle>
          <CardDescription>
            What each side has cost by the end of each year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CumulativeChart data={yearlyCosts} breakevenYear={breakevenYear} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-heading text-lg">
              Where the money goes
            </CardTitle>
            <CardDescription>
              Each category over {years}, on-premise above cloud.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryComparison data={yearlyCosts} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-lg">
              Up front or running
            </CardTitle>
            <CardDescription>
              What is bought once against what is paid every year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SpendSplit results={results} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Year by year</CardTitle>
          <CardDescription>The figures behind the chart.</CardDescription>
        </CardHeader>
        <CardContent>
          <YearlyTable data={yearlyCosts} />
        </CardContent>
        <div className="border-t px-6 py-4 sm:hidden">
          <ExportButton yearlyCosts={yearlyCosts} />
        </div>
      </Card>
    </div>
  )
}
