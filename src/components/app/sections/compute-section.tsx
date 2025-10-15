'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'

interface ComputeSectionProps {
  control: Control<CostFormValues>
}

export function ComputeSection({ control }: ComputeSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Compute Resources</h2>
        <p className="text-sm text-muted-foreground">
          Configure CPU and hardware costs for your infrastructure.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">On-Premise Hardware</h3>

        <FormInput
          control={control}
          name="onPremHardwareCost"
          label="Hardware Cost ($)"
          tooltip="Initial hardware acquisition cost (servers, storage, networking)"
          type="number"
          step={100}
        />

        <FormInput
          control={control}
          name="onPremSalvageValue"
          label="Salvage Value (%)"
          tooltip="Percentage of hardware value recoverable at end of analysis period"
          type="number"
          step={1}
          min={0}
          max={100}
        />

        <FormInput
          control={control}
          name="onPremYearlyLicensingCost"
          label="Yearly Licensing Cost ($)"
          tooltip="Annual software/OS licensing fees"
          type="number"
          step={100}
        />
      </div>
    </div>
  )
}
