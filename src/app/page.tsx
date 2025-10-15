'use client'

import {AppSidebar} from '@/components/app/app-sidebar'
import {Header} from '@/components/app/header'
import {ResultsDisplay} from '@/components/app/results-display'
import {ComputeSection} from '@/components/app/sections/compute-section'
import {EnergySection} from '@/components/app/sections/energy-section'
import {GeneralSection} from '@/components/app/sections/general-section'
import {GpuSection} from '@/components/app/sections/gpu-section'
import {HumanCostSection} from '@/components/app/sections/human-cost-section'
import {NetworkingSection} from '@/components/app/sections/networking-section'
import {SoftwareSection} from '@/components/app/sections/software-section'
import {StorageSection} from '@/components/app/sections/storage-section'
import {Button} from '@/components/ui/button'
import {Form} from '@/components/ui/form'
import {SidebarInset, SidebarProvider, SidebarTrigger,} from '@/components/ui/sidebar'
import {calculateCosts} from '@/lib/actions'
import {type CalculationResult, CostFormSchema, type CostFormValues,} from '@/lib/types'
import {zodResolver} from '@hookform/resolvers/zod'
import {Github} from 'lucide-react'
import React, {useState} from 'react'
import {useForm, useWatch} from 'react-hook-form'

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
  onPremStoragePerDrive: 8,
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
  onPremBackupStorage: 153.6,
  onPremBackupCostPerUnit: 15,
  useOnPremReplication: false,
  onPremReplicationFactor: 0,

  // Cloud
  cloudStorageSize: 150,
  cloudGrowthRate: 20,
  cloudEgress: 2,
  cloudEgressGrowthRate: 15,
  cloudHotTier: 60,
  cloudStandardTier: 30,
  cloudArchiveTier: 10,
  cloudHotStorageCost: 0.021,
  cloudStandardStorageCost: 0.0125,
  cloudArchiveStorageCost: 0.0036,
  cloudEgressCostPerUnit: 0.09,

  // General
  inflationRate: 3.0,
  calculationMode: 'tco',
}

export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [calculationMode, setCalculationMode] =
    useState<CostFormValues['calculationMode']>('tco')
  const [activeSection, setActiveSection] = useState('general')

  const form = useForm<CostFormValues>({
    resolver: zodResolver(CostFormSchema),
    defaultValues,
  })

  React.useEffect(() => {
    form.setValue('calculationMode', calculationMode)
  }, [calculationMode, form])

  // Calculate with default values on mount
  React.useEffect(() => {
    const calculateDefaultResults = async () => {
      const result = await calculateCosts(defaultValues)
      if (result.success) {
        setResults(result.data)
      }
    }
    calculateDefaultResults()
  }, [])

  const onSubmit = async (values: CostFormValues) => {
    setIsLoading(true)
    setError(null)
    const result = await calculateCosts(values)
    if (result.success) {
      setResults(result.data)
      setCalculationMode(result.data.calculationMode)
      setActiveSection('results')
    } else {
      setError(result.error)
    }
    setIsLoading(false)
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
    const onPremStoragePerDriveInUnit = onPremStoragePerDrive
    const totalRawSize = onPremStoragePerDriveInUnit * onPremTotalDrives
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

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <GeneralSection
            control={form.control}
            onCalculationModeChange={setCalculationMode}
          />
        )
      case 'energy':
        return <EnergySection control={form.control} />
      case 'storage':
        return (
          <StorageSection
            control={form.control}
            setValue={form.setValue}
            dataUnit={dataUnit}
            handleHotChange={handleHotChange}
            handleStandardChange={handleStandardChange}
            useOnPremBackup={useOnPremBackup}
            useOnPremReplication={useOnPremReplication}
          />
        )
      case 'compute':
        return <ComputeSection control={form.control} />
      case 'gpu':
        return <GpuSection control={form.control} />
      case 'networking':
        return (
          <NetworkingSection
            control={form.control}
            useOnPremBandwidth={useOnPremBandwidth}
            useOnPremCdn={useOnPremCdn}
          />
        )
      case 'human-cost':
        return <HumanCostSection control={form.control} />
      case 'software':
        return <SoftwareSection control={form.control} />
      case 'results':
        return (
          <ResultsDisplay
            results={results}
            calculationMode={calculationMode}
          />
        )
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <SidebarInset className="flex flex-col">
          <Header />
          <main className="flex-1 p-6 flex flex-col items-center">
            <div className="w-full max-w-7xl">
              <SidebarTrigger />
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div>
                    {renderSection()}
                    {activeSection !== 'results' && (
                      <div className="mt-8 flex gap-4 justify-center">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'Calculating...' : 'Calculate'}
                        </Button>
                        {error && (
                          <p className="text-sm text-destructive flex items-center">
                            {error}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </main>
          <footer className="py-6 text-center text-muted-foreground text-sm border-t">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
              <div>
                © {new Date().getFullYear()} InfraWise. A financial modeling
                tool.
              </div>
              <a
                href="https://github.com/Sagyam/Infra-Wise"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
