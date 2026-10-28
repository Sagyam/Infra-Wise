'use client'

import { SideDot } from '@/components/app/results/format'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { YearlyCost } from '@/lib/types'
import { SideBreakdown } from './breakdown/side-breakdown'

interface BreakdownTableProps {
  data: YearlyCost[]
}

export function BreakdownTable({ data }: BreakdownTableProps) {
  return (
    <Tabs defaultValue="onprem">
      <TabsList>
        <TabsTrigger value="onprem" className="gap-2">
          <SideDot side="onPrem" />
          On-premise
        </TabsTrigger>
        <TabsTrigger value="cloud" className="gap-2">
          <SideDot side="cloud" />
          Cloud
        </TabsTrigger>
      </TabsList>
      <TabsContent value="onprem" className="pt-4">
        <SideBreakdown data={data} side="onPrem" />
      </TabsContent>
      <TabsContent value="cloud" className="pt-4">
        <SideBreakdown data={data} side="cloud" />
      </TabsContent>
    </Tabs>
  )
}
