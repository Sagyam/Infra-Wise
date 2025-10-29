import { describe, expect, it } from 'vitest'
import { calculateCosts } from '../index'
import { minimalInput, enterpriseScenario } from '../__fixtures__'
import type { CostFormValues } from '@/lib/types'

describe('calculateCosts - Amortized Mode', () => {
  describe('basic amortized calculations', () => {
    it('should calculate costs successfully in amortized mode', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.calculationMode).toBe('amortized')
        expect(result.data.yearlyCosts).toHaveLength(3)
        expect(result.data.onPremTCO).toBeGreaterThanOrEqual(0)
        expect(result.data.cloudTCO).toBeGreaterThan(0)
      }
    })

    it('should spread hardware costs evenly across all years', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 5,
        inflationRate: 0, // Disable inflation to test amortization clearly
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 5000, // $50,000 total
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Each year should have $10,000 (50,000 / 5) of compute costs
        const expectedAnnualCost = 50000 / 5

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.Compute).toBeCloseTo(
            expectedAnnualCost,
            2,
          )
        }
      }
    })

    it('should not apply salvage value in amortized mode', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 5,
        inflationRate: 0,
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 5000,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // All years should have the same CapEx (no salvage in final year)
        const capexValues = yearlyCosts.map((y) => y.onPremCapEx)

        // All CapEx values should be equal (approximately, considering inflation)
        const firstYearCapEx = capexValues[0]
        for (const capex of capexValues) {
          // Each year should have similar CapEx (accounting for inflation)
          expect(capex).toBeGreaterThan(0)
        }

        // Final year should NOT have negative CapEx (no salvage)
        const finalYearCapEx = capexValues[capexValues.length - 1]
        expect(finalYearCapEx).toBeGreaterThanOrEqual(0)
      }
    })
  })

  describe('comparison with TCO mode', () => {
    it('should have same total cost but different yearly distribution', async () => {
      const baseInput: CostFormValues = {
        ...minimalInput,
        analysisPeriod: 5,
        inflationRate: 0, // Disable inflation for clear comparison
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 5000,
      }

      const tcoInput = { ...baseInput, calculationMode: 'tco' as const }
      const amortizedInput = {
        ...baseInput,
        calculationMode: 'amortized' as const,
      }

      const tcoResult = await calculateCosts(tcoInput)
      const amortizedResult = await calculateCosts(amortizedInput)

      expect(tcoResult.success).toBe(true)
      expect(amortizedResult.success).toBe(true)

      if (tcoResult.success && amortizedResult.success) {
        // Total costs should be similar (accounting for salvage value difference)
        // TCO has salvage value, amortized doesn't
        const tcoTotal = tcoResult.data.onPremTCO
        const amortizedTotal = amortizedResult.data.onPremTCO

        // Amortized should be slightly higher (no salvage value)
        expect(amortizedTotal).toBeGreaterThan(tcoTotal)

        // TCO: All hardware cost in year 1, then 0
        const tcoYear1 = tcoResult.data.yearlyCosts[0].onPremBreakdown.Compute
        const tcoYear2 = tcoResult.data.yearlyCosts[1].onPremBreakdown.Compute
        expect(tcoYear1).toBeGreaterThan(0)
        expect(tcoYear2).toBe(0)

        // Amortized: Hardware cost spread evenly across all years
        const amortizedYear1 =
          amortizedResult.data.yearlyCosts[0].onPremBreakdown.Compute
        const amortizedYear2 =
          amortizedResult.data.yearlyCosts[1].onPremBreakdown.Compute
        expect(amortizedYear1).toBeCloseTo(amortizedYear2, 2)
      }
    })
  })

  describe('storage costs in amortized mode', () => {
    it('should spread storage hardware costs across analysis period', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 4,
        inflationRate: 0,
        useOnPremHdd: true,
        onPremHddCount: 40,
        onPremHddUnitCost: 200, // $8,000 total
        onPremHddFailureRate: 0, // Disable failures to test amortization clearly
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Each year should have $2,000 (8,000 / 4) of storage costs
        const expectedAnnualCost = (40 * 200) / 4

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.Storage).toBeCloseTo(
            expectedAnnualCost,
            2,
          )
        }
      }
    })

    it('should add recurring costs on top of amortized hardware', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 4,
        inflationRate: 0,
        useOnPremHdd: true,
        onPremHddCount: 40,
        onPremHddUnitCost: 200,
        onPremHddFailureRate: 5, // 5% annual failure rate
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Each year should have:
        // - Amortized hardware: (40 * 200) / 4 = $2,000
        // - Replacement: 40 * 0.05 * 200 = $400
        // Total: $2,400
        const expectedAnnualCost = (40 * 200) / 4 + 40 * 0.05 * 200

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.Storage).toBeCloseTo(
            expectedAnnualCost,
            2,
          )
        }
      }
    })
  })

  describe('energy costs in amortized mode', () => {
    it('should amortize energy hardware costs', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 5,
        inflationRate: 0,
        useOnPremUps: true,
        onPremUpsQuantity: 2,
        onPremUpsUnitCost: 50000, // $100,000 total
        onPremUpsBatteryFailureRate: 0, // Disable to test amortization
        onPremUpsBatteryReplacementCost: 0,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Each year should have $20,000 (100,000 / 5) of energy hardware costs
        const expectedAnnualCost = (2 * 50000) / 5

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.Energy).toBeCloseTo(expectedAnnualCost, 2)
        }
      }
    })

    it('should combine amortized hardware with recurring energy costs', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 5,
        inflationRate: 0,
        useOnPremPowerConsumption: true,
        onPremPowerRating: 10000, // 10kW
        onPremLoadFactor: 70,
        onPremElectricityCost: 0.12,
        useOnPremUps: true,
        onPremUpsQuantity: 2,
        onPremUpsUnitCost: 50000,
        onPremUpsBatteryFailureRate: 0,
        onPremUpsBatteryReplacementCost: 0,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Power consumption cost (recurring)
        const powerCost = ((10000 * 0.7 * 24 * 365) / 1000) * 0.12
        // Amortized UPS hardware
        const amortizedUps = (2 * 50000) / 5

        const expectedTotal = powerCost + amortizedUps

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.Energy).toBeCloseTo(expectedTotal, 2)
        }
      }
    })
  })

  describe('GPU costs in amortized mode', () => {
    it('should amortize GPU hardware costs', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 3,
        inflationRate: 0,
        useOnPremTrainingGpu: true,
        onPremTrainingGpuQuantity: 10,
        onPremTrainingGpuUnitCost: 15000, // $150,000 total
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Each year should have $50,000 (150,000 / 3)
        const expectedAnnualCost = (10 * 15000) / 3

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.GPU).toBeCloseTo(expectedAnnualCost, 2)
        }
      }
    })
  })

  describe('networking costs in amortized mode', () => {
    it('should amortize networking hardware costs', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 5,
        inflationRate: 0,
        useOnPremCoreSwitch: true,
        onPremCoreSwitchQuantity: 2,
        onPremCoreSwitchUnitCost: 50000, // $100,000 total
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Each year should have $20,000 (100,000 / 5)
        const expectedAnnualCost = (2 * 50000) / 5

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.Networking).toBeCloseTo(
            expectedAnnualCost,
            2,
          )
        }
      }
    })

    it('should combine amortized hardware with recurring bandwidth costs', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 5,
        inflationRate: 0,
        useOnPremCoreSwitch: true,
        onPremCoreSwitchQuantity: 2,
        onPremCoreSwitchUnitCost: 50000,
        useOnPremBandwidth: true,
        onPremBandwidthUsage: 10000, // GB
        onPremBandwidthCostPerGb: 0.05,
        onPremAnnualTrafficGrowth: 0, // Disable growth for clarity
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Amortized hardware: 100,000 / 5 = $20,000
        // Bandwidth: 10,000 * 0.05 = $500
        const expectedTotal = (2 * 50000) / 5 + 10000 * 0.05

        for (const year of yearlyCosts) {
          expect(year.onPremBreakdown.Networking).toBeCloseTo(expectedTotal, 2)
        }
      }
    })
  })

  describe('CapEx and OpEx in amortized mode', () => {
    it('should spread CapEx evenly across all years', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 4,
        inflationRate: 0,
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 4000, // $40,000 total
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Each year should have $10,000 CapEx
        const expectedAnnualCapEx = (10 * 4000) / 4

        for (const year of yearlyCosts) {
          expect(year.onPremCapEx).toBeCloseTo(expectedAnnualCapEx, 2)
        }
      }
    })

    it('should track recurring costs as OpEx', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 3,
        inflationRate: 0,
        onPremSysAdminCount: 2,
        onPremSysAdminSalary: 80000,
        onPremSysAdminSalaryIncrement: 0,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts, totalOnPremOpEx } = result.data

        // Each year should have $160,000 OpEx (2 * 80,000)
        for (const year of yearlyCosts) {
          expect(year.onPremOpEx).toBeCloseTo(160000, 2)
        }

        // Total should be 3 * 160,000 = 480,000
        expect(totalOnPremOpEx).toBeCloseTo(480000, 2)
      }
    })
  })

  describe('complex scenarios in amortized mode', () => {
    it('should handle enterprise scenario with amortization', async () => {
      const input: CostFormValues = {
        ...enterpriseScenario,
        calculationMode: 'amortized',
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts, onPremTCO, cloudTCO } = result.data

        // Should have 10 years of data
        expect(yearlyCosts).toHaveLength(10)

        // All years should have similar CapEx patterns (amortized)
        const capexValues = yearlyCosts.map((y) => y.onPremCapEx)

        // With inflation, later years will be slightly higher
        // But pattern should be more consistent than TCO mode
        for (const capex of capexValues) {
          expect(capex).toBeGreaterThan(0)
        }

        // Total costs should be substantial
        expect(onPremTCO).toBeGreaterThan(0)
        expect(cloudTCO).toBeGreaterThan(0)

        // CapEx + OpEx should equal total for each year
        for (const year of yearlyCosts) {
          const onPremTotal = year.onPremCapEx + year.onPremOpEx
          expect(onPremTotal).toBeCloseTo(year.onPremCost, 2)
        }
      }
    })
  })

  describe('edge cases in amortized mode', () => {
    it('should handle single year amortization', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 1,
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 5000,
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        // Single year means full hardware cost in that year
        const year1Compute = result.data.yearlyCosts[0].onPremBreakdown.Compute
        expect(year1Compute).toBeCloseTo(50000, 2)
      }
    })

    it('should handle zero hardware costs', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 5,
        // No hardware costs, only cloud
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        // Should still work with only cloud costs
        expect(result.data.cloudTCO).toBeGreaterThan(0)

        for (const year of result.data.yearlyCosts) {
          expect(year.onPremCapEx).toBe(0)
        }
      }
    })

    it('should handle inflation with amortization', async () => {
      const input: CostFormValues = {
        ...minimalInput,
        calculationMode: 'amortized',
        analysisPeriod: 3,
        inflationRate: 5, // 5% inflation
        useOnPremCpu: true,
        onPremCpuQuantity: 10,
        onPremCpuUnitCost: 3000, // $30,000 total
      }

      const result = await calculateCosts(input)

      expect(result.success).toBe(true)
      if (result.success) {
        const { yearlyCosts } = result.data

        // Base amortized cost: 30,000 / 3 = $10,000
        // With inflation applied per year
        const year1Compute = yearlyCosts[0].onPremBreakdown.Compute
        const year2Compute = yearlyCosts[1].onPremBreakdown.Compute
        const year3Compute = yearlyCosts[2].onPremBreakdown.Compute

        // Year 2 should be higher than year 1 due to inflation
        expect(year2Compute).toBeGreaterThan(year1Compute)
        expect(year3Compute).toBeGreaterThan(year2Compute)
      }
    })
  })
})
