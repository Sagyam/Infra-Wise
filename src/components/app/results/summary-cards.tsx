import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryCardsProps {
  onPremDisplay: number
  cloudDisplay: number
  savingsDisplay: number
  winningOption: string
  calculationMode: 'tco' | 'amortized'
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function SummaryCards({
  onPremDisplay,
  cloudDisplay,
  savingsDisplay,
  winningOption,
  calculationMode,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            On-Premise {calculationMode === 'amortized' ? ' / year' : 'TCO'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatCurrency(onPremDisplay)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Cloud {calculationMode === 'amortized' ? ' / year' : 'TCO'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatCurrency(cloudDisplay)}</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">
            {winningOption} Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
            <Trophy />
            {formatCurrency(savingsDisplay)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
