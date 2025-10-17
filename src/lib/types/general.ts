import { z } from 'zod'

export const GeneralSchema = z.object({
  analysisPeriod: z
    .number({ required_error: 'Analysis period is required.' })
    .min(1, 'Must be at least 1 year.')
    .max(30, 'Cannot exceed 30 years.'),
  inflationRate: z
    .number({ required_error: 'Inflation rate is required.' })
    .min(0, 'Inflation must be a positive number.')
    .max(100, 'Inflation rate seems too high.'),
  calculationMode: z.enum(['tco', 'amortized']),
  enableSensitivityAnalysis: z.boolean().default(false),
  sensitivityVariable: z.string().optional(),
  sensitivityRangePercent: z.number().min(1).max(100).default(20),
})

export type GeneralValues = z.infer<typeof GeneralSchema>
