import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { YearlyCost } from '@/lib/types'
import { jsonToCSV } from '@/lib/utils'

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
    <Button variant="outline" size="sm" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Download CSV
    </Button>
  )
}
