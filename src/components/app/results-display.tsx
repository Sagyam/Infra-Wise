'use client'

import { Download, Trophy } from 'lucide-react'
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
import { jsonToCSV } from '@/lib/utils'
import { Button } from '../ui/button'
import { BreakdownTable } from './breakdown-table'
import { CostChart } from './cost-chart'
import { ResultsTable } from './results-table'

interface ResultsDisplayProps {
  results: CalculationResult
  calculationMode: CostFormValues['calculationMode']
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
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

  const handleExport = () => {
    const flattenedData = yearlyCosts.map((y) => ({
      Year: y.year,
      'On-Prem Cost': y.onPremCost,
      'Cloud Cost': y.cloudCost,
      'Cumulative On-Prem': y.cumulativeOnPrem,
      'Cumulative Cloud': y.cumulativeCloud,
      'On-Prem Hardware': y.onPremBreakdown.Hardware || 0,
      'On-Prem Software': y.onPremBreakdown.Software || 0,
      'On-Prem Power': y.onPremBreakdown.Power || 0,
      'On-Prem Bandwidth': y.onPremBreakdown.Bandwidth || 0,
      'On-Prem CDN': y.onPremBreakdown.CDN || 0,
      'On-Prem Backup': y.onPremBreakdown.Backup || 0,
      'Cloud Hot Storage': y.cloudBreakdown['Hot Storage'] || 0,
      'Cloud Standard Storage': y.cloudBreakdown['Standard Storage'] || 0,
      'Cloud Archive Storage': y.cloudBreakdown['Archive Storage'] || 0,
      'Cloud Bandwidth (Egress)': y.cloudBreakdown['Bandwidth (Egress)'] || 0,
    }))
    const csv = jsonToCSV(flattenedData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'infrawise_tco_analysis.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                On-Premise {calculationMode === 'amortized' ? ' / year' : 'TCO'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {formatCurrency(onPremDisplay)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cloud {calculationMode === 'amortized' ? ' / year' : 'TCO'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {formatCurrency(cloudDisplay)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">
                {winningOption} Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                <Trophy />
                {formatCurrency(savingsDisplay)}
              </p>
            </CardContent>
          </Card>
        </div>

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
