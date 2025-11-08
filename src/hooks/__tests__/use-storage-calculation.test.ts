import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useStorageCalculation } from '../use-storage-calculation'

describe('useStorageCalculation', () => {
  const mockSetValue = vi.fn()

  afterEach(() => {
    mockSetValue.mockClear()
  })

  describe('HDD only scenarios', () => {
    it('should calculate usable storage for HDD only', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 10,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: false,
          onPremSsdCount: 0,
          onPremSsdSizeTb: 0,
          onPremSsdRaidFactor: 0,
          setValue: mockSetValue,
        }),
      )

      // 10 drives × 4TB = 40TB raw
      // 20% RAID overhead = 8TB
      // Usable = 32TB
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 32)
    })

    it('should return 0 when HDD is disabled', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: false,
          onPremHddCount: 10,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: false,
          onPremSsdCount: 0,
          onPremSsdSizeTb: 0,
          onPremSsdRaidFactor: 0,
          setValue: mockSetValue,
        }),
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 0)
    })

    it('should handle HDD with RAID 10 (50% overhead)', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 8,
          onPremHddSizeTb: 2,
          onPremHddRaidFactor: 50,
          useOnPremSsd: false,
          onPremSsdCount: 0,
          onPremSsdSizeTb: 0,
          onPremSsdRaidFactor: 0,
          setValue: mockSetValue,
        }),
      )

      // 8 drives × 2TB = 16TB raw
      // 50% RAID overhead = 8TB
      // Usable = 8TB
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 8)
    })
  })

  describe('SSD only scenarios', () => {
    it('should calculate usable storage for SSD only', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: false,
          onPremHddCount: 0,
          onPremHddSizeTb: 0,
          onPremHddRaidFactor: 0,
          useOnPremSsd: true,
          onPremSsdCount: 6,
          onPremSsdSizeTb: 1,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      // 6 drives × 1TB = 6TB raw
      // 50% RAID overhead = 3TB
      // Usable = 3TB
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 3)
    })

    it('should return 0 when SSD is disabled', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: false,
          onPremHddCount: 0,
          onPremHddSizeTb: 0,
          onPremHddRaidFactor: 0,
          useOnPremSsd: false,
          onPremSsdCount: 6,
          onPremSsdSizeTb: 1,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 0)
    })

    it('should handle SSD with RAID 5 (20% overhead)', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: false,
          onPremHddCount: 0,
          onPremHddSizeTb: 0,
          onPremHddRaidFactor: 0,
          useOnPremSsd: true,
          onPremSsdCount: 8,
          onPremSsdSizeTb: 2,
          onPremSsdRaidFactor: 20,
          setValue: mockSetValue,
        }),
      )

      // 8 drives × 2TB = 16TB raw
      // 20% RAID overhead = 3.2TB
      // Usable = 12.8TB
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 12.8)
    })
  })

  describe('hybrid HDD + SSD scenarios', () => {
    it('should combine HDD and SSD usable storage', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 12,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: true,
          onPremSsdCount: 6,
          onPremSsdSizeTb: 1,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      // HDD: 12×4TB with 20% RAID = 38.4TB usable
      // SSD: 6×1TB with 50% RAID = 3TB usable
      // Total: 41.4TB
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 41.4)
    })

    it('should handle tiered storage setup', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 24,
          onPremHddSizeTb: 8,
          onPremHddRaidFactor: 40, // RAID 6 for archival
          useOnPremSsd: true,
          onPremSsdCount: 8,
          onPremSsdSizeTb: 0.96, // 960GB drives
          onPremSsdRaidFactor: 50, // RAID 10 for performance
          setValue: mockSetValue,
        }),
      )

      // HDD: 24×8TB with 40% RAID = 115.2TB usable
      // SSD: 8×0.96TB with 50% RAID = 3.84TB usable
      // Total: 119.04TB
      const setValueCalls = mockSetValue.mock.calls
      const actualValue = setValueCalls[0][1]
      expect(actualValue).toBeCloseTo(119.04, 1)
    })

    it('should handle when only HDD is enabled in hybrid config', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 10,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: false, // SSD disabled
          onPremSsdCount: 6,
          onPremSsdSizeTb: 1,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      // Only HDD counts: 10×4TB with 20% RAID = 32TB
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 32)
    })

    it('should handle when only SSD is enabled in hybrid config', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: false, // HDD disabled
          onPremHddCount: 10,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: true,
          onPremSsdCount: 6,
          onPremSsdSizeTb: 1,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      // Only SSD counts: 6×1TB with 50% RAID = 3TB
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 3)
    })
  })

  describe('edge cases', () => {
    it('should return 0 when both storage types are disabled', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: false,
          onPremHddCount: 10,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: false,
          onPremSsdCount: 6,
          onPremSsdSizeTb: 1,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 0)
    })

    it('should handle zero drive counts', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 0,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: true,
          onPremSsdCount: 0,
          onPremSsdSizeTb: 1,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 0)
    })

    it('should handle zero drive sizes', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 10,
          onPremHddSizeTb: 0,
          onPremHddRaidFactor: 20,
          useOnPremSsd: true,
          onPremSsdCount: 6,
          onPremSsdSizeTb: 0,
          onPremSsdRaidFactor: 50,
          setValue: mockSetValue,
        }),
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 0)
    })

    it('should never return negative values', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: -5, // Invalid negative value
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20,
          useOnPremSsd: false,
          onPremSsdCount: 0,
          onPremSsdSizeTb: 0,
          onPremSsdRaidFactor: 0,
          setValue: mockSetValue,
        }),
      )

      const setValueCalls = mockSetValue.mock.calls
      const storageValue = setValueCalls[0][1]
      expect(storageValue).toBeGreaterThanOrEqual(0)
    })
  })

  describe('realistic enterprise scenarios', () => {
    it('should calculate for small business file server', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 8,
          onPremHddSizeTb: 4,
          onPremHddRaidFactor: 20, // RAID 5
          useOnPremSsd: false,
          onPremSsdCount: 0,
          onPremSsdSizeTb: 0,
          onPremSsdRaidFactor: 0,
          setValue: mockSetValue,
        }),
      )

      // 8×4TB HDD with RAID 5 = 25.6TB usable
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 25.6)
    })

    it('should calculate for database server with SSDs', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: false,
          onPremHddCount: 0,
          onPremHddSizeTb: 0,
          onPremHddRaidFactor: 0,
          useOnPremSsd: true,
          onPremSsdCount: 8,
          onPremSsdSizeTb: 1.92, // 1.92TB enterprise SSDs
          onPremSsdRaidFactor: 50, // RAID 10 for performance
          setValue: mockSetValue,
        }),
      )

      // 8×1.92TB SSD with RAID 10 = 7.68TB usable
      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 7.68)
    })

    it('should calculate for enterprise storage array', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 48,
          onPremHddSizeTb: 10,
          onPremHddRaidFactor: 40, // RAID 6
          useOnPremSsd: true,
          onPremSsdCount: 12,
          onPremSsdSizeTb: 3.84, // 3.84TB SSDs
          onPremSsdRaidFactor: 20, // RAID 5
          setValue: mockSetValue,
        }),
      )

      // HDD: 48×10TB with RAID 6 = 288TB usable
      // SSD: 12×3.84TB with RAID 5 = 36.864TB usable
      // Total: 324.864TB
      const expectedTotal = 288 + 36.864
      expect(mockSetValue).toHaveBeenCalledWith(
        'onPremBackupStorage',
        expectedTotal,
      )
    })

    it('should calculate for media production environment', () => {
      renderHook(() =>
        useStorageCalculation({
          useOnPremHdd: true,
          onPremHddCount: 24,
          onPremHddSizeTb: 18, // Large capacity HDDs
          onPremHddRaidFactor: 20, // RAID 5
          useOnPremSsd: true,
          onPremSsdCount: 16,
          onPremSsdSizeTb: 7.68, // High-capacity SSDs
          onPremSsdRaidFactor: 50, // RAID 10 for editing
          setValue: mockSetValue,
        }),
      )

      // HDD: 24×18TB with RAID 5 = 345.6TB usable (archive)
      // SSD: 16×7.68TB with RAID 10 = 61.44TB usable (active projects)
      // Total: 407.04TB
      const expectedTotal = 345.6 + 61.44
      expect(mockSetValue).toHaveBeenCalledWith(
        'onPremBackupStorage',
        expectedTotal,
      )
    })
  })

  describe('reactivity and updates', () => {
    it('should update when HDD count changes', () => {
      const { rerender } = renderHook(
        ({ hddCount }) =>
          useStorageCalculation({
            useOnPremHdd: true,
            onPremHddCount: hddCount,
            onPremHddSizeTb: 4,
            onPremHddRaidFactor: 20,
            useOnPremSsd: false,
            onPremSsdCount: 0,
            onPremSsdSizeTb: 0,
            onPremSsdRaidFactor: 0,
            setValue: mockSetValue,
          }),
        { initialProps: { hddCount: 10 } },
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 32) // 10×4 with 20% RAID

      mockSetValue.mockClear()
      rerender({ hddCount: 12 })

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 38.4) // 12×4 with 20% RAID
    })

    it('should update when RAID factor changes', () => {
      const { rerender } = renderHook(
        ({ raidFactor }) =>
          useStorageCalculation({
            useOnPremHdd: true,
            onPremHddCount: 10,
            onPremHddSizeTb: 4,
            onPremHddRaidFactor: raidFactor,
            useOnPremSsd: false,
            onPremSsdCount: 0,
            onPremSsdSizeTb: 0,
            onPremSsdRaidFactor: 0,
            setValue: mockSetValue,
          }),
        { initialProps: { raidFactor: 20 } },
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 32) // RAID 5

      mockSetValue.mockClear()
      rerender({ raidFactor: 50 })

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 20) // RAID 10
    })

    it('should update when storage is enabled/disabled', () => {
      const { rerender } = renderHook(
        ({ enabled }) =>
          useStorageCalculation({
            useOnPremHdd: enabled,
            onPremHddCount: 10,
            onPremHddSizeTb: 4,
            onPremHddRaidFactor: 20,
            useOnPremSsd: false,
            onPremSsdCount: 0,
            onPremSsdSizeTb: 0,
            onPremSsdRaidFactor: 0,
            setValue: mockSetValue,
          }),
        { initialProps: { enabled: true } },
      )

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 32)

      mockSetValue.mockClear()
      rerender({ enabled: false })

      expect(mockSetValue).toHaveBeenCalledWith('onPremBackupStorage', 0)
    })
  })
})
