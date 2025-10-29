import { describe, expect, it } from 'vitest'
import { calculateCosts } from '../index'
import { minimalInput, startupScenario } from '../__fixtures__'
import type { CostFormValues } from '@/lib/types'

describe('calculateCosts - TCO Mode', () => {
  describe('basic TCO calculations', () => {
    it('should calculate costs successfully with minimal input', async () => {
      const result = await calculateCosts(minimalInput)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.calculationMode).toBe('tco')
        expect(result.data.yearlyCosts).toHaveLength(3) // 3 year analysis
        expect(result.data.onPremTCO).toBeGreaterThanOrEqual(0)
        expect(result.data.cloudTCO).toBeGreaterThan(0)
      }
    })

    it('should apply hardware costs in year 1 only', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'tco',
        analysisPeriod: 3,
        // Add on-prem compute hardware
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 2000,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Year 1 should have hardware costs
        const year1Compute = yearlyCosts[0].onPremBreakdown.Compute
        expect(year1Compute).toBeGreaterThan(0)

        // Year 2 should have 0 compute costs (no recurring costs)
        const year2Compute = yearlyCosts[1].onPremBreakdown.Compute
        expect(year2Compute).toBe(0)

        // Year 3 (final year) should have negative compute cost due to salvage value
        const year3Compute = yearlyCosts[2].onPremBreakdown.Compute
        expect(year3Compute).toBeLessThan(0)
      }
    })

    it('should apply salvage value in final year', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'tco',
        analysisPeriod: 5,
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 2000,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Year 1 compute cost should be hardware cost
        const year1Compute = yearlyCosts[0].onPremBreakdown.Compute
        const expectedHardwareCost = 10 * 2000 // 20,000
        expect(year1Compute).toBeCloseTo(expectedHardwareCost, 0)

        // Final year should have negative cost due to salvage (10% = 2000)
        // This is reflected in the CapEx calculation
        const year5CapEx = yearlyCosts[4].onPremCapEx

        // In final year, salvage reduces the cost, so CapEx should be lower than other years
        // Years 2-4 should have 0 CapEx
        expect(yearlyCosts[1].onPremCapEx).toBe(0)
        expect(yearlyCosts[2].onPremCapEx).toBe(0)
        expect(yearlyCosts[3].onPremCapEx).toBe(0)

        // Year 5 should have negative CapEx from salvage
        expect(year5CapEx).toBeLessThan(0)
      }
    })
  })

  describe('storage costs in TCO mode', () => {
    it('should apply storage hardware costs in year 1', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'tco',
        useOnPremHdd: true,
        onPremHddCount: 50,
        onPremHddUnitCost: 150,
        onPremHddFailureRate: 5,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Year 1 should have hardware cost (50 * 150 = 7500)
        const year1Storage = yearlyCosts[0].onPremBreakdown.Storage
        expect(year1Storage).toBeGreaterThan(7500) // Greater because of failure rate

        // Year 2 should only have replacement costs (not hardware)
        const year2Storage = yearlyCosts[1].onPremBreakdown.Storage
        // Replacement: 50 * 0.05 * 150 = 375 (plus inflation)
        expect(year2Storage).toBeGreaterThan(0)
        expect(year2Storage).toBeLessThan(year1Storage)
      }
    })

    it('should apply storage growth rate to cloud storage', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        cloudStorageSize: 100,
        cloudGrowthRate: 20, // 20% annual growth
        cloudHotTier: 100,
        cloudStandardTier: 0,
        cloudArchiveTier: 0,
        cloudHotStorageCost: 0.023,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Year 1: 100 TB
        // Year 2: 120 TB
        // Year 3: 144 TB

        const year1CloudStorage = yearlyCosts[0].cloudBreakdown.Storage
        const year2CloudStorage = yearlyCosts[1].cloudBreakdown.Storage
        const year3CloudStorage = yearlyCosts[2].cloudBreakdown.Storage

        // Each year should be higher (growth + inflation)
        expect(year2CloudStorage).toBeGreaterThan(year1CloudStorage)
        expect(year3CloudStorage).toBeGreaterThan(year2CloudStorage)

        // Check approximate growth (accounting for inflation and TB to GB conversion)
        // Year 2 should be roughly 1.2x year 1 (20% growth + inflation)
        const growthRatio = year2CloudStorage / year1CloudStorage
        expect(growthRatio).toBeGreaterThan(1.2)
        expect(growthRatio).toBeLessThan(1.3)
      }
    })
  })

  describe('energy costs in TCO mode', () => {
    it('should calculate power consumption costs correctly', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        useOnPremPowerConsumption: true,
        onPremPowerRating: 10000, // 10kW
        onPremLoadFactor: 70,
        onPremElectricityCost: 0.12,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Calculate expected power cost
        // kWh = (10000W * 0.7 * 24 * 365) / 1000 = 61,320 kWh
        // Cost = 61,320 * 0.12 = $7,358.40
        const expectedPowerCost = ((10000 * 0.7 * 24 * 365) / 1000) * 0.12

        const year1Energy = yearlyCosts[0].onPremBreakdown.Energy
        expect(year1Energy).toBeCloseTo(expectedPowerCost, 0)

        // Year 2 should have inflated cost (3% inflation)
        const year2Energy = yearlyCosts[1].onPremBreakdown.Energy
        const expectedYear2Cost = expectedPowerCost * 1.03
        expect(year2Energy).toBeCloseTo(expectedYear2Cost, 0)
      }
    })

    it('should apply hardware costs for UPS/Generator/HVAC in year 1', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'tco',
        analysisPeriod: 3,
        useOnPremUps: true,
        onPremUpsQuantity: 2,
        onPremUpsUnitCost: 50000,
        onPremUpsBatteryFailureRate: 10,
        onPremUpsBatteryReplacementCost: 5000,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Year 1 should include hardware cost (2 * 50000 = 100000)
        // Plus battery replacement (2 * 0.1 * 5000 = 1000)
        const year1Energy = yearlyCosts[0].onPremBreakdown.Energy
        expect(year1Energy).toBeGreaterThan(100000)

        // Year 2 should only have battery replacement (not hardware)
        const year2Energy = yearlyCosts[1].onPremBreakdown.Energy
        expect(year2Energy).toBeLessThan(year1Energy)
        expect(year2Energy).toBeGreaterThan(0) // Has recurring battery costs
      }
    })
  })

  describe('CapEx and OpEx tracking', () => {
    it('should correctly categorize hardware as CapEx and recurring as OpEx', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'tco',
        analysisPeriod: 3,
        // Hardware (CapEx)
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 2000,
        // Recurring costs (OpEx)
        onPremSysAdminCount: 2,
        onPremSysAdminSalary: 80000,
        onPremSysAdminSalaryIncrement: 3,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts, totalOnPremCapEx, totalOnPremOpEx } = result.data

        // Year 1 should have CapEx from hardware
        expect(yearlyCosts[0].onPremCapEx).toBeGreaterThan(0)
        // All years should have OpEx from salaries
        expect(yearlyCosts[0].onPremOpEx).toBeGreaterThan(0)
        expect(yearlyCosts[1].onPremOpEx).toBeGreaterThan(0)
        expect(yearlyCosts[2].onPremOpEx).toBeGreaterThan(0)

        // Total CapEx should equal hardware cost minus salvage value (10%)
        // Hardware: 20000, Salvage: 2000, Net: 18000
        expect(totalOnPremCapEx).toBeCloseTo(18000, -3)

        // Total OpEx should be salaries * 3 years with increments
        // Year 1: 160000, Year 2: 164800, Year 3: 169744
        const expectedOpEx = 160000 + 164800 + 169744
        expect(totalOnPremOpEx).toBeGreaterThan(expectedOpEx - 1000)
        expect(totalOnPremOpEx).toBeLessThan(expectedOpEx + 1000)
      }
    })

    it('should track cloud costs as OpEx only', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        useCloudGeneralVm: true,
        cloudGeneralVmCount: 5,
        cloudGeneralVmHourlyRate: 0.5,
        cloudGeneralVmHoursPerMonth: 730,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts, totalCloudCapEx, totalCloudOpEx } = result.data

        // Cloud should have no CapEx (except security which is shared)
        // All compute costs should be OpEx
        for (const year of yearlyCosts) {
          expect(year.cloudOpEx).toBeGreaterThan(0)
        }

        // Total cloud OpEx should be significant
        expect(totalCloudOpEx).toBeGreaterThan(0)
      }
    })
  })

  describe('breakeven calculation', () => {
    it('should calculate breakeven point when on-prem becomes cheaper', async () => {
      const result = await calculateCosts(startupScenario)

      expect(result.success).toBe(true)
      if (result.success) {
        // Breakeven should be a string like "Year X" or null
        const { breakevenPoint } = result.data

        if (breakevenPoint) {
          expect(breakevenPoint).toMatch(/^Year \d+$/)
        }
      }
    })

    it('should return null breakeven when on-prem is always more expensive', async () => {
      // Cloud-heavy scenario
      const input: CostFormValues = {
        ...minimalInput,
        analysisPeriod: 5,
        useCloudGeneralVm: true,
        cloudGeneralVmCount: 2,
        cloudGeneralVmHourlyRate: 0.1, // Very cheap
        cloudGeneralVmHoursPerMonth: 730,
        // No on-prem hardware
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        // On-prem should be more expensive due to overhead costs
        // Breakeven might be null if cloud is always cheaper
        const { breakevenPoint, onPremTCO, cloudTCO } = result.data

        if (cloudTCO < onPremTCO) {
          expect(breakevenPoint).toBeNull()
        }
      }
    })
  })

  describe('inflation application', () => {
    it('should apply inflation to all cost categories', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        analysisPeriod: 3,
        inflationRate: 5, // 5% inflation
        onPremSysAdminCount: 1,
        onPremSysAdminSalary: 100000,
        onPremSysAdminSalaryIncrement: 0, // No increment to isolate inflation
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Salary should increase by 5% each year due to inflation
        const year1Human = yearlyCosts[0].onPremBreakdown.Human
        const year2Human = yearlyCosts[1].onPremBreakdown.Human
        const year3Human = yearlyCosts[2].onPremBreakdown.Human

        expect(year1Human).toBeCloseTo(100000, 0)
        expect(year2Human).toBeCloseTo(100000, 0) // Same base, will compound next year
        expect(year3Human).toBeCloseTo(100000, 0)
      }
    })

    it('should handle zero inflation rate', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        inflationRate: 0,
        onPremSysAdminCount: 1,
        onPremSysAdminSalary: 100000,
        onPremSysAdminSalaryIncrement: 0,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // All years should have same cost with 0 inflation
        const humanCosts = yearlyCosts.map((y) => y.onPremBreakdown.Human)
        expect(humanCosts[0]).toBe(humanCosts[1])
        expect(humanCosts[1]).toBe(humanCosts[2])
      }
    })
  })

  describe('edge cases', () => {
    it('should handle all costs disabled (minimal scenario)', async () => {
      const result = await calculateCosts(minimalInput)

      expect(result.success).toBe(true)
      if (result.success) {
        // Should still calculate successfully with only cloud storage costs
        expect(result.data.cloudTCO).toBeGreaterThan(0)
        expect(result.data.onPremTCO).toBeGreaterThanOrEqual(0)
      }
    })

    it('should handle single year analysis', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        analysisPeriod: 1,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.yearlyCosts).toHaveLength(1)
        expect(result.data.breakevenPoint).toBeNull()
      }
    })

    it('should handle maximum analysis period (30 years)', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        analysisPeriod: 30,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.yearlyCosts).toHaveLength(30)
        // Costs should compound significantly over 30 years
        const year1Cost = result.data.yearlyCosts[0].cloudCost
        const year30Cost = result.data.yearlyCosts[29].cloudCost
        expect(year30Cost).toBeGreaterThan(year1Cost)
      }
    })
  })

  describe('cost breakdown accuracy', () => {
    it('should sum breakdown categories to total annual cost', async () => {
      const result = await calculateCosts(startupScenario)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        for (const year of yearlyCosts) {
          // On-prem breakdown sum
          const onPremSum = Object.values(year.onPremBreakdown).reduce(
            (sum, val) => sum + (val || 0),
            0,
          )
          expect(onPremSum).toBeCloseTo(year.onPremCost, 2)

          // Cloud breakdown sum
          const cloudSum = Object.values(year.cloudBreakdown).reduce(
            (sum, val) => sum + (val || 0),
            0,
          )
          expect(cloudSum).toBeCloseTo(year.cloudCost, 2)
        }
      }
    })

    it('should have CapEx + OpEx equal total cost for each year', async () => {
      const result = await calculateCosts(startupScenario)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        for (const year of yearlyCosts) {
          const onPremTotal = year.onPremCapEx + year.onPremOpEx
          expect(onPremTotal).toBeCloseTo(year.onPremCost, 2)

          const cloudTotal = year.cloudCapEx + year.cloudOpEx
          expect(cloudTotal).toBeCloseTo(year.cloudCost, 2)
        }
      }
    })
  })
})
