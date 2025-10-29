import { describe, expect, it } from 'vitest'
import { tbToGb } from '../utils'

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
