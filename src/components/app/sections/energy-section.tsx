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
        <h3 className="text-lg font-semibold">Power Consumption</h3>

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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">UPS (Uninterruptible Power Supply)</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            UPS configuration will be available in a future update. This includes battery backup systems, power redundancy, and UPS maintenance costs.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Generators</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Generator configuration will be available in a future update. This includes backup generators, fuel costs, and maintenance expenses.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">HVAC (Heating, Ventilation, Air Conditioning)</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            HVAC configuration will be available in a future update. This includes cooling capacity, BTU requirements, and HVAC system efficiency ratings.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">HVAC Electricity Consumption</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            HVAC electricity consumption tracking will be available in a future update. This includes PUE (Power Usage Effectiveness) calculations and cooling power costs.
          </p>
        </div>
      </div>
    </div>
  )
}
