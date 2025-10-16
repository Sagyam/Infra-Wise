import { z } from 'zod'

export const NetworkingSchema = z.object({
  // On-Premise Bandwidth
  useOnPremBandwidth: z.boolean().optional(),
  onPremBandwidthUsage: z.number().min(0).optional(),
  onPremBandwidthCostPerGb: z.number().min(0).optional(),
  onPremAnnualTrafficGrowth: z.number().min(0).max(100).optional(),
  // On-Premise CDN
  useOnPremCdn: z.boolean().optional(),
  onPremCdnUsage: z
    .number({ invalid_type_error: 'CDN usage must be a number.' })
    .min(0, 'Usage must be a positive number.')
    .optional(),
  onPremCdnCostPerGb: z
    .number({ invalid_type_error: 'CDN cost must be a number.' })
    .min(0, 'Cost must be a positive number.')
    .optional(),
  // On-Premise Core Switch
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
  onPremCoreSwitchSalvageValue: z.number().min(0).max(100).optional(),
  // On-Premise Aggregation Switch
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
  onPremAggregationSwitchSalvageValue: z.number().min(0).max(100).optional(),
  // On-Premise Access Switch
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
  onPremAccessSwitchSalvageValue: z.number().min(0).max(100).optional(),
  // On-Premise Cabling
  useOnPremCabling: z.boolean().optional(),
  onPremCablingLength: z
    .number({ invalid_type_error: 'Cabling length must be a number.' })
    .min(0, 'Length must be a positive number.')
    .optional(),
  onPremCablingUnitPrice: z
    .number({ invalid_type_error: 'Cabling unit price must be a number.' })
    .min(0, 'Price must be a positive number.')
    .optional(),
  onPremCablingSalvageValue: z.number().min(0).max(100).optional(),
  // On-Premise QSFP
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
  onPremQsfpSalvageValue: z.number().min(0).max(100).optional(),
  // Cloud Egress
  useCloudEgress: z.boolean().optional(),
  cloudEgress: z
    .number({ required_error: 'Egress is required.' })
    .min(0, 'Egress must be a positive number.')
    .optional(),
  cloudEgressGrowthRate: z.number().min(0).max(100).optional(),
  cloudEgressCostPerUnit: z
    .number({ required_error: 'Egress cost is required.' })
    .min(0, 'Cost must be a positive number.')
    .optional(),
  // Cloud Ingress
  useCloudIngress: z.boolean().optional(),
  cloudIngress: z
    .number({ required_error: 'Ingress is required.' })
    .min(0, 'Ingress must be a positive number.')
    .optional(),
  cloudIngressGrowthRate: z.number().min(0).max(100).optional(),
  cloudIngressCostPerUnit: z
    .number({ required_error: 'Ingress cost is required.' })
    .min(0, 'Cost must be a positive number.')
    .optional(),
})

export type NetworkingValues = z.infer<typeof NetworkingSchema>
