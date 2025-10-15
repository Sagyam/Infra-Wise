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

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Human cost configuration will be available in a future update. This section is reserved for operational personnel costs including system administrators, network engineers, and other staff required to maintain on-premise infrastructure.
          </p>
        </div>
      </div>
    </div>
  )
}
