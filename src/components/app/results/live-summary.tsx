import { ArrowRight, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CalculationResult } from '@/lib/types'
import { compactDollars, SideDot } from './format'

interface LiveSummaryProps {
  results: CalculationResult | null
  isCalculating: boolean
  error: string | null
  onShowResults: () => void
}

/**
 * Sits at the foot of every form section and follows the figures as they are typed, so the effect
 * of a change is seen without leaving the form.
 */
export function LiveSummary({
  results,
  isCalculating,
  error,
  onShowResults,
}: LiveSummaryProps) {
  const onPrem = results?.onPremTCO ?? 0
  const cloud = results?.cloudTCO ?? 0
  const gap = Math.abs(onPrem - cloud)

  return (
    <div className="sticky bottom-4 z-10 mt-8">
      <div
        aria-live="polite"
        className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border bg-card/90 py-2.5 pr-2.5 pl-5 shadow-lg ring-1 ring-edge/5 backdrop-blur-md"
      >
        {error ? (
          <p className="flex-1 text-sm text-destructive">{error}</p>
        ) : results ? (
          <dl className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <div className="flex items-center gap-2">
              <SideDot side="onPrem" />
              <dt className="text-muted-foreground">On-premise</dt>
              <dd className="figures">{compactDollars(onPrem)}</dd>
            </div>
            <div className="flex items-center gap-2">
              <SideDot side="cloud" />
              <dt className="text-muted-foreground">Cloud</dt>
              <dd className="figures">{compactDollars(cloud)}</dd>
            </div>
            {gap >= 1 && (
              <div className="flex items-center gap-1.5">
                <dt className="font-medium">
                  {onPrem < cloud ? 'On-premise' : 'Cloud'} cheaper by
                </dt>
                <dd className="figures font-medium text-success">
                  {compactDollars(gap)}
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="flex-1 text-sm text-muted-foreground">Calculating…</p>
        )}
        {isCalculating && (
          <LoaderCircle
            className="size-4 animate-spin text-muted-foreground"
            aria-label="Recalculating"
          />
        )}
        <Button type="button" size="sm" onClick={onShowResults}>
          See results
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
