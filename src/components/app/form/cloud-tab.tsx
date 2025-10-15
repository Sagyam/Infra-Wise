import {
  ArrowRightLeft,
  Container,
  DollarSign,
  Percent,
  TrendingUp,
} from 'lucide-react'
import { TabsContent } from '@/components/ui/tabs'
import type { CostFormValues } from '@/lib/types'
import type { Control } from 'react-hook-form'
import { FormInput } from './form-input'
import { FormSlider } from './form-slider'

interface CloudTabProps {
  control: Control<CostFormValues>
  dataUnit: string
  handleHotChange: (value: number) => void
  handleStandardChange: (value: number) => void
}

export function CloudTab({
  control,
  dataUnit,
  handleHotChange,
  handleStandardChange,
}: CloudTabProps) {
  return (
    <TabsContent value="cloud" className="mt-0 space-y-6">
      <p className="text-sm font-medium">Storage</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormInput
          control={control}
          name="cloudStorageSize"
          label="Initial Storage Size"
          icon={<Container />}
          unit={dataUnit}
          tooltip="The starting amount of data you will store in the cloud."
        />
        <FormSlider
          control={control}
          name="cloudGrowthRate"
          label="Annual Data Growth Rate"
          icon={<TrendingUp />}
          unit="%"
          tooltip="The percentage by which your stored data is expected to grow each year."
        />
      </div>

      <p className="text-sm font-medium">Bandwidth</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormInput
          control={control}
          name="cloudEgress"
          label="Monthly Data Egress"
          icon={<ArrowRightLeft />}
          unit="TB"
          tooltip="The amount of data transferred out of the cloud each month."
        />
        <FormSlider
          control={control}
          name="cloudEgressGrowthRate"
          label="Annual Egress Growth"
          icon={<TrendingUp />}
          unit="%"
          tooltip="The percentage by which your egress traffic is expected to grow each year."
        />
      </div>

      <p className="text-sm font-medium">Cloud Pricing</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormInput
          control={control}
          name="cloudHotStorageCost"
          label="Hot Storage Price"
          icon={<DollarSign />}
          unit="$/GB/mo"
          tooltip="Price for frequently accessed data. Typically the most expensive tier."
          step="0.001"
        />
        <FormInput
          control={control}
          name="cloudStandardStorageCost"
          label="Standard Storage Price"
          icon={<DollarSign />}
          unit="$/GB/mo"
          tooltip="Price for less frequently accessed data with slightly lower retrieval times."
          step="0.001"
        />
        <FormInput
          control={control}
          name="cloudArchiveStorageCost"
          label="Archive Storage Price"
          icon={<DollarSign />}
          unit="$/GB/mo"
          tooltip="Price for long-term data archival with the slowest retrieval times. Typically the cheapest tier."
          step="0.0001"
        />
        <FormInput
          control={control}
          name="cloudEgressCostPerUnit"
          label="Egress Price"
          icon={<DollarSign />}
          unit="$/GB"
          tooltip="Price to transfer one GB of data out of the cloud provider's network."
          step="0.01"
        />
      </div>

      <p className="text-sm font-medium">Storage Tier Split</p>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        <FormSlider
          control={control}
          name="cloudHotTier"
          label="Hot Tier Split"
          icon={<Percent />}
          unit="%"
          tooltip="Percentage of your data in the high-performance 'Hot' tier, for frequently accessed data."
          onValueChange={handleHotChange}
        />
        <FormSlider
          control={control}
          name="cloudStandardTier"
          label="Standard Tier Split"
          icon={<Percent />}
          unit="%"
          tooltip="Percentage of your data in the 'Standard' tier, for regularly accessed data."
          onValueChange={handleStandardChange}
        />
        <FormSlider
          control={control}
          name="cloudArchiveTier"
          label="Archive Tier Split"
          icon={<Percent />}
          unit="%"
          tooltip="Percentage of your data in the 'Archive' tier, for long-term backups. (This is calculated automatically)."
          disabled
        />
      </div>
    </TabsContent>
  )
}
