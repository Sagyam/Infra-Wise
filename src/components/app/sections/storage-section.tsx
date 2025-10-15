'use client'

import { useId } from 'react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'
import { FormSlider } from '@/components/app/form/form-slider'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { TooltipLabel } from '@/components/app/form/tooltip-label'

interface StorageSectionProps {
  control: Control<CostFormValues>
  setValue: UseFormSetValue<CostFormValues>
  dataUnit: 'GB' | 'TB' | 'PB'
  handleHotChange: (value: number) => void
  handleStandardChange: (value: number) => void
  useOnPremBackup: boolean
  useOnPremReplication: boolean
}

export function StorageSection({
  control,
  dataUnit,
  handleHotChange,
  handleStandardChange,
  useOnPremBackup,
  useOnPremReplication,
}: StorageSectionProps) {
  const gbId = useId()
  const tbId = useId()
  const pbId = useId()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Storage Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Configure storage capacity, growth rates, and tiering for both on-premise and cloud infrastructure.
        </p>
      </div>

      <FormField
        control={control}
        name="dataUnit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data Unit</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="GB" id={gbId} />
                  <label htmlFor={gbId} className="cursor-pointer">
                    GB
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TB" id={tbId} />
                  <label htmlFor={tbId} className="cursor-pointer">
                    TB
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PB" id={pbId} />
                  <label htmlFor={pbId} className="cursor-pointer">
                    PB
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Storage</h3>

        <FormInput
          control={control}
          name="onPremTotalDrives"
          label="Total Drives"
          tooltip="Total number of storage drives in your on-premise system"
          type="number"
          step={1}
        />

        <FormInput
          control={control}
          name="onPremStoragePerDrive"
          label="Storage per Drive (TB)"
          tooltip="Capacity of each drive in terabytes"
          type="number"
          step={0.1}
        />

        <FormInput
          control={control}
          name="onPremRaidFactor"
          label="RAID Overhead (%)"
          tooltip="Percentage of storage lost to RAID parity/redundancy (e.g., RAID 6 ≈ 20-30%)"
          type="number"
          step={1}
          min={0}
          max={100}
        />

        <FormInput
          control={control}
          name="onPremDriveFailureRate"
          label="Drive Failure Rate (%)"
          tooltip="Annual percentage of drives that fail and need replacement"
          type="number"
          step={0.1}
        />

        <FormInput
          control={control}
          name="onPremDriveReplacementCost"
          label="Drive Replacement Cost ($)"
          tooltip="Cost to replace a single failed drive"
          type="number"
          step={1}
        />

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

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Storage</h3>

        <FormInput
          control={control}
          name="cloudStorageSize"
          label={`Storage Size (${dataUnit})`}
          tooltip="Initial cloud storage capacity"
          type="number"
          step={1}
        />

        <FormInput
          control={control}
          name="cloudGrowthRate"
          label="Growth Rate (%)"
          tooltip="Annual storage growth percentage"
          type="number"
          step={1}
        />

        <div className="space-y-4 pt-2">
          <TooltipLabel
            label="Storage Tiers"
            tooltip="Distribute your storage across different pricing tiers based on access patterns"
          />

          <FormSlider
            control={control}
            name="cloudHotTier"
            label="Hot Tier (%)"
            tooltip="Frequently accessed data (e.g., S3 Standard)"
            min={0}
            max={100}
            step={1}
            onChange={handleHotChange}
          />

          <FormSlider
            control={control}
            name="cloudStandardTier"
            label="Standard Tier (%)"
            tooltip="Infrequently accessed data (e.g., S3 Standard-IA)"
            min={0}
            max={100}
            step={1}
            onChange={handleStandardChange}
          />

          <FormSlider
            control={control}
            name="cloudArchiveTier"
            label="Archive Tier (%)"
            tooltip="Rarely accessed data (e.g., S3 Glacier)"
            min={0}
            max={100}
            step={1}
            disabled
          />
        </div>

        <div className="space-y-4">
          <FormInput
            control={control}
            name="cloudHotStorageCost"
            label="Hot Storage Cost ($/GB/month)"
            tooltip="Cost per GB per month for hot tier storage"
            type="number"
            step={0.001}
          />

          <FormInput
            control={control}
            name="cloudStandardStorageCost"
            label="Standard Storage Cost ($/GB/month)"
            tooltip="Cost per GB per month for standard tier storage"
            type="number"
            step={0.001}
          />

          <FormInput
            control={control}
            name="cloudArchiveStorageCost"
            label="Archive Storage Cost ($/GB/month)"
            tooltip="Cost per GB per month for archive tier storage"
            type="number"
            step={0.001}
          />
        </div>
        </div>
      </div>
    </div>
  )
}
