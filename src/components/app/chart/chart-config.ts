import type { ChartConfig } from '@/components/ui/chart'

export const onPremCategories = [
  'Energy',
  'Storage',
  'Compute',
  'GPU',
  'Networking',
  'Human',
  'Software',
]

export const cloudCategories = [
  'Storage',
  'Compute',
  'GPU',
  'Networking',
  'Human',
  'Software',
]

export const chartConfig = {
  // On-Prem (7 categories)
  Energy: { label: 'Energy', color: 'hsl(var(--chart-1))' },
  Storage: { label: 'Storage', color: 'hsl(var(--chart-2))' },
  Compute: { label: 'Compute', color: 'hsl(var(--chart-3))' },
  GPU: { label: 'GPU', color: 'hsl(var(--chart-4))' },
  Networking: { label: 'Networking', color: 'hsl(var(--chart-5))' },
  Human: { label: 'Human', color: 'hsl(var(--chart-6))' },
  Software: { label: 'Software', color: 'hsl(var(--chart-7))' },
} satisfies ChartConfig

export const formatCurrency = (value: number) => {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}
