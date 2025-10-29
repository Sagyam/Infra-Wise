import { describe, expect, it } from 'vitest'
import { modelInflation } from '../inflation'

describe('modelInflation', () => {
  describe('basic inflation calculations', () => {
    it('should return initial cost when analysis period is 0', async () => {
      const result = await modelInflation({
        initialCost: 1000,
        inflationRate: 0.03,
        analysisPeriod: 0,
      })

      expect(result.inflatedCost).toBe(1000)
    })

    it('should apply 3% inflation for 1 year correctly', async () => {
      const result = await modelInflation({
        initialCost: 1000,
        inflationRate: 0.03,
        analysisPeriod: 1,
      })

      expect(result.inflatedCost).toBe(1030)
    })

    it('should apply compound inflation for multiple years', async () => {
      const result = await modelInflation({
        initialCost: 1000,
        inflationRate: 0.05,
        analysisPeriod: 3,
      })

      // 1000 * (1.05)^3 = 1157.625
      expect(result.inflatedCost).toBeCloseTo(1157.625)
    })

    it('should handle 5-year projection with 4% inflation', async () => {
      const result = await modelInflation({
        initialCost: 10000,
        inflationRate: 0.04,
        analysisPeriod: 5,
      })

      // 10000 * (1.04)^5 = 12166.529
      expect(result.inflatedCost).toBeCloseTo(12166.529, 2)
    })
  })

  describe('edge cases', () => {
    it('should return initial cost when inflation rate is 0', async () => {
      const result = await modelInflation({
        initialCost: 5000,
        inflationRate: 0,
        analysisPeriod: 10,
      })

      expect(result.inflatedCost).toBe(5000)
    })

    it('should handle zero initial cost', async () => {
      const result = await modelInflation({
        initialCost: 0,
        inflationRate: 0.03,
        analysisPeriod: 5,
      })

      expect(result.inflatedCost).toBe(0)
    })

    it('should handle high inflation rate (20%)', async () => {
      const result = await modelInflation({
        initialCost: 1000,
        inflationRate: 0.2,
        analysisPeriod: 3,
      })

      // 1000 * (1.2)^3 = 1728
      expect(result.inflatedCost).toBeCloseTo(1728)
    })

    it('should handle very high inflation rate (100%)', async () => {
      const result = await modelInflation({
        initialCost: 100,
        inflationRate: 1.0,
        analysisPeriod: 2,
      })

      // 100 * (2)^2 = 400
      expect(result.inflatedCost).toBe(400)
    })

    it('should handle negative inflation (deflation)', async () => {
      const result = await modelInflation({
        initialCost: 1000,
        inflationRate: -0.02,
        analysisPeriod: 3,
      })

      // 1000 * (0.98)^3 = 941.192
      expect(result.inflatedCost).toBeCloseTo(941.192, 2)
    })
  })

  describe('large numbers', () => {
    it('should handle large initial costs', async () => {
      const result = await modelInflation({
        initialCost: 1000000,
        inflationRate: 0.03,
        analysisPeriod: 10,
      })

      // 1000000 * (1.03)^10 = 1343916.38
      expect(result.inflatedCost).toBeCloseTo(1343916.38, 2)
    })

    it('should handle decimal initial costs', async () => {
      const result = await modelInflation({
        initialCost: 1234.56,
        inflationRate: 0.025,
        analysisPeriod: 4,
      })

      // 1234.56 * (1.025)^4 = 1362.72
      expect(result.inflatedCost).toBeCloseTo(1362.72, 2)
    })

    it('should handle long analysis periods (15 years)', async () => {
      const result = await modelInflation({
        initialCost: 50000,
        inflationRate: 0.035,
        analysisPeriod: 15,
      })

      // 50000 * (1.035)^15 = 83767.44
      expect(result.inflatedCost).toBeCloseTo(83767.44, 2)
    })
  })

  describe('precision', () => {
    it('should maintain precision for small rates', async () => {
      const result = await modelInflation({
        initialCost: 10000,
        inflationRate: 0.001,
        analysisPeriod: 5,
      })

      // 10000 * (1.001)^5 = 10050.10
      expect(result.inflatedCost).toBeCloseTo(10050.1, 2)
    })

    it('should return exact values for whole number results', async () => {
      const result = await modelInflation({
        initialCost: 1000,
        inflationRate: 0.1,
        analysisPeriod: 2,
      })

      // 1000 * (1.1)^2 = 1210
      expect(result.inflatedCost).toBeCloseTo(1210, 2)
    })
  })

  describe('realistic scenarios', () => {
    it('should calculate typical 10-year hardware cost inflation (3% annually)', async () => {
      const hardwareCost = 250000
      const result = await modelInflation({
        initialCost: hardwareCost,
        inflationRate: 0.03,
        analysisPeriod: 10,
      })

      // 250000 * (1.03)^10 = 335,979.09
      expect(result.inflatedCost).toBeCloseTo(335979.09, 2)
    })

    it('should calculate salary inflation over 5 years (2.5% annually)', async () => {
      const annualSalary = 100000
      const result = await modelInflation({
        initialCost: annualSalary,
        inflationRate: 0.025,
        analysisPeriod: 5,
      })

      // 100000 * (1.025)^5 = 113,140.82
      expect(result.inflatedCost).toBeCloseTo(113140.82, 2)
    })

    it('should calculate energy cost with high inflation (8%)', async () => {
      const annualEnergyCost = 50000
      const result = await modelInflation({
        initialCost: annualEnergyCost,
        inflationRate: 0.08,
        analysisPeriod: 7,
      })

      // 50000 * (1.08)^7 = 85,691.21
      expect(result.inflatedCost).toBeCloseTo(85691.21, 2)
    })
  })
})
