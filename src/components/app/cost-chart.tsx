'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import type { YearlyCost } from '@/lib/types'
import {
  chartConfig,
  cloudCategories,
  formatCurrency,
  onPremCategories,
} from './chart/chart-config'
import { ChartLegend } from './chart/chart-legend'
import { payloadCreator, tooltipFormatter } from './chart/chart-tooltip'

interface CostChartProps {
  data: YearlyCost[]
  type: 'onprem' | 'cloud'
}


export function CostChart({ data, type }: CostChartProps) {
  const chartData = useMemo(() => {
    return data.map((year) => {
      const onPremData = year.onPremBreakdown || {}
      const cloudData = year.cloudBreakdown || {}
      return {
        year: `Year ${year.year}`,
        ...onPremData,
        ...cloudData,
      }
    })
  }, [data])

  const categories = type === 'onprem' ? onPremCategories : cloudCategories
  const activeChartConfig = categories.reduce((acc, category) => {
    acc[category] = chartConfig[category as keyof typeof chartConfig]
    return acc
  }, {} as ChartConfig)

  const activeCategories = useMemo(() => {
    return categories.filter((category) =>
      chartData.some(
        (d) =>
          d[category as keyof typeof d] !== 0 &&
          d[category as keyof typeof d] !== undefined,
      ),
    )
  }, [chartData, categories])

  return (
    <ChartContainer config={activeChartConfig} className="min-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 10, right: 10 }}
        layout="vertical"
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="year"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={80}
        />
        <XAxis
          type="number"
          tickFormatter={formatCurrency}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          content={
            <ChartTooltipContent
              labelClassName="font-bold"
              formatter={(value, name, item) =>
                tooltipFormatter({ value, name, item })
              }
              payloadCreator={payloadCreator}
            />
          }
        />
        <Legend
          content={({ payload }) => (
            <ChartLegend
              payload={payload}
              activeCategories={activeCategories}
              activeChartConfig={activeChartConfig}
            />
          )}
        />

        {activeCategories.map((category) => (
          <Bar
            key={category}
            dataKey={category}
            stackId="a"
            fill={
              activeChartConfig[category as keyof typeof activeChartConfig]
                ?.color || 'hsl(var(--primary))'
            }
            name={category}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
