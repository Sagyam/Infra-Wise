'use client'

import type { Control, UseFormSetValue } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'
import { FormSlider } from '@/components/app/form/form-slider'
import { FormSwitch } from '@/components/app/form/form-switch'
import { TooltipLabel } from '@/components/app/form/tooltip-label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWatch } from 'react-hook-form'

interface StorageSectionProps {
  control: Control<CostFormValues>
  setValue: UseFormSetValue<CostFormValues>
  handleHotChange: (value: number) => void
  handleStandardChange: (value: number) => void
  useOnPremBackup: boolean
  useOnPremReplication: boolean
}

export function StorageSection({
  control,
  handleHotChange,
  handleStandardChange,
  useOnPremBackup,
  useOnPremReplication,
}: StorageSectionProps) {
  const useOnPremHdd = useWatch({ control, name: 'useOnPremHdd' })
  const useOnPremSsd = useWatch({ control, name: 'useOnPremSsd' })
  const cloudHotTier = useWatch({ control, name: 'cloudHotTier' })
  const cloudStandardTier = useWatch({ control, name: 'cloudStandardTier' })

  // Calculate dynamic max values to ensure tiers always sum to 100%
  const maxHotTier = 100 - (cloudStandardTier || 0)
  const maxStandardTier = 100 - (cloudHotTier || 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Storage Configuration</CardTitle>
        <CardDescription>
          Configure storage capacity, growth rates, and tiering for both on-premise and cloud infrastructure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Storage</h3>

          {/* HDD Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">HDD Configuration</h4>
              <FormSwitch
                control={control}
                name="useOnPremHdd"
                label=""
              />
            </div>
            {useOnPremHdd && (
              <>
                <FormInput
                  control={control}
                  name="onPremHddCount"
                  label="Number of HDDs"
                  tooltip="Total number of hard disk drives"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremHddSizeTb"
                  label="Size per HDD (TB)"
                  tooltip="Capacity of each HDD in terabytes"
                  type="number"
                  step={0.1}
                />
                <FormInput
                  control={control}
                  name="onPremHddRaidFactor"
                  label="RAID Overhead (%)"
                  tooltip="Percentage of storage lost to RAID parity/redundancy (e.g., RAID 6 ≈ 20-30%)"
                  type="number"
                  step={1}
                  min={0}
                  max={50}
                />
                <FormInput
                  control={control}
                  name="onPremHddFailureRate"
                  label="Failure Rate (%)"
                  tooltip="Annual percentage of HDDs that fail and need replacement"
                  type="number"
                  step={0.1}
                />
                <FormInput
                  control={control}
                  name="onPremHddUnitCost"
                  label="Unit Cost ($)"
                  tooltip="Cost per HDD (includes initial purchase and replacement cost)"
                  type="number"
                  step={1}
                />
              </>
            )}
          </div>

          {/* SSD Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">SSD Configuration</h4>
              <FormSwitch
                control={control}
                name="useOnPremSsd"
                label=""
              />
            </div>
            {useOnPremSsd && (
              <>
                <FormInput
                  control={control}
                  name="onPremSsdCount"
                  label="Number of SSDs"
                  tooltip="Total number of solid state drives"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremSsdSizeTb"
                  label="Size per SSD (TB)"
                  tooltip="Capacity of each SSD in terabytes"
                  type="number"
                  step={0.1}
                />
                <FormInput
                  control={control}
                  name="onPremSsdRaidFactor"
                  label="RAID Overhead (%)"
                  tooltip="Percentage of storage lost to RAID parity/redundancy"
                  type="number"
                  step={1}
                  min={0}
                  max={50}
                />
                <FormInput
                  control={control}
                  name="onPremSsdFailureRate"
                  label="Failure Rate (%)"
                  tooltip="Annual percentage of SSDs that fail and need replacement"
                  type="number"
                  step={0.1}
                />
                <FormInput
                  control={control}
                  name="onPremSsdUnitCost"
                  label="Unit Cost ($)"
                  tooltip="Cost per SSD (includes initial purchase and replacement cost)"
                  type="number"
                  step={1}
                />
              </>
            )}
          </div>

          {/* Backup Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Backup Configuration</h4>
              <FormSwitch
                control={control}
                name="useOnPremBackup"
                label=""
              />
            </div>
            {useOnPremBackup && (
              <>
                <FormInput
                  control={control}
                  name="onPremBackupStorage"
                  label="Backup Storage (TB)"
                  tooltip="Amount of backup storage required in terabytes"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremBackupCostPerUnit"
                  label="Backup Cost ($/TB/year)"
                  tooltip="Annual cost per terabyte of backup storage"
                  type="number"
                  step={1}
                />
              </>
            )}
          </div>

          {/* Replication Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Replication Configuration</h4>
              <FormSwitch
                control={control}
                name="useOnPremReplication"
                label=""
              />
            </div>
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

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Storage</h3>

        <FormInput
          control={control}
          name="cloudStorageSize"
          label="Storage Size (TB)"
          tooltip="Initial cloud storage capacity in terabytes"
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
            max={maxHotTier}
            step={1}
            onChange={handleHotChange}
          />

          <FormSlider
            control={control}
            name="cloudStandardTier"
            label="Standard Tier (%)"
            tooltip="Infrequently accessed data (e.g., S3 Standard-IA)"
            min={0}
            max={maxStandardTier}
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
      </CardContent>
    </Card>
  )
}
