'use client'

import {CalculationModeToggle} from '@/components/app/form/calculation-mode-toggle'
import {FormInput} from '@/components/app/form/form-input'
import type {CostFormValues} from '@/lib/types'
import type {Control} from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
        <CardTitle className="font-headline">General Settings</CardTitle>
        <CardDescription>
          Configure analysis parameters and calculation methodology.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  )
}
