import { z } from 'zod'

// Certification types
export const CertificationSchema = z.object({
  enabled: z.boolean(),
  costType: z.enum(['one-time', 'recurring']),
  cost: z.number().min(0),
})

export type CertificationValues = z.infer<typeof CertificationSchema>

// Security feature types
export const SecurityFeatureSchema = z.object({
  enabled: z.boolean(),
  costType: z.enum(['one-time', 'recurring']),
  cost: z.number().min(0),
})

export type SecurityFeatureValues = z.infer<typeof SecurityFeatureSchema>

// Main Security & Compliance Schema
export const SecurityComplianceSchema = z.object({
  // Certifications
  useCertSoc2: z.boolean().default(false),
  certSoc2CostType: z.enum(['one-time', 'recurring']).default('recurring'),
  certSoc2Cost: z.number().min(0).default(0),

  useCertIso27001: z.boolean().default(false),
  certIso27001CostType: z.enum(['one-time', 'recurring']).default('recurring'),
  certIso27001Cost: z.number().min(0).default(0),

  useCertHipaa: z.boolean().default(false),
  certHipaaCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  certHipaaCost: z.number().min(0).default(0),

  useCertPciDss: z.boolean().default(false),
  certPciDssCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  certPciDssCost: z.number().min(0).default(0),

  useCertGdpr: z.boolean().default(false),
  certGdprCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  certGdprCost: z.number().min(0).default(0),

  // Security Features
  useDdosProtection: z.boolean().default(false),
  ddosProtectionCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  ddosProtectionCost: z.number().min(0).default(0),

  useWaf: z.boolean().default(false),
  wafCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  wafCost: z.number().min(0).default(0),

  useBotProtection: z.boolean().default(false),
  botProtectionCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  botProtectionCost: z.number().min(0).default(0),

  useSecurityAudits: z.boolean().default(false),
  securityAuditsCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  securityAuditsCost: z.number().min(0).default(0),

  usePenetrationTesting: z.boolean().default(false),
  penetrationTestingCostType: z.enum(['one-time', 'recurring']).default('recurring'),
  penetrationTestingCost: z.number().min(0).default(0),
})

export type SecurityComplianceValues = z.infer<typeof SecurityComplianceSchema>
