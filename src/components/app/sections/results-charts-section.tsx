'use client'

import { useState } from 'react'
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
  const [activeTab, setActiveTab] = useState('onprem-chart')
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="relative grid w-full grid-cols-2 p-1 font-semibold">
            <div
              className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] bg-primary rounded-md transition-all duration-300"
              style={{
                transform: `translateX(${activeTab === 'cloud-chart' ? '100%' : '0%'})`,
              }}
            />
            <TabsTrigger value="onprem-chart" className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent">On-Premise</TabsTrigger>
            <TabsTrigger value="cloud-chart" className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent">Cloud</TabsTrigger>
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
