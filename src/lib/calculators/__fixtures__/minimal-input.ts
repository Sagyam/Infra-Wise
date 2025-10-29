import type { CostFormValues } from '@/lib/types'

/**
 * Minimal valid input with all required fields
 * All optional features disabled
 * Useful for testing baseline calculation logic
 */
export const minimalInput: CostFormValues = {
  // General
  analysisPeriod: 3,
  inflationRate: 3,
  calculationMode: 'tco',
  enableSensitivityAnalysis: false,
  sensitivityRangePercent: 20,

  // Storage (required fields)
  cloudStorageSize: 10,
  cloudGrowthRate: 10,
  cloudHotTier: 30,
  cloudStandardTier: 50,
  cloudArchiveTier: 20,
  cloudHotStorageCost: 0.023,
  cloudStandardStorageCost: 0.01,
  cloudArchiveStorageCost: 0.004,
  cloudEgress: 5,
  cloudEgressGrowthRate: 5,
  cloudEgressCostPerUnit: 0.09,

  // Compute - Cloud
  useCloudGeneralVm: false,
  useCloudComputeVm: false,
  useCloudMemoryVm: false,
  useCloudStorageVm: false,

  // Compute - On-Prem
  useOnPremCpu: false,
  useOnPremMotherboard: false,
  useOnPremMemory: false,
  useOnPremChassis: false,
  useOnPremRacks: false,

  // Energy
  useOnPremPowerConsumption: false,
  useOnPremUps: false,
  useOnPremGenerator: false,
  useOnPremHvac: false,
  useOnPremColocation: false,

  // GPU
  useCloudTrainingGpu: false,
  useCloudInferenceGpu: false,
  useOnPremTrainingGpu: false,
  useOnPremInferenceGpu: false,

  // Human Resources - On-Prem
  onPremSysAdminCount: 0,
  onPremNetworkEngineerCount: 0,
  onPremStorageAdminCount: 0,
  onPremSecurityEngineerCount: 0,
  onPremDatabaseAdminCount: 0,
  onPremDataCenterTechCount: 0,

  // Human Resources - Cloud
  cloudDevOpsEngineerCount: 0,
  cloudCloudArchitectCount: 0,
  cloudSiteReliabilityEngineerCount: 0,
  cloudCloudSecurityEngineerCount: 0,
  cloudCloudDatabaseAdminCount: 0,

  // Networking - On-Prem
  useOnPremCoreSwitch: false,
  useOnPremAggregationSwitch: false,
  useOnPremAccessSwitch: false,
  useOnPremCabling: false,
  useOnPremQsfp: false,
  useOnPremBandwidth: false,
  useOnPremCdn: false,

  // Software - On-Prem
  useOnPremVirtualization: false,
  useOnPremOperatingSystem: false,
  useOnPremStorage: false,
  useOnPremBackupSoftware: false,
  useOnPremMonitoring: false,
  useOnPremSecurity: false,

  // Software - Cloud
  useCloudDatabase: false,
  useCloudOperatingSystem: false,
  useCloudAnalytics: false,
  useCloudTelemetry: false,
  useCloudMonitoring: false,
  useCloudSecurity: false,

  // Storage - On-Prem
  useOnPremHdd: false,
  useOnPremSsd: false,
  useOnPremBackup: false,

  // Security & Compliance
  useCertSoc2: false,
  useCertIso27001: false,
  useCertHipaa: false,
  useCertPciDss: false,
  useCertGdpr: false,
  useDdosProtection: false,
  useWaf: false,
  useBotProtection: false,
  useSecurityAudits: false,
  usePenetrationTesting: false,
}
