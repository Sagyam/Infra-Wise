import { describe, expect, it } from 'vitest'
import { formatCurrency } from '../format-currency'

describe('formatCurrency (breakdown)', () => {
  describe('zero handling', () => {
    it('should return "-" for zero', () => {
      expect(formatCurrency(0)).toBe('-')
    })

    it('should return "-" for positive zero', () => {
      expect(formatCurrency(+0)).toBe('-')
    })

    it('should return "-" for negative zero', () => {
      expect(formatCurrency(-0)).toBe('-')
    })
  })

  describe('positive values', () => {
    it('should format small positive numbers', () => {
      expect(formatCurrency(100)).toBe('$100')
    })

    it('should format thousands', () => {
      expect(formatCurrency(1000)).toBe('$1,000')
    })

    it('should format tens of thousands', () => {
      expect(formatCurrency(50000)).toBe('$50,000')
    })

    it('should format hundreds of thousands', () => {
      expect(formatCurrency(250000)).toBe('$250,000')
    })

    it('should format millions', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000')
    })

    it('should format tens of millions', () => {
      expect(formatCurrency(25000000)).toBe('$25,000,000')
    })

    it('should format billions', () => {
      expect(formatCurrency(1000000000)).toBe('$1,000,000,000')
    })
  })

  describe('negative values', () => {
    it('should format negative small numbers', () => {
      expect(formatCurrency(-100)).toBe('-$100')
    })

    it('should format negative thousands', () => {
      expect(formatCurrency(-1000)).toBe('-$1,000')
    })

    it('should format negative millions', () => {
      expect(formatCurrency(-1000000)).toBe('-$1,000,000')
    })
  })

  describe('decimal handling', () => {
    it('should round to nearest dollar (no decimals)', () => {
      expect(formatCurrency(100.49)).toBe('$100')
    })

    it('should round up from 0.50', () => {
      expect(formatCurrency(100.5)).toBe('$101')
    })

    it('should round up from 0.99', () => {
      expect(formatCurrency(100.99)).toBe('$101')
    })

    it('should round down from 0.49', () => {
      expect(formatCurrency(100.49)).toBe('$100')
    })

    it('should round complex decimals correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,235')
    })
  })

  describe('realistic TCO scenarios', () => {
    it('should format typical server cost', () => {
      // 50 servers at $5,000 each
      expect(formatCurrency(250000)).toBe('$250,000')
    })

    it('should format annual energy costs', () => {
      // $45,678 per year
      expect(formatCurrency(45678)).toBe('$45,678')
    })

    it('should format total 5-year TCO', () => {
      // $3.5M total cost
      expect(formatCurrency(3500000)).toBe('$3,500,000')
    })

    it('should format storage costs', () => {
      // $127,500 for storage infrastructure
      expect(formatCurrency(127500)).toBe('$127,500')
    })

    it('should format salary costs', () => {
      // $350,000 for 3 sysadmins over a year
      expect(formatCurrency(350000)).toBe('$350,000')
    })

    it('should format GPU infrastructure', () => {
      // 100 GPUs at $10,000 each
      expect(formatCurrency(1000000)).toBe('$1,000,000')
    })
  })

  describe('edge cases', () => {
    it('should handle very small positive values', () => {
      expect(formatCurrency(0.01)).toBe('$0')
    })

    it('should handle 1 dollar', () => {
      expect(formatCurrency(1)).toBe('$1')
    })

    it('should handle 999', () => {
      expect(formatCurrency(999)).toBe('$999')
    })

    it('should handle 1000', () => {
      expect(formatCurrency(1000)).toBe('$1,000')
    })

    it('should handle very large numbers', () => {
      // $100 billion
      expect(formatCurrency(100000000000)).toBe('$100,000,000,000')
    })

    it('should handle Number.MAX_SAFE_INTEGER (within reason)', () => {
      const largeNumber = 9007199254740991
      const result = formatCurrency(largeNumber)
      expect(result).toContain('$')
      expect(result).toContain(',')
    })
  })

  describe('formatting consistency', () => {
    it('should use US locale with comma separators', () => {
      expect(formatCurrency(1234567)).toBe('$1,234,567')
    })

    it('should always include dollar sign', () => {
      const results = [
        formatCurrency(1),
        formatCurrency(100),
        formatCurrency(1000),
        formatCurrency(1000000),
      ]
      results.forEach((result) => {
        expect(result).toMatch(/^\$|^-\$/)
      })
    })

    it('should never include decimal places', () => {
      const results = [
        formatCurrency(1.99),
        formatCurrency(100.5),
        formatCurrency(1000.123),
        formatCurrency(1000000.999),
      ]
      results.forEach((result) => {
        expect(result).not.toContain('.')
      })
    })
  })

  describe('savings display scenarios', () => {
    it('should format positive savings (cloud wins)', () => {
      // $500k savings with cloud
      expect(formatCurrency(500000)).toBe('$500,000')
    })

    it('should format negative savings (on-prem wins)', () => {
      // $300k more expensive with cloud
      expect(formatCurrency(-300000)).toBe('-$300,000')
    })

    it('should format small savings differences', () => {
      // Only $1,234 difference
      expect(formatCurrency(1234)).toBe('$1,234')
    })
  })
})
