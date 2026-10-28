import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { YearlyCost } from '@/lib/types'
import { jsonToCSV } from '@/lib/utils'

const CATEGORIES = [
  'Energy',
  'Storage',
  'Compute',
  'GPU',
  'Networking',
  'Human',
  'Software',
  'Security & Compliance',
]

interface ExportButtonProps {
  yearlyCosts: YearlyCost[]
}

export function ExportButton({ yearlyCosts }: ExportButtonProps) {
  const handleExport = () => {
    const flattenedData = yearlyCosts.map((y) => ({
      Year: y.year,
      'On-Prem Cost': y.onPremCost,
      'Cloud Cost': y.cloudCost,
      'Cumulative On-Prem': y.cumulativeOnPrem,
      'Cumulative Cloud': y.cumulativeCloud,
      ...Object.fromEntries(
        CATEGORIES.flatMap((category) => [
          [`On-Prem ${category}`, y.onPremBreakdown[category] ?? 0],
          [`Cloud ${category}`, y.cloudBreakdown[category] ?? 0],
        ]),
      ),
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
    <Button variant="outline" size="sm" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Download CSV
    </Button>
  )
}
