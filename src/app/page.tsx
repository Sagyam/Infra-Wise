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

  // On-prem Compute Hardware
  useOnPremCpu: false,
  onPremCpuQuantity: 0,
  onPremCpuUnitCost: 0,
  onPremCpuSalvageValue: 10,
  useOnPremMotherboard: false,
  onPremMotherboardQuantity: 0,
  onPremMotherboardUnitCost: 0,
  onPremMotherboardSalvageValue: 10,
  useOnPremMemory: false,
  onPremMemoryCapacityGb: 0,
  onPremMemoryCostPerGb: 0,
  onPremMemorySalvageValue: 10,
  useOnPremChassis: false,
  onPremChassisQuantity: 0,
  onPremChassisUnitCost: 0,
  onPremChassisSalvageValue: 10,
  useOnPremRacks: false,
  onPremRacksQuantity: 0,
  onPremRacksUnitCost: 0,
  onPremRacksSalvageValue: 10,

  // Software - On-Premise
  useOnPremVirtualization: false,
  onPremVirtualizationUnitCost: 0,
  onPremVirtualizationLicenses: 0,
  useOnPremOperatingSystem: false,
  onPremOperatingSystemUnitCost: 0,
  onPremOperatingSystemLicenses: 0,
  useOnPremStorage: false,
  onPremStorageUnitCost: 0,
  onPremStorageLicenses: 0,
  useOnPremBackupSoftware: false,
  onPremBackupSoftwareUnitCost: 0,
  onPremBackupSoftwareLicenses: 0,
  useOnPremMonitoring: false,
  onPremMonitoringUnitCost: 0,
  onPremMonitoringLicenses: 0,
  useOnPremSecurity: false,
  onPremSecurityUnitCost: 0,
  onPremSecurityLicenses: 0,

  // Software - Cloud
  useCloudDatabase: false,
  cloudDatabaseMonthlyCost: 0,
  useCloudOperatingSystem: false,
  cloudOperatingSystemMonthlyCost: 0,
  useCloudAnalytics: false,
  cloudAnalyticsMonthlyCost: 0,
  useCloudTelemetry: false,
  cloudTelemetryMonthlyCost: 0,
  useCloudMonitoring: false,
  cloudMonitoringMonthlyCost: 0,
  useCloudSecurity: false,
  cloudSecurityMonthlyCost: 0,

  // Energy
  useOnPremPowerConsumption: true,
  onPremPowerRating: 600,
  onPremLoadFactor: 65,
  onPremElectricityCost: 0.14,
  useOnPremUps: false,
  onPremUpsUnitCost: 0,
  onPremUpsQuantity: 0,
  onPremUpsBatteryFailureRate: 0,
  onPremUpsBatteryReplacementCost: 0,
  useOnPremGenerator: false,
  onPremGeneratorUnitCost: 0,
  onPremGeneratorQuantity: 0,
  onPremGeneratorFuelConsumptionRate: 0,
  onPremGeneratorFuelUnitCost: 0,
  onPremGeneratorAnnualUsageHours: 0,
  useOnPremHvac: false,
  onPremHvacUnitCost: 0,
  onPremHvacQuantity: 0,
  onPremHvacPowerConsumption: 0,
  onPremHvacLoadFactor: 0,
  onPremHvacTechnicianHourlyRate: 0,
  onPremHvacHoursWorked: 0,
  useOnPremColocation: false,
  onPremColocationMonthlyCost: 0,
  onPremColocationAnnualIncrease: 0,
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
  useOnPremCoreSwitch: false,
  onPremCoreSwitchQuantity: 0,
  onPremCoreSwitchUnitCost: 0,
  onPremCoreSwitchSalvageValue: 10,
  useOnPremAggregationSwitch: false,
  onPremAggregationSwitchQuantity: 0,
  onPremAggregationSwitchUnitCost: 0,
  onPremAggregationSwitchSalvageValue: 10,
  useOnPremAccessSwitch: false,
  onPremAccessSwitchQuantity: 0,
  onPremAccessSwitchUnitCost: 0,
  onPremAccessSwitchSalvageValue: 10,
  useOnPremCabling: false,
  onPremCablingLength: 0,
  onPremCablingUnitPrice: 0,
  onPremCablingSalvageValue: 10,
  useOnPremQsfp: false,
  onPremQsfpQuantity: 0,
  onPremQsfpUnitCost: 0,
  onPremQsfpSalvageValue: 10,
  useOnPremBackup: true,
  onPremBackupStorage: 153.6,
  onPremBackupCostPerUnit: 15,
  useOnPremReplication: false,
  onPremReplicationFactor: 0,

  // Human Costs - On-Premise
  onPremSysAdminCount: 0,
  onPremSysAdminSalary: 0,
  onPremSysAdminSalaryIncrement: 0,
  onPremNetworkEngineerCount: 0,
  onPremNetworkEngineerSalary: 0,
  onPremNetworkEngineerSalaryIncrement: 0,
  onPremStorageAdminCount: 0,
  onPremStorageAdminSalary: 0,
  onPremStorageAdminSalaryIncrement: 0,
  onPremSecurityEngineerCount: 0,
  onPremSecurityEngineerSalary: 0,
  onPremSecurityEngineerSalaryIncrement: 0,
  onPremDatabaseAdminCount: 0,
  onPremDatabaseAdminSalary: 0,
  onPremDatabaseAdminSalaryIncrement: 0,
  onPremDataCenterTechCount: 0,
  onPremDataCenterTechSalary: 0,
  onPremDataCenterTechSalaryIncrement: 0,

  // Human Costs - Cloud
  cloudDevOpsEngineerCount: 0,
  cloudDevOpsEngineerSalary: 0,
  cloudDevOpsEngineerSalaryIncrement: 0,
  cloudCloudArchitectCount: 0,
  cloudCloudArchitectSalary: 0,
  cloudCloudArchitectSalaryIncrement: 0,
  cloudSiteReliabilityEngineerCount: 0,
  cloudSiteReliabilityEngineerSalary: 0,
  cloudSiteReliabilityEngineerSalaryIncrement: 0,
  cloudCloudSecurityEngineerCount: 0,
  cloudCloudSecurityEngineerSalary: 0,
  cloudCloudSecurityEngineerSalaryIncrement: 0,
  cloudCloudDatabaseAdminCount: 0,
  cloudCloudDatabaseAdminSalary: 0,
  cloudCloudDatabaseAdminSalaryIncrement: 0,

  // Cloud Compute VMs
  useCloudGeneralVm: false,
  cloudGeneralVmCount: 0,
  cloudGeneralVmHourlyRate: 0,
  cloudGeneralVmHoursPerMonth: 0,
  useCloudComputeVm: false,
  cloudComputeVmCount: 0,
  cloudComputeVmHourlyRate: 0,
  cloudComputeVmHoursPerMonth: 0,
  useCloudMemoryVm: false,
  cloudMemoryVmCount: 0,
  cloudMemoryVmHourlyRate: 0,
  cloudMemoryVmHoursPerMonth: 0,
  useCloudStorageVm: false,
  cloudStorageVmCount: 0,
  cloudStorageVmHourlyRate: 0,
  cloudStorageVmHoursPerMonth: 0,

  // GPU
  useOnPremTrainingGpu: false,
  onPremTrainingGpuQuantity: 0,
  onPremTrainingGpuUnitCost: 0,
  useOnPremInferenceGpu: false,
  onPremInferenceGpuQuantity: 0,
  onPremInferenceGpuUnitCost: 0,
  useCloudTrainingGpu: false,
  cloudTrainingGpuCount: 0,
  cloudTrainingGpuHourlyRate: 0,
  cloudTrainingGpuHoursPerMonth: 0,
  useCloudInferenceGpu: false,
  cloudInferenceGpuCount: 0,
  cloudInferenceGpuHourlyRate: 0,
  cloudInferenceGpuHoursPerMonth: 0,

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
  const useOnPremCoreSwitch = useWatch({
    control: form.control,
    name: 'useOnPremCoreSwitch',
  })
  const useOnPremAggregationSwitch = useWatch({
    control: form.control,
    name: 'useOnPremAggregationSwitch',
  })
  const useOnPremAccessSwitch = useWatch({
    control: form.control,
    name: 'useOnPremAccessSwitch',
  })
  const useOnPremCabling = useWatch({
    control: form.control,
    name: 'useOnPremCabling',
  })
  const useOnPremQsfp = useWatch({
    control: form.control,
    name: 'useOnPremQsfp',
  })
  const useOnPremBackup = useWatch({
    control: form.control,
    name: 'useOnPremBackup',
  })
  const useOnPremReplication = useWatch({
    control: form.control,
    name: 'useOnPremReplication',
  })

  const useCloudGeneralVm = useWatch({
    control: form.control,
    name: 'useCloudGeneralVm',
  })
  const useCloudComputeVm = useWatch({
    control: form.control,
    name: 'useCloudComputeVm',
  })
  const useCloudMemoryVm = useWatch({
    control: form.control,
    name: 'useCloudMemoryVm',
  })
  const useCloudStorageVm = useWatch({
    control: form.control,
    name: 'useCloudStorageVm',
  })

  const useOnPremCpu = useWatch({
    control: form.control,
    name: 'useOnPremCpu',
  })
  const useOnPremMotherboard = useWatch({
    control: form.control,
    name: 'useOnPremMotherboard',
  })
  const useOnPremMemory = useWatch({
    control: form.control,
    name: 'useOnPremMemory',
  })
  const useOnPremChassis = useWatch({
    control: form.control,
    name: 'useOnPremChassis',
  })
  const useOnPremRacks = useWatch({
    control: form.control,
    name: 'useOnPremRacks',
  })

  const useOnPremTrainingGpu = useWatch({
    control: form.control,
    name: 'useOnPremTrainingGpu',
  })
  const useOnPremInferenceGpu = useWatch({
    control: form.control,
    name: 'useOnPremInferenceGpu',
  })
  const useCloudTrainingGpu = useWatch({
    control: form.control,
    name: 'useCloudTrainingGpu',
  })
  const useCloudInferenceGpu = useWatch({
    control: form.control,
    name: 'useCloudInferenceGpu',
  })

  const useOnPremPowerConsumption = useWatch({
    control: form.control,
    name: 'useOnPremPowerConsumption',
  })
  const useOnPremUps = useWatch({
    control: form.control,
    name: 'useOnPremUps',
  })
  const useOnPremGenerator = useWatch({
    control: form.control,
    name: 'useOnPremGenerator',
  })
  const useOnPremHvac = useWatch({
    control: form.control,
    name: 'useOnPremHvac',
  })
  const useOnPremColocation = useWatch({
    control: form.control,
    name: 'useOnPremColocation',
  })

  const useOnPremVirtualization = useWatch({
    control: form.control,
    name: 'useOnPremVirtualization',
  })
  const useOnPremOperatingSystem = useWatch({
    control: form.control,
    name: 'useOnPremOperatingSystem',
  })
  const useOnPremStorage = useWatch({
    control: form.control,
    name: 'useOnPremStorage',
  })
  const useOnPremBackupSoftware = useWatch({
    control: form.control,
    name: 'useOnPremBackupSoftware',
  })
  const useOnPremMonitoring = useWatch({
    control: form.control,
    name: 'useOnPremMonitoring',
  })
  const useOnPremSecurity = useWatch({
    control: form.control,
    name: 'useOnPremSecurity',
  })
  const useCloudDatabase = useWatch({
    control: form.control,
    name: 'useCloudDatabase',
  })
  const useCloudOperatingSystem = useWatch({
    control: form.control,
    name: 'useCloudOperatingSystem',
  })
  const useCloudAnalytics = useWatch({
    control: form.control,
    name: 'useCloudAnalytics',
  })
  const useCloudTelemetry = useWatch({
    control: form.control,
    name: 'useCloudTelemetry',
  })
  const useCloudMonitoring = useWatch({
    control: form.control,
    name: 'useCloudMonitoring',
  })
  const useCloudSecurity = useWatch({
    control: form.control,
    name: 'useCloudSecurity',
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
        return (
          <EnergySection
            control={form.control}
            useOnPremPowerConsumption={useOnPremPowerConsumption}
            useOnPremUps={useOnPremUps}
            useOnPremGenerator={useOnPremGenerator}
            useOnPremHvac={useOnPremHvac}
            useOnPremColocation={useOnPremColocation}
          />
        )
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
        return (
          <ComputeSection
            control={form.control}
            useOnPremCpu={useOnPremCpu}
            useOnPremMotherboard={useOnPremMotherboard}
            useOnPremMemory={useOnPremMemory}
            useOnPremChassis={useOnPremChassis}
            useOnPremRacks={useOnPremRacks}
            useCloudGeneralVm={useCloudGeneralVm}
            useCloudComputeVm={useCloudComputeVm}
            useCloudMemoryVm={useCloudMemoryVm}
            useCloudStorageVm={useCloudStorageVm}
          />
        )
      case 'gpu':
        return (
          <GpuSection
            control={form.control}
            useOnPremTrainingGpu={useOnPremTrainingGpu}
            useOnPremInferenceGpu={useOnPremInferenceGpu}
            useCloudTrainingGpu={useCloudTrainingGpu}
            useCloudInferenceGpu={useCloudInferenceGpu}
          />
        )
      case 'networking':
        return (
          <NetworkingSection
            control={form.control}
            useOnPremBandwidth={useOnPremBandwidth}
            useOnPremCdn={useOnPremCdn}
            useOnPremCoreSwitch={useOnPremCoreSwitch}
            useOnPremAggregationSwitch={useOnPremAggregationSwitch}
            useOnPremAccessSwitch={useOnPremAccessSwitch}
            useOnPremCabling={useOnPremCabling}
            useOnPremQsfp={useOnPremQsfp}
          />
        )
      case 'human-cost':
        return <HumanCostSection control={form.control} />
      case 'software':
        return (
          <SoftwareSection
            control={form.control}
            useOnPremVirtualization={useOnPremVirtualization}
            useOnPremOperatingSystem={useOnPremOperatingSystem}
            useOnPremStorage={useOnPremStorage}
            useOnPremBackupSoftware={useOnPremBackupSoftware}
            useOnPremMonitoring={useOnPremMonitoring}
            useOnPremSecurity={useOnPremSecurity}
            useCloudDatabase={useCloudDatabase}
            useCloudOperatingSystem={useCloudOperatingSystem}
            useCloudAnalytics={useCloudAnalytics}
            useCloudTelemetry={useCloudTelemetry}
            useCloudMonitoring={useCloudMonitoring}
            useCloudSecurity={useCloudSecurity}
          />
        )
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
