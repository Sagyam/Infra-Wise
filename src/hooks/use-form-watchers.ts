import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'

export function useFormWatchers(control: Control<CostFormValues>) {
  // Storage watchers
  const useOnPremHdd = useWatch({ control, name: 'useOnPremHdd' })
  const onPremHddCount = useWatch({ control, name: 'onPremHddCount' })
  const onPremHddSizeTb = useWatch({ control, name: 'onPremHddSizeTb' })
  const onPremHddRaidFactor = useWatch({ control, name: 'onPremHddRaidFactor' })

  const useOnPremSsd = useWatch({ control, name: 'useOnPremSsd' })
  const onPremSsdCount = useWatch({ control, name: 'onPremSsdCount' })
  const onPremSsdSizeTb = useWatch({ control, name: 'onPremSsdSizeTb' })
  const onPremSsdRaidFactor = useWatch({ control, name: 'onPremSsdRaidFactor' })

  const cloudHotTier = useWatch({ control, name: 'cloudHotTier' })
  const cloudStandardTier = useWatch({ control, name: 'cloudStandardTier' })

  // Networking watchers
  const useOnPremBandwidth = useWatch({ control, name: 'useOnPremBandwidth' })
  const useOnPremCdn = useWatch({ control, name: 'useOnPremCdn' })
  const useOnPremCoreSwitch = useWatch({ control, name: 'useOnPremCoreSwitch' })
  const useOnPremAggregationSwitch = useWatch({
    control,
    name: 'useOnPremAggregationSwitch',
  })
  const useOnPremAccessSwitch = useWatch({
    control,
    name: 'useOnPremAccessSwitch',
  })
  const useOnPremCabling = useWatch({ control, name: 'useOnPremCabling' })
  const useOnPremQsfp = useWatch({ control, name: 'useOnPremQsfp' })
  const useOnPremBackup = useWatch({ control, name: 'useOnPremBackup' })
  const useOnPremReplication = useWatch({
    control,
    name: 'useOnPremReplication',
  })

  // Compute watchers
  const useCloudGeneralVm = useWatch({ control, name: 'useCloudGeneralVm' })
  const useCloudComputeVm = useWatch({ control, name: 'useCloudComputeVm' })
  const useCloudMemoryVm = useWatch({ control, name: 'useCloudMemoryVm' })
  const useCloudStorageVm = useWatch({ control, name: 'useCloudStorageVm' })

  const useOnPremCpu = useWatch({ control, name: 'useOnPremCpu' })
  const useOnPremMotherboard = useWatch({
    control,
    name: 'useOnPremMotherboard',
  })
  const useOnPremMemory = useWatch({ control, name: 'useOnPremMemory' })
  const useOnPremChassis = useWatch({ control, name: 'useOnPremChassis' })
  const useOnPremRacks = useWatch({ control, name: 'useOnPremRacks' })

  // GPU watchers
  const useOnPremTrainingGpu = useWatch({
    control,
    name: 'useOnPremTrainingGpu',
  })
  const useOnPremInferenceGpu = useWatch({
    control,
    name: 'useOnPremInferenceGpu',
  })
  const useCloudTrainingGpu = useWatch({ control, name: 'useCloudTrainingGpu' })
  const useCloudInferenceGpu = useWatch({
    control,
    name: 'useCloudInferenceGpu',
  })

  // Energy watchers
  const useOnPremPowerConsumption = useWatch({
    control,
    name: 'useOnPremPowerConsumption',
  })
  const useOnPremUps = useWatch({ control, name: 'useOnPremUps' })
  const useOnPremGenerator = useWatch({ control, name: 'useOnPremGenerator' })
  const useOnPremHvac = useWatch({ control, name: 'useOnPremHvac' })
  const useOnPremColocation = useWatch({ control, name: 'useOnPremColocation' })

  // Software watchers
  const useOnPremVirtualization = useWatch({
    control,
    name: 'useOnPremVirtualization',
  })
  const useOnPremOperatingSystem = useWatch({
    control,
    name: 'useOnPremOperatingSystem',
  })
  const useOnPremStorage = useWatch({ control, name: 'useOnPremStorage' })
  const useOnPremBackupSoftware = useWatch({
    control,
    name: 'useOnPremBackupSoftware',
  })
  const useOnPremMonitoring = useWatch({ control, name: 'useOnPremMonitoring' })
  const useOnPremSecurity = useWatch({ control, name: 'useOnPremSecurity' })
  const useCloudDatabase = useWatch({ control, name: 'useCloudDatabase' })
  const useCloudOperatingSystem = useWatch({
    control,
    name: 'useCloudOperatingSystem',
  })
  const useCloudAnalytics = useWatch({ control, name: 'useCloudAnalytics' })
  const useCloudTelemetry = useWatch({ control, name: 'useCloudTelemetry' })
  const useCloudMonitoring = useWatch({ control, name: 'useCloudMonitoring' })
  const useCloudSecurity = useWatch({ control, name: 'useCloudSecurity' })

  return {
    // Storage
    useOnPremHdd,
    onPremHddCount,
    onPremHddSizeTb,
    onPremHddRaidFactor,
    useOnPremSsd,
    onPremSsdCount,
    onPremSsdSizeTb,
    onPremSsdRaidFactor,
    cloudHotTier,
    cloudStandardTier,
    // Networking
    useOnPremBandwidth,
    useOnPremCdn,
    useOnPremCoreSwitch,
    useOnPremAggregationSwitch,
    useOnPremAccessSwitch,
    useOnPremCabling,
    useOnPremQsfp,
    useOnPremBackup,
    useOnPremReplication,
    // Compute
    useCloudGeneralVm,
    useCloudComputeVm,
    useCloudMemoryVm,
    useCloudStorageVm,
    useOnPremCpu,
    useOnPremMotherboard,
    useOnPremMemory,
    useOnPremChassis,
    useOnPremRacks,
    // GPU
    useOnPremTrainingGpu,
    useOnPremInferenceGpu,
    useCloudTrainingGpu,
    useCloudInferenceGpu,
    // Energy
    useOnPremPowerConsumption,
    useOnPremUps,
    useOnPremGenerator,
    useOnPremHvac,
    useOnPremColocation,
    // Software
    useOnPremVirtualization,
    useOnPremOperatingSystem,
    useOnPremStorage,
    useOnPremBackupSoftware,
    useOnPremMonitoring,
    useOnPremSecurity,
    useCloudDatabase,
    useCloudOperatingSystem,
    useCloudAnalytics,
    useCloudTelemetry,
    useCloudMonitoring,
    useCloudSecurity,
  }
}
