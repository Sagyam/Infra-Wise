'use client'

import { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CalculationResult, CostFormValues } from '@/lib/types'
import { BreakdownTable } from './breakdown-table'
import { CostChart } from './cost-chart'
import { ExportButton } from './results/export-button'
import { SummaryCards } from './results/summary-cards'
import { ResultsTable } from './results-table'

interface ResultsDisplayProps {
  results: CalculationResult
  calculationMode: CostFormValues['calculationMode']
}

export function ResultsDisplay({
  results,
  calculationMode,
}: ResultsDisplayProps) {
  const {
    onPremTCO,
    cloudTCO,
    savings,
    yearlyCosts,
    analysisPeriod,
    breakevenPoint,
  } = results

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
            <CardTitle className="font-headline">Analysis Results</CardTitle>
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

        <Tabs defaultValue="chart">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Cumulative</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="pt-4">
            <h3 className="text-lg font-semibold mb-4 font-headline">
              Annual Cost Breakdown
            </h3>
            <Tabs defaultValue="onprem-chart">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="onprem-chart">On-Premise</TabsTrigger>
                <TabsTrigger value="cloud-chart">Cloud</TabsTrigger>
              </TabsList>
              <TabsContent value="onprem-chart" className="pt-4">
                <CostChart data={yearlyCosts} type="onprem" />
              </TabsContent>
              <TabsContent value="cloud-chart" className="pt-4">
                <CostChart data={yearlyCosts} type="cloud" />
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="table" className="pt-4">
            <h3 className="text-lg font-semibold mb-4 font-headline">
              Yearly TCO Breakdown
            </h3>
            <ResultsTable data={yearlyCosts} />
          </TabsContent>
          <TabsContent value="breakdown" className="pt-4">
            <h3 className="text-lg font-semibold mb-4 font-headline">
              Detailed Cost Breakdown
            </h3>
            <BreakdownTable data={yearlyCosts} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
