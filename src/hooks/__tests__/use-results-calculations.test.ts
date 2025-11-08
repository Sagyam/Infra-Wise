import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useResultsCalculations } from '../use-results-calculations'
import type { CalculationResult, CostFormValues } from '@/lib/types'

describe('useResultsCalculations', () => {
  const mockResults: CalculationResult = {
    onPremTCO: 1000000,
    cloudTCO: 1200000,
    savings: -200000, // Negative means on-prem wins
    yearlyCosts: [],
    analysisPeriod: 5,
    breakevenPoint: null,
  }

  describe('basic data extraction', () => {
    it('should extract values from results', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(mockResults, 'tco'),
      )

      expect(result.current.onPremTCO).toBe(1000000)
      expect(result.current.cloudTCO).toBe(1200000)
      expect(result.current.savings).toBe(-200000)
      expect(result.current.analysisPeriod).toBe(5)
      expect(result.current.breakevenPoint).toBe(null)
    })

    it('should handle null results with defaults', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(null, 'tco'),
      )

      expect(result.current.onPremTCO).toBe(0)
      expect(result.current.cloudTCO).toBe(0)
      expect(result.current.savings).toBe(0)
      expect(result.current.yearlyCosts).toEqual([])
      expect(result.current.analysisPeriod).toBe(1)
      expect(result.current.breakevenPoint).toBe(null)
    })
  })

  describe('winningOption calculation', () => {
    it('should identify cloud as winner when savings > 0', () => {
      const cloudWinsResults: CalculationResult = {
        ...mockResults,
        onPremTCO: 1200000,
        cloudTCO: 1000000,
        savings: 200000, // Positive = cloud wins
      }

      const { result } = renderHook(() =>
        useResultsCalculations(cloudWinsResults, 'tco'),
      )

      expect(result.current.winningOption).toBe('Cloud')
    })

    it('should identify on-prem as winner when savings < 0', () => {
      const onPremWinsResults: CalculationResult = {
        ...mockResults,
        onPremTCO: 1000000,
        cloudTCO: 1200000,
        savings: -200000, // Negative = on-prem wins
      }

      const { result } = renderHook(() =>
        useResultsCalculations(onPremWinsResults, 'tco'),
      )

      expect(result.current.winningOption).toBe('On-Premise')
    })

    it('should identify on-prem as winner when savings = 0 (tie)', () => {
      const tieResults: CalculationResult = {
        ...mockResults,
        onPremTCO: 1000000,
        cloudTCO: 1000000,
        savings: 0,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(tieResults, 'tco'),
      )

      expect(result.current.winningOption).toBe('On-Premise')
    })
  })

  describe('winningSavings calculation', () => {
    it('should return positive savings when cloud wins', () => {
      const cloudWinsResults: CalculationResult = {
        ...mockResults,
        savings: 200000,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(cloudWinsResults, 'tco'),
      )

      expect(result.current.winningSavings).toBe(200000)
    })

    it('should return absolute value when on-prem wins', () => {
      const onPremWinsResults: CalculationResult = {
        ...mockResults,
        savings: -150000,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(onPremWinsResults, 'tco'),
      )

      expect(result.current.winningSavings).toBe(150000)
    })

    it('should return 0 when savings is 0', () => {
      const tieResults: CalculationResult = {
        ...mockResults,
        savings: 0,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(tieResults, 'tco'),
      )

      // Handle JavaScript's -0 vs +0
      expect(Math.abs(result.current.winningSavings)).toBe(0)
    })
  })

  describe('TCO mode display values', () => {
    it('should return original TCO values in TCO mode', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(mockResults, 'tco'),
      )

      expect(result.current.onPremDisplay).toBe(1000000)
      expect(result.current.cloudDisplay).toBe(1200000)
    })

    it('should return absolute savings in TCO mode', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(mockResults, 'tco'),
      )

      expect(result.current.savingsDisplay).toBe(200000)
    })

    it('should have correct display title for TCO mode', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(mockResults, 'tco'),
      )

      expect(result.current.displayTitle).toBe(
        'Total Cost of Ownership (TCO) over 5 years',
      )
    })
  })

  describe('amortized mode display values', () => {
    it('should divide TCO by analysis period in amortized mode', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(mockResults, 'amortized'),
      )

      expect(result.current.onPremDisplay).toBe(200000) // 1000000 / 5
      expect(result.current.cloudDisplay).toBe(240000) // 1200000 / 5
    })

    it('should divide savings by analysis period in amortized mode', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(mockResults, 'amortized'),
      )

      expect(result.current.savingsDisplay).toBe(40000) // 200000 / 5
    })

    it('should have correct display title for amortized mode', () => {
      const { result } = renderHook(() =>
        useResultsCalculations(mockResults, 'amortized'),
      )

      expect(result.current.displayTitle).toBe(
        'Amortized Cost Per Year over 5 years',
      )
    })

    it('should handle 1-year analysis period in amortized mode', () => {
      const oneYearResults: CalculationResult = {
        ...mockResults,
        analysisPeriod: 1,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(oneYearResults, 'amortized'),
      )

      expect(result.current.onPremDisplay).toBe(1000000)
      expect(result.current.cloudDisplay).toBe(1200000)
      expect(result.current.displayTitle).toBe(
        'Amortized Cost Per Year over 1 years',
      )
    })

    it('should handle 10-year analysis period in amortized mode', () => {
      const tenYearResults: CalculationResult = {
        ...mockResults,
        onPremTCO: 5000000,
        cloudTCO: 6000000,
        savings: -1000000,
        analysisPeriod: 10,
        yearlyCosts: [],
        breakevenPoint: null,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(tenYearResults, 'amortized'),
      )

      expect(result.current.onPremDisplay).toBe(500000) // 5M / 10
      expect(result.current.cloudDisplay).toBe(600000) // 6M / 10
      expect(result.current.savingsDisplay).toBe(100000) // 1M / 10
    })
  })

  describe('realistic scenarios', () => {
    it('should handle large enterprise TCO comparison', () => {
      const enterpriseResults: CalculationResult = {
        onPremTCO: 10000000, // $10M
        cloudTCO: 8500000, // $8.5M
        savings: 1500000, // Cloud saves $1.5M
        analysisPeriod: 5,
        yearlyCosts: [],
        breakevenPoint: 3,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(enterpriseResults, 'tco'),
      )

      expect(result.current.winningOption).toBe('Cloud')
      expect(result.current.winningSavings).toBe(1500000)
      expect(result.current.onPremDisplay).toBe(10000000)
      expect(result.current.cloudDisplay).toBe(8500000)
      expect(result.current.breakevenPoint).toBe(3)
    })

    it('should handle small business comparison', () => {
      const smallBizResults: CalculationResult = {
        onPremTCO: 150000, // $150k
        cloudTCO: 200000, // $200k
        savings: -50000, // On-prem saves $50k
        analysisPeriod: 3,
        yearlyCosts: [],
        breakevenPoint: null, // Never breaks even
      }

      const { result } = renderHook(() =>
        useResultsCalculations(smallBizResults, 'amortized'),
      )

      expect(result.current.winningOption).toBe('On-Premise')
      expect(result.current.winningSavings).toBe(50000)
      expect(result.current.onPremDisplay).toBe(50000) // 150k / 3
      expect(result.current.cloudDisplay).toBeCloseTo(66666.67, 0) // 200k / 3
      expect(result.current.savingsDisplay).toBeCloseTo(16666.67, 0) // 50k / 3
    })

    it('should handle close comparison (near tie)', () => {
      const closeResults: CalculationResult = {
        onPremTCO: 1000000,
        cloudTCO: 1005000,
        savings: -5000, // Only $5k difference
        analysisPeriod: 5,
        yearlyCosts: [],
        breakevenPoint: null,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(closeResults, 'tco'),
      )

      expect(result.current.winningOption).toBe('On-Premise')
      expect(result.current.winningSavings).toBe(5000)
    })
  })

  describe('memoization behavior', () => {
    it('should recompute when savings change', () => {
      const { result, rerender } = renderHook(
        ({ results }) => useResultsCalculations(results, 'tco'),
        { initialProps: { results: mockResults } },
      )

      const firstWinner = result.current.winningOption

      const updatedResults: CalculationResult = {
        ...mockResults,
        savings: 100000, // Changed to positive
      }

      rerender({ results: updatedResults })

      expect(result.current.winningOption).not.toBe(firstWinner)
      expect(result.current.winningOption).toBe('Cloud')
    })

    it('should recompute when calculation mode changes', () => {
      const { result, rerender } = renderHook(
        ({ mode }) => useResultsCalculations(mockResults, mode),
        { initialProps: { mode: 'tco' as CostFormValues['calculationMode'] } },
      )

      const tcoDisplay = result.current.onPremDisplay

      rerender({ mode: 'amortized' as CostFormValues['calculationMode'] })

      expect(result.current.onPremDisplay).not.toBe(tcoDisplay)
      expect(result.current.onPremDisplay).toBe(200000) // Amortized value
    })

    it('should recompute when analysis period changes', () => {
      const { result, rerender } = renderHook(
        ({ results }) => useResultsCalculations(results, 'amortized'),
        { initialProps: { results: mockResults } },
      )

      const initial = result.current.onPremDisplay

      const updatedResults: CalculationResult = {
        ...mockResults,
        analysisPeriod: 10,
      }

      rerender({ results: updatedResults })

      expect(result.current.onPremDisplay).not.toBe(initial)
      expect(result.current.onPremDisplay).toBe(100000) // 1M / 10 instead of 1M / 5
    })
  })

  describe('edge cases', () => {
    it('should handle zero TCO values', () => {
      const zeroResults: CalculationResult = {
        onPremTCO: 0,
        cloudTCO: 0,
        savings: 0,
        analysisPeriod: 5,
        yearlyCosts: [],
        breakevenPoint: null,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(zeroResults, 'tco'),
      )

      expect(result.current.onPremDisplay).toBe(0)
      expect(result.current.cloudDisplay).toBe(0)
      // Handle JavaScript's -0 vs +0
      expect(Math.abs(result.current.savingsDisplay)).toBe(0)
      expect(result.current.winningOption).toBe('On-Premise')
    })

    it('should handle very large TCO values', () => {
      const largeResults: CalculationResult = {
        onPremTCO: 100000000, // $100M
        cloudTCO: 95000000, // $95M
        savings: 5000000, // $5M savings
        analysisPeriod: 10,
        yearlyCosts: [],
        breakevenPoint: 7,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(largeResults, 'amortized'),
      )

      expect(result.current.onPremDisplay).toBe(10000000) // $10M per year
      expect(result.current.cloudDisplay).toBe(9500000) // $9.5M per year
      expect(result.current.savingsDisplay).toBe(500000) // $500k per year
    })

    it('should handle breakeven point present', () => {
      const breakevenResults: CalculationResult = {
        ...mockResults,
        breakevenPoint: 4,
      }

      const { result } = renderHook(() =>
        useResultsCalculations(breakevenResults, 'tco'),
      )

      expect(result.current.breakevenPoint).toBe(4)
    })
  })
})
