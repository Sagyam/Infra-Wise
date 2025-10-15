import type { ChartConfig } from '@/components/ui/chart'

interface ChartLegendProps {
  payload?: Array<{ value: string; dataKey: string; color: string }>
  activeCategories: string[]
  activeChartConfig: ChartConfig
}

export function ChartLegend({
  payload,
  activeCategories,
  activeChartConfig,
}: ChartLegendProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-4">
      {payload?.map((entry) => {
        const category = entry.dataKey as string
        if (!activeCategories.includes(category)) return null
        const config =
          activeChartConfig[category as keyof typeof activeChartConfig]
        if (!config) return null
        return (
          <div
            key={`item-${entry.value}`}
            className="flex items-center gap-1.5"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground">
              {config.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
