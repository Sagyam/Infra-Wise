import { ArrowDownRight } from 'lucide-react'
import type { CalculationResult } from '@/lib/types'
import { dollars, SideDot } from './format'

interface VerdictProps {
  results: CalculationResult
}

/** The answer the analysis exists for: which side is cheaper, by how much, and from when. */
export function Verdict({ results }: VerdictProps) {
  const { onPremTCO, cloudTCO, analysisPeriod, calculationMode } = results
  const perYear = calculationMode === 'amortized'
  const scale = perYear ? 1 / analysisPeriod : 1
  const onPrem = onPremTCO * scale
  const cloud = cloudTCO * scale
  const gap = Math.abs(onPrem - cloud)
  const winner = onPrem < cloud ? 'On-premise' : 'Cloud'
  const loserTotal = Math.max(onPrem, cloud)
  const share = loserTotal > 0 ? (gap / loserTotal) * 100 : 0
  const period = perYear
    ? `a year, averaged over ${analysisPeriod} years`
    : `over ${analysisPeriod} ${analysisPeriod === 1 ? 'year' : 'years'}`

  const breakevenYear = results.breakevenPoint
    ? Number(results.breakevenPoint.replace(/\D/g, ''))
    : null

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          The verdict
        </p>
        {gap < 1 ? (
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Both cost the same {period}
          </h2>
        ) : (
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {winner} is cheaper by{' '}
            <span className="text-success">{dollars(gap)}</span> {period}
          </h2>
        )}
        {gap >= 1 && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ArrowDownRight
              className="size-4 text-success"
              aria-hidden="true"
            />
            {share.toFixed(1)}% less than{' '}
            {winner === 'Cloud' ? 'on-premise' : 'cloud'}
            {winner === 'On-premise' &&
              breakevenYear &&
              analysisPeriod > 1 &&
              (breakevenYear === 1
                ? ', from the first year'
                : `, once it pulls ahead in year ${breakevenYear}`)}
            .
          </p>
        )}
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        {(
          [
            ['onPrem', 'On-premise', onPrem],
            ['cloud', 'Cloud', cloud],
          ] as const
        ).map(([side, label, value]) => (
          <div key={side} className="rounded-lg border bg-card px-4 py-3.5">
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <SideDot side={side} />
              {label}
              {perYear ? ' per year' : ' total'}
            </dt>
            <dd className="mt-1 font-heading text-2xl font-semibold tracking-tight">
              {dollars(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
