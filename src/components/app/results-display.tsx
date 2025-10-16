'use client'

import { useMemo, useState } from 'react'
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
  results: CalculationResult | null
  calculationMode: CostFormValues['calculationMode']
}

export function ResultsDisplay({
  results,
  calculationMode,
}: ResultsDisplayProps) {
  const [activeMainTab, setActiveMainTab] = useState('chart')
  const [activeChartTab, setActiveChartTab] = useState('onprem-chart')

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

        <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
          <TabsList className="relative grid w-full grid-cols-3 p-1 font-semibold">
            <div
              className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(33.333%-0.333rem)] bg-primary rounded-md transition-all duration-300"
              style={{
                transform: `translateX(${
                  activeMainTab === 'chart'
                    ? '0%'
                    : activeMainTab === 'table'
                      ? '100%'
                      : '200%'
                })`,
              }}
            />
            <TabsTrigger
              value="chart"
              className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent"
            >
              Chart
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent"
            >
              Cumulative
            </TabsTrigger>
            <TabsTrigger
              value="breakdown"
              className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent"
            >
              Breakdown
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="pt-4">
            <h3 className="text-lg font-semibold mb-4 font-headline">
              Annual Cost Breakdown
            </h3>
            <Tabs value={activeChartTab} onValueChange={setActiveChartTab}>
              <TabsList className="relative grid w-full grid-cols-2 p-1 font-semibold">
                <div
                  className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] bg-primary rounded-md transition-all duration-300"
                  style={{
                    transform: `translateX(${activeChartTab === 'cloud-chart' ? '100%' : '0%'})`,
                  }}
                />
                <TabsTrigger
                  value="onprem-chart"
                  className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent"
                >
                  On-Premise
                </TabsTrigger>
                <TabsTrigger
                  value="cloud-chart"
                  className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent"
                >
                  Cloud
                </TabsTrigger>
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
