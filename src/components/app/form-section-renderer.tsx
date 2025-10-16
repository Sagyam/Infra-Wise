import type { Control, UseFormSetValue } from 'react-hook-form'
import { ComputeSection } from '@/components/app/sections/compute-section'
import { EnergySection } from '@/components/app/sections/energy-section'
import { GeneralSection } from '@/components/app/sections/general-section'
import { GpuSection } from '@/components/app/sections/gpu-section'
import { HumanCostSection } from '@/components/app/sections/human-cost-section'
import { NetworkingSection } from '@/components/app/sections/networking-section'
import { ResultsBreakdownSection } from '@/components/app/sections/results-breakdown-section'
import { ResultsChartsSection } from '@/components/app/sections/results-charts-section'
import { ResultsCumulativeSection } from '@/components/app/sections/results-cumulative-section'
import { SoftwareSection } from '@/components/app/sections/software-section'
import { StorageSection } from '@/components/app/sections/storage-section'
import type { CalculationResult, CostFormValues } from '@/lib/types'

interface FormSectionRendererProps {
  activeSection: string
  control: Control<CostFormValues>
  setValue: UseFormSetValue<CostFormValues>
  results: CalculationResult | null
  calculationMode: CostFormValues['calculationMode']
  watchers: {
    useOnPremBandwidth: boolean
    useOnPremCdn: boolean
    useOnPremCoreSwitch: boolean
    useOnPremAggregationSwitch: boolean
    useOnPremAccessSwitch: boolean
    useOnPremCabling: boolean
    useOnPremQsfp: boolean
    useOnPremBackup: boolean
    useOnPremReplication: boolean
    useCloudGeneralVm: boolean
    useCloudComputeVm: boolean
    useCloudMemoryVm: boolean
    useCloudStorageVm: boolean
    useOnPremCpu: boolean
    useOnPremMotherboard: boolean
    useOnPremMemory: boolean
    useOnPremChassis: boolean
    useOnPremRacks: boolean
    useOnPremTrainingGpu: boolean
    useOnPremInferenceGpu: boolean
    useCloudTrainingGpu: boolean
    useCloudInferenceGpu: boolean
    useOnPremPowerConsumption: boolean
    useOnPremUps: boolean
    useOnPremGenerator: boolean
    useOnPremHvac: boolean
    useOnPremColocation: boolean
    useOnPremVirtualization: boolean
    useOnPremOperatingSystem: boolean
    useOnPremStorage: boolean
    useOnPremBackupSoftware: boolean
    useOnPremMonitoring: boolean
    useOnPremSecurity: boolean
    useCloudDatabase: boolean
    useCloudOperatingSystem: boolean
    useCloudAnalytics: boolean
    useCloudTelemetry: boolean
    useCloudMonitoring: boolean
    useCloudSecurity: boolean
  }
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
  handleHotChange: (value: number) => void
  handleStandardChange: (value: number) => void
}

export function FormSectionRenderer({
  activeSection,
  control,
  setValue,
  results,
  calculationMode,
  watchers,
  onCalculationModeChange,
  handleHotChange,
  handleStandardChange,
}: FormSectionRendererProps) {
  switch (activeSection) {
    case 'general':
      return (
        <GeneralSection
          control={control}
          onCalculationModeChange={onCalculationModeChange}
        />
      )
    case 'energy':
      return (
        <EnergySection
          control={control}
          useOnPremPowerConsumption={watchers.useOnPremPowerConsumption}
          useOnPremUps={watchers.useOnPremUps}
          useOnPremGenerator={watchers.useOnPremGenerator}
          useOnPremHvac={watchers.useOnPremHvac}
          useOnPremColocation={watchers.useOnPremColocation}
        />
      )
    case 'storage':
      return (
        <StorageSection
          control={control}
          setValue={setValue}
          handleHotChange={handleHotChange}
          handleStandardChange={handleStandardChange}
          useOnPremBackup={watchers.useOnPremBackup}
          useOnPremReplication={watchers.useOnPremReplication}
        />
      )
    case 'compute':
      return (
        <ComputeSection
          control={control}
          useOnPremCpu={watchers.useOnPremCpu}
          useOnPremMotherboard={watchers.useOnPremMotherboard}
          useOnPremMemory={watchers.useOnPremMemory}
          useOnPremChassis={watchers.useOnPremChassis}
          useOnPremRacks={watchers.useOnPremRacks}
          useCloudGeneralVm={watchers.useCloudGeneralVm}
          useCloudComputeVm={watchers.useCloudComputeVm}
          useCloudMemoryVm={watchers.useCloudMemoryVm}
          useCloudStorageVm={watchers.useCloudStorageVm}
        />
      )
    case 'gpu':
      return (
        <GpuSection
          control={control}
          useOnPremTrainingGpu={watchers.useOnPremTrainingGpu}
          useOnPremInferenceGpu={watchers.useOnPremInferenceGpu}
          useCloudTrainingGpu={watchers.useCloudTrainingGpu}
          useCloudInferenceGpu={watchers.useCloudInferenceGpu}
        />
      )
    case 'networking':
      return (
        <NetworkingSection
          control={control}
          useOnPremBandwidth={watchers.useOnPremBandwidth}
          useOnPremCdn={watchers.useOnPremCdn}
          useOnPremCoreSwitch={watchers.useOnPremCoreSwitch}
          useOnPremAggregationSwitch={watchers.useOnPremAggregationSwitch}
          useOnPremAccessSwitch={watchers.useOnPremAccessSwitch}
          useOnPremCabling={watchers.useOnPremCabling}
          useOnPremQsfp={watchers.useOnPremQsfp}
        />
      )
    case 'human-cost':
      return <HumanCostSection control={control} />
    case 'software':
      return (
        <SoftwareSection
          control={control}
          useOnPremVirtualization={watchers.useOnPremVirtualization}
          useOnPremOperatingSystem={watchers.useOnPremOperatingSystem}
          useOnPremStorage={watchers.useOnPremStorage}
          useOnPremBackupSoftware={watchers.useOnPremBackupSoftware}
          useOnPremMonitoring={watchers.useOnPremMonitoring}
          useOnPremSecurity={watchers.useOnPremSecurity}
          useCloudDatabase={watchers.useCloudDatabase}
          useCloudOperatingSystem={watchers.useCloudOperatingSystem}
          useCloudAnalytics={watchers.useCloudAnalytics}
          useCloudTelemetry={watchers.useCloudTelemetry}
          useCloudMonitoring={watchers.useCloudMonitoring}
          useCloudSecurity={watchers.useCloudSecurity}
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
