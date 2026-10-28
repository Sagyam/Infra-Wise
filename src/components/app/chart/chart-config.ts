import type { ChartConfig } from '@/components/ui/chart'

export const onPremCategories = [
  'Energy',
  'Storage',
  'Compute',
  'GPU',
  'Networking',
  'Human',
  'Software',
  'Security & Compliance',
]

export const cloudCategories = [
  'Storage',
  'Compute',
  'GPU',
  'Networking',
  'Human',
  'Software',
  'Security & Compliance',
]

export const chartConfig = {
  // On-Prem (8 categories)
  Energy: { label: 'Energy', color: 'var(--chart-1)' },
  Storage: { label: 'Storage', color: 'var(--chart-2)' },
  Compute: { label: 'Compute', color: 'var(--chart-3)' },
  GPU: { label: 'GPU', color: 'var(--chart-4)' },
  Networking: { label: 'Networking', color: 'var(--chart-5)' },
  Human: { label: 'Human', color: 'var(--chart-6)' },
  Software: { label: 'Software', color: 'var(--chart-7)' },
  'Security & Compliance': {
    label: 'Security & Compliance',
    color: 'var(--chart-8)',
  },
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
