import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { YearlyCost } from '@/lib/types'
import { ExportButton } from './export-button'

interface ResultsCardHeaderProps {
  title: string
  displayTitle: string
  breakevenPoint: string | null
  yearlyCosts: YearlyCost[]
}

export function ResultsCardHeader({
  title,
  displayTitle,
  breakevenPoint,
  yearlyCosts,
}: ResultsCardHeaderProps) {
  return (
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="font-headline">{title}</CardTitle>
          <CardDescription>{displayTitle}</CardDescription>
          {breakevenPoint && (
            <p className="text-sm text-muted-foreground mt-2">
              Breakeven Point: {breakevenPoint}
            </p>
          )}
        </div>
        <ExportButton yearlyCosts={yearlyCosts} />
      </div>
    </CardHeader>
  )
}
