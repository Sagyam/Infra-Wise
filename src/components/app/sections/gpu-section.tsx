'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'

interface GpuSectionProps {
  control: Control<CostFormValues>
}

export function GpuSection({ control }: GpuSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">GPU Resources</h2>
        <p className="text-sm text-muted-foreground">
          Configure GPU infrastructure for compute-intensive workloads.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise GPU</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              On-premise GPU configuration options will be available in a future update. This includes dedicated GPUs for AI/ML workloads, rendering, and other compute-intensive tasks.
            </p>
          </div>
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud GPU</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Cloud GPU configuration options will be available in a future update. This includes GPU instances for AI/ML, rendering, and compute-intensive workloads.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
