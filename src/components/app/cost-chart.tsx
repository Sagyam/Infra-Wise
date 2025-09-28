'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { YearlyCost } from '@/lib/types';
import { useMemo } from 'react';

interface CostChartProps {
  data: YearlyCost[];
  type: 'onprem' | 'cloud';
}

const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(value) >= 1_000) {
        return `$${(value / 1_000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
};

const onPremCategories = ['Hardware', 'Software', 'Power', 'Bandwidth', 'CDN', 'Backup', 'Salvage Value'];
const cloudCategories = ['Hot Storage', 'Standard Storage', 'Archive Storage', 'Bandwidth (Egress)'];

const chartConfig = {
  // On-Prem
  Hardware: { label: 'HW', color: 'hsl(var(--chart-1))' },
  Software: { label: 'SW', color: 'hsl(var(--chart-2))' },
  Power: { label: 'Power', color: 'hsl(var(--chart-3))' },
  Bandwidth: { label: 'Network', color: 'hsl(var(--chart-4))' },
  CDN: { label: 'CDN', color: 'hsl(var(--chart-5))' },
  Backup: { label: 'Backup', color: 'hsl(var(--muted))' },
  'Salvage Value': { label: 'Salvage', color: 'hsl(120 80% 60%)'},
  // Cloud
  'Hot Storage': { label: 'Hot', color: 'hsl(var(--chart-1))' },
  'Standard Storage': { label: 'Standard', color: 'hsl(var(--chart-2))' },
  'Archive Storage': { label: 'Archive', color: 'hsl(var(--chart-3))' },
  'Bandwidth (Egress)': { label: 'Egress', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;


export function CostChart({ data, type }: CostChartProps) {
  const chartData = useMemo(() => {
    return data.map(year => {
      const onPremData = year.onPremBreakdown || {};
      const cloudData = year.cloudBreakdown || {};
      return {
        year: `Year ${year.year}`,
        ...onPremData,
        ...cloudData,
      };
    });
  }, [data]);

  const categories = type === 'onprem' ? onPremCategories : cloudCategories;
  const activeChartConfig = categories.reduce((acc, category) => {
    acc[category] = chartConfig[category as keyof typeof chartConfig];
    return acc;
  }, {} as ChartConfig);

  const activeCategories = useMemo(() => {
    return categories.filter(category => 
        chartData.some(d => d[category as keyof typeof d] !== 0 && d[category as keyof typeof d] !== undefined)
    );
  }, [chartData, categories]);


  return (
    <ChartContainer config={activeChartConfig} className="min-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 10, right: 10 }}
        layout="vertical"
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="year"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={80}
        />
        <XAxis type="number" tickFormatter={formatCurrency} axisLine={false} tickLine={false}/>
        <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            content={
                <ChartTooltipContent
                    labelClassName='font-bold'
                    formatter={(value, name, item) => {
                       if (typeof value !== 'number' || value === 0) return null;
                       const category = name as string;
                       const config = chartConfig[category as keyof typeof chartConfig];
                       if (!config) return null;
                       
                       const color = item.color || config.color;

                       return (
                          <div className="flex items-center gap-2" key={category}>
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}/>
                              <span className="text-muted-foreground">{category}</span>
                              <span className="ml-auto font-mono font-medium">{formatCurrency(value)}</span>
                          </div>
                       )
                    }}
                    payloadCreator={payload => {
                        if (!payload || !payload.length) return [];
                        const total = payload.reduce((acc, entry) => acc + (entry.value as number), 0);
                        return [
                            ...payload,
                            { name: 'Total', value: total, color: 'hsl(var(--foreground))' }
                        ].filter(p => typeof p.value === 'number' && p.value !== 0);
                    }}
                />
            }
        />
        <Legend
          content={({ payload }) => (
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-4">
              {payload?.map((entry) => {
                 const category = entry.dataKey as string;
                 if (!activeCategories.includes(category)) return null;
                 const config = activeChartConfig[category as keyof typeof activeChartConfig];
                 if (!config) return null;
                 return (
                    <div key={`item-${entry.value}`} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}/>
                        <span className="text-xs text-muted-foreground">{config.label}</span>
                    </div>
                 );
              })}
            </div>
          )}
        />
        
        {activeCategories.map(category => (
             <Bar key={category} dataKey={category} stackId="a" fill={activeChartConfig[category as keyof typeof activeChartConfig]?.color || 'hsl(var(--primary))'} name={category} />
        ))}

      </BarChart>
    </ChartContainer>
  );
}
