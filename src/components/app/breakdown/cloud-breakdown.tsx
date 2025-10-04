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
import { cloudCategories } from './breakdown-categories'
import { formatCurrency } from './format-currency'

interface CloudBreakdownProps {
  data: YearlyCost[]
}

export function CloudBreakdown({ data }: CloudBreakdownProps) {
  const cloudTotals = cloudCategories.reduce(
    (acc, category) => {
      acc[category] = data.reduce(
        (sum, year) => sum + (year.cloudBreakdown[category] || 0),
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
          Cloud Cost Breakdown
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
            {cloudCategories.map((category) => (
              <TableRow key={category}>
                <TableCell className="font-medium">{category}</TableCell>
                {data.map((year) => (
                  <TableCell key={year.year} className="text-right">
                    {formatCurrency(year.cloudBreakdown[category] || 0)}
                  </TableCell>
                ))}
                <TableCell className="text-right font-bold">
                  {formatCurrency(cloudTotals[category] || 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              {data.map((year) => (
                <TableCell key={year.year} className="text-right font-bold">
                  {formatCurrency(year.cloudCost)}
                </TableCell>
              ))}
              <TableCell className="text-right font-bold">
                {formatCurrency(data.reduce((s, y) => s + y.cloudCost, 0))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
