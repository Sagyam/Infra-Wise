import { z } from 'zod'

// Export all sub-schemas and types
export * from './shared'
export * from './general'
export * from './compute'
export * from './energy'
export * from './gpu'
export * from './human-resources'
export * from './networking'
export * from './software'
export * from './storage'
export * from './security-compliance'

// Import schemas for combining
import { GeneralSchema } from './general'
import { OnPremComputeSchema, CloudComputeSchema } from './compute'
import { EnergySchema } from './energy'
import { GpuSchema } from './gpu'
import { HumanResourcesSchema } from './human-resources'
import { NetworkingSchema } from './networking'
import { SoftwareSchema } from './software'
import { StorageSchema } from './storage'
import { SecurityComplianceSchema } from './security-compliance'

// Combine all schemas into the main CostFormSchema
export const CostFormSchema = GeneralSchema.merge(OnPremComputeSchema)
  .merge(CloudComputeSchema)
  .merge(EnergySchema)
  .merge(GpuSchema)
  .merge(HumanResourcesSchema)
  .merge(NetworkingSchema)
  .merge(SoftwareSchema)
  .merge(StorageSchema)
  .merge(SecurityComplianceSchema)
  .refine(
    (data) =>
      data.cloudHotTier + data.cloudStandardTier + data.cloudArchiveTier === 100,
    {
      message: 'Hot, Standard, and Archive tier percentages must add up to 100.',
      path: ['cloudArchiveTier'],
    },
  )

export type CostFormValues = z.infer<typeof CostFormSchema>
