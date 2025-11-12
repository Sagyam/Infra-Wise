import { describe, expect, it, vi } from 'vitest'
import {
  tbToGb,
  calculateHardwareCost,
  applySalvage,
  applyInflation,
  type InflationParams,
} from '../utils'
import * as inflationModule from '@/lib/inflation'

// Mock the inflation module
vi.mock('@/lib/inflation')

describe('tbToGb', () => {
  describe('standard conversions', () => {
    it('should convert 1 TB to 1024 GB', () => {
      expect(tbToGb(1)).toBe(1024)
    })

    it('should convert 2 TB to 2048 GB', () => {
      expect(tbToGb(2)).toBe(2048)
    })

    it('should convert 10 TB to 10240 GB', () => {
      expect(tbToGb(10)).toBe(10240)
    })

    it('should convert 0.5 TB to 512 GB', () => {
      expect(tbToGb(0.5)).toBe(512)
    })

    it('should convert 0.25 TB to 256 GB', () => {
      expect(tbToGb(0.25)).toBe(256)
    })
  })

  describe('edge cases', () => {
    it('should return 0 for 0 TB', () => {
      expect(tbToGb(0)).toBe(0)
    })

    it('should handle very small values', () => {
      expect(tbToGb(0.001)).toBeCloseTo(1.024, 3)
    })

    it('should handle very large values', () => {
      expect(tbToGb(1000)).toBe(1024000)
    })

    it('should handle decimal values precisely', () => {
      expect(tbToGb(1.5)).toBe(1536)
    })

    it('should handle fractional GB results', () => {
      // 0.001953125 TB = 2 GB
      expect(tbToGb(0.001953125)).toBe(2)
    })
  })

  describe('realistic storage scenarios', () => {
    it('should convert typical cloud storage (100 TB)', () => {
      expect(tbToGb(100)).toBe(102400)
    })

    it('should convert enterprise storage (500 TB)', () => {
      expect(tbToGb(500)).toBe(512000)
    })

    it('should convert small business storage (5 TB)', () => {
      expect(tbToGb(5)).toBe(5120)
    })

    it('should convert petabyte-scale storage (1024 TB = 1 PB)', () => {
      expect(tbToGb(1024)).toBe(1048576)
    })
  })

  describe('precision', () => {
    it('should maintain precision for calculations', () => {
      const tb = 2.5
      const gb = tbToGb(tb)
      expect(gb).toBe(2560)

      // Verify reverse calculation would work
      expect(gb / 1024).toBe(tb)
    })

    it('should handle floating point arithmetic correctly', () => {
      // Test common decimal that might have floating point issues
      const result = tbToGb(0.1)
      expect(result).toBeCloseTo(102.4, 2)
    })
  })
})

describe('calculateHardwareCost', () => {
  describe('when disabled', () => {
    it('should return 0 when enabled is false', () => {
      expect(calculateHardwareCost(false, 10, 1000)).toBe(0)
    })

    it('should return 0 when enabled is undefined', () => {
      expect(calculateHardwareCost(undefined, 10, 1000)).toBe(0)
    })

    it('should ignore quantity and cost when disabled', () => {
      expect(calculateHardwareCost(false, 999, 9999)).toBe(0)
    })
  })

  describe('when enabled', () => {
    it('should calculate cost correctly', () => {
      expect(calculateHardwareCost(true, 10, 1000)).toBe(10000)
    })

    it('should handle undefined quantity (defaults to 0)', () => {
      expect(calculateHardwareCost(true, undefined, 1000)).toBe(0)
    })

    it('should handle undefined unit cost (defaults to 0)', () => {
      expect(calculateHardwareCost(true, 10, undefined)).toBe(0)
    })

    it('should handle both quantity and cost undefined', () => {
      expect(calculateHardwareCost(true, undefined, undefined)).toBe(0)
    })

    it('should handle zero quantity', () => {
      expect(calculateHardwareCost(true, 0, 1000)).toBe(0)
    })

    it('should handle zero unit cost', () => {
      expect(calculateHardwareCost(true, 10, 0)).toBe(0)
    })

    it('should handle both zero', () => {
      expect(calculateHardwareCost(true, 0, 0)).toBe(0)
    })
  })

  describe('realistic scenarios', () => {
    it('should calculate cost for 50 servers at $5,000 each', () => {
      expect(calculateHardwareCost(true, 50, 5000)).toBe(250000)
    })

    it('should calculate cost for 100 GPUs at $10,000 each', () => {
      expect(calculateHardwareCost(true, 100, 10000)).toBe(1000000)
    })

    it('should calculate cost for storage drives (24 drives at $500)', () => {
      expect(calculateHardwareCost(true, 24, 500)).toBe(12000)
    })

    it('should handle decimal quantities and costs', () => {
      expect(calculateHardwareCost(true, 2.5, 1000.5)).toBe(2501.25)
    })

    it('should calculate networking equipment cost', () => {
      // 10 switches at $3,500 each
      expect(calculateHardwareCost(true, 10, 3500)).toBe(35000)
    })
  })
})

describe('applySalvage', () => {
  describe('standard calculations', () => {
    it('should apply 20% salvage correctly', () => {
      expect(applySalvage(10000, 20)).toBe(2000)
    })

    it('should apply 15% salvage correctly', () => {
      expect(applySalvage(50000, 15)).toBe(7500)
    })

    it('should apply 25% salvage correctly', () => {
      expect(applySalvage(100000, 25)).toBe(25000)
    })
  })

  describe('edge cases', () => {
    it('should handle 0% salvage', () => {
      expect(applySalvage(10000, 0)).toBe(0)
    })

    it('should handle 100% salvage', () => {
      expect(applySalvage(10000, 100)).toBe(10000)
    })

    it('should handle zero cost', () => {
      expect(applySalvage(0, 20)).toBe(0)
    })

    it('should handle zero cost with zero salvage', () => {
      expect(applySalvage(0, 0)).toBe(0)
    })
  })

  describe('decimal percentages', () => {
    it('should handle 12.5% salvage', () => {
      expect(applySalvage(10000, 12.5)).toBe(1250)
    })

    it('should handle 7.5% salvage', () => {
      expect(applySalvage(20000, 7.5)).toBe(1500)
    })

    it('should handle 33.33% salvage', () => {
      expect(applySalvage(30000, 33.33)).toBeCloseTo(9999, 0)
    })
  })

  describe('realistic enterprise scenarios', () => {
    it('should calculate salvage for $1M hardware at 25%', () => {
      expect(applySalvage(1000000, 25)).toBe(250000)
    })

    it('should calculate salvage for $500k hardware at 15% after 5 years', () => {
      expect(applySalvage(500000, 15)).toBe(75000)
    })

    it('should calculate salvage for $250k hardware at 10%', () => {
      expect(applySalvage(250000, 10)).toBe(25000)
    })

    it('should calculate salvage for deprecated hardware at 5%', () => {
      // Old server hardware with minimal resale value
      expect(applySalvage(100000, 5)).toBe(5000)
    })

    it('should calculate salvage for newer hardware at 30%', () => {
      // Recently purchased hardware with higher resale value
      expect(applySalvage(200000, 30)).toBe(60000)
    })
  })

  describe('precision', () => {
    it('should maintain precision for large values', () => {
      const cost = 999999.99
      const salvagePercent = 22.5
      const expected = cost * (salvagePercent / 100)
      expect(applySalvage(cost, salvagePercent)).toBeCloseTo(expected, 2)
    })
  })
})

describe('applyInflation', () => {
  describe('basic functionality', () => {
    it('should call modelInflation with correct parameters', async () => {
      const mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 11000 })

      const params: InflationParams = {
        cost: 10000,
        inflationRate: 3,
        year: 2,
      }

      const result = await applyInflation(params)

      expect(mockModelInflation).toHaveBeenCalledWith({
        initialCost: 10000,
        inflationRate: 3,
        analysisPeriod: 1, // year - 1
      })
      expect(result).toBe(11000)

      vi.restoreAllMocks()
    })

    it('should return the inflated cost value', async () => {
      const _mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 15000 })

      const params: InflationParams = {
        cost: 10000,
        inflationRate: 4,
        year: 3,
      }

      const result = await applyInflation(params)

      expect(result).toBe(15000)

      vi.restoreAllMocks()
    })
  })

  describe('year handling', () => {
    it('should handle year 1 (no inflation applied)', async () => {
      const mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 10000 })

      const params: InflationParams = {
        cost: 10000,
        inflationRate: 3,
        year: 1,
      }

      const result = await applyInflation(params)

      expect(mockModelInflation).toHaveBeenCalledWith({
        initialCost: 10000,
        inflationRate: 3,
        analysisPeriod: 0,
      })
      expect(result).toBe(10000)

      vi.restoreAllMocks()
    })

    it('should calculate correct analysis period for year 5', async () => {
      const mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 12000 })

      const params: InflationParams = {
        cost: 10000,
        inflationRate: 3,
        year: 5,
      }

      await applyInflation(params)

      expect(mockModelInflation).toHaveBeenCalledWith({
        initialCost: 10000,
        inflationRate: 3,
        analysisPeriod: 4,
      })

      vi.restoreAllMocks()
    })
  })

  describe('inflation rate variations', () => {
    it('should handle zero inflation rate', async () => {
      const mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 10000 })

      const params: InflationParams = {
        cost: 10000,
        inflationRate: 0,
        year: 5,
      }

      await applyInflation(params)

      expect(mockModelInflation).toHaveBeenCalledWith({
        initialCost: 10000,
        inflationRate: 0,
        analysisPeriod: 4,
      })

      vi.restoreAllMocks()
    })

    it('should handle high inflation rate', async () => {
      const mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 18000 })

      const params: InflationParams = {
        cost: 10000,
        inflationRate: 10,
        year: 6,
      }

      await applyInflation(params)

      expect(mockModelInflation).toHaveBeenCalledWith({
        initialCost: 10000,
        inflationRate: 10,
        analysisPeriod: 5,
      })

      vi.restoreAllMocks()
    })

    it('should handle typical 3% inflation', async () => {
      const mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 11592.74 })

      const params: InflationParams = {
        cost: 10000,
        inflationRate: 3,
        year: 6,
      }

      const result = await applyInflation(params)

      expect(mockModelInflation).toHaveBeenCalledWith({
        initialCost: 10000,
        inflationRate: 3,
        analysisPeriod: 5,
      })
      expect(result).toBe(11592.74)

      vi.restoreAllMocks()
    })
  })

  describe('realistic scenarios', () => {
    it('should handle large costs and long periods', async () => {
      const mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 2000000 })

      const params: InflationParams = {
        cost: 1000000,
        inflationRate: 5,
        year: 10,
      }

      const result = await applyInflation(params)

      expect(mockModelInflation).toHaveBeenCalledWith({
        initialCost: 1000000,
        inflationRate: 5,
        analysisPeriod: 9,
      })
      expect(result).toBe(2000000)

      vi.restoreAllMocks()
    })

    it('should handle energy cost inflation over 5 years', async () => {
      const _mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 57881.25 })

      const params: InflationParams = {
        cost: 50000, // Annual energy cost
        inflationRate: 4, // Energy inflation
        year: 4,
      }

      const result = await applyInflation(params)

      expect(result).toBeCloseTo(57881.25, 2)

      vi.restoreAllMocks()
    })

    it('should handle salary inflation', async () => {
      const _mockModelInflation = vi
        .spyOn(inflationModule, 'modelInflation')
        .mockResolvedValue({ inflatedCost: 110000 })

      const params: InflationParams = {
        cost: 100000, // Base salary
        inflationRate: 3.5,
        year: 3,
      }

      const result = await applyInflation(params)

      expect(result).toBe(110000)

      vi.restoreAllMocks()
    })
  })
})
