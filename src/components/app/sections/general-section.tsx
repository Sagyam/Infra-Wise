'use client'

import type { Control } from 'react-hook-form'
import { CalculationModeToggle } from '@/components/app/form/calculation-mode-toggle'
import { FormInput } from '@/components/app/form/form-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CostFormValues } from '@/lib/types'

interface GeneralSectionProps {
  control: Control<CostFormValues>
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
}

export function GeneralSection({
  control,
  onCalculationModeChange,
}: GeneralSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">General Settings</CardTitle>
        <CardDescription>
          Configure analysis parameters and calculation methodology.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CalculationModeToggle
          control={control}
          onCalculationModeChange={onCalculationModeChange}
        />

        <div className="grid max-w-md grid-cols-2 gap-4">
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
      </CardContent>
    </Card>
  )
}
