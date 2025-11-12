import { describe, expect, it } from 'vitest'
import { calculateUsableStorage } from '../storage-utils'

describe('calculateUsableStorage', () => {
  describe('basic calculations', () => {
    it('should calculate usable storage with RAID overhead', () => {
      // 10 drives × 1TB each = 10TB raw
      // 20% RAID overhead = 2TB
      // Usable = 8TB
      expect(calculateUsableStorage(10, 1, 20)).toBe(8)
    })

    it('should calculate with different RAID factors', () => {
      // RAID 5 (20% overhead)
      expect(calculateUsableStorage(4, 1, 20)).toBe(3.2)

      // RAID 6 (40% overhead)
      expect(calculateUsableStorage(4, 1, 40)).toBe(2.4)

      // RAID 10 (50% overhead)
      expect(calculateUsableStorage(4, 1, 50)).toBe(2)
    })

    it('should handle no RAID overhead (0%)', () => {
      expect(calculateUsableStorage(10, 1, 0)).toBe(10)
    })

    it('should handle different drive sizes', () => {
      // 5 drives × 4TB each = 20TB raw
      // 20% RAID overhead = 4TB
      // Usable = 16TB
      expect(calculateUsableStorage(5, 4, 20)).toBe(16)
    })
  })

  describe('zero and undefined handling', () => {
    it('should return 0 when count is 0', () => {
      expect(calculateUsableStorage(0, 10, 20)).toBe(0)
    })

    it('should return 0 when size is 0', () => {
      expect(calculateUsableStorage(10, 0, 20)).toBe(0)
    })

    it('should handle 0 RAID factor', () => {
      expect(calculateUsableStorage(10, 2, 0)).toBe(20)
    })

    it('should treat undefined count as 0', () => {
      expect(calculateUsableStorage(undefined as unknown as number, 10, 20)).toBe(0)
    })

    it('should treat undefined size as 0', () => {
      expect(calculateUsableStorage(10, undefined as unknown as number, 20)).toBe(0)
    })

    it('should treat undefined RAID factor as 0', () => {
      expect(calculateUsableStorage(10, 2, undefined as unknown as number)).toBe(20)
    })
  })

  describe('realistic HDD scenarios', () => {
    it('should calculate for typical file server (8×4TB HDD, RAID 5)', () => {
      // 8 drives × 4TB = 32TB raw
      // RAID 5 (20% overhead) = 6.4TB
      // Usable = 25.6TB
      expect(calculateUsableStorage(8, 4, 20)).toBe(25.6)
    })

    it('should calculate for enterprise storage (24×8TB HDD, RAID 6)', () => {
      // 24 drives × 8TB = 192TB raw
      // RAID 6 (40% overhead) = 76.8TB
      // Usable = 115.2TB
      expect(calculateUsableStorage(24, 8, 40)).toBeCloseTo(115.2, 1)
    })

    it('should calculate for backup server (12×10TB HDD, RAID 5)', () => {
      // 12 drives × 10TB = 120TB raw
      // RAID 5 (20% overhead) = 24TB
      // Usable = 96TB
      expect(calculateUsableStorage(12, 10, 20)).toBe(96)
    })

    it('should calculate for small NAS (4×2TB HDD, RAID 10)', () => {
      // 4 drives × 2TB = 8TB raw
      // RAID 10 (50% overhead) = 4TB
      // Usable = 4TB
      expect(calculateUsableStorage(4, 2, 50)).toBe(4)
    })
  })

  describe('realistic SSD scenarios', () => {
    it('should calculate for database server (6×1TB SSD, RAID 10)', () => {
      // 6 drives × 1TB = 6TB raw
      // RAID 10 (50% overhead) = 3TB
      // Usable = 3TB
      expect(calculateUsableStorage(6, 1, 50)).toBe(3)
    })

    it('should calculate for high-performance storage (8×2TB SSD, RAID 5)', () => {
      // 8 drives × 2TB = 16TB raw
      // RAID 5 (20% overhead) = 3.2TB
      // Usable = 12.8TB
      expect(calculateUsableStorage(8, 2, 20)).toBe(12.8)
    })

    it('should calculate for VM storage (12×960GB SSD, RAID 6)', () => {
      // 12 drives × 0.96TB = 11.52TB raw
      // RAID 6 (40% overhead) = 4.608TB
      // Usable = 6.912TB
      expect(calculateUsableStorage(12, 0.96, 40)).toBeCloseTo(6.912, 2)
    })
  })

  describe('edge cases', () => {
    it('should handle very large arrays', () => {
      // 100 drives × 10TB = 1000TB (1PB) raw
      // 20% overhead = 200TB
      // Usable = 800TB
      expect(calculateUsableStorage(100, 10, 20)).toBe(800)
    })

    it('should handle very small drives', () => {
      // 4 drives × 0.5TB = 2TB raw
      // 50% overhead = 1TB
      // Usable = 1TB
      expect(calculateUsableStorage(4, 0.5, 50)).toBe(1)
    })

    it('should handle single drive (no RAID)', () => {
      // 1 drive × 10TB = 10TB raw
      // 0% overhead (no RAID)
      // Usable = 10TB
      expect(calculateUsableStorage(1, 10, 0)).toBe(10)
    })

    it('should handle decimal drive counts (for calculations)', () => {
      // 2.5 drives × 1TB = 2.5TB raw (hypothetical)
      // 20% overhead = 0.5TB
      // Usable = 2TB
      expect(calculateUsableStorage(2.5, 1, 20)).toBe(2)
    })

    it('should handle decimal RAID factors', () => {
      // 10 drives × 1TB = 10TB raw
      // 22.5% overhead = 2.25TB
      // Usable = 7.75TB
      expect(calculateUsableStorage(10, 1, 22.5)).toBe(7.75)
    })

    it('should handle very high RAID overhead', () => {
      // 10 drives × 1TB = 10TB raw
      // 80% overhead = 8TB
      // Usable = 2TB
      expect(calculateUsableStorage(10, 1, 80)).toBe(2)
    })

    it('should handle 100% RAID overhead (all overhead, no usable)', () => {
      // 10 drives × 1TB = 10TB raw
      // 100% overhead = 10TB
      // Usable = 0TB
      expect(calculateUsableStorage(10, 1, 100)).toBe(0)
    })
  })

  describe('precision', () => {
    it('should maintain precision for complex calculations', () => {
      // 7 drives × 3.5TB = 24.5TB raw
      // 17.5% overhead = 4.2875TB
      // Usable = 20.2125TB
      expect(calculateUsableStorage(7, 3.5, 17.5)).toBeCloseTo(20.2125, 4)
    })

    it('should handle repeating decimals', () => {
      // 3 drives × 1TB = 3TB raw
      // 33.33% overhead = 1TB
      // Usable = 2TB
      const result = calculateUsableStorage(3, 1, 33.33)
      expect(result).toBeCloseTo(2, 2)
    })
  })

  describe('multiple storage type combinations', () => {
    it('should calculate total for HDD + SSD setup', () => {
      // HDD: 12×4TB with RAID 5 (20%)
      const hddUsable = calculateUsableStorage(12, 4, 20)
      expect(hddUsable).toBe(38.4)

      // SSD: 6×1TB with RAID 10 (50%)
      const ssdUsable = calculateUsableStorage(6, 1, 50)
      expect(ssdUsable).toBe(3)

      // Total usable
      const total = hddUsable + ssdUsable
      expect(total).toBe(41.4)
    })

    it('should calculate for tiered storage architecture', () => {
      // Tier 1 (Hot): 8×960GB NVMe SSD, RAID 10
      const tier1 = calculateUsableStorage(8, 0.96, 50)
      expect(tier1).toBeCloseTo(3.84, 2)

      // Tier 2 (Warm): 12×2TB SATA SSD, RAID 5
      const tier2 = calculateUsableStorage(12, 2, 20)
      expect(tier2).toBe(19.2)

      // Tier 3 (Cold): 24×8TB HDD, RAID 6
      const tier3 = calculateUsableStorage(24, 8, 40)
      expect(tier3).toBeCloseTo(115.2, 1)

      const totalTiered = tier1 + tier2 + tier3
      expect(totalTiered).toBeCloseTo(138.24, 2)
    })
  })
})
