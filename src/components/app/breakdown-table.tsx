'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { YearlyCost } from '@/lib/types'
import { CloudBreakdown } from './breakdown/cloud-breakdown'
import { OnPremBreakdown } from './breakdown/on-prem-breakdown'

interface BreakdownTableProps {
  data: YearlyCost[]
}

export function BreakdownTable({ data }: BreakdownTableProps) {
  const [activeTab, setActiveTab] = useState('onprem')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="relative grid w-full grid-cols-2 p-1 font-semibold">
        <div
          className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] bg-primary rounded-md transition-all duration-300"
          style={{
            transform: `translateX(${activeTab === 'cloud' ? '100%' : '0%'})`,
          }}
        />
        <TabsTrigger
          value="onprem"
          className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent"
        >
          On-Premise
        </TabsTrigger>
        <TabsTrigger
          value="cloud"
          className="relative z-10 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent"
        >
          Cloud
        </TabsTrigger>
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
