'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useResultsCalculations } from '@/hooks/use-results-calculations'
import type { CalculationResult, CostFormValues } from '@/lib/types'
import { BreakdownTable } from './breakdown-table'
import { CostChart } from './cost-chart'
import { ResultsCardHeader } from './results/results-card-header'
import { ResultsEmptyState } from './results/results-empty-state'
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
        title="Analysis Results"
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
