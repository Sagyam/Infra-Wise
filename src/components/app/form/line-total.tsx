import { type Control, type FieldPath, useWatch } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'

const wholeDollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
const cents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})
// Rates like $0.15 an hour keep their cents; whole amounts drop them.
const dollars = {
  format: (v: number) =>
    Number.isInteger(v) ? wholeDollars.format(v) : cents.format(v),
}
const plain = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })

interface LineTotalProps {
  control: Control<CostFormValues>
  /** The fields multiplied together, with how each one prints. */
  factors: { name: FieldPath<CostFormValues>; format: 'count' | 'dollars' }[]
  /** What the product is, as in "up front" or "a month". */
  per: string
}

/** The running product of a cost line's fields, so a figure can be checked while it is typed. */
export function LineTotal({ control, factors, per }: LineTotalProps) {
  const values = useWatch({
    control,
    name: factors.map((f) => f.name),
  }) as (number | undefined)[]
  const numbers = values.map((v) => (typeof v === 'number' ? v : 0))
  const total = numbers.reduce((product, v) => product * v, 1)
  const terms = numbers.map((v, i) =>
    factors[i].format === 'dollars' ? dollars.format(v) : plain.format(v),
  )

  return (
    <p className="col-span-full -mt-1 text-xs text-muted-foreground">
      <span className="figures">{terms.join(' × ')} = </span>
      <span className="figures font-medium text-foreground">
        {wholeDollars.format(total)}
      </span>{' '}
      {per}
    </p>
  )
}
