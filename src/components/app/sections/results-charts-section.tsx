'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CalculationResult } from '@/lib/types'
import { CostChart } from '../cost-chart'

interface ResultsChartsSectionProps {
  results: CalculationResult | null
}

export function ResultsChartsSection({ results }: ResultsChartsSectionProps) {
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
        <CardTitle className="font-headline">Cost Charts</CardTitle>
        <CardDescription>
          Visual representation of costs over {analysisPeriod} years
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
