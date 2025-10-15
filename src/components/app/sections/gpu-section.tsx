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

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            GPU configuration options will be available in a future update. This section is reserved for GPU-specific costs including dedicated GPUs for AI/ML workloads, rendering, and other compute-intensive tasks.
          </p>
        </div>
      </div>
    </div>
  )
}
