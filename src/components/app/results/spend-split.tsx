import type { CalculationResult } from '@/lib/types'
import { dollars, SIDES, SideDot } from './format'

interface SpendSplitProps {
  results: CalculationResult
}

/** How much of each side's bill is bought up front and how much keeps running. */
export function SpendSplit({ results }: SpendSplitProps) {
  const rows = [
    {
      side: 'onPrem' as const,
      capex: results.totalOnPremCapEx ?? 0,
      opex: results.totalOnPremOpEx ?? 0,
    },
    {
      side: 'cloud' as const,
      capex: results.totalCloudCapEx ?? 0,
      opex: results.totalCloudOpEx ?? 0,
    },
  ]

  return (
    <div className="space-y-5">
      {rows.map(({ side, capex, opex }) => {
        const total = Math.max(1, capex + opex)
        const capexShare = Math.max(0, capex / total) * 100
        return (
          <div key={side} className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SideDot side={side} />
              {SIDES[side].label}
            </div>
            <div className="flex h-3 gap-0.5" aria-hidden="true">
              {capexShare > 0 && (
                <div
                  className="rounded-l-[4px] first:last:rounded-r-[4px]"
                  style={{
                    width: `${capexShare}%`,
                    background: SIDES[side].color,
                  }}
                />
              )}
              {capexShare < 100 && (
                <div
                  className="flex-1 rounded-r-[4px] first:rounded-l-[4px]"
                  style={{ background: SIDES[side].color, opacity: 0.35 }}
                />
              )}
            </div>
            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-[2px]"
                  style={{ background: SIDES[side].color }}
                />
                <dt>Up front (CapEx)</dt>
                <dd className="figures text-foreground">{dollars(capex)}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-[2px]"
                  style={{ background: SIDES[side].color, opacity: 0.35 }}
                />
                <dt>Running (OpEx)</dt>
                <dd className="figures text-foreground">{dollars(opex)}</dd>
              </div>
            </dl>
          </div>
        )
      })}
    </div>
  )
}
