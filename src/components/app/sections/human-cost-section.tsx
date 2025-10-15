'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'

interface HumanCostSectionProps {
  control: Control<CostFormValues>
}

export function HumanCostSection({ control }: HumanCostSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Human Costs</h2>
        <p className="text-sm text-muted-foreground">
          Configure personnel and operational overhead costs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Personnel</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              On-premise human cost configuration will be available in a future update. This includes operational personnel costs such as system administrators, network engineers, and other staff required to maintain infrastructure.
            </p>
          </div>
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Personnel</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Cloud human cost configuration will be available in a future update. This includes cloud operations personnel, DevOps engineers, and cloud architects required to manage cloud infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
