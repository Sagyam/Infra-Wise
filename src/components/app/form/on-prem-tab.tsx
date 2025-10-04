'use client'

import {
  Copy,
  DollarSign,
  Factory,
  FileText,
  Globe,
  HardDrive,
  Network,
  Percent,
  Power,
  Receipt,
  Replace,
  Save,
  Server,
  TestTube2,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { TabsContent } from '@/components/ui/tabs'
import type { CostFormValues } from '@/lib/types'
import type { Control, UseFormSetValue } from 'react-hook-form'
import { FormInput } from './form-input'
import { FormSlider } from './form-slider'

interface OnPremTabProps {
  control: Control<CostFormValues>
  setValue: UseFormSetValue<CostFormValues>
  dataUnit: string
  useOnPremSoftware: boolean
  useOnPremBandwidth: boolean
  useOnPremCdn: boolean
  useOnPremBackup: boolean
  useOnPremReplication: boolean
}

export function OnPremTab({
  control,
  setValue,
  dataUnit,
  useOnPremSoftware,
  useOnPremBandwidth,
  useOnPremCdn,
  useOnPremBackup,
  useOnPremReplication,
}: OnPremTabProps) {
  return (
    <TabsContent value="onprem" className="mt-0 space-y-6">
      <p className="text-sm font-medium">Hardware</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormInput
          control={control}
          name="onPremHardwareCost"
          label="Upfront Hardware Cost"
          icon={<Server />}
          unit="$"
          tooltip="Initial capital expenditure for all on-premise hardware (servers, racks, networking)."
        />
        <FormSlider
          control={control}
          name="onPremSalvageValue"
          label="Salvage Value"
          icon={<Receipt />}
          unit="%"
          tooltip="The residual value of the hardware at the end of the analysis period, as a percentage of the initial cost."
        />
        <FormInput
          control={control}
          name="onPremStoragePerDrive"
          label="Storage per Drive"
          icon={<HardDrive />}
          unit="TB"
          tooltip="Capacity of a single drive in your on-premise setup (in Terabytes)."
        />
        <FormInput
          control={control}
          name="onPremTotalDrives"
          label="Number of Drives"
          icon={<Factory />}
          unit="drives"
          tooltip="Total number of physical drives in your on-premise setup."
        />
        <FormSlider
          control={control}
          name="onPremRaidFactor"
          label="RAID Capacity Loss"
          icon={<Percent />}
          unit="%"
          tooltip="The percentage of total storage capacity lost to RAID overhead for redundancy."
          max={50}
        />
        <FormSlider
          control={control}
          name="onPremDriveFailureRate"
          label="Annual Drive Failure Rate"
          icon={<TestTube2 />}
          unit="%"
          tooltip="The percentage of drives expected to fail and need replacement each year."
        />
        <FormInput
          control={control}
          name="onPremDriveReplacementCost"
          label="Cost per Replacement Drive"
          icon={<Replace />}
          unit="$"
          tooltip="The cost to purchase a single replacement drive."
        />
      </div>

      <p className="text-sm font-medium">Power</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormInput
          control={control}
          name="onPremPowerRating"
          label="Power Rating per Server"
          icon={<Power />}
          unit="Watts"
          tooltip="The power consumption of a single server under load."
        />
        <FormSlider
          control={control}
          name="onPremLoadFactor"
          label="Avg. Load Factor"
          icon={<Percent />}
          unit="%"
          tooltip="The average utilization percentage of your servers."
        />
        <FormInput
          control={control}
          name="onPremElectricityCost"
          label="Electricity Cost"
          icon={<Zap />}
          unit="$/kWh"
          tooltip="The cost of electricity from your utility provider."
          step="0.01"
        />
      </div>

      <p className="text-sm font-medium">Software</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormField
          control={control}
          name="useOnPremSoftware"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Include Software Costs</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {useOnPremSoftware && (
          <FormInput
            control={control}
            name="onPremYearlyLicensingCost"
            label="Yearly Licensing Cost"
            icon={<FileText />}
            unit="$/year"
            tooltip="Annual recurring cost for software licenses (e.g., operating systems, databases, virtualization)."
          />
        )}
      </div>

      <p className="text-sm font-medium">Bandwidth</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormField
          control={control}
          name="useOnPremBandwidth"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Include Bandwidth Costs</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {useOnPremBandwidth && (
          <>
            <FormInput
              control={control}
              name="onPremBandwidthUsage"
              label="Annual Bandwidth Usage"
              icon={<Network />}
              unit="GB/year"
              tooltip="Estimated total data transferred out from your data center annually."
            />
            <FormInput
              control={control}
              name="onPremBandwidthCostPerGb"
              label="Bandwidth Cost per GB"
              icon={<DollarSign />}
              unit="$/GB"
              tooltip="The price per GB of data transferred."
              step="0.001"
            />
            <FormSlider
              control={control}
              name="onPremAnnualTrafficGrowth"
              label="Annual Traffic Growth"
              icon={<TrendingUp />}
              unit="%"
              tooltip="The percentage by which your egress traffic is expected to grow each year."
            />
          </>
        )}
      </div>

      <p className="text-sm font-medium">Content Delivery Network (CDN)</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormField
          control={control}
          name="useOnPremCdn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Use External CDN</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {useOnPremCdn && (
          <>
            <FormInput
              control={control}
              name="onPremCdnUsage"
              label="Annual CDN Usage"
              icon={<Globe />}
              unit="GB/year"
              tooltip="Estimated total data transferred via your Content Delivery Network annually."
            />
            <FormInput
              control={control}
              name="onPremCdnCostPerGb"
              label="CDN Cost per GB"
              icon={<DollarSign />}
              unit="$/GB"
              tooltip="The price per GB of data transferred through the CDN."
              step="0.01"
            />
          </>
        )}
      </div>

      <p className="text-sm font-medium">Backup</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormField
          control={control}
          name="useOnPremBackup"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Off site Backup</FormLabel>
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
              label="Data to Backup"
              icon={<Save />}
              unit={dataUnit}
              tooltip="Total amount of data to be backed up. Auto-calculated from drive specs but can be overridden."
            />
            <FormInput
              control={control}
              name="onPremBackupCostPerUnit"
              label="Backup Cost per Unit"
              icon={<DollarSign />}
              unit={`$/${dataUnit}/year`}
              tooltip="The cost to store one unit of backup data for a year."
              step="0.01"
            />
          </>
        )}
      </div>

      <p className="text-sm font-medium">Replication</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormField
          control={control}
          name="useOnPremReplication"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Number of Replication Sites</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    if (!checked) {
                      setValue('onPremReplicationFactor', 0)
                    } else {
                      setValue('onPremReplicationFactor', 1)
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {useOnPremReplication && (
          <div className="pt-4">
            <FormSlider
              control={control}
              name="onPremReplicationFactor"
              label="Replication Sites"
              icon={<Copy />}
              unit="sites"
              tooltip="The number of additional, fully replicated on-premise sites for disaster recovery."
              min={1}
              max={10}
              step={1}
            />
          </div>
        )}
      </div>
    </TabsContent>
  )
}
