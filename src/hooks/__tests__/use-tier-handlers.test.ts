import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useTierHandlers } from '../use-tier-handlers'

describe('useTierHandlers', () => {
  const mockSetValue = vi.fn()

  afterEach(() => {
    mockSetValue.mockClear()
  })

  describe('handleHotChange', () => {
    it('should update hot tier and calculate archive tier', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 20,
          cloudStandardTier: 30,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(40)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 40)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 30) // 100 - 40 - 30
      expect(mockSetValue).toHaveBeenCalledTimes(2)
    })

    it('should clamp hot tier when it would exceed 100% with standard', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 20,
          cloudStandardTier: 60,
          setValue: mockSetValue,
        }),
      )

      // Try to set hot to 50, but 50 + 60 = 110 > 100
      result.current.handleHotChange(50)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 40) // Clamped to 100 - 60
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0) // 100 - 40 - 60
    })

    it('should handle setting hot tier to 0', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 30,
          cloudStandardTier: 40,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(0)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 0)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 60) // 100 - 0 - 40
    })

    it('should handle setting hot tier to maximum possible', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 20,
          cloudStandardTier: 10,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(90)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 90)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0) // 100 - 90 - 10
    })

    it('should handle when standard tier is 100 (hot must be 0)', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 0,
          cloudStandardTier: 100,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(10)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 0) // Clamped to 0
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0) // 100 - 0 - 100
    })

    it('should calculate correct archive tier for various combinations', () => {
      const testCases = [
        { hot: 25, standard: 25, expectedArchive: 50 },
        { hot: 50, standard: 30, expectedArchive: 20 },
        { hot: 10, standard: 80, expectedArchive: 10 },
        { hot: 70, standard: 20, expectedArchive: 10 },
        { hot: 33, standard: 33, expectedArchive: 34 },
      ]

      testCases.forEach(({ hot, standard, expectedArchive }) => {
        mockSetValue.mockClear()

        const { result } = renderHook(() =>
          useTierHandlers({
            cloudHotTier: 0,
            cloudStandardTier: standard,
            setValue: mockSetValue,
          }),
        )

        result.current.handleHotChange(hot)

        expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', expectedArchive)
      })
    })
  })

  describe('handleStandardChange', () => {
    it('should update standard tier and calculate archive tier', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 30,
          cloudStandardTier: 20,
          setValue: mockSetValue,
        }),
      )

      result.current.handleStandardChange(40)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 40)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 30) // 100 - 30 - 40
      expect(mockSetValue).toHaveBeenCalledTimes(2)
    })

    it('should clamp standard tier when it would exceed 100% with hot', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 60,
          cloudStandardTier: 20,
          setValue: mockSetValue,
        }),
      )

      // Try to set standard to 50, but 60 + 50 = 110 > 100
      result.current.handleStandardChange(50)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 40) // Clamped to 100 - 60
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0) // 100 - 60 - 40
    })

    it('should handle setting standard tier to 0', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 40,
          cloudStandardTier: 30,
          setValue: mockSetValue,
        }),
      )

      result.current.handleStandardChange(0)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 0)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 60) // 100 - 40 - 0
    })

    it('should handle setting standard tier to maximum possible', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 15,
          cloudStandardTier: 20,
          setValue: mockSetValue,
        }),
      )

      result.current.handleStandardChange(85)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 85)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0) // 100 - 15 - 85
    })

    it('should handle when hot tier is 100 (standard must be 0)', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 100,
          cloudStandardTier: 0,
          setValue: mockSetValue,
        }),
      )

      result.current.handleStandardChange(10)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 0) // Clamped to 0
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0) // 100 - 100 - 0
    })

    it('should calculate correct archive tier for various combinations', () => {
      const testCases = [
        { hot: 25, standard: 25, expectedArchive: 50 },
        { hot: 30, standard: 50, expectedArchive: 20 },
        { hot: 80, standard: 10, expectedArchive: 10 },
        { hot: 20, standard: 70, expectedArchive: 10 },
        { hot: 34, standard: 33, expectedArchive: 33 },
      ]

      testCases.forEach(({ hot, standard, expectedArchive }) => {
        mockSetValue.mockClear()

        const { result } = renderHook(() =>
          useTierHandlers({
            cloudHotTier: hot,
            cloudStandardTier: 0,
            setValue: mockSetValue,
          }),
        )

        result.current.handleStandardChange(standard)

        expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', expectedArchive)
      })
    })
  })

  describe('realistic storage tier scenarios', () => {
    it('should handle typical hot/standard/archive distribution', () => {
      // Common scenario: 20% hot, 50% standard, 30% archive
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 10,
          cloudStandardTier: 40,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(20)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 20)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 40) // 100 - 20 - 40
    })

    it('should handle mostly archive storage scenario', () => {
      // Scenario: 10% hot, 10% standard, 80% archive
      const { result, rerender } = renderHook(
        ({ hot, standard }) =>
          useTierHandlers({
            cloudHotTier: hot,
            cloudStandardTier: standard,
            setValue: mockSetValue,
          }),
        { initialProps: { hot: 5, standard: 15 } },
      )

      result.current.handleHotChange(10)
      mockSetValue.mockClear()

      // Update props to reflect new hot value
      rerender({ hot: 10, standard: 15 })

      result.current.handleStandardChange(10)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 10)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 80) // 100 - 10 - 10
    })

    it('should handle performance-critical scenario (mostly hot)', () => {
      // Scenario: 70% hot, 20% standard, 10% archive
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 50,
          cloudStandardTier: 30,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(70)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 70)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0) // 100 - 70 - 30
    })

    it('should handle all-standard storage', () => {
      const { result, rerender } = renderHook(
        ({ hot, standard }) =>
          useTierHandlers({
            cloudHotTier: hot,
            cloudStandardTier: standard,
            setValue: mockSetValue,
          }),
        { initialProps: { hot: 20, standard: 60 } },
      )

      result.current.handleHotChange(0)
      mockSetValue.mockClear()

      // Update props to reflect new hot value
      rerender({ hot: 0, standard: 60 })

      result.current.handleStandardChange(100)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 100)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0)
    })
  })

  describe('boundary validation', () => {
    it('should always ensure sum equals 100%', () => {
      const scenarios = [
        { hot: 20, standard: 30 }, // Expected archive: 50
        { hot: 0, standard: 0 }, // Expected archive: 100
        { hot: 50, standard: 50 }, // Expected archive: 0
        { hot: 33, standard: 34 }, // Expected archive: 33
        { hot: 100, standard: 0 }, // Expected archive: 0
      ]

      scenarios.forEach(({ hot, standard }) => {
        mockSetValue.mockClear()

        const { result } = renderHook(() =>
          useTierHandlers({
            cloudHotTier: 0,
            cloudStandardTier: standard,
            setValue: mockSetValue,
          }),
        )

        result.current.handleHotChange(hot)

        const setValueCalls = mockSetValue.mock.calls
        const hotSet = setValueCalls.find((call) => call[0] === 'cloudHotTier')?.[1] ?? 0
        const archiveSet = setValueCalls.find((call) => call[0] === 'cloudArchiveTier')?.[1] ?? 0

        expect(hotSet + standard + archiveSet).toBe(100)
      })
    })

    it('should prevent negative archive tier', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 10,
          cloudStandardTier: 95,
          setValue: mockSetValue,
        }),
      )

      // Try to set hot to 20, which would make archive negative
      result.current.handleHotChange(20)

      // Hot should be clamped to 5 (100 - 95)
      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 5)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 0)
    })

    it('should handle updating tiers multiple times', () => {
      const { result, rerender } = renderHook(
        ({ hot, standard }) =>
          useTierHandlers({
            cloudHotTier: hot,
            cloudStandardTier: standard,
            setValue: mockSetValue,
          }),
        { initialProps: { hot: 30, standard: 40 } },
      )

      result.current.handleHotChange(25)
      mockSetValue.mockClear()

      // Update props to reflect new state
      rerender({ hot: 25, standard: 40 })

      result.current.handleStandardChange(50)

      expect(mockSetValue).toHaveBeenCalledWith('cloudStandardTier', 50)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 25) // 100 - 25 - 50
    })
  })

  describe('edge cases', () => {
    it('should handle floating point values', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 33.33,
          cloudStandardTier: 33.33,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(33.34)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 33.34)
      // Archive should be 100 - 33.34 - 33.33 = 33.33
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', expect.any(Number))

      const archiveCall = mockSetValue.mock.calls.find(
        (call) => call[0] === 'cloudArchiveTier',
      )
      const archiveValue = archiveCall?.[1]
      expect(archiveValue).toBeCloseTo(33.33, 2)
    })

    it('should handle very small tier values', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 0.5,
          cloudStandardTier: 0.5,
          setValue: mockSetValue,
        }),
      )

      result.current.handleHotChange(1)

      expect(mockSetValue).toHaveBeenCalledWith('cloudHotTier', 1)
      expect(mockSetValue).toHaveBeenCalledWith('cloudArchiveTier', 98.5) // 100 - 1 - 0.5
    })

    it('should return both handler functions', () => {
      const { result } = renderHook(() =>
        useTierHandlers({
          cloudHotTier: 20,
          cloudStandardTier: 30,
          setValue: mockSetValue,
        }),
      )

      expect(result.current).toHaveProperty('handleHotChange')
      expect(result.current).toHaveProperty('handleStandardChange')
      expect(typeof result.current.handleHotChange).toBe('function')
      expect(typeof result.current.handleStandardChange).toBe('function')
    })
  })
})
