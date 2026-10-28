import type { YearlyCost } from '@/lib/types'
import { compactDollars, dollars, SIDES, SideDot } from './format'

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

interface CategoryComparisonProps {
  data: YearlyCost[]
}

export function categoryTotals(data: YearlyCost[]) {
  return CATEGORIES.map((category) => ({
    category,
    onPrem: data.reduce((s, y) => s + (y.onPremBreakdown[category] ?? 0), 0),
    cloud: data.reduce((s, y) => s + (y.cloudBreakdown[category] ?? 0), 0),
  }))
    .filter((row) => Math.abs(row.onPrem) >= 1 || Math.abs(row.cloud) >= 1)
    .sort((a, b) => Math.max(b.onPrem, b.cloud) - Math.max(a.onPrem, a.cloud))
}

/**
 * Each category's spend over the whole period, the two sides as a pair of bars on one scale, so
 * the categories that decide the outcome sit at the top.
 */
export function CategoryComparison({ data }: CategoryComparisonProps) {
  const rows = categoryTotals(data)
  const max = Math.max(1, ...rows.flatMap((r) => [r.onPrem, r.cloud]))

  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li
          key={row.category}
          className="grid grid-cols-[minmax(6rem,9rem)_1fr] items-center gap-x-4 sm:grid-cols-[minmax(6rem,11rem)_1fr_7rem]"
        >
          <span className="text-sm font-medium">{row.category}</span>
          <div className="space-y-0.5" aria-hidden="true">
            {(['onPrem', 'cloud'] as const).map((side) => (
              <div
                key={side}
                title={`${SIDES[side].label}: ${dollars(row[side])}`}
                className="h-2.5 rounded-r-[4px]"
                style={{
                  width: `${Math.max(0, (row[side] / max) * 100)}%`,
                  minWidth: row[side] > 0 ? 2 : 0,
                  background: SIDES[side].color,
                }}
              />
            ))}
          </div>
          <div className="figures col-start-2 flex gap-3 text-xs sm:col-start-auto sm:block sm:text-right">
            <p className="flex items-center justify-end gap-1.5">
              <SideDot side="onPrem" />
              <span className="sr-only">{SIDES.onPrem.label}: </span>
              {compactDollars(row.onPrem)}
            </p>
            <p className="flex items-center justify-end gap-1.5 text-muted-foreground">
              <SideDot side="cloud" />
              <span className="sr-only">{SIDES.cloud.label}: </span>
              {compactDollars(row.cloud)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
