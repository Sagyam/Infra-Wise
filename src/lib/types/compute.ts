import { z } from 'zod'

// Reusable schema helpers
const optionalBoolean = () => z.boolean().optional()
const optionalNumber = () => z.number().min(0).optional()
const optionalInt = () => z.number().int().min(0).optional()
const optionalPercentage = () => z.number().min(0).max(100).optional()

export const OnPremComputeSchema = z.object({
  // CPU/Processors
  useOnPremCpu: optionalBoolean(),
  onPremCpuQuantity: optionalInt(),
  onPremCpuUnitCost: optionalNumber(),
  onPremCpuSalvageValue: optionalPercentage(),
  // Motherboards/Servers
  useOnPremMotherboard: optionalBoolean(),
  onPremMotherboardQuantity: optionalInt(),
  onPremMotherboardUnitCost: optionalNumber(),
  onPremMotherboardSalvageValue: optionalPercentage(),
  // RAM/Memory
  useOnPremMemory: optionalBoolean(),
  onPremMemoryCapacityGb: optionalNumber(),
  onPremMemoryCostPerGb: optionalNumber(),
  onPremMemorySalvageValue: optionalPercentage(),
  // Chassis/Enclosures
  useOnPremChassis: optionalBoolean(),
  onPremChassisQuantity: optionalInt(),
  onPremChassisUnitCost: optionalNumber(),
  onPremChassisSalvageValue: optionalPercentage(),
  // Racks & Cabinets
  useOnPremRacks: optionalBoolean(),
  onPremRacksQuantity: optionalInt(),
  onPremRacksUnitCost: optionalNumber(),
  onPremRacksSalvageValue: optionalPercentage(),
})

export const CloudComputeSchema = z.object({
  // General Purpose VMs
  useCloudGeneralVm: optionalBoolean(),
  cloudGeneralVmCount: optionalInt(),
  cloudGeneralVmHourlyRate: optionalNumber(),
  cloudGeneralVmHoursPerMonth: z.number().min(0).max(744).optional(),
  // Compute Optimized VMs
  useCloudComputeVm: optionalBoolean(),
  cloudComputeVmCount: optionalInt(),
  cloudComputeVmHourlyRate: optionalNumber(),
  cloudComputeVmHoursPerMonth: z.number().min(0).max(744).optional(),
  // Memory Optimized VMs
  useCloudMemoryVm: optionalBoolean(),
  cloudMemoryVmCount: optionalInt(),
  cloudMemoryVmHourlyRate: optionalNumber(),
  cloudMemoryVmHoursPerMonth: z.number().min(0).max(744).optional(),
  // Storage Optimized VMs
  useCloudStorageVm: optionalBoolean(),
  cloudStorageVmCount: optionalInt(),
  cloudStorageVmHourlyRate: optionalNumber(),
  cloudStorageVmHoursPerMonth: z.number().min(0).max(744).optional(),
})

export type OnPremComputeValues = z.infer<typeof OnPremComputeSchema>
export type CloudComputeValues = z.infer<typeof CloudComputeSchema>
