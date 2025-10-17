import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CapExOpExSummaryProps {
  totalOnPremCapEx?: number
  totalOnPremOpEx?: number
  calculationMode: 'tco' | 'amortized'
  analysisPeriod: number
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function CapExOpExSummary({
  totalOnPremCapEx = 0,
  totalOnPremOpEx = 0,
  calculationMode,
  analysisPeriod,
}: CapExOpExSummaryProps) {
  const onPremCapExDisplay =
    calculationMode === 'amortized'
      ? totalOnPremCapEx / analysisPeriod
      : totalOnPremCapEx
  const onPremOpExDisplay =
    calculationMode === 'amortized'
      ? totalOnPremOpEx / analysisPeriod
      : totalOnPremOpEx

  const displaySuffix = calculationMode === 'amortized' ? ' / year' : ''

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold font-headline">
        On-Premise CapEx vs OpEx Breakdown
      </h3>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">
            On-Premise Infrastructure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              CapEx (Capital Expenditure){displaySuffix}
            </span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(onPremCapExDisplay)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              OpEx (Operating Expenditure){displaySuffix}
            </span>
            <span className="font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(onPremOpExDisplay)}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="text-sm font-medium">Total{displaySuffix}</span>
            <span className="font-bold">
              {formatCurrency(onPremCapExDisplay + onPremOpExDisplay)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
