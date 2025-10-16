'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { YearlyCost } from '@/lib/types'

interface ResultsTableProps {
  data: YearlyCost[]
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function ResultsTable({ data }: ResultsTableProps) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Year</TableHead>
            <TableHead>On-Premise Cost</TableHead>
            <TableHead>Cloud Cost</TableHead>
            <TableHead>Cumulative On-Premise</TableHead>
            <TableHead>Cumulative Cloud</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.year}>
              <TableCell className="font-medium">{row.year}</TableCell>
              <TableCell>{formatCurrency(row.onPremCost)}</TableCell>
              <TableCell>{formatCurrency(row.cloudCost)}</TableCell>
              <TableCell>{formatCurrency(row.cumulativeOnPrem)}</TableCell>
              <TableCell>{formatCurrency(row.cumulativeCloud)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
