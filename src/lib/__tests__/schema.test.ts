import { describe, expect, it } from 'vitest'
import { CostFormSchema } from '../types'
import { GeneralSchema } from '../types/general'

describe('CostFormSchema', () => {
  describe('GeneralSchema validation', () => {
    it('should accept valid general configuration', () => {
      const validData = {
        analysisPeriod: 5,
        inflationRate: 3,
        calculationMode: 'tco' as const,
        enableSensitivityAnalysis: false,
      }

      const result = GeneralSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject analysis period less than 1', () => {
      const invalidData = {
        analysisPeriod: 0,
        inflationRate: 3,
        calculationMode: 'tco' as const,
      }

      const result = GeneralSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 1 year')
      }
    })

    it('should reject analysis period greater than 30', () => {
      const invalidData = {
        analysisPeriod: 31,
        inflationRate: 3,
        calculationMode: 'tco' as const,
      }

      const result = GeneralSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Cannot exceed 30')
      }
    })

    it('should reject negative inflation rate', () => {
      const invalidData = {
        analysisPeriod: 5,
        inflationRate: -1,
        calculationMode: 'tco' as const,
      }

      const result = GeneralSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('positive number')
      }
    })

    it('should reject inflation rate over 100', () => {
      const invalidData = {
        analysisPeriod: 5,
        inflationRate: 101,
        calculationMode: 'tco' as const,
      }

      const result = GeneralSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('too high')
      }
    })

    it('should accept both tco and amortized calculation modes', () => {
      const tcoData = {
        analysisPeriod: 5,
        inflationRate: 3,
        calculationMode: 'tco' as const,
      }

      const amortizedData = {
        analysisPeriod: 5,
        inflationRate: 3,
        calculationMode: 'amortized' as const,
      }

      expect(GeneralSchema.safeParse(tcoData).success).toBe(true)
      expect(GeneralSchema.safeParse(amortizedData).success).toBe(true)
    })

    it('should reject invalid calculation mode', () => {
      const invalidData = {
        analysisPeriod: 5,
        inflationRate: 3,
        calculationMode: 'invalid' as any,
      }

      const result = GeneralSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should accept boundary values', () => {
      const boundaryData = {
        analysisPeriod: 1,
        inflationRate: 0,
        calculationMode: 'tco' as const,
      }

      const result = GeneralSchema.safeParse(boundaryData)
      expect(result.success).toBe(true)
    })

    it('should accept maximum valid values', () => {
      const maxData = {
        analysisPeriod: 30,
        inflationRate: 100,
        calculationMode: 'amortized' as const,
      }

      const result = GeneralSchema.safeParse(maxData)
      expect(result.success).toBe(true)
    })
  })

  describe('Storage tier validation', () => {
    it('should accept when storage tiers sum to 100', () => {
      const validData = {
        analysisPeriod: 5,
        inflationRate: 3,
        calculationMode: 'tco' as const,
        cloudHotTier: 30,
        cloudStandardTier: 50,
        cloudArchiveTier: 20,
        cloudStorageSize: 100,
        cloudGrowthRate: 10,
        cloudHotStorageCost: 0.023,
        cloudStandardStorageCost: 0.01,
        cloudArchiveStorageCost: 0.004,
        cloudEgress: 10,
        cloudEgressGrowthRate: 5,
        cloudEgressCostPerUnit: 0.09,
        // Add minimum required fields for other schemas
        useCloudGeneralVm: false,
        useCloudComputeVm: false,
        useCloudMemoryVm: false,
        useCloudStorageVm: false,
        useOnPremCpu: false,
        useOnPremMotherboard: false,
        useOnPremMemory: false,
        useOnPremChassis: false,
        useOnPremRacks: false,
        useOnPremPowerConsumption: false,
        useOnPremUps: false,
        useOnPremGenerator: false,
        useOnPremHvac: false,
        useOnPremColocation: false,
        useCloudTrainingGpu: false,
        useCloudInferenceGpu: false,
        useOnPremTrainingGpu: false,
        useOnPremInferenceGpu: false,
        onPremSysAdminCount: 0,
        onPremNetworkEngineerCount: 0,
        onPremStorageAdminCount: 0,
        onPremSecurityEngineerCount: 0,
        onPremDatabaseAdminCount: 0,
        onPremDataCenterTechCount: 0,
        cloudDevOpsEngineerCount: 0,
        cloudCloudArchitectCount: 0,
        cloudSiteReliabilityEngineerCount: 0,
        cloudCloudSecurityEngineerCount: 0,
        cloudCloudDatabaseAdminCount: 0,
        useOnPremCoreSwitch: false,
        useOnPremAggregationSwitch: false,
        useOnPremAccessSwitch: false,
        useOnPremCabling: false,
        useOnPremQsfp: false,
        useOnPremBandwidth: false,
        useOnPremCdn: false,
        useOnPremVirtualization: false,
        useOnPremOperatingSystem: false,
        useOnPremStorage: false,
        useOnPremBackupSoftware: false,
        useOnPremMonitoring: false,
        useOnPremSecurity: false,
        useCloudDatabase: false,
        useCloudOperatingSystem: false,
        useCloudAnalytics: false,
        useCloudTelemetry: false,
        useCloudMonitoring: false,
        useCloudSecurity: false,
        useOnPremHdd: false,
        useOnPremSsd: false,
        useOnPremBackup: false,
        useCertSoc2: false,
        useCertIso27001: false,
        useCertHipaa: false,
        useCertPciDss: false,
        useCertGdpr: false,
        useDdosProtection: false,
        useWaf: false,
        useBotProtection: false,
        useSecurityAudits: false,
        usePenetrationTesting: false,
      }

      const result = CostFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject when storage tiers do not sum to 100', () => {
      const invalidData = {
        analysisPeriod: 5,
        inflationRate: 3,
        calculationMode: 'tco' as const,
        cloudHotTier: 30,
        cloudStandardTier: 50,
        cloudArchiveTier: 30, // Sum = 110, not 100
        cloudStorageSize: 100,
        cloudGrowthRate: 10,
        cloudHotStorageCost: 0.023,
        cloudStandardStorageCost: 0.01,
        cloudArchiveStorageCost: 0.004,
        cloudEgress: 10,
        cloudEgressGrowthRate: 5,
        cloudEgressCostPerUnit: 0.09,
        // Add minimum required fields
        useCloudGeneralVm: false,
        useCloudComputeVm: false,
        useCloudMemoryVm: false,
        useCloudStorageVm: false,
        useOnPremCpu: false,
        useOnPremMotherboard: false,
        useOnPremMemory: false,
        useOnPremChassis: false,
        useOnPremRacks: false,
        useOnPremPowerConsumption: false,
        useOnPremUps: false,
        useOnPremGenerator: false,
        useOnPremHvac: false,
        useOnPremColocation: false,
        useCloudTrainingGpu: false,
        useCloudInferenceGpu: false,
        useOnPremTrainingGpu: false,
        useOnPremInferenceGpu: false,
        onPremSysAdminCount: 0,
        onPremNetworkEngineerCount: 0,
        onPremStorageAdminCount: 0,
        onPremSecurityEngineerCount: 0,
        onPremDatabaseAdminCount: 0,
        onPremDataCenterTechCount: 0,
        cloudDevOpsEngineerCount: 0,
        cloudCloudArchitectCount: 0,
        cloudSiteReliabilityEngineerCount: 0,
        cloudCloudSecurityEngineerCount: 0,
        cloudCloudDatabaseAdminCount: 0,
        useOnPremCoreSwitch: false,
        useOnPremAggregationSwitch: false,
        useOnPremAccessSwitch: false,
        useOnPremCabling: false,
        useOnPremQsfp: false,
        useOnPremBandwidth: false,
        useOnPremCdn: false,
        useOnPremVirtualization: false,
        useOnPremOperatingSystem: false,
        useOnPremStorage: false,
        useOnPremBackupSoftware: false,
        useOnPremMonitoring: false,
        useOnPremSecurity: false,
        useCloudDatabase: false,
        useCloudOperatingSystem: false,
        useCloudAnalytics: false,
        useCloudTelemetry: false,
        useCloudMonitoring: false,
        useCloudSecurity: false,
        useOnPremHdd: false,
        useOnPremSsd: false,
        useOnPremBackup: false,
        useCertSoc2: false,
        useCertIso27001: false,
        useCertHipaa: false,
        useCertPciDss: false,
        useCertGdpr: false,
        useDdosProtection: false,
        useWaf: false,
        useBotProtection: false,
        useSecurityAudits: false,
        usePenetrationTesting: false,
      }

      const result = CostFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('must add up to 100')
      }
    })

    it('should accept valid tier distributions', () => {
      const testCases = [
        { hot: 100, standard: 0, archive: 0 },
        { hot: 0, standard: 100, archive: 0 },
        { hot: 0, standard: 0, archive: 100 },
        { hot: 33, standard: 33, archive: 34 },
        { hot: 10, standard: 20, archive: 70 },
      ]

      for (const { hot, standard, archive } of testCases) {
        const data = {
          analysisPeriod: 5,
          inflationRate: 3,
          calculationMode: 'tco' as const,
          cloudHotTier: hot,
          cloudStandardTier: standard,
          cloudArchiveTier: archive,
          cloudStorageSize: 100,
          cloudGrowthRate: 10,
          cloudHotStorageCost: 0.023,
          cloudStandardStorageCost: 0.01,
          cloudArchiveStorageCost: 0.004,
          cloudEgress: 10,
          cloudEgressGrowthRate: 5,
          cloudEgressCostPerUnit: 0.09,
          // Minimal required fields
          useCloudGeneralVm: false,
          useCloudComputeVm: false,
          useCloudMemoryVm: false,
          useCloudStorageVm: false,
          useOnPremCpu: false,
          useOnPremMotherboard: false,
          useOnPremMemory: false,
          useOnPremChassis: false,
          useOnPremRacks: false,
          useOnPremPowerConsumption: false,
          useOnPremUps: false,
          useOnPremGenerator: false,
          useOnPremHvac: false,
          useOnPremColocation: false,
          useCloudTrainingGpu: false,
          useCloudInferenceGpu: false,
          useOnPremTrainingGpu: false,
          useOnPremInferenceGpu: false,
          onPremSysAdminCount: 0,
          onPremNetworkEngineerCount: 0,
          onPremStorageAdminCount: 0,
          onPremSecurityEngineerCount: 0,
          onPremDatabaseAdminCount: 0,
          onPremDataCenterTechCount: 0,
          cloudDevOpsEngineerCount: 0,
          cloudCloudArchitectCount: 0,
          cloudSiteReliabilityEngineerCount: 0,
          cloudCloudSecurityEngineerCount: 0,
          cloudCloudDatabaseAdminCount: 0,
          useOnPremCoreSwitch: false,
          useOnPremAggregationSwitch: false,
          useOnPremAccessSwitch: false,
          useOnPremCabling: false,
          useOnPremQsfp: false,
          useOnPremBandwidth: false,
          useOnPremCdn: false,
          useOnPremVirtualization: false,
          useOnPremOperatingSystem: false,
          useOnPremStorage: false,
          useOnPremBackupSoftware: false,
          useOnPremMonitoring: false,
          useOnPremSecurity: false,
          useCloudDatabase: false,
          useCloudOperatingSystem: false,
          useCloudAnalytics: false,
          useCloudTelemetry: false,
          useCloudMonitoring: false,
          useCloudSecurity: false,
          useOnPremHdd: false,
          useOnPremSsd: false,
          useOnPremBackup: false,
          useCertSoc2: false,
          useCertIso27001: false,
          useCertHipaa: false,
          useCertPciDss: false,
          useCertGdpr: false,
          useDdosProtection: false,
          useWaf: false,
          useBotProtection: false,
          useSecurityAudits: false,
          usePenetrationTesting: false,
        }

        const result = CostFormSchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    })
  })

  describe('Required fields', () => {
    it('should reject when required fields are missing', () => {
      const emptyData = {}

      const result = CostFormSchema.safeParse(emptyData)
      expect(result.success).toBe(false)
      if (!result.success) {
        // Should have multiple errors for missing required fields
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
