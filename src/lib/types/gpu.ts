import { z } from 'zod'

export const GpuSchema = z.object({
  // On-Premise Training GPUs
  useOnPremTrainingGpu: z.boolean().optional(),
  onPremTrainingGpuQuantity: z.number().int().min(0).optional(),
  onPremTrainingGpuUnitCost: z.number().min(0).optional(),
  // On-Premise Inference GPUs
  useOnPremInferenceGpu: z.boolean().optional(),
  onPremInferenceGpuQuantity: z.number().int().min(0).optional(),
  onPremInferenceGpuUnitCost: z.number().min(0).optional(),
  // Cloud Training GPUs
  useCloudTrainingGpu: z.boolean().optional(),
  cloudTrainingGpuCount: z.number().int().min(0).optional(),
  cloudTrainingGpuHourlyRate: z.number().min(0).optional(),
  cloudTrainingGpuHoursPerMonth: z.number().min(0).max(744).optional(),
  // Cloud Inference GPUs
  useCloudInferenceGpu: z.boolean().optional(),
  cloudInferenceGpuCount: z.number().int().min(0).optional(),
  cloudInferenceGpuHourlyRate: z.number().min(0).optional(),
  cloudInferenceGpuHoursPerMonth: z.number().min(0).max(744).optional(),
})

export type GpuValues = z.infer<typeof GpuSchema>
