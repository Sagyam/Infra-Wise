'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { YearlyCost } from '@/lib/types'
import { CloudBreakdown } from './breakdown/cloud-breakdown'
import { OnPremBreakdown } from './breakdown/on-prem-breakdown'

interface BreakdownTableProps {
  data: YearlyCost[]
}

export function BreakdownTable({ data }: BreakdownTableProps) {

  return (
    <Tabs defaultValue="onprem">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="onprem">On-Premise</TabsTrigger>
        <TabsTrigger value="cloud">Cloud</TabsTrigger>
      </TabsList>
      <TabsContent value="onprem" className="pt-4">
        <OnPremBreakdown data={data} />
      </TabsContent>
      <TabsContent value="cloud" className="pt-4">
        <CloudBreakdown data={data} />
      </TabsContent>
    </Tabs>
  )
}
