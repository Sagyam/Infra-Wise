import { z } from 'zod'

export const SoftwareSchema = z.object({
  // On-Premise Virtualization
  useOnPremVirtualization: z.boolean().optional(),
  onPremVirtualizationUnitCost: z.number().min(0).optional(),
  onPremVirtualizationLicenses: z.number().int().min(0).optional(),
  // On-Premise Operating System
  useOnPremOperatingSystem: z.boolean().optional(),
  onPremOperatingSystemUnitCost: z.number().min(0).optional(),
  onPremOperatingSystemLicenses: z.number().int().min(0).optional(),
  // On-Premise Storage Management
  useOnPremStorage: z.boolean().optional(),
  onPremStorageUnitCost: z.number().min(0).optional(),
  onPremStorageLicenses: z.number().int().min(0).optional(),
  useOnPremSoftware: z.boolean().optional(),
  // On-Premise Backup Software
  useOnPremBackupSoftware: z.boolean().optional(),
  onPremBackupSoftwareUnitCost: z.number().min(0).optional(),
  onPremBackupSoftwareLicenses: z.number().int().min(0).optional(),
  // On-Premise Monitoring
  useOnPremMonitoring: z.boolean().optional(),
  onPremMonitoringUnitCost: z.number().min(0).optional(),
  onPremMonitoringLicenses: z.number().int().min(0).optional(),
  // On-Premise Security
  useOnPremSecurity: z.boolean().optional(),
  onPremSecurityUnitCost: z.number().min(0).optional(),
  onPremSecurityLicenses: z.number().int().min(0).optional(),
  // Cloud Database
  useCloudDatabase: z.boolean().optional(),
  cloudDatabaseMonthlyCost: z.number().min(0).optional(),
  // Cloud Operating System
  useCloudOperatingSystem: z.boolean().optional(),
  cloudOperatingSystemMonthlyCost: z.number().min(0).optional(),
  // Cloud Analytics
  useCloudAnalytics: z.boolean().optional(),
  cloudAnalyticsMonthlyCost: z.number().min(0).optional(),
  // Cloud Telemetry
  useCloudTelemetry: z.boolean().optional(),
  cloudTelemetryMonthlyCost: z.number().min(0).optional(),
  // Cloud Monitoring
  useCloudMonitoring: z.boolean().optional(),
  cloudMonitoringMonthlyCost: z.number().min(0).optional(),
  // Cloud Security
  useCloudSecurity: z.boolean().optional(),
  cloudSecurityMonthlyCost: z.number().min(0).optional(),
})

export type SoftwareValues = z.infer<typeof SoftwareSchema>
