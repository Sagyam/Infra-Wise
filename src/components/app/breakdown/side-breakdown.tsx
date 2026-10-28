import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { YearlyCost } from '@/lib/types'
import { cn } from '@/lib/utils'
import { cloudCategories, onPremCategories } from './breakdown-categories'
import { formatCurrency } from './format-currency'

interface SideBreakdownProps {
  data: YearlyCost[]
  side: 'onPrem' | 'cloud'
}

function Amount({ value, strong }: { value: number; strong?: boolean }) {
  return (
    <TableCell
      className={cn(
        'text-right',
        value === 0 && 'text-muted-foreground/50',
        strong && 'font-semibold',
      )}
    >
      {formatCurrency(value).replace('-$', '−$')}
    </TableCell>
  )
}

/** One side's spend, category by year, with totals both ways. */
export function SideBreakdown({ data, side }: SideBreakdownProps) {
  const categories = side === 'onPrem' ? onPremCategories : cloudCategories
  const amount = (year: YearlyCost, category: string) =>
    (side === 'onPrem' ? year.onPremBreakdown : year.cloudBreakdown)[
      category
    ] || 0
  const yearTotal = (year: YearlyCost) =>
    side === 'onPrem' ? year.onPremCost : year.cloudCost
  const hasSalvage = data.some((year) =>
    categories.some((category) => amount(year, category) < 0),
  )

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              {data.map((y) => (
                <TableHead key={y.year} className="text-right">
                  Year {y.year}
                </TableHead>
              ))}
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="figures">
            {categories.map((category) => (
              <TableRow key={category}>
                <TableCell className="font-sans font-medium">
                  {category}
                </TableCell>
                {data.map((year) => (
                  <Amount key={year.year} value={amount(year, category)} />
                ))}
                <Amount
                  value={data.reduce((sum, y) => sum + amount(y, category), 0)}
                  strong
                />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="figures">
            <TableRow>
              <TableCell className="font-sans font-semibold">Total</TableCell>
              {data.map((year) => (
                <Amount key={year.year} value={yearTotal(year)} strong />
              ))}
              <Amount
                value={data.reduce((s, y) => s + yearTotal(y), 0)}
                strong
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {hasSalvage && (
        <p className="text-xs text-muted-foreground">
          A negative figure in the last year is salvage: what the hardware is
          worth when it is resold at the end of the period.
        </p>
      )}
    </div>
  )
}
