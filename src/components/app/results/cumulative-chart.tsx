'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  Rectangle,
  type RectangleProps,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import type { YearlyCost } from '@/lib/types'
import { compactDollars, dollars, SIDES, SideDot } from './format'

const config = {
  onPrem: { label: SIDES.onPrem.label, color: SIDES.onPrem.color },
  cloud: { label: SIDES.cloud.label, color: SIDES.cloud.color },
} satisfies ChartConfig

interface Point {
  year: number
  onPrem: number
  cloud: number
}

interface CumulativeChartProps {
  data: YearlyCost[]
  breakevenYear: number | null
}

function CumulativeTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload as Point
  const gap = point.onPrem - point.cloud
  return (
    <div className="min-w-48 rounded-lg border bg-popover px-3 py-2.5 text-sm shadow-lg">
      <p className="mb-1.5 font-medium">
        {point.year === 0 ? 'Start' : `End of year ${point.year}`}
      </p>
      {(['onPrem', 'cloud'] as const).map((side) => (
        <div key={side} className="flex items-center gap-2 py-0.5">
          <SideDot side={side} />
          <span className="text-muted-foreground">{SIDES[side].label}</span>
          <span className="figures ml-auto">{dollars(point[side])}</span>
        </div>
      ))}
      {point.year > 0 && Math.abs(gap) >= 1 && (
        <p className="mt-1.5 border-t pt-1.5 text-xs text-muted-foreground">
          {gap < 0 ? 'On-premise' : 'Cloud'} ahead by{' '}
          <span className="figures text-foreground">
            {dollars(Math.abs(gap))}
          </span>
        </p>
      )}
    </div>
  )
}

function LeadTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const { year, lead } = payload[0].payload as { year: number; lead: number }
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-sm shadow-lg">
      <p className="font-medium">End of year {year}</p>
      <p className="flex items-center gap-2 text-muted-foreground">
        <SideDot side={lead >= 0 ? 'onPrem' : 'cloud'} />
        {lead >= 0 ? 'On-premise' : 'Cloud'} ahead by
        <span className="figures text-foreground">
          {dollars(Math.abs(lead))}
        </span>
      </p>
    </div>
  )
}

/** What each side has cost so far, year by year, with the point where on-premise pulls ahead. */
export function CumulativeChart({ data, breakevenYear }: CumulativeChartProps) {
  const points: Point[] = [
    { year: 0, onPrem: 0, cloud: 0 },
    ...data.map((y) => ({
      year: y.year,
      onPrem: y.cumulativeOnPrem,
      cloud: y.cumulativeCloud,
    })),
  ]
  const last = points.length - 1
  const lead = data.map((y) => ({
    year: y.year,
    lead: y.cumulativeCloud - y.cumulativeOnPrem,
  }))

  // Each line is named at its end, so the chart reads without the legend.
  const endLabel =
    (side: 'onPrem' | 'cloud', other: 'onPrem' | 'cloud') =>
    (props: { x?: number | string; y?: number | string; index?: number }) => {
      if (props.index !== last) return null
      const above = points[last][side] >= points[last][other]
      return (
        <text
          x={Number(props.x) + 10}
          y={Number(props.y) + (above ? -4 : 14)}
          className="fill-foreground text-xs"
        >
          <tspan className="font-medium">{SIDES[side].label}</tspan>
          <tspan
            x={Number(props.x) + 10}
            dy="1.2em"
            className="figures fill-muted-foreground"
          >
            {compactDollars(points[last][side])}
          </tspan>
        </text>
      )
    }

  return (
    <figure className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <SideDot side="onPrem" /> On-premise
        </span>
        <span className="flex items-center gap-1.5">
          <SideDot side="cloud" /> Cloud
        </span>
      </div>
      <ChartContainer config={config} className="aspect-auto h-72 w-full">
        <LineChart
          accessibilityLayer
          data={points}
          margin={{ top: 16, right: 96, bottom: 0, left: 0 }}
        >
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="year"
            type="number"
            domain={[0, last]}
            ticks={points.map((p) => p.year)}
            tickFormatter={(year: number) =>
              year === 0 ? 'Start' : `Y${year}`
            }
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
            tickMargin={8}
            className="figures"
          />
          <YAxis
            tickFormatter={compactDollars}
            tickLine={false}
            axisLine={false}
            width={64}
            className="figures"
          />
          <Tooltip
            content={<CumulativeTooltip />}
            cursor={{ stroke: 'var(--muted-foreground)', strokeOpacity: 0.4 }}
          />
          {breakevenYear !== null && breakevenYear > 0 && (
            <ReferenceLine
              x={breakevenYear}
              stroke="var(--muted-foreground)"
              strokeOpacity={0.5}
              label={{
                value: 'On-premise pulls ahead',
                position: 'insideTopLeft',
                className: 'fill-muted-foreground text-[11px]',
                offset: 8,
              }}
            />
          )}
          {(['cloud', 'onPrem'] as const).map((side) => (
            <Line
              key={side}
              dataKey={side}
              name={SIDES[side].label}
              type="linear"
              stroke={SIDES[side].color}
              strokeWidth={2}
              dot={{
                r: 3,
                strokeWidth: 2,
                stroke: 'var(--card)',
                fill: SIDES[side].color,
              }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: 'var(--card)' }}
              isAnimationActive={false}
            >
              <LabelList
                content={endLabel(side, side === 'onPrem' ? 'cloud' : 'onPrem')}
              />
            </Line>
          ))}
        </LineChart>
      </ChartContainer>

      {/* The lines can sit close together; the lead makes the gap and the crossing plain. */}
      <div className="border-t pt-4">
        <p className="text-sm font-medium">Who is ahead, and by how much</p>
        <p className="text-xs text-muted-foreground">
          Bars above the line: on-premise has cost less so far. Below: cloud
          has.
        </p>
        <ChartContainer
          config={config}
          className="mt-2 aspect-auto h-36 w-full"
        >
          <BarChart
            accessibilityLayer
            data={lead}
            margin={{ top: 8, right: 96, bottom: 0, left: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="year"
              tickFormatter={(year: number) => `Y${year}`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="figures"
            />
            <YAxis
              tickFormatter={compactDollars}
              tickLine={false}
              axisLine={false}
              width={64}
              className="figures"
            />
            <ReferenceLine
              y={0}
              stroke="var(--muted-foreground)"
              strokeOpacity={0.5}
            />
            <Tooltip
              content={<LeadTooltip />}
              cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
            />
            <Bar
              dataKey="lead"
              maxBarSize={36}
              isAnimationActive={false}
              shape={(shape: unknown) => {
                const props = shape as RectangleProps & { lead?: number }
                const ahead = (props.lead ?? 0) >= 0
                // Round the data end only: the top of a bar above zero, the bottom of one below.
                return (
                  <Rectangle
                    {...props}
                    fill={ahead ? SIDES.onPrem.color : SIDES.cloud.color}
                    radius={ahead ? [4, 4, 0, 0] : [0, 0, 4, 4]}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </figure>
  )
}
