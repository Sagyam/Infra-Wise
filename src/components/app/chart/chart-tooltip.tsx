import { chartConfig, formatCurrency } from './chart-config'

interface TooltipFormatterProps {
  value: unknown
  name: unknown
  item: { color?: string }
}

export function tooltipFormatter({ value, name, item }: TooltipFormatterProps) {
  if (typeof value !== 'number' || value === 0) return null
  const category = name as string
  const config = chartConfig[category as keyof typeof chartConfig]
  if (!config) return null

  const color = item.color || config.color

  return (
    <div className="flex items-center gap-2" key={category}>
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-muted-foreground">{category}</span>
      <span className="ml-auto font-mono font-medium">
        {formatCurrency(value)}
      </span>
    </div>
  )
}

export function payloadCreator(
  payload: Array<{ name: string; value: unknown }> | undefined,
) {
  if (!payload || !payload.length) return []
  const total = payload.reduce((acc, entry) => acc + (entry.value as number), 0)
  return [
    ...payload,
    {
      name: 'Total',
      value: total,
      color: 'hsl(var(--foreground))',
    },
  ].filter((p) => typeof p.value === 'number' && p.value !== 0)
}
