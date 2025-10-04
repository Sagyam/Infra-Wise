import type { ChartConfig } from '@/components/ui/chart'

export const onPremCategories = [
  'Hardware',
  'Software',
  'Power',
  'Bandwidth',
  'CDN',
  'Backup',
  'Salvage Value',
]

export const cloudCategories = [
  'Hot Storage',
  'Standard Storage',
  'Archive Storage',
  'Bandwidth (Egress)',
]

export const chartConfig = {
  // On-Prem
  Hardware: { label: 'HW', color: 'hsl(var(--chart-1))' },
  Software: { label: 'SW', color: 'hsl(var(--chart-2))' },
  Power: { label: 'Power', color: 'hsl(var(--chart-3))' },
  Bandwidth: { label: 'Network', color: 'hsl(var(--chart-4))' },
  CDN: { label: 'CDN', color: 'hsl(var(--chart-5))' },
  Backup: { label: 'Backup', color: 'hsl(var(--muted))' },
  'Salvage Value': { label: 'Salvage', color: 'hsl(120 80% 60%)' },
  // Cloud
  'Hot Storage': { label: 'Hot', color: 'hsl(var(--chart-1))' },
  'Standard Storage': { label: 'Standard', color: 'hsl(var(--chart-2))' },
  'Archive Storage': { label: 'Archive', color: 'hsl(var(--chart-3))' },
  'Bandwidth (Egress)': { label: 'Egress', color: 'hsl(var(--chart-4))' },
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
