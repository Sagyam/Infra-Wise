import { z } from 'zod'

export const StorageSchema = z.object({
  // On-Premise HDD
  useOnPremHdd: z.boolean().optional(),
  onPremHddCount: z.number().int().min(0).optional(),
  onPremHddSizeTb: z.number().min(0).optional(),
  onPremHddRaidFactor: z.number().min(0).max(50).optional(),
  onPremHddFailureRate: z.number().min(0).max(100).optional(),
  onPremHddUnitCost: z.number().min(0).optional(),
  // On-Premise SSD
  useOnPremSsd: z.boolean().optional(),
  onPremSsdCount: z.number().int().min(0).optional(),
  onPremSsdSizeTb: z.number().min(0).optional(),
  onPremSsdRaidFactor: z.number().min(0).max(50).optional(),
  onPremSsdFailureRate: z.number().min(0).max(100).optional(),
  onPremSsdUnitCost: z.number().min(0).optional(),
  // On-Premise Backup
  useOnPremBackup: z.boolean().optional(),
  onPremBackupStorage: z
    .number({ invalid_type_error: 'Backup storage must be a number.' })
    .min(0, 'Storage must be a positive number.')
    .optional(),
  onPremBackupCostPerUnit: z
    .number({ invalid_type_error: 'Backup cost must be a number.' })
    .min(0, 'Cost must be a positive number.')
    .optional(),
  // On-Premise Replication
  useOnPremReplication: z.boolean().optional(),
  onPremReplicationFactor: z.number().int().min(0).max(10).optional(),
  // Cloud Storage
  cloudStorageSize: z
    .number({ required_error: 'Storage size is required.' })
    .min(0, 'Storage size must be a positive number.'),
  cloudGrowthRate: z
    .number({ required_error: 'Growth rate is required.' })
    .min(0, 'Growth rate must be between 0 and 100.')
    .max(100),
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
})

export type StorageValues = z.infer<typeof StorageSchema>
