'use client'

import {CalculationModeToggle} from '@/components/app/form/calculation-mode-toggle'
import {FormInput} from '@/components/app/form/form-input'
import type {CostFormValues} from '@/lib/types'
import type {Control} from 'react-hook-form'

interface GeneralSectionProps {
  control: Control<CostFormValues>
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
}

export function GeneralSection({
  control,
  onCalculationModeChange,
}: GeneralSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">General Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure analysis parameters and calculation methodology.
        </p>
      </div>

      <div className="space-y-4">
        <CalculationModeToggle
          control={control}
          onCalculationModeChange={onCalculationModeChange}
        />

        <FormInput
          control={control}
          name="analysisPeriod"
          label="Analysis Period (Years)"
          tooltip="Number of years to project costs"
          type="number"
          step={1}
          min={1}
          max={20}
        />

        <FormInput
          control={control}
          name="inflationRate"
          label="Inflation Rate (%)"
          tooltip="Expected annual inflation rate for costs"
          type="number"
          step={0.1}
        />
      </div>
    </div>
  )
}
