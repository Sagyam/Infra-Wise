import { describe, expect, it } from 'vitest'
import {
  formatCurrency,
  onPremCategories,
  cloudCategories,
  chartConfig,
} from '../chart-config'

describe('formatCurrency (chart)', () => {
  describe('millions formatting', () => {
    it('should format 1 million as $1.0M', () => {
      expect(formatCurrency(1000000)).toBe('$1.0M')
    })

    it('should format 2.5 million as $2.5M', () => {
      expect(formatCurrency(2500000)).toBe('$2.5M')
    })

    it('should format 10 million as $10.0M', () => {
      expect(formatCurrency(10000000)).toBe('$10.0M')
    })

    it('should format 99.9 million as $99.9M', () => {
      expect(formatCurrency(99900000)).toBe('$99.9M')
    })

    it('should format 100 million as $100.0M', () => {
      expect(formatCurrency(100000000)).toBe('$100.0M')
    })

    it('should round to 1 decimal place', () => {
      expect(formatCurrency(1234567)).toBe('$1.2M')
    })

    it('should round up when appropriate', () => {
      expect(formatCurrency(1567890)).toBe('$1.6M')
    })
  })

  describe('thousands formatting', () => {
    it('should format 1000 as $1K', () => {
      expect(formatCurrency(1000)).toBe('$1K')
    })

    it('should format 5000 as $5K', () => {
      expect(formatCurrency(5000)).toBe('$5K')
    })

    it('should format 10000 as $10K', () => {
      expect(formatCurrency(10000)).toBe('$10K')
    })

    it('should format 50000 as $50K', () => {
      expect(formatCurrency(50000)).toBe('$50K')
    })

    it('should format 100000 as $100K', () => {
      expect(formatCurrency(100000)).toBe('$100K')
    })

    it('should format 999000 as $999K', () => {
      expect(formatCurrency(999000)).toBe('$999K')
    })

    it('should round to nearest thousand (no decimals for K)', () => {
      expect(formatCurrency(1234)).toBe('$1K')
    })

    it('should round up thousands', () => {
      expect(formatCurrency(1567)).toBe('$2K')
    })
  })

  describe('values below 1000', () => {
    it('should format 0 as $0', () => {
      expect(formatCurrency(0)).toBe('$0')
    })

    it('should format 1 as $1', () => {
      expect(formatCurrency(1)).toBe('$1')
    })

    it('should format 100 as $100', () => {
      expect(formatCurrency(100)).toBe('$100')
    })

    it('should format 500 as $500', () => {
      expect(formatCurrency(500)).toBe('$500')
    })

    it('should format 999 as $999', () => {
      expect(formatCurrency(999)).toBe('$999')
    })

    it('should round decimals to nearest dollar', () => {
      expect(formatCurrency(99.5)).toBe('$100')
    })

    it('should round decimals down', () => {
      expect(formatCurrency(99.4)).toBe('$99')
    })
  })

  describe('negative values', () => {
    it('should format negative millions', () => {
      expect(formatCurrency(-1000000)).toBe('$-1.0M')
    })

    it('should format negative thousands', () => {
      expect(formatCurrency(-5000)).toBe('$-5K')
    })

    it('should format negative small values', () => {
      expect(formatCurrency(-100)).toBe('$-100')
    })

    it('should use absolute value for threshold detection', () => {
      // -1.5M should still format as M, not as large negative number
      expect(formatCurrency(-1500000)).toBe('$-1.5M')
    })

    it('should use absolute value for K threshold', () => {
      expect(formatCurrency(-50000)).toBe('$-50K')
    })
  })

  describe('boundary values', () => {
    it('should format 999 (just below 1K threshold)', () => {
      expect(formatCurrency(999)).toBe('$999')
    })

    it('should format 1000 (at 1K threshold)', () => {
      expect(formatCurrency(1000)).toBe('$1K')
    })

    it('should format 999999 (just below 1M threshold)', () => {
      expect(formatCurrency(999999)).toBe('$1000K')
    })

    it('should format 1000000 (at 1M threshold)', () => {
      expect(formatCurrency(1000000)).toBe('$1.0M')
    })

    it('should format -999', () => {
      expect(formatCurrency(-999)).toBe('$-999')
    })

    it('should format -1000', () => {
      expect(formatCurrency(-1000)).toBe('$-1K')
    })

    it('should format -1000000', () => {
      expect(formatCurrency(-1000000)).toBe('$-1.0M')
    })
  })

  describe('realistic chart scenarios', () => {
    it('should format typical yearly cost (cloud)', () => {
      // $250K annual cloud cost
      expect(formatCurrency(250000)).toBe('$250K')
    })

    it('should format typical yearly cost (on-prem)', () => {
      // $350K annual on-prem cost
      expect(formatCurrency(350000)).toBe('$350K')
    })

    it('should format 5-year TCO (on-prem)', () => {
      // $2.5M over 5 years
      expect(formatCurrency(2500000)).toBe('$2.5M')
    })

    it('should format 5-year TCO (cloud)', () => {
      // $3.2M over 5 years
      expect(formatCurrency(3200000)).toBe('$3.2M')
    })

    it('should format energy costs', () => {
      // $75K annual energy
      expect(formatCurrency(75000)).toBe('$75K')
    })

    it('should format storage costs', () => {
      // $180K for storage
      expect(formatCurrency(180000)).toBe('$180K')
    })
  })

  describe('chart axis label scenarios', () => {
    it('should provide concise labels for small values', () => {
      // Chart showing costs up to $500
      expect(formatCurrency(100)).toBe('$100')
      expect(formatCurrency(200)).toBe('$200')
      expect(formatCurrency(500)).toBe('$500')
    })

    it('should provide concise labels for medium values', () => {
      // Chart showing costs in thousands
      const labels = [10000, 20000, 30000, 40000, 50000].map(formatCurrency)
      expect(labels).toEqual(['$10K', '$20K', '$30K', '$40K', '$50K'])
    })

    it('should provide concise labels for large values', () => {
      // Chart showing costs in millions
      const labels = [1000000, 2000000, 3000000, 4000000, 5000000].map(
        formatCurrency,
      )
      expect(labels).toEqual(['$1.0M', '$2.0M', '$3.0M', '$4.0M', '$5.0M'])
    })
  })

  describe('precision and rounding', () => {
    it('should maintain 1 decimal for millions', () => {
      expect(formatCurrency(1111111)).toBe('$1.1M')
    })

    it('should round millions correctly', () => {
      expect(formatCurrency(1449999)).toBe('$1.4M')
      expect(formatCurrency(1550000)).toBe('$1.6M')
    })

    it('should round thousands to integer', () => {
      expect(formatCurrency(1499)).toBe('$1K')
      expect(formatCurrency(1500)).toBe('$2K')
    })

    it('should handle very precise values', () => {
      expect(formatCurrency(1234567.89)).toBe('$1.2M')
    })
  })
})

describe('onPremCategories', () => {
  it('should include all 8 on-prem cost categories', () => {
    expect(onPremCategories).toHaveLength(8)
  })

  it('should include Energy category (unique to on-prem)', () => {
    expect(onPremCategories).toContain('Energy')
  })

  it('should include all common categories', () => {
    const commonCategories = [
      'Storage',
      'Compute',
      'GPU',
      'Networking',
      'Human',
      'Software',
      'Security & Compliance',
    ]
    commonCategories.forEach((category) => {
      expect(onPremCategories).toContain(category)
    })
  })

  it('should start with Energy category', () => {
    expect(onPremCategories[0]).toBe('Energy')
  })
})

describe('cloudCategories', () => {
  it('should include 7 cloud cost categories', () => {
    expect(cloudCategories).toHaveLength(7)
  })

  it('should not include Energy category', () => {
    expect(cloudCategories).not.toContain('Energy')
  })

  it('should include all expected cloud categories', () => {
    const expectedCategories = [
      'Storage',
      'Compute',
      'GPU',
      'Networking',
      'Human',
      'Software',
      'Security & Compliance',
    ]
    expect(cloudCategories).toEqual(expectedCategories)
  })

  it('should start with Storage category', () => {
    expect(cloudCategories[0]).toBe('Storage')
  })
})

describe('chartConfig', () => {
  it('should have configuration for all categories', () => {
    const allCategories = [
      'Energy',
      'Storage',
      'Compute',
      'GPU',
      'Networking',
      'Human',
      'Software',
      'Security & Compliance',
    ]

    allCategories.forEach((category) => {
      expect(chartConfig).toHaveProperty(category)
    })
  })

  it('should have label and color for each category', () => {
    Object.entries(chartConfig).forEach(([key, config]) => {
      expect(config).toHaveProperty('label')
      expect(config).toHaveProperty('color')
      expect(typeof config.label).toBe('string')
      expect(typeof config.color).toBe('string')
    })
  })

  it('should use hsl color format', () => {
    Object.values(chartConfig).forEach((config) => {
      expect(config.color).toMatch(/^hsl\(var\(--chart-\d+\)\)$/)
    })
  })

  it('should have unique colors for each category', () => {
    const colors = Object.values(chartConfig).map((config) => config.color)
    const uniqueColors = new Set(colors)
    expect(uniqueColors.size).toBe(colors.length)
  })

  it('should have matching labels', () => {
    Object.entries(chartConfig).forEach(([key, config]) => {
      expect(config.label).toBe(key)
    })
  })

  it('should use sequential chart color variables', () => {
    const expectedColors = [
      'hsl(var(--chart-1))', // Energy
      'hsl(var(--chart-2))', // Storage
      'hsl(var(--chart-3))', // Compute
      'hsl(var(--chart-4))', // GPU
      'hsl(var(--chart-5))', // Networking
      'hsl(var(--chart-6))', // Human
      'hsl(var(--chart-7))', // Software
      'hsl(var(--chart-8))', // Security & Compliance
    ]

    const actualColors = [
      chartConfig.Energy.color,
      chartConfig.Storage.color,
      chartConfig.Compute.color,
      chartConfig.GPU.color,
      chartConfig.Networking.color,
      chartConfig.Human.color,
      chartConfig.Software.color,
      chartConfig['Security & Compliance'].color,
    ]

    expect(actualColors).toEqual(expectedColors)
  })
})
