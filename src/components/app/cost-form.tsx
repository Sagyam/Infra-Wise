'use client'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription as CardDesc, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card'
import {Form} from '@/components/ui/form'
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {calculateCosts} from '@/lib/actions'
import {type CalculationResult, CostFormSchema, type CostFormValues,} from '@/lib/types'
import {zodResolver} from '@hookform/resolvers/zod'
import React from 'react'
import {useForm, useWatch} from 'react-hook-form'
import {CloudTab} from './form/cloud-tab'
import {GeneralTab} from './form/general-tab'
import {OnPremTab} from './form/on-prem-tab'

interface CostFormProps {
  onCalculate: (data: CalculationResult | null, error: string | null) => void
  onLoading: () => void
  isLoading: boolean
  calculationMode: CostFormValues['calculationMode']
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
}

const defaultValues: CostFormValues = {
  analysisPeriod: 5,
  dataUnit: 'TB',

  // On-prem
  onPremHardwareCost: 25000,
  onPremSalvageValue: 10,
  onPremYearlyLicensingCost: 4000,
  onPremPowerRating: 600,
  onPremLoadFactor: 65,
  onPremElectricityCost: 0.14,
  onPremDriveFailureRate: 2,
  onPremDriveReplacementCost: 250,
  onPremTotalDrives: 24,
  onPremStoragePerDrive: 8, // in TB
  onPremRaidFactor: 20,
  useOnPremSoftware: true,
  useOnPremBandwidth: true,
  onPremBandwidthUsage: 5000,
  onPremBandwidthCostPerGb: 0.02,
  onPremAnnualTrafficGrowth: 15,
  useOnPremCdn: false,
  onPremCdnUsage: 0,
  onPremCdnCostPerGb: 0.04,
  useOnPremBackup: true,
  onPremBackupStorage: 153.6, // auto-calculated
  onPremBackupCostPerUnit: 15, // $/TB/year for an offsite service or tapes
  useOnPremReplication: false,
  onPremReplicationFactor: 0,

  // Cloud (based on a blend of major providers)
  cloudStorageSize: 150, // TB
  cloudGrowthRate: 20, // %
  cloudEgress: 2, // TB
  cloudEgressGrowthRate: 15, // %
  cloudHotTier: 60,
  cloudStandardTier: 30,
  cloudArchiveTier: 10,
  cloudHotStorageCost: 0.021, // $/GB/mo (e.g., S3 Standard)
  cloudStandardStorageCost: 0.0125, // $/GB/mo (e.g., S3 Standard-IA)
  cloudArchiveStorageCost: 0.0036, // $/GB/mo (e.g., S3 Glacier Flexible Retrieval)
  cloudEgressCostPerUnit: 0.09, // $/GB

  // General
  inflationRate: 3.0,
  calculationMode: 'tco',
}

export function CostForm({
  onCalculate,
  onLoading,
  isLoading,
  calculationMode,
  onCalculationModeChange,
}: CostFormProps) {
  const form = useForm<CostFormValues>({
    resolver: zodResolver(CostFormSchema),
    defaultValues,
  })

  React.useEffect(() => {
    form.setValue('calculationMode', calculationMode)
  }, [calculationMode, form])

  const onSubmit = async (values: CostFormValues) => {
    onLoading()
    const result = await calculateCosts(values)
    if (result.success) {
      onCalculate(result.data, null)
    } else {
      onCalculate(null, result.error)
    }
  }

  const dataUnit = useWatch({ control: form.control, name: 'dataUnit' })
  const onPremStoragePerDrive = useWatch({
    control: form.control,
    name: 'onPremStoragePerDrive',
  })
  const onPremTotalDrives = useWatch({
    control: form.control,
    name: 'onPremTotalDrives',
  })
  const onPremRaidFactor = useWatch({
    control: form.control,
    name: 'onPremRaidFactor',
  })

  React.useEffect(() => {
     // always TB
    const totalRawSize = onPremStoragePerDrive * onPremTotalDrives
    const raidOverhead = totalRawSize * (onPremRaidFactor / 100)
    const usableSize = totalRawSize - raidOverhead

    const conversionFactor = { GB: 1024, TB: 1, PB: 1 / 1024 }[dataUnit] || 1
    const usableSizeInDataUnit = usableSize * conversionFactor

    form.setValue('onPremBackupStorage', Math.max(0, usableSizeInDataUnit))
  }, [
    onPremStoragePerDrive,
    onPremTotalDrives,
    onPremRaidFactor,
    dataUnit,
    form,
  ])

  const cloudHotTier = useWatch({
    control: form.control,
    name: 'cloudHotTier',
  })
  const cloudStandardTier = useWatch({
    control: form.control,
    name: 'cloudStandardTier',
  })

  const handleHotChange = (value: number) => {
    const archiveTier = 100 - value - cloudStandardTier
    if (archiveTier >= 0) {
      form.setValue('cloudHotTier', value)
      form.setValue('cloudArchiveTier', archiveTier)
    }
  }

  const handleStandardChange = (value: number) => {
    const archiveTier = 100 - cloudHotTier - value
    if (archiveTier >= 0) {
      form.setValue('cloudStandardTier', value)
      form.setValue('cloudArchiveTier', archiveTier)
    }
  }

  const useOnPremSoftware = useWatch({
    control: form.control,
    name: 'useOnPremSoftware',
  })
  const useOnPremBandwidth = useWatch({
    control: form.control,
    name: 'useOnPremBandwidth',
  })
  const useOnPremCdn = useWatch({
    control: form.control,
    name: 'useOnPremCdn',
  })
  const useOnPremBackup = useWatch({
    control: form.control,
    name: 'useOnPremBackup',
  })
  const useOnPremReplication = useWatch({
    control: form.control,
    name: 'useOnPremReplication',
  })

  return (
    <Card className="h-full flex flex-col max-h-[calc(100vh-10rem)]">
      <CardHeader>
        <CardTitle className="font-headline">Cost Modeling Inputs</CardTitle>
        <CardDesc>Provide the parameters for your TCO analysis.</CardDesc>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <Tabs
            defaultValue="general"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="onprem">On-Premise</TabsTrigger>
                <TabsTrigger value="cloud">Cloud</TabsTrigger>
              </TabsList>
            </div>
            <CardContent className="flex-1 overflow-y-auto pt-6">
              <div className="space-y-6">
                <GeneralTab
                  control={form.control}
                  onCalculationModeChange={onCalculationModeChange}
                />
                <OnPremTab
                  control={form.control}
                  setValue={form.setValue}
                  dataUnit={dataUnit}
                  useOnPremSoftware={useOnPremSoftware}
                  useOnPremBandwidth={useOnPremBandwidth}
                  useOnPremCdn={useOnPremCdn}
                  useOnPremBackup={useOnPremBackup}
                  useOnPremReplication={useOnPremReplication}
                />
                <CloudTab
                  control={form.control}
                  dataUnit={dataUnit}
                  handleHotChange={handleHotChange}
                  handleStandardChange={handleStandardChange}
                />
              </div>
            </CardContent>
          </Tabs>
          <CardFooter className="pt-6 border-t">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Calculating...' : 'Calculate'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
