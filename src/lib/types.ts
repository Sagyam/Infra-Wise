import {z} from 'zod'

export const CostFormSchema = z
  .object({
    analysisPeriod: z
      .number({ required_error: 'Analysis period is required.' })
      .min(1, 'Must be at least 1 year.')
      .max(30, 'Cannot exceed 30 years.'),
    dataUnit: z.enum(['GB', 'TB', 'PB'], {
      required_error: 'Data unit is required.',
    }),

    // On-premise
    onPremHardwareCost: z
      .number({ required_error: 'Hardware cost is required.' })
      .min(0, 'Cost must be a positive number.'),
    onPremSalvageValue: z.number().min(0).max(100).default(0),
    onPremYearlyLicensingCost: z
      .number({ required_error: 'Licensing cost is required.' })
      .min(0, 'Cost must be a positive number.'),
    onPremPowerRating: z
      .number({ required_error: 'Power rating is required.' })
      .min(0, 'Power rating must be a positive number.'),
    onPremLoadFactor: z
      .number({ required_error: 'Load factor is required.' })
      .min(0, 'Load factor must be between 0 and 100.')
      .max(100, 'Load factor must be between 0 and 100.'),
    onPremElectricityCost: z
      .number({ required_error: 'Electricity cost is required.' })
      .min(0, 'Cost must be a positive number.'),
    onPremUpsUnitCost: z
      .number({ invalid_type_error: 'UPS unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    onPremUpsQuantity: z
      .number({ invalid_type_error: 'UPS quantity must be a number.' })
      .int('Must be a whole number.')
      .min(0, 'Quantity must be a positive number.')
      .optional(),
    onPremUpsBatteryFailureRate: z
      .number({ invalid_type_error: 'Battery failure rate must be a number.' })
      .min(0, 'Rate must be a positive number.')
      .max(100, 'Rate cannot exceed 100%.')
      .optional(),
    onPremUpsBatteryReplacementCost: z
      .number({ invalid_type_error: 'Battery replacement cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    onPremGeneratorUnitCost: z
      .number({ invalid_type_error: 'Generator unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    onPremGeneratorQuantity: z
      .number({ invalid_type_error: 'Generator quantity must be a number.' })
      .int('Must be a whole number.')
      .min(0, 'Quantity must be a positive number.')
      .optional(),
    onPremGeneratorFuelConsumptionRate: z
      .number({ invalid_type_error: 'Fuel consumption rate must be a number.' })
      .min(0, 'Rate must be a positive number.')
      .optional(),
    onPremGeneratorFuelUnitCost: z
      .number({ invalid_type_error: 'Fuel unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    onPremGeneratorAnnualUsageHours: z
      .number({ invalid_type_error: 'Annual usage hours must be a number.' })
      .min(0, 'Hours must be a positive number.')
      .optional(),
    onPremHvacUnitCost: z
      .number({ invalid_type_error: 'HVAC unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    onPremHvacQuantity: z
      .number({ invalid_type_error: 'HVAC quantity must be a number.' })
      .int('Must be a whole number.')
      .min(0, 'Quantity must be a positive number.')
      .optional(),
    onPremHvacPowerConsumption: z
      .number({ invalid_type_error: 'HVAC power consumption must be a number.' })
      .min(0, 'Power consumption must be a positive number.')
      .optional(),
    onPremHvacLoadFactor: z
      .number({ invalid_type_error: 'HVAC load factor must be a number.' })
      .min(0, 'Load factor must be between 0 and 100.')
      .max(100, 'Load factor must be between 0 and 100.')
      .optional(),
    onPremHvacTechnicianHourlyRate: z
      .number({ invalid_type_error: 'Technician hourly rate must be a number.' })
      .min(0, 'Rate must be a positive number.')
      .optional(),
    onPremHvacHoursWorked: z
      .number({ invalid_type_error: 'Hours worked must be a number.' })
      .min(0, 'Hours must be a positive number.')
      .optional(),
    onPremDriveFailureRate: z
      .number({ required_error: 'Drive failure rate is required.' })
      .min(0, 'Rate must be a positive number.')
      .max(100, 'Rate cannot exceed 100%.'),
    onPremDriveReplacementCost: z
      .number({ required_error: 'Drive replacement cost is required.' })
      .min(0, 'Cost must be a positive number.'),
    onPremTotalDrives: z
      .number({ required_error: 'Total drives is required.' })
      .int('Must be a whole number.')
      .min(1, 'There must be at least one drive.'),
    onPremStoragePerDrive: z
      .number({ required_error: 'Storage per drive is required.' })
      .min(0, 'Storage must be a positive number.'),
    onPremRaidFactor: z
      .number()
      .min(0)
      .max(50, 'RAID capacity loss cannot exceed 50%.'),
    useOnPremSoftware: z.boolean().optional(),
    useOnPremBandwidth: z.boolean().optional(),
    onPremBandwidthUsage: z.number().min(0).optional(),
    onPremBandwidthCostPerGb: z.number().min(0).optional(),
    onPremAnnualTrafficGrowth: z.number().min(0).max(100).optional(),
    useOnPremCdn: z.boolean().optional(),
    onPremCdnUsage: z
      .number({ invalid_type_error: 'CDN usage must be a number.' })
      .min(0, 'Usage must be a positive number.')
      .optional(),
    onPremCdnCostPerGb: z
      .number({ invalid_type_error: 'CDN cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    useOnPremCoreSwitch: z.boolean().optional(),
    onPremCoreSwitchQuantity: z
      .number({ invalid_type_error: 'Core switch quantity must be a number.' })
      .int('Must be a whole number.')
      .min(0, 'Quantity must be a positive number.')
      .optional(),
    onPremCoreSwitchUnitCost: z
      .number({ invalid_type_error: 'Core switch unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    useOnPremAggregationSwitch: z.boolean().optional(),
    onPremAggregationSwitchQuantity: z
      .number({ invalid_type_error: 'Aggregation switch quantity must be a number.' })
      .int('Must be a whole number.')
      .min(0, 'Quantity must be a positive number.')
      .optional(),
    onPremAggregationSwitchUnitCost: z
      .number({ invalid_type_error: 'Aggregation switch unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    useOnPremAccessSwitch: z.boolean().optional(),
    onPremAccessSwitchQuantity: z
      .number({ invalid_type_error: 'Access switch quantity must be a number.' })
      .int('Must be a whole number.')
      .min(0, 'Quantity must be a positive number.')
      .optional(),
    onPremAccessSwitchUnitCost: z
      .number({ invalid_type_error: 'Access switch unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    useOnPremCabling: z.boolean().optional(),
    onPremCablingLength: z
      .number({ invalid_type_error: 'Cabling length must be a number.' })
      .min(0, 'Length must be a positive number.')
      .optional(),
    onPremCablingUnitPrice: z
      .number({ invalid_type_error: 'Cabling unit price must be a number.' })
      .min(0, 'Price must be a positive number.')
      .optional(),
    useOnPremQsfp: z.boolean().optional(),
    onPremQsfpQuantity: z
      .number({ invalid_type_error: 'QSFP quantity must be a number.' })
      .int('Must be a whole number.')
      .min(0, 'Quantity must be a positive number.')
      .optional(),
    onPremQsfpUnitCost: z
      .number({ invalid_type_error: 'QSFP unit cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    useOnPremBackup: z.boolean().optional(),
    onPremBackupStorage: z
      .number({ invalid_type_error: 'Backup storage must be a number.' })
      .min(0, 'Storage must be a positive number.')
      .optional(),
    onPremBackupCostPerUnit: z
      .number({ invalid_type_error: 'Backup cost must be a number.' })
      .min(0, 'Cost must be a positive number.')
      .optional(),
    useOnPremReplication: z.boolean().optional(),
    onPremReplicationFactor: z.number().int().min(0).max(10).optional(),

    // Human Costs - On-Premise
    useOnPremSysAdmin: z.boolean().optional(),
    onPremSysAdminCount: z.number().int().min(0).optional(),
    onPremSysAdminSalary: z.number().min(0).optional(),
    onPremSysAdminSalaryIncrement: z.number().min(0).max(100).optional(),
    useOnPremNetworkEngineer: z.boolean().optional(),
    onPremNetworkEngineerCount: z.number().int().min(0).optional(),
    onPremNetworkEngineerSalary: z.number().min(0).optional(),
    onPremNetworkEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
    useOnPremStorageAdmin: z.boolean().optional(),
    onPremStorageAdminCount: z.number().int().min(0).optional(),
    onPremStorageAdminSalary: z.number().min(0).optional(),
    onPremStorageAdminSalaryIncrement: z.number().min(0).max(100).optional(),
    useOnPremSecurityEngineer: z.boolean().optional(),
    onPremSecurityEngineerCount: z.number().int().min(0).optional(),
    onPremSecurityEngineerSalary: z.number().min(0).optional(),
    onPremSecurityEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
    useOnPremDatabaseAdmin: z.boolean().optional(),
    onPremDatabaseAdminCount: z.number().int().min(0).optional(),
    onPremDatabaseAdminSalary: z.number().min(0).optional(),
    onPremDatabaseAdminSalaryIncrement: z.number().min(0).max(100).optional(),
    useOnPremDataCenterTech: z.boolean().optional(),
    onPremDataCenterTechCount: z.number().int().min(0).optional(),
    onPremDataCenterTechSalary: z.number().min(0).optional(),
    onPremDataCenterTechSalaryIncrement: z.number().min(0).max(100).optional(),

    // Human Costs - Cloud
    useCloudDevOpsEngineer: z.boolean().optional(),
    cloudDevOpsEngineerCount: z.number().int().min(0).optional(),
    cloudDevOpsEngineerSalary: z.number().min(0).optional(),
    cloudDevOpsEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
    useCloudCloudArchitect: z.boolean().optional(),
    cloudCloudArchitectCount: z.number().int().min(0).optional(),
    cloudCloudArchitectSalary: z.number().min(0).optional(),
    cloudCloudArchitectSalaryIncrement: z.number().min(0).max(100).optional(),
    useCloudSiteReliabilityEngineer: z.boolean().optional(),
    cloudSiteReliabilityEngineerCount: z.number().int().min(0).optional(),
    cloudSiteReliabilityEngineerSalary: z.number().min(0).optional(),
    cloudSiteReliabilityEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
    useCloudCloudSecurityEngineer: z.boolean().optional(),
    cloudCloudSecurityEngineerCount: z.number().int().min(0).optional(),
    cloudCloudSecurityEngineerSalary: z.number().min(0).optional(),
    cloudCloudSecurityEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
    useCloudCloudDatabaseAdmin: z.boolean().optional(),
    cloudCloudDatabaseAdminCount: z.number().int().min(0).optional(),
    cloudCloudDatabaseAdminSalary: z.number().min(0).optional(),
    cloudCloudDatabaseAdminSalaryIncrement: z.number().min(0).max(100).optional(),

    // Cloud
    cloudStorageSize: z
      .number({ required_error: 'Storage size is required.' })
      .min(0, 'Storage size must be a positive number.'),
    cloudGrowthRate: z
      .number({ required_error: 'Growth rate is required.' })
      .min(0, 'Growth rate must be between 0 and 100.')
      .max(100),
    cloudEgress: z
      .number({ required_error: 'Egress is required.' })
      .min(0, 'Egress must be a positive number.'),
    cloudEgressGrowthRate: z.number().min(0).max(100),
    cloudHotTier: z.number().min(0).max(100),
    cloudStandardTier: z.number().min(0).max(100),
    cloudArchiveTier: z.number().min(0).max(100),
    cloudHotStorageCost: z
      .number({ required_error: 'Hot storage cost is required.' })
      .min(0, 'Cost must be a positive number.'),
    cloudStandardStorageCost: z
      .number({ required_error: 'Standard storage cost is required.' })
      .min(0, 'Cost must be a positive number.'),
    cloudArchiveStorageCost: z
      .number({ required_error: 'Archive storage cost is required.' })
      .min(0, 'Cost must be a positive number.'),
    cloudEgressCostPerUnit: z
      .number({ required_error: 'Egress cost is required.' })
      .min(0, 'Cost must be a positive number.'),

    // General
    inflationRate: z
      .number({ required_error: 'Inflation rate is required.' })
      .min(0, 'Inflation must be a positive number.')
      .max(100, 'Inflation rate seems too high.'),
    calculationMode: z.enum(['tco', 'amortized']),
  })
  .refine(
    (data) =>
      data.cloudHotTier + data.cloudStandardTier + data.cloudArchiveTier ===
      100,
    {
      message:
        'Hot, Standard, and Archive tier percentages must add up to 100.',
      path: ['cloudArchiveTier'],
    },
  )

export type MakeCostFormValues = z.infer<typeof CostFormSchema>

export type CostBreakdown = {
  [key: string]: number | undefined
}

export type YearlyCost = {
  year: number
  onPremCost: number
  cloudCost: number
  cumulativeOnPrem: number
  cumulativeCloud: number
  onPremBreakdown: CostBreakdown
  cloudBreakdown: CostBreakdown
}

export type CalculationResult = {
  yearlyCosts: YearlyCost[]
  onPremTCO: number
  cloudTCO: number
  savings: number
  breakevenPoint: string | null
  calculationMode: 'tco' | 'amortized'
  analysisPeriod: number
}
