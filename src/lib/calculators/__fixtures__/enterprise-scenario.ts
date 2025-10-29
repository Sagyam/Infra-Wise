import type { CostFormValues } from '@/lib/types'

/**
 * Large enterprise scenario
 * - 10-year analysis
 * - Significant on-prem infrastructure
 * - Hybrid cloud deployment
 * - Large team with specialized roles
 * - Full security & compliance requirements
 */
export const enterpriseScenario: CostFormValues = {
  // General
  analysisPeriod: 10,
  inflationRate: 2.5,
  calculationMode: 'tco',
  enableSensitivityAnalysis: false,
  sensitivityRangePercent: 20,

  // Storage (large scale)
  cloudStorageSize: 500,
  cloudGrowthRate: 15,
  cloudHotTier: 20,
  cloudStandardTier: 50,
  cloudArchiveTier: 30,
  cloudHotStorageCost: 0.023,
  cloudStandardStorageCost: 0.01,
  cloudArchiveStorageCost: 0.004,
  cloudEgress: 100,
  cloudEgressGrowthRate: 10,
  cloudEgressCostPerUnit: 0.09,

  // Compute - Cloud (hybrid approach)
  useCloudGeneralVm: true,
  cloudGeneralVmCount: 50,
  cloudGeneralVmHourlyRate: 0.5,
  cloudGeneralVmHoursPerMonth: 730,

  useCloudComputeVm: true,
  cloudComputeVmCount: 30,
  cloudComputeVmHourlyRate: 1.2,
  cloudComputeVmHoursPerMonth: 730,

  useCloudMemoryVm: true,
  cloudMemoryVmCount: 20,
  cloudMemoryVmHourlyRate: 1.5,
  cloudMemoryVmHoursPerMonth: 730,

  useCloudStorageVm: true,
  cloudStorageVmCount: 10,
  cloudStorageVmHourlyRate: 0.8,
  cloudStorageVmHoursPerMonth: 730,

  // Compute - On-Prem (enterprise datacenter)
  useOnPremCpu: true,
  onPremCpuQuantity: 100,
  onPremCpuUnitCost: 3000,

  useOnPremMotherboard: true,
  onPremMotherboardQuantity: 100,
  onPremMotherboardUnitCost: 800,

  useOnPremMemory: true,
  onPremMemoryCapacityGb: 10240,
  onPremMemoryCostPerGb: 2.5,

  useOnPremChassis: true,
  onPremChassisQuantity: 50,
  onPremChassisUnitCost: 2000,

  useOnPremRacks: true,
  onPremRacksQuantity: 20,
  onPremRacksUnitCost: 5000,

  // Energy (full on-prem datacenter)
  useOnPremPowerConsumption: true,
  onPremPowerRating: 500000,
  onPremLoadFactor: 70,
  onPremElectricityCost: 0.12,

  useOnPremUps: true,
  onPremUpsQuantity: 4,
  onPremUpsUnitCost: 50000,
  onPremUpsBatteryFailureRate: 10,
  onPremUpsBatteryReplacementCost: 5000,

  useOnPremGenerator: true,
  onPremGeneratorQuantity: 2,
  onPremGeneratorUnitCost: 100000,
  onPremGeneratorFuelConsumptionRate: 10,
  onPremGeneratorFuelUnitCost: 3.5,
  onPremGeneratorAnnualUsageHours: 100,

  useOnPremHvac: true,
  onPremHvacQuantity: 4,
  onPremHvacUnitCost: 75000,
  onPremHvacPowerConsumption: 50000,
  onPremHvacLoadFactor: 80,
  onPremHvacTechnicianHourlyRate: 75,
  onPremHvacHoursWorked: 500,

  useOnPremColocation: false,

  // GPU (AI/ML workloads)
  useCloudTrainingGpu: true,
  cloudTrainingGpuCount: 10,
  cloudTrainingGpuHourlyRate: 8,
  cloudTrainingGpuHoursPerMonth: 500,

  useCloudInferenceGpu: true,
  cloudInferenceGpuCount: 20,
  cloudInferenceGpuHourlyRate: 4,
  cloudInferenceGpuHoursPerMonth: 730,

  useOnPremTrainingGpu: true,
  onPremTrainingGpuQuantity: 50,
  onPremTrainingGpuUnitCost: 15000,

  useOnPremInferenceGpu: true,
  onPremInferenceGpuQuantity: 100,
  onPremInferenceGpuUnitCost: 8000,

  // Human Resources - On-Prem (large team)
  onPremSysAdminCount: 10,
  onPremSysAdminSalary: 90000,
  onPremSysAdminSalaryIncrement: 3,

  onPremNetworkEngineerCount: 5,
  onPremNetworkEngineerSalary: 95000,
  onPremNetworkEngineerSalaryIncrement: 3,

  onPremStorageAdminCount: 4,
  onPremStorageAdminSalary: 88000,
  onPremStorageAdminSalaryIncrement: 3,

  onPremSecurityEngineerCount: 6,
  onPremSecurityEngineerSalary: 110000,
  onPremSecurityEngineerSalaryIncrement: 4,

  onPremDatabaseAdminCount: 8,
  onPremDatabaseAdminSalary: 105000,
  onPremDatabaseAdminSalaryIncrement: 3,

  onPremDataCenterTechCount: 12,
  onPremDataCenterTechSalary: 65000,
  onPremDataCenterTechSalaryIncrement: 2.5,

  // Human Resources - Cloud
  cloudDevOpsEngineerCount: 15,
  cloudDevOpsEngineerSalary: 130000,
  cloudDevOpsEngineerSalaryIncrement: 4,

  cloudCloudArchitectCount: 8,
  cloudCloudArchitectSalary: 160000,
  cloudCloudArchitectSalaryIncrement: 4,

  cloudSiteReliabilityEngineerCount: 10,
  cloudSiteReliabilityEngineerSalary: 140000,
  cloudSiteReliabilityEngineerSalaryIncrement: 4,

  cloudCloudSecurityEngineerCount: 6,
  cloudCloudSecurityEngineerSalary: 135000,
  cloudCloudSecurityEngineerSalaryIncrement: 4,

  cloudCloudDatabaseAdminCount: 5,
  cloudCloudDatabaseAdminSalary: 125000,
  cloudCloudDatabaseAdminSalaryIncrement: 3.5,

  // Networking - On-Prem (enterprise network)
  useOnPremCoreSwitch: true,
  onPremCoreSwitchQuantity: 4,
  onPremCoreSwitchUnitCost: 50000,

  useOnPremAggregationSwitch: true,
  onPremAggregationSwitchQuantity: 8,
  onPremAggregationSwitchUnitCost: 25000,

  useOnPremAccessSwitch: true,
  onPremAccessSwitchQuantity: 40,
  onPremAccessSwitchUnitCost: 5000,

  useOnPremCabling: true,
  onPremCablingLength: 10000,
  onPremCablingUnitPrice: 2,

  useOnPremQsfp: true,
  onPremQsfpQuantity: 100,
  onPremQsfpUnitCost: 500,

  useOnPremBandwidth: true,
  onPremBandwidthUsage: 50000,
  onPremBandwidthCostPerGb: 0.02,
  onPremAnnualTrafficGrowth: 12,

  useOnPremCdn: true,
  onPremCdnUsage: 20000,
  onPremCdnCostPerGb: 0.05,

  // Software - On-Prem (enterprise licenses)
  useOnPremVirtualization: true,
  onPremVirtualizationUnitCost: 500,
  onPremVirtualizationLicenses: 100,

  useOnPremOperatingSystem: true,
  onPremOperatingSystemUnitCost: 200,
  onPremOperatingSystemLicenses: 100,

  useOnPremStorage: true,
  onPremStorageUnitCost: 1000,
  onPremStorageLicenses: 50,

  useOnPremBackupSoftware: true,
  onPremBackupSoftwareUnitCost: 800,
  onPremBackupSoftwareLicenses: 50,

  useOnPremMonitoring: true,
  onPremMonitoringUnitCost: 300,
  onPremMonitoringLicenses: 100,

  useOnPremSecurity: true,
  onPremSecurityUnitCost: 500,
  onPremSecurityLicenses: 100,

  // Software - Cloud
  useCloudDatabase: true,
  cloudDatabaseMonthlyCost: 5000,

  useCloudOperatingSystem: true,
  cloudOperatingSystemMonthlyCost: 2000,

  useCloudAnalytics: true,
  cloudAnalyticsMonthlyCost: 3000,

  useCloudTelemetry: true,
  cloudTelemetryMonthlyCost: 1500,

  useCloudMonitoring: true,
  cloudMonitoringMonthlyCost: 2500,

  useCloudSecurity: true,
  cloudSecurityMonthlyCost: 4000,

  // Storage - On-Prem (enterprise storage)
  useOnPremHdd: true,
  onPremHddCount: 500,
  onPremHddUnitCost: 200,
  onPremHddFailureRate: 4,

  useOnPremSsd: true,
  onPremSsdCount: 200,
  onPremSsdUnitCost: 400,
  onPremSsdFailureRate: 2,

  useOnPremBackup: true,
  onPremBackupStorage: 200,
  onPremBackupCostPerUnit: 0.015,

  // Security & Compliance (full compliance)
  useCertSoc2: true,
  certSoc2Cost: 50000,
  certSoc2CostType: 'recurring',

  useCertIso27001: true,
  certIso27001Cost: 75000,
  certIso27001CostType: 'recurring',

  useCertHipaa: true,
  certHipaaCost: 100000,
  certHipaaCostType: 'recurring',

  useCertPciDss: true,
  certPciDssCost: 80000,
  certPciDssCostType: 'recurring',

  useCertGdpr: true,
  certGdprCost: 60000,
  certGdprCostType: 'recurring',

  useDdosProtection: true,
  ddosProtectionCost: 10000,
  ddosProtectionCostType: 'recurring',

  useWaf: true,
  wafCost: 5000,
  wafCostType: 'recurring',

  useBotProtection: true,
  botProtectionCost: 3000,
  botProtectionCostType: 'recurring',

  useSecurityAudits: true,
  securityAuditsCost: 50000,
  securityAuditsCostType: 'recurring',

  usePenetrationTesting: true,
  penetrationTestingCost: 75000,
  penetrationTestingCostType: 'recurring',
}
