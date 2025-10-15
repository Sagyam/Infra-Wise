'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'
import { CalculationModeToggle } from '@/components/app/form/calculation-mode-toggle'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { TooltipLabel } from '@/components/app/form/tooltip-label'

interface GeneralSectionProps {
  control: Control<CostFormValues>
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
  useOnPremBackup: boolean
  useOnPremReplication: boolean
  dataUnit: 'GB' | 'TB' | 'PB'
}

export function GeneralSection({
  control,
  onCalculationModeChange,
  useOnPremBackup,
  useOnPremReplication,
  dataUnit,
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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Options</h3>

        <FormField
          control={control}
          name="useOnPremBackup"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Include Backup Costs"
                  tooltip="Toggle to include backup storage costs"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremBackup && (
          <>
            <FormInput
              control={control}
              name="onPremBackupStorage"
              label={`Backup Storage (${dataUnit})`}
              tooltip="Amount of backup storage required"
              type="number"
              step={1}
            />

            <FormInput
              control={control}
              name="onPremBackupCostPerUnit"
              label={`Backup Cost ($/${dataUnit}/year)`}
              tooltip="Annual cost per unit of backup storage"
              type="number"
              step={1}
            />
          </>
        )}

        <FormField
          control={control}
          name="useOnPremReplication"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Include Replication"
                  tooltip="Toggle to include costs for redundant sites"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremReplication && (
          <FormInput
            control={control}
            name="onPremReplicationFactor"
            label="Replication Factor"
            tooltip="Number of additional sites (0 = no replication, 1 = one additional site, etc.)"
            type="number"
            step={1}
            min={0}
          />
        )}
      </div>
    </div>
  )
}
