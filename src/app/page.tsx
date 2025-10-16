'use client'

import {AppSidebar} from '@/components/app/app-sidebar'
import {Header} from '@/components/app/header'
import {ComputeSection} from '@/components/app/sections/compute-section'
import {EnergySection} from '@/components/app/sections/energy-section'
import {GeneralSection} from '@/components/app/sections/general-section'
import {GpuSection} from '@/components/app/sections/gpu-section'
import {HumanCostSection} from '@/components/app/sections/human-cost-section'
import {NetworkingSection} from '@/components/app/sections/networking-section'
import {ResultsBreakdownSection} from '@/components/app/sections/results-breakdown-section'
import {ResultsChartsSection} from '@/components/app/sections/results-charts-section'
import {ResultsCumulativeSection} from '@/components/app/sections/results-cumulative-section'
import {SoftwareSection} from '@/components/app/sections/software-section'
import {StorageSection} from '@/components/app/sections/storage-section'
import {Button} from '@/components/ui/button'
import {Form} from '@/components/ui/form'
import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar'
import {calculateCosts} from '@/lib/actions'
import {type CalculationResult, CostFormSchema, type CostFormValues,} from '@/lib/types'
import {zodResolver} from '@hookform/resolvers/zod'
import {Github} from 'lucide-react'
import React, {useState} from 'react'
import {useForm, useWatch} from 'react-hook-form'

const defaultValues: CostFormValues = {
  analysisPeriod: 5,

  // On-prem Compute Hardware
  useOnPremCpu: true,
  onPremCpuQuantity: 4,
  onPremCpuUnitCost: 2500,
  onPremCpuSalvageValue: 10,
  useOnPremMotherboard: true,
  onPremMotherboardQuantity: 4,
  onPremMotherboardUnitCost: 800,
  onPremMotherboardSalvageValue: 10,
  useOnPremMemory: true,
  onPremMemoryCapacityGb: 512,
  onPremMemoryCostPerGb: 8,
  onPremMemorySalvageValue: 10,
  useOnPremChassis: true,
  onPremChassisQuantity: 2,
  onPremChassisUnitCost: 3000,
  onPremChassisSalvageValue: 10,
  useOnPremRacks: true,
  onPremRacksQuantity: 1,
  onPremRacksUnitCost: 2000,
  onPremRacksSalvageValue: 10,

  // Software - On-Premise
  useOnPremVirtualization: true,
  onPremVirtualizationUnitCost: 500,
  onPremVirtualizationLicenses: 4,
  useOnPremOperatingSystem: true,
  onPremOperatingSystemUnitCost: 150,
  onPremOperatingSystemLicenses: 8,
  useOnPremStorage: false,
  onPremStorageUnitCost: 0,
  onPremStorageLicenses: 0,
  useOnPremBackupSoftware: true,
  onPremBackupSoftwareUnitCost: 300,
  onPremBackupSoftwareLicenses: 4,
  useOnPremMonitoring: true,
  onPremMonitoringUnitCost: 200,
  onPremMonitoringLicenses: 4,
  useOnPremSecurity: true,
  onPremSecurityUnitCost: 400,
  onPremSecurityLicenses: 4,

  // Software - Cloud
  useCloudDatabase: true,
  cloudDatabaseMonthlyCost: 500,
  useCloudOperatingSystem: false,
  cloudOperatingSystemMonthlyCost: 0,
  useCloudAnalytics: true,
  cloudAnalyticsMonthlyCost: 300,
  useCloudTelemetry: true,
  cloudTelemetryMonthlyCost: 200,
  useCloudMonitoring: true,
  cloudMonitoringMonthlyCost: 250,
  useCloudSecurity: true,
  cloudSecurityMonthlyCost: 400,

  // Energy
  useOnPremPowerConsumption: true,
  onPremPowerRating: 2400,
  onPremLoadFactor: 70,
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
  useOnPremColocation: true,
  onPremColocationMonthlyCost: 1500,
  onPremColocationAnnualIncrease: 3,

  // HDD Configuration
  useOnPremHdd: true,
  onPremHddCount: 24,
  onPremHddSizeTb: 8,
  onPremHddRaidFactor: 20,
  onPremHddFailureRate: 2,
  onPremHddUnitCost: 250,

  // SSD Configuration
  useOnPremSsd: true,
  onPremSsdCount: 8,
  onPremSsdSizeTb: 4,
  onPremSsdRaidFactor: 20,
  onPremSsdFailureRate: 1,
  onPremSsdUnitCost: 800,

  useOnPremSoftware: true,
  useOnPremBandwidth: true,
  onPremBandwidthUsage: 5000,
  onPremBandwidthCostPerGb: 0.02,
  onPremAnnualTrafficGrowth: 15,
  useOnPremCdn: false,
  onPremCdnUsage: 0,
  onPremCdnCostPerGb: 0.04,
  useOnPremCoreSwitch: true,
  onPremCoreSwitchQuantity: 2,
  onPremCoreSwitchUnitCost: 8000,
  onPremCoreSwitchSalvageValue: 10,
  useOnPremAggregationSwitch: true,
  onPremAggregationSwitchQuantity: 4,
  onPremAggregationSwitchUnitCost: 3000,
  onPremAggregationSwitchSalvageValue: 10,
  useOnPremAccessSwitch: true,
  onPremAccessSwitchQuantity: 8,
  onPremAccessSwitchUnitCost: 800,
  onPremAccessSwitchSalvageValue: 10,
  useOnPremCabling: true,
  onPremCablingLength: 500,
  onPremCablingUnitPrice: 2,
  onPremCablingSalvageValue: 10,
  useOnPremQsfp: true,
  onPremQsfpQuantity: 24,
  onPremQsfpUnitCost: 150,
  onPremQsfpSalvageValue: 10,
  useOnPremBackup: true,
  onPremBackupStorage: 153.6,
  onPremBackupCostPerUnit: 15,
  useOnPremReplication: false,
  onPremReplicationFactor: 0,

  // Human Costs - On-Premise (California salaries)
  useOnPremSysAdmin: true,
  onPremSysAdminCount: 2,
  onPremSysAdminSalary: 125000,
  onPremSysAdminSalaryIncrement: 4,
  useOnPremNetworkEngineer: true,
  onPremNetworkEngineerCount: 1,
  onPremNetworkEngineerSalary: 135000,
  onPremNetworkEngineerSalaryIncrement: 4,
  useOnPremStorageAdmin: true,
  onPremStorageAdminCount: 1,
  onPremStorageAdminSalary: 120000,
  onPremStorageAdminSalaryIncrement: 4,
  useOnPremSecurityEngineer: true,
  onPremSecurityEngineerCount: 1,
  onPremSecurityEngineerSalary: 145000,
  onPremSecurityEngineerSalaryIncrement: 4,
  useOnPremDatabaseAdmin: true,
  onPremDatabaseAdminCount: 1,
  onPremDatabaseAdminSalary: 130000,
  onPremDatabaseAdminSalaryIncrement: 4,
  useOnPremDataCenterTech: true,
  onPremDataCenterTechCount: 1,
  onPremDataCenterTechSalary: 85000,
  onPremDataCenterTechSalaryIncrement: 4,

  // Human Costs - Cloud (California salaries)
  useCloudDevOpsEngineer: true,
  cloudDevOpsEngineerCount: 2,
  cloudDevOpsEngineerSalary: 155000,
  cloudDevOpsEngineerSalaryIncrement: 4,
  useCloudCloudArchitect: true,
  cloudCloudArchitectCount: 1,
  cloudCloudArchitectSalary: 180000,
  cloudCloudArchitectSalaryIncrement: 4,
  useCloudSiteReliabilityEngineer: true,
  cloudSiteReliabilityEngineerCount: 1,
  cloudSiteReliabilityEngineerSalary: 165000,
  cloudSiteReliabilityEngineerSalaryIncrement: 4,
  useCloudCloudSecurityEngineer: true,
  cloudCloudSecurityEngineerCount: 1,
  cloudCloudSecurityEngineerSalary: 160000,
  cloudCloudSecurityEngineerSalaryIncrement: 4,
  useCloudCloudDatabaseAdmin: false,
  cloudCloudDatabaseAdminCount: 0,
  cloudCloudDatabaseAdminSalary: 0,
  cloudCloudDatabaseAdminSalaryIncrement: 0,

  // Cloud Compute VMs
  useCloudGeneralVm: true,
  cloudGeneralVmCount: 8,
  cloudGeneralVmHourlyRate: 0.15,
  cloudGeneralVmHoursPerMonth: 730,
  useCloudComputeVm: true,
  cloudComputeVmCount: 4,
  cloudComputeVmHourlyRate: 0.25,
  cloudComputeVmHoursPerMonth: 730,
  useCloudMemoryVm: true,
  cloudMemoryVmCount: 2,
  cloudMemoryVmHourlyRate: 0.35,
  cloudMemoryVmHoursPerMonth: 730,
  useCloudStorageVm: false,
  cloudStorageVmCount: 0,
  cloudStorageVmHourlyRate: 0,
  cloudStorageVmHoursPerMonth: 0,

  // GPU (Nvidia ballpark estimates)
  useOnPremTrainingGpu: true,
  onPremTrainingGpuQuantity: 4,
  onPremTrainingGpuUnitCost: 15000, // A100 40GB ballpark
  useOnPremInferenceGpu: true,
  onPremInferenceGpuQuantity: 8,
  onPremInferenceGpuUnitCost: 5000, // T4 ballpark
  useCloudTrainingGpu: true,
  cloudTrainingGpuCount: 4,
  cloudTrainingGpuHourlyRate: 3.5, // A100 on major cloud providers
  cloudTrainingGpuHoursPerMonth: 730,
  useCloudInferenceGpu: true,
  cloudInferenceGpuCount: 8,
  cloudInferenceGpuHourlyRate: 0.65, // T4 on major cloud providers
  cloudInferenceGpuHoursPerMonth: 730,

  // Cloud
  cloudStorageSize: 150,
  cloudGrowthRate: 20,

  // Cloud - Egress
  useCloudEgress: true,
  cloudEgress: 2,
  cloudEgressGrowthRate: 15,
  cloudEgressCostPerUnit: 0.09,

  // Cloud - Ingress
  useCloudIngress: false,
  cloudIngress: 1,
  cloudIngressGrowthRate: 10,
  cloudIngressCostPerUnit: 0.05,

  cloudHotTier: 60,
  cloudStandardTier: 30,
  cloudArchiveTier: 10,
  cloudHotStorageCost: 0.021,
  cloudStandardStorageCost: 0.0125,
  cloudArchiveStorageCost: 0.0036,

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
      setActiveSection('results-charts')
    } else {
      setError(result.error)
    }
    setIsLoading(false)
  }

  const useOnPremHdd = useWatch({ control: form.control, name: 'useOnPremHdd' })
  const onPremHddCount = useWatch({ control: form.control, name: 'onPremHddCount' })
  const onPremHddSizeTb = useWatch({ control: form.control, name: 'onPremHddSizeTb' })
  const onPremHddRaidFactor = useWatch({ control: form.control, name: 'onPremHddRaidFactor' })

  const useOnPremSsd = useWatch({ control: form.control, name: 'useOnPremSsd' })
  const onPremSsdCount = useWatch({ control: form.control, name: 'onPremSsdCount' })
  const onPremSsdSizeTb = useWatch({ control: form.control, name: 'onPremSsdSizeTb' })
  const onPremSsdRaidFactor = useWatch({ control: form.control, name: 'onPremSsdRaidFactor' })

  React.useEffect(() => {
    let totalUsableStorage = 0

    // Calculate HDD usable storage
    if (useOnPremHdd) {
      const hddRawSize = (onPremHddSizeTb || 0) * (onPremHddCount || 0)
      const hddRaidOverhead = hddRawSize * ((onPremHddRaidFactor || 0) / 100)
      totalUsableStorage += hddRawSize - hddRaidOverhead
    }

    // Calculate SSD usable storage
    if (useOnPremSsd) {
      const ssdRawSize = (onPremSsdSizeTb || 0) * (onPremSsdCount || 0)
      const ssdRaidOverhead = ssdRawSize * ((onPremSsdRaidFactor || 0) / 100)
      totalUsableStorage += ssdRawSize - ssdRaidOverhead
    }

    form.setValue('onPremBackupStorage', Math.max(0, totalUsableStorage))
  }, [
    useOnPremHdd,
    onPremHddCount,
    onPremHddSizeTb,
    onPremHddRaidFactor,
    useOnPremSsd,
    onPremSsdCount,
    onPremSsdSizeTb,
    onPremSsdRaidFactor,
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
    // Clamp hot tier so hot + standard never exceeds 100
    const maxHot = 100 - cloudStandardTier
    const clampedHot = Math.min(value, maxHot)
    const archiveTier = 100 - clampedHot - cloudStandardTier

    form.setValue('cloudHotTier', clampedHot)
    form.setValue('cloudArchiveTier', archiveTier)
  }

  const handleStandardChange = (value: number) => {
    // Clamp standard tier so hot + standard never exceeds 100
    const maxStandard = 100 - cloudHotTier
    const clampedStandard = Math.min(value, maxStandard)
    const archiveTier = 100 - cloudHotTier - clampedStandard

    form.setValue('cloudStandardTier', clampedStandard)
    form.setValue('cloudArchiveTier', archiveTier)
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
      case 'results-charts':
        return <ResultsChartsSection results={results} />
      case 'results-cumulative':
        return (
          <ResultsCumulativeSection
            results={results}
            calculationMode={calculationMode}
          />
        )
      case 'results-breakdown':
        return <ResultsBreakdownSection results={results} />
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div>
                    {renderSection()}
                    {!activeSection.startsWith('results-') && (
                      <div className="mt-8 flex flex-col gap-4 items-center">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          size="lg"
                          className="w-full max-w-md text-lg py-6"
                        >
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
                Made with 💙 for  infrastructure decision-makers!
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
