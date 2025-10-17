'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import type { YearlyCost } from '@/lib/types'
import { formatCurrency } from './chart/chart-config'
import { ChartLegend } from './chart/chart-legend'

interface CapExOpExChartProps {
  data: YearlyCost[]
  type: 'onprem' | 'cloud'
}

const capexOpexConfig = {
  CapEx: {
    label: 'CapEx',
    color: 'hsl(var(--chart-1))',
  },
  OpEx: {
    label: 'OpEx',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

// Custom tooltip component
function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <div className="mb-2 font-medium">{label}</div>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.name}:</span>
            <span className="ml-auto font-mono font-medium">
              {formatCurrency(entry.value || 0)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CapExOpExChart({ data, type }: CapExOpExChartProps) {
  const chartData = useMemo(() => {
    return data.map((year) => ({
      year: `Year ${year.year}`,
      CapEx: type === 'onprem' ? year.onPremCapEx || 0 : year.cloudCapEx || 0,
      OpEx: type === 'onprem' ? year.onPremOpEx || 0 : year.cloudOpEx || 0,
    }))
  }, [data, type])

  const activeCategories = useMemo(() => {
    const categories: string[] = []
    if (chartData.some((d) => d.CapEx > 0)) categories.push('CapEx')
    if (chartData.some((d) => d.OpEx > 0)) categories.push('OpEx')
    return categories
  }, [chartData])

  return (
    <ChartContainer config={capexOpexConfig} className="min-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 10, right: 10, top: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickFormatter={formatCurrency}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'hsl(var(--muted))' }}
        />
        <Legend
          content={({ payload }) => (
            <ChartLegend
              payload={payload}
              activeCategories={activeCategories}
              activeChartConfig={capexOpexConfig}
            />
          )}
        />

        {activeCategories.map((category) => (
          <Bar
            key={category}
            dataKey={category}
            stackId="a"
            fill={
              capexOpexConfig[category as keyof typeof capexOpexConfig]
                ?.color || 'hsl(var(--primary))'
            }
            name={category}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
