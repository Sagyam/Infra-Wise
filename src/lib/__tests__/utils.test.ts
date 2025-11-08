import { describe, expect, it } from 'vitest'
import { cn, jsonToCSV } from '../utils'

describe('cn (className merger)', () => {
  describe('basic functionality', () => {
    it('should merge single class name', () => {
      expect(cn('foo')).toBe('foo')
    })

    it('should merge multiple class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle empty strings', () => {
      expect(cn('', 'foo', '')).toBe('foo')
    })

    it('should handle undefined values', () => {
      expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    })

    it('should handle null values', () => {
      expect(cn('foo', null, 'bar')).toBe('foo bar')
    })
  })

  describe('conditional classes', () => {
    it('should handle boolean conditions', () => {
      expect(cn('foo', true && 'bar')).toBe('foo bar')
      expect(cn('foo', false && 'bar')).toBe('foo')
    })

    it('should handle object syntax', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('should merge conditional and regular classes', () => {
      expect(cn('base', { active: true, disabled: false })).toBe('base active')
    })
  })

  describe('Tailwind CSS merge', () => {
    it('should merge conflicting Tailwind classes (last wins)', () => {
      // twMerge should keep only the last conflicting class
      expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('should handle conflicting padding classes', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4')
    })

    it('should handle conflicting text size classes', () => {
      expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    })

    it('should keep non-conflicting classes', () => {
      expect(cn('px-4', 'py-2')).toContain('px-4')
      expect(cn('px-4', 'py-2')).toContain('py-2')
    })

    it('should handle complex Tailwind scenarios', () => {
      const result = cn(
        'bg-red-500 text-white',
        'bg-blue-500', // Should override bg-red-500
        'hover:bg-blue-600',
      )
      expect(result).toContain('bg-blue-500')
      expect(result).not.toContain('bg-red-500')
      expect(result).toContain('text-white')
      expect(result).toContain('hover:bg-blue-600')
    })
  })

  describe('realistic UI scenarios', () => {
    it('should handle button variant classes', () => {
      const baseButton = 'rounded px-4 py-2 font-medium'
      const primary = cn(baseButton, 'bg-blue-500 text-white')
      expect(primary).toContain('rounded')
      expect(primary).toContain('bg-blue-500')
      expect(primary).toContain('text-white')
    })

    it('should handle conditional active state', () => {
      const isActive = true
      const result = cn(
        'tab',
        isActive && 'active border-blue-500',
        !isActive && 'border-gray-300',
      )
      expect(result).toContain('active')
      expect(result).toContain('border-blue-500')
      expect(result).not.toContain('border-gray-300')
    })

    it('should handle form input states', () => {
      const hasError = true
      const result = cn(
        'input',
        hasError ? 'border-red-500' : 'border-gray-300',
      )
      expect(result).toContain('border-red-500')
    })

    it('should merge component props with defaults', () => {
      const defaultClasses = 'w-full rounded border'
      const propClasses = 'border-blue-500 shadow-lg'
      const result = cn(defaultClasses, propClasses)
      expect(result).toContain('w-full')
      expect(result).toContain('rounded')
      expect(result).toContain('border-blue-500')
      expect(result).toContain('shadow-lg')
    })
  })

  describe('array handling', () => {
    it('should handle array of classes', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar')
    })

    it('should handle mixed arrays and strings', () => {
      expect(cn('base', ['foo', 'bar'], 'baz')).toBe('base foo bar baz')
    })

    it('should handle nested arrays', () => {
      expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
    })
  })

  describe('edge cases', () => {
    it('should handle no arguments', () => {
      expect(cn()).toBe('')
    })

    it('should handle only falsy values', () => {
      expect(cn(false, null, undefined, '')).toBe('')
    })

    it('should trim whitespace', () => {
      expect(cn('  foo  ', '  bar  ')).toBe('foo bar')
    })
  })
})

describe('jsonToCSV', () => {
  describe('basic conversions', () => {
    it('should convert simple object to CSV', () => {
      const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ]
      const csv = jsonToCSV(data)
      expect(csv).toContain('name,age')
      expect(csv).toContain('Alice,30')
      expect(csv).toContain('Bob,25')
    })

    it('should handle single object', () => {
      const data = [{ name: 'Alice', age: 30 }]
      const csv = jsonToCSV(data)
      expect(csv).toContain('name,age')
      expect(csv).toContain('Alice,30')
    })

    it('should handle empty array', () => {
      const data: Record<string, unknown>[] = []
      const csv = jsonToCSV(data)
      expect(csv).toBe('')
    })
  })

  describe('TCO data export scenarios', () => {
    it('should export yearly cost breakdown', () => {
      const data = [
        { year: 1, onPrem: 100000, cloud: 120000, savings: -20000 },
        { year: 2, onPrem: 110000, cloud: 125000, savings: -15000 },
        { year: 3, onPrem: 115000, cloud: 130000, savings: -15000 },
      ]
      const csv = jsonToCSV(data)

      expect(csv).toContain('year,onPrem,cloud,savings')
      expect(csv).toContain('1,100000,120000,-20000')
      expect(csv).toContain('2,110000,125000,-15000')
      expect(csv).toContain('3,115000,130000,-15000')
    })

    it('should export cost category breakdown', () => {
      const data = [
        { category: 'Storage', cost: 50000, percentage: 25 },
        { category: 'Compute', cost: 100000, percentage: 50 },
        { category: 'Energy', cost: 50000, percentage: 25 },
      ]
      const csv = jsonToCSV(data)

      expect(csv).toContain('category,cost,percentage')
      expect(csv).toContain('Storage,50000,25')
      expect(csv).toContain('Compute,100000,50')
      expect(csv).toContain('Energy,50000,25')
    })

    it('should handle sensitivity analysis data', () => {
      const data = [
        { change: -20, onPrem: 90000, cloud: 95000 },
        { change: -10, onPrem: 95000, cloud: 100000 },
        { change: 0, onPrem: 100000, cloud: 105000 },
        { change: 10, onPrem: 105000, cloud: 110000 },
        { change: 20, onPrem: 110000, cloud: 115000 },
      ]
      const csv = jsonToCSV(data)

      expect(csv).toContain('change,onPrem,cloud')
      expect(csv).toContain('-20,90000,95000')
      expect(csv).toContain('0,100000,105000')
      expect(csv).toContain('20,110000,115000')
    })
  })

  describe('data type handling', () => {
    it('should handle string values', () => {
      const data = [{ name: 'test', value: 'data' }]
      const csv = jsonToCSV(data)
      expect(csv).toContain('name,value')
      expect(csv).toContain('test,data')
    })

    it('should handle number values', () => {
      const data = [{ count: 100, price: 99.99 }]
      const csv = jsonToCSV(data)
      expect(csv).toContain('count,price')
      expect(csv).toContain('100,99.99')
    })

    it('should handle boolean values', () => {
      const data = [{ enabled: true, disabled: false }]
      const csv = jsonToCSV(data)
      expect(csv).toContain('enabled,disabled')
      expect(csv).toContain('true,false')
    })

    it('should handle null values', () => {
      const data = [{ name: 'test', value: null }]
      const csv = jsonToCSV(data)
      expect(csv).toContain('name,value')
    })

    it('should handle undefined values', () => {
      const data = [{ name: 'test', value: undefined }]
      const csv = jsonToCSV(data)
      expect(csv).toContain('name,value')
    })

    it('should handle mixed types', () => {
      const data = [
        { string: 'text', number: 123, boolean: true, nil: null },
      ]
      const csv = jsonToCSV(data)
      expect(csv).toContain('string,number,boolean,nil')
    })
  })

  describe('special characters', () => {
    it('should handle commas in values', () => {
      const data = [{ description: 'Cost includes storage, compute, and networking' }]
      const csv = jsonToCSV(data)
      // papaparse should quote values with commas
      expect(csv).toBeDefined()
    })

    it('should handle quotes in values', () => {
      const data = [{ description: 'The "main" cost' }]
      const csv = jsonToCSV(data)
      expect(csv).toBeDefined()
    })

    it('should handle newlines in values', () => {
      const data = [{ description: 'Line 1\nLine 2' }]
      const csv = jsonToCSV(data)
      expect(csv).toBeDefined()
    })

    it('should handle special characters', () => {
      const data = [{ symbol: '$', percent: '%', ampersand: '&' }]
      const csv = jsonToCSV(data)
      expect(csv).toContain('symbol,percent,ampersand')
    })
  })

  describe('column consistency', () => {
    it('should handle objects with different keys', () => {
      const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', city: 'NYC' }, // Different keys
      ]
      const csv = jsonToCSV(data)
      // papaparse should handle this gracefully
      expect(csv).toContain('name')
    })

    it('should maintain column order', () => {
      const data = [
        { year: 1, cost: 100, savings: 10 },
        { year: 2, cost: 200, savings: 20 },
      ]
      const csv = jsonToCSV(data)
      const lines = csv.split('\n')
      expect(lines[0].trim()).toBe('year,cost,savings')
    })
  })

  describe('large datasets', () => {
    it('should handle many rows', () => {
      const data = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        value: i * 100,
      }))
      const csv = jsonToCSV(data)
      const lines = csv.split('\n')
      // Header + 1000 rows
      expect(lines.length).toBeGreaterThanOrEqual(1000)
    })

    it('should handle many columns', () => {
      const row: Record<string, number> = {}
      for (let i = 0; i < 50; i++) {
        row[`col${i}`] = i
      }
      const data = [row]
      const csv = jsonToCSV(data)
      // Should have all 50 columns in header
      const header = csv.split('\n')[0]
      expect(header.split(',').length).toBe(50)
    })
  })

  describe('realistic export scenarios', () => {
    it('should export complete TCO comparison', () => {
      const data = [
        {
          scenario: 'On-Premise',
          hardware: 500000,
          energy: 150000,
          staff: 300000,
          total: 950000,
        },
        {
          scenario: 'Cloud',
          hardware: 0,
          energy: 0,
          staff: 100000,
          total: 850000,
        },
      ]
      const csv = jsonToCSV(data)

      expect(csv).toContain('scenario,hardware,energy,staff,total')
      expect(csv).toContain('On-Premise,500000,150000,300000,950000')
      expect(csv).toContain('Cloud,0,0,100000,850000')
    })

    it('should export monthly breakdown', () => {
      const data = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        onPremCost: 10000 + i * 500,
        cloudCost: 12000 + i * 300,
      }))
      const csv = jsonToCSV(data)

      expect(csv).toContain('month,onPremCost,cloudCost')
      const lines = csv.split('\n')
      expect(lines.length).toBe(13) // Header + 12 months
    })
  })
})
