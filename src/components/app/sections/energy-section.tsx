'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'

interface EnergySectionProps {
  control: Control<CostFormValues>
}

export function EnergySection({ control }: EnergySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Energy Costs</h2>
        <p className="text-sm text-muted-foreground">
          Configure power consumption and electricity costs for on-premise infrastructure.
        </p>
      </div>

      <div className="space-y-4">
        <FormInput
          control={control}
          name="onPremPowerRating"
          label="Power Rating (Watts)"
          tooltip="Total power rating of your on-premise infrastructure in watts"
          type="number"
          step={1}
        />

        <FormInput
          control={control}
          name="onPremLoadFactor"
          label="Load Factor (%)"
          tooltip="Average percentage of maximum power draw (typically 50-80%)"
          type="number"
          step={1}
          min={0}
          max={100}
        />

        <FormInput
          control={control}
          name="onPremElectricityCost"
          label="Electricity Cost ($/kWh)"
          tooltip="Cost per kilowatt-hour of electricity"
          type="number"
          step={0.01}
        />
      </div>
    </div>
  )
}
