import { z } from 'zod'

export const EnergySchema = z.object({
  // Power Consumption
  useOnPremPowerConsumption: z.boolean().optional(),
  onPremPowerRating: z
    .number({ invalid_type_error: 'Power rating must be a number.' })
    .min(0, 'Power rating must be a positive number.')
    .optional(),
  onPremLoadFactor: z
    .number({ invalid_type_error: 'Load factor must be a number.' })
    .min(0, 'Load factor must be between 0 and 100.')
    .max(100, 'Load factor must be between 0 and 100.')
    .optional(),
  onPremElectricityCost: z
    .number({ invalid_type_error: 'Electricity cost must be a number.' })
    .min(0, 'Cost must be a positive number.')
    .optional(),
  // UPS
  useOnPremUps: z.boolean().optional(),
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
  // Generators
  useOnPremGenerator: z.boolean().optional(),
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
  // HVAC
  useOnPremHvac: z.boolean().optional(),
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
  // Colocation
  useOnPremColocation: z.boolean().optional(),
  onPremColocationMonthlyCost: z
    .number({ invalid_type_error: 'Colocation monthly cost must be a number.' })
    .min(0, 'Cost must be a positive number.')
    .optional(),
  onPremColocationAnnualIncrease: z
    .number({ invalid_type_error: 'Annual increase must be a number.' })
    .min(0, 'Rate must be a positive number.')
    .max(100, 'Rate cannot exceed 100%.')
    .optional(),
})

export type EnergyValues = z.infer<typeof EnergySchema>
