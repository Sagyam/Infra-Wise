"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { YearlyCost } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface BreakdownTableProps {
  data: YearlyCost[];
}

const formatCurrency = (value: number) => {
  if (value === 0) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const onPremCategories = [
  "Hardware",
  "Software",
  "Power",
  "Bandwidth",
  "CDN",
  "Backup",
  "Salvage Value",
];
const cloudCategories = [
  "Hot Storage",
  "Standard Storage",
  "Archive Storage",
  "Bandwidth (Egress)",
];

export function BreakdownTable({ data }: BreakdownTableProps) {
  const onPremTotals = onPremCategories.reduce(
    (acc, category) => {
      acc[category] = data.reduce(
        (sum, year) => sum + (year.onPremBreakdown[category] || 0),
        0
      );
      return acc;
    },
    {} as Record<string, number>
  );

  const cloudTotals = cloudCategories.reduce(
    (acc, category) => {
      acc[category] = data.reduce(
        (sum, year) => sum + (year.cloudBreakdown[category] || 0),
        0
      );
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <Tabs defaultValue="onprem">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="onprem">On-Premise</TabsTrigger>
        <TabsTrigger value="cloud">Cloud</TabsTrigger>
      </TabsList>
      <TabsContent value="onprem" className="pt-4">
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
                  {data.map(y => (
                    <TableHead key={y.year} className="text-right">
                      Year {y.year}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {onPremCategories.map(category => (
                  <TableRow key={category}>
                    <TableCell className="font-medium">{category}</TableCell>
                    {data.map(year => (
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
                  {data.map(year => (
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
      </TabsContent>
      <TabsContent value="cloud" className="pt-4">
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
                  {data.map(y => (
                    <TableHead key={y.year} className="text-right">
                      Year {y.year}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cloudCategories.map(category => (
                  <TableRow key={category}>
                    <TableCell className="font-medium">{category}</TableCell>
                    {data.map(year => (
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
                  {data.map(year => (
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
      </TabsContent>
    </Tabs>
  );
}
