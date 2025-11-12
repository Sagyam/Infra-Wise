import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useSensitivityCalculations } from '../use-sensitivity-calculations'
import type { CostFormValues } from '@/lib/types'

describe('useSensitivityCalculations', () => {
  const mockFormValues: Partial<CostFormValues> = {
    inflationRate: 3,
    analysisPeriod: 5,
    cloudStorageSize: 100,
    cloudEgress: 50,
    cloudGrowthRate: 10,
    cloudEgressGrowthRate: 5,
    onPremElectricityCost: 0.12,
    cloudGeneralVmCount: 10,
    onPremSysAdminSalary: 100000,
  }

  const baseOnPremTCO = 1000000
  const baseCloudTCO = 1200000

  describe('disabled state', () => {
    it('should return empty array when disabled', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          false,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      expect(result.current).toEqual([])
    })

    it('should return empty array when selectedVariable is undefined', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          undefined,
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      expect(result.current).toEqual([])
    })
  })

  describe('data point generation', () => {
    it('should generate 21 data points (-10 to +10 steps)', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      expect(result.current).toHaveLength(21) // -10 to +10 inclusive
    })

    it('should generate points with correct structure', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const firstPoint = result.current[0]
      expect(firstPoint).toHaveProperty('change')
      expect(firstPoint).toHaveProperty('onPrem')
      expect(firstPoint).toHaveProperty('cloud')
      expect(firstPoint).toHaveProperty('value')
    })

    it('should have symmetrical change values around 0', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const changes = result.current.map((point) => parseFloat(point.change))
      expect(changes[0]).toBe(-20) // -100% of range
      expect(changes[10]).toBe(0) // Middle point
      expect(changes[20]).toBe(20) // +100% of range
    })
  })

  describe('inflationRate sensitivity', () => {
    it('should impact both on-prem and cloud proportionally', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10] // 0% change
      expect(middlePoint.onPrem).toBe(baseOnPremTCO)
      expect(middlePoint.cloud).toBe(baseCloudTCO)

      const higherPoint = result.current[15] // +10% change
      expect(higherPoint.onPrem).toBeGreaterThan(baseOnPremTCO)
      expect(higherPoint.cloud).toBeGreaterThan(baseCloudTCO)

      const lowerPoint = result.current[5] // -10% change
      expect(lowerPoint.onPrem).toBeLessThan(baseOnPremTCO)
      expect(lowerPoint.cloud).toBeLessThan(baseCloudTCO)
    })

    it('should calculate adjusted inflation rate value', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      expect(middlePoint.value).toBe(3) // Base inflation rate

      const higherPoint = result.current[20] // +20% change
      expect(higherPoint.value).toBeCloseTo(3.6, 2) // 3 * 1.2
    })
  })

  describe('analysisPeriod sensitivity', () => {
    it('should impact both on-prem and cloud proportionally', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'analysisPeriod',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      expect(middlePoint.onPrem).toBe(baseOnPremTCO)
      expect(middlePoint.cloud).toBe(baseCloudTCO)

      // Longer periods should increase costs
      const longerPeriod = result.current[15]
      expect(longerPeriod.onPrem).toBeGreaterThan(baseOnPremTCO)
      expect(longerPeriod.cloud).toBeGreaterThan(baseCloudTCO)
    })
  })

  describe('cloudStorageSize sensitivity', () => {
    it('should primarily impact cloud costs', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'cloudStorageSize',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      const higherPoint = result.current[15]

      // Cloud should change significantly
      const cloudChange =
        (higherPoint.cloud - middlePoint.cloud) / middlePoint.cloud
      // On-prem should change minimally
      const onPremChange =
        (higherPoint.onPrem - middlePoint.onPrem) / middlePoint.onPrem

      expect(Math.abs(cloudChange)).toBeGreaterThan(Math.abs(onPremChange))
    })

    it('should calculate adjusted storage size', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'cloudStorageSize',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      expect(middlePoint.value).toBe(100) // Base storage size

      const higherPoint = result.current[20]
      expect(higherPoint.value).toBeCloseTo(120, 1) // 100 * 1.2
    })
  })

  describe('cloudEgress sensitivity', () => {
    it('should primarily impact cloud costs', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'cloudEgress',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      const higherPoint = result.current[15]

      const cloudChange =
        (higherPoint.cloud - middlePoint.cloud) / middlePoint.cloud
      const onPremChange =
        (higherPoint.onPrem - middlePoint.onPrem) / middlePoint.onPrem

      expect(Math.abs(cloudChange)).toBeGreaterThan(Math.abs(onPremChange))
    })
  })

  describe('cloudGrowthRate sensitivity', () => {
    it('should have compounding impact on cloud costs', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'cloudGrowthRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      const higherPoint = result.current[15]

      // Cloud should be more sensitive to growth rate
      const cloudChange =
        (higherPoint.cloud - middlePoint.cloud) / middlePoint.cloud
      const onPremChange =
        (higherPoint.onPrem - middlePoint.onPrem) / middlePoint.onPrem

      expect(Math.abs(cloudChange)).toBeGreaterThan(Math.abs(onPremChange))
    })
  })

  describe('onPremElectricityCost sensitivity', () => {
    it('should primarily impact on-prem costs', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'onPremElectricityCost',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      const higherPoint = result.current[15]

      const onPremChange =
        (higherPoint.onPrem - middlePoint.onPrem) / middlePoint.onPrem
      const cloudChange =
        (higherPoint.cloud - middlePoint.cloud) / middlePoint.cloud

      expect(Math.abs(onPremChange)).toBeGreaterThan(Math.abs(cloudChange))
    })

    it('should calculate adjusted electricity cost', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'onPremElectricityCost',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      expect(middlePoint.value).toBeCloseTo(0.12, 3)

      const higherPoint = result.current[20]
      expect(higherPoint.value).toBeCloseTo(0.144, 3) // 0.12 * 1.2
    })
  })

  describe('cloudGeneralVmCount sensitivity', () => {
    it('should primarily impact cloud costs', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'cloudGeneralVmCount',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      const higherPoint = result.current[15]

      const cloudChange =
        (higherPoint.cloud - middlePoint.cloud) / middlePoint.cloud
      const onPremChange =
        (higherPoint.onPrem - middlePoint.onPrem) / middlePoint.onPrem

      expect(Math.abs(cloudChange)).toBeGreaterThan(Math.abs(onPremChange))
    })
  })

  describe('onPremSysAdminSalary sensitivity', () => {
    it('should primarily impact on-prem costs', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'onPremSysAdminSalary',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      const higherPoint = result.current[15]

      const onPremChange =
        (higherPoint.onPrem - middlePoint.onPrem) / middlePoint.onPrem
      const cloudChange =
        (higherPoint.cloud - middlePoint.cloud) / middlePoint.cloud

      expect(Math.abs(onPremChange)).toBeGreaterThan(Math.abs(cloudChange))
    })

    it('should have some impact on cloud costs (cloud admins)', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'onPremSysAdminSalary',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const middlePoint = result.current[10]
      const higherPoint = result.current[15]

      // Cloud should have some change (smaller than on-prem)
      expect(higherPoint.cloud).not.toBe(middlePoint.cloud)
      expect(higherPoint.cloud).toBeGreaterThan(middlePoint.cloud)
    })
  })

  describe('range variations', () => {
    it('should handle 10% range', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          10,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const changes = result.current.map((point) => parseFloat(point.change))
      expect(Math.min(...changes)).toBe(-10)
      expect(Math.max(...changes)).toBe(10)
    })

    it('should handle 50% range', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          50,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      const changes = result.current.map((point) => parseFloat(point.change))
      expect(Math.min(...changes)).toBe(-50)
      expect(Math.max(...changes)).toBe(50)
    })
  })

  describe('realistic scenarios', () => {
    it('should show how electricity price changes affect TCO', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'onPremElectricityCost',
          mockFormValues as CostFormValues,
          30, // ±30% range
          1500000, // $1.5M on-prem
          1800000, // $1.8M cloud
        ),
      )

      expect(result.current).toHaveLength(21)

      const lowestCost = result.current[0] // -30% electricity
      const highestCost = result.current[20] // +30% electricity

      expect(lowestCost.onPrem).toBeLessThan(highestCost.onPrem)
      expect(lowestCost.cloud).toBeLessThan(highestCost.cloud)

      // On-prem should be more affected than cloud
      const onPremDiff = highestCost.onPrem - lowestCost.onPrem
      const cloudDiff = highestCost.cloud - lowestCost.cloud
      expect(onPremDiff).toBeGreaterThan(cloudDiff)
    })

    it('should show impact of cloud storage growth', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'cloudGrowthRate',
          { ...mockFormValues, cloudGrowthRate: 15 } as CostFormValues,
          40, // ±40% range
          2000000,
          2500000,
        ),
      )

      const noGrowth = result.current.find((p) => parseFloat(p.change) === 0)
      const highGrowth = result.current[result.current.length - 1] // Last point (+40% change)

      expect(noGrowth).toBeDefined()
      expect(highGrowth).toBeDefined()

      if (noGrowth && highGrowth) {
        expect(highGrowth.cloud).toBeGreaterThan(noGrowth.cloud)
      }
    })
  })

  describe('edge cases', () => {
    it('should handle zero base value', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'cloudEgress',
          { ...mockFormValues, cloudEgress: 0 } as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      expect(result.current).toHaveLength(21)
      const middlePoint = result.current[10]
      expect(middlePoint.value).toBe(0)
    })

    it('should round on-prem and cloud values', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      result.current.forEach((point) => {
        expect(point.onPrem).toBe(Math.round(point.onPrem))
        expect(point.cloud).toBe(Math.round(point.cloud))
      })
    })

    it('should format change values to 1 decimal place', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'inflationRate',
          mockFormValues as CostFormValues,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      result.current.forEach((point) => {
        const decimalPart = point.change.split('.')[1]
        expect(decimalPart?.length || 0).toBeLessThanOrEqual(1)
      })
    })

    it('should handle unknown variable with default behavior', () => {
      const { result } = renderHook(() =>
        useSensitivityCalculations(
          true,
          'unknownVariable',
          { ...mockFormValues, unknownVariable: 100 } as Record<string, unknown>,
          20,
          baseOnPremTCO,
          baseCloudTCO,
        ),
      )

      expect(result.current).toHaveLength(21)
      // Should use proportional impact for unknown variables
      const middlePoint = result.current[10]
      expect(middlePoint.onPrem).toBe(baseOnPremTCO)
      expect(middlePoint.cloud).toBe(baseCloudTCO)
    })
  })

  describe('memoization', () => {
    it('should recompute when enabled changes', () => {
      const { result, rerender } = renderHook(
        ({ enabled }) =>
          useSensitivityCalculations(
            enabled,
            'inflationRate',
            mockFormValues as CostFormValues,
            20,
            baseOnPremTCO,
            baseCloudTCO,
          ),
        { initialProps: { enabled: false } },
      )

      expect(result.current).toEqual([])

      rerender({ enabled: true })

      expect(result.current).toHaveLength(21)
    })

    it('should recompute when selectedVariable changes', () => {
      const { result, rerender } = renderHook(
        ({ variable }) =>
          useSensitivityCalculations(
            true,
            variable,
            mockFormValues as CostFormValues,
            20,
            baseOnPremTCO,
            baseCloudTCO,
          ),
        { initialProps: { variable: 'inflationRate' } },
      )

      const firstResult = result.current[10].value

      rerender({ variable: 'cloudStorageSize' })

      const secondResult = result.current[10].value

      expect(firstResult).not.toBe(secondResult)
    })

    it('should recompute when range changes', () => {
      const { result, rerender } = renderHook(
        ({ range }) =>
          useSensitivityCalculations(
            true,
            'inflationRate',
            mockFormValues as CostFormValues,
            range,
            baseOnPremTCO,
            baseCloudTCO,
          ),
        { initialProps: { range: 20 } },
      )

      const firstMax = parseFloat(result.current[20].change)

      rerender({ range: 40 })

      const secondMax = parseFloat(result.current[20].change)

      expect(firstMax).toBe(20)
      expect(secondMax).toBe(40)
    })
  })
})
