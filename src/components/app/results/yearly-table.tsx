import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { YearlyCost } from '@/lib/types'
import { dollars, SideDot } from './format'

interface YearlyTableProps {
  data: YearlyCost[]
}

/** The figures behind the cumulative chart, year by year. */
export function YearlyTable({ data }: YearlyTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">On-premise</TableHead>
            <TableHead className="text-right">Cloud</TableHead>
            <TableHead className="text-right">Cumulative on-premise</TableHead>
            <TableHead className="text-right">Cumulative cloud</TableHead>
            <TableHead>Ahead so far</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="figures">
          {data.map((y) => {
            const gap = y.cumulativeOnPrem - y.cumulativeCloud
            return (
              <TableRow key={y.year}>
                <TableCell>{y.year}</TableCell>
                <TableCell className="text-right">
                  {dollars(y.onPremCost)}
                </TableCell>
                <TableCell className="text-right">
                  {dollars(y.cloudCost)}
                </TableCell>
                <TableCell className="text-right">
                  {dollars(y.cumulativeOnPrem)}
                </TableCell>
                <TableCell className="text-right">
                  {dollars(y.cumulativeCloud)}
                </TableCell>
                <TableCell className="font-sans">
                  {Math.abs(gap) < 1 ? (
                    <span className="text-muted-foreground">Even</span>
                  ) : (
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <SideDot side={gap < 0 ? 'onPrem' : 'cloud'} />
                      {gap < 0 ? 'On-premise' : 'Cloud'}
                      <span className="figures text-muted-foreground">
                        by {dollars(Math.abs(gap))}
                      </span>
                    </span>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
