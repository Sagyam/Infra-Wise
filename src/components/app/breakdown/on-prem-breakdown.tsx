import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { YearlyCost } from '@/lib/types'
import { onPremCategories } from './breakdown-categories'
import { formatCurrency } from './format-currency'

interface OnPremBreakdownProps {
  data: YearlyCost[]
}

export function OnPremBreakdown({ data }: OnPremBreakdownProps) {
  const onPremTotals = onPremCategories.reduce(
    (acc, category) => {
      acc[category] = data.reduce(
        (sum, year) => sum + (year.onPremBreakdown[category] || 0),
        0,
      )
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-headline">
          On-Premise Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
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
          <TableBody>
            {onPremCategories.map((category) => (
              <TableRow key={category}>
                <TableCell className="font-medium">{category}</TableCell>
                {data.map((year) => (
                  <TableCell key={year.year} className="text-right">
                    {formatCurrency(year.onPremBreakdown[category] || 0)}
                  </TableCell>
                ))}
                <TableCell className="text-right font-bold">
                  {formatCurrency(onPremTotals[category] || 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              {data.map((year) => (
                <TableCell key={year.year} className="text-right font-bold">
                  {formatCurrency(year.onPremCost)}
                </TableCell>
              ))}
              <TableCell className="text-right font-bold">
                {formatCurrency(data.reduce((s, y) => s + y.onPremCost, 0))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
