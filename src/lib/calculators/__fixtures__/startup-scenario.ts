import type { CostFormValues } from '@/lib/types'

/**
 * Small startup scenario
 * - 5-year analysis
 * - Minimal on-prem hardware
 * - Moderate cloud usage
 * - Small team
 */
export const startupScenario: CostFormValues = {
  // General
  analysisPeriod: 5,
  inflationRate: 3,
  calculationMode: 'tco',
  enableSensitivityAnalysis: false,
  sensitivityRangePercent: 20,

  // Storage
  cloudStorageSize: 50,
  cloudGrowthRate: 20,
  cloudHotTier: 40,
  cloudStandardTier: 50,
  cloudArchiveTier: 10,
  cloudHotStorageCost: 0.023,
  cloudStandardStorageCost: 0.01,
  cloudArchiveStorageCost: 0.004,
  cloudEgress: 10,
  cloudEgressGrowthRate: 15,
  cloudEgressCostPerUnit: 0.09,

  // Compute - Cloud (startup uses cloud VMs)
  useCloudGeneralVm: true,
  cloudGeneralVmCount: 5,
  cloudGeneralVmHourlyRate: 0.5,
  cloudGeneralVmHoursPerMonth: 730,

  useCloudComputeVm: true,
  cloudComputeVmCount: 3,
  cloudComputeVmHourlyRate: 0.8,
  cloudComputeVmHoursPerMonth: 730,

  useCloudMemoryVm: false,
  useCloudStorageVm: false,

  // Compute - On-Prem (minimal)
  useOnPremCpu: true,
  onPremCpuQuantity: 2,
  onPremCpuUnitCost: 2000,

  useOnPremMotherboard: true,
  onPremMotherboardQuantity: 2,
  onPremMotherboardUnitCost: 500,

  useOnPremMemory: true,
  onPremMemoryCapacityGb: 256,
  onPremMemoryCostPerGb: 3,

  useOnPremChassis: true,
  onPremChassisQuantity: 2,
  onPremChassisUnitCost: 1000,

  useOnPremRacks: false,

  // Energy (colocation for startup)
  useOnPremPowerConsumption: false,
  useOnPremUps: false,
  useOnPremGenerator: false,
  useOnPremHvac: false,

  useOnPremColocation: true,
  onPremColocationMonthlyCost: 500,
  onPremColocationAnnualIncrease: 3,

  // GPU (none for startup)
  useCloudTrainingGpu: false,
  useCloudInferenceGpu: false,
  useOnPremTrainingGpu: false,
  useOnPremInferenceGpu: false,

  // Human Resources - On-Prem
  onPremSysAdminCount: 1,
  onPremSysAdminSalary: 80000,
  onPremSysAdminSalaryIncrement: 3,

  onPremNetworkEngineerCount: 0,
  onPremStorageAdminCount: 0,
  onPremSecurityEngineerCount: 0,
  onPremDatabaseAdminCount: 0,
  onPremDataCenterTechCount: 0,

  // Human Resources - Cloud
  cloudDevOpsEngineerCount: 2,
  cloudDevOpsEngineerSalary: 120000,
  cloudDevOpsEngineerSalaryIncrement: 4,

  cloudCloudArchitectCount: 1,
  cloudCloudArchitectSalary: 150000,
  cloudCloudArchitectSalaryIncrement: 4,

  cloudSiteReliabilityEngineerCount: 0,
  cloudCloudSecurityEngineerCount: 0,
  cloudCloudDatabaseAdminCount: 0,

  // Networking - On-Prem (minimal)
  useOnPremCoreSwitch: false,
  useOnPremAggregationSwitch: false,
  useOnPremAccessSwitch: false,
  useOnPremCabling: false,
  useOnPremQsfp: false,
  useOnPremBandwidth: false,
  useOnPremCdn: false,

  // Software - On-Prem
  useOnPremVirtualization: true,
  onPremVirtualizationUnitCost: 200,
  onPremVirtualizationLicenses: 2,

  useOnPremOperatingSystem: true,
  onPremOperatingSystemUnitCost: 100,
  onPremOperatingSystemLicenses: 2,

  useOnPremStorage: false,
  useOnPremBackupSoftware: false,

  useOnPremMonitoring: true,
  onPremMonitoringUnitCost: 50,
  onPremMonitoringLicenses: 2,

  useOnPremSecurity: false,

  // Software - Cloud
  useCloudDatabase: true,
  cloudDatabaseMonthlyCost: 200,

  useCloudOperatingSystem: false,
  useCloudAnalytics: false,
  useCloudTelemetry: false,

  useCloudMonitoring: true,
  cloudMonitoringMonthlyCost: 100,

  useCloudSecurity: true,
  cloudSecurityMonthlyCost: 150,

  // Storage - On-Prem
  useOnPremHdd: true,
  onPremHddCount: 4,
  onPremHddUnitCost: 150,
  onPremHddFailureRate: 5,

  useOnPremSsd: true,
  onPremSsdCount: 2,
  onPremSsdUnitCost: 300,
  onPremSsdFailureRate: 2,

  useOnPremBackup: false,

  // Security & Compliance (minimal for startup)
  useCertSoc2: false,
  useCertIso27001: false,
  useCertHipaa: false,
  useCertPciDss: false,
  useCertGdpr: false,

  useDdosProtection: true,
  ddosProtectionCost: 2000,
  ddosProtectionCostType: 'recurring',

  useWaf: true,
  wafCost: 1000,
  wafCostType: 'recurring',

  useBotProtection: false,
  useSecurityAudits: false,
  usePenetrationTesting: false,
}
