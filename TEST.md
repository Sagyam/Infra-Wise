# Testing Strategy for InfraWise

This document outlines the testing approach for InfraWise, a financial modeling tool where calculation accuracy is critical for infrastructure decision-making.

## Testing Stack

- **Test Framework**: Vitest
- **React Testing**: React Testing Library (RTL)
- **Property-Based Testing**: fast-check (optional, for advanced scenarios)

## Testing Priority

### Critical Priority (Must Test)

#### 1. Core Calculation Logic (`src/lib/calculators/index.ts`)

The 800+ line `calculateCosts` function is the highest risk area. Test scenarios include:

**Calculation Modes**:
- TCO mode (upfront costs in year 1)
- Amortized mode (costs spread across analysis period)

**CapEx/OpEx Tracking**:
- Hardware costs classified as CapEx
- Recurring costs (licenses, salaries, cloud services) as OpEx
- Proper accumulation of totals

**Cost Categories** (test each independently):
- Energy costs (power consumption, UPS, generator, HVAC, colocation)
- Storage costs (HDD/SSD hardware, failure rates, backup)
- Compute costs (hardware CapEx, cloud VM OpEx)
- GPU costs (training vs inference)
- Networking costs (hardware, bandwidth, CDN, egress)
- Human costs (salaries with annual increments)
- Software costs (licenses, subscriptions)
- Security & Compliance costs (certifications, security features)

**Growth & Inflation**:
- Storage growth rate projections
- Egress growth rate projections
- Traffic growth projections
- Inflation modeling across multiple years
- Salary increment calculations

**Breakeven Calculation**:
- Identify when cumulative on-prem becomes cheaper than cloud
- Handle scenarios where breakeven never occurs
- Edge cases (equal costs, breakeven in year 1)

**Salvage Value**:
- Applied only in final year for TCO mode
- Not applied in amortized mode
- 10% salvage rate for hardware

**Edge Cases**:
- Zero values for all inputs
- Maximum values
- Single year analysis
- 10+ year analysis
- Disabled categories (all toggles off)

#### 2. Zod Schema Validation (`src/lib/types.ts`)

Test that `CostFormSchema` correctly:
- Validates required fields
- Enforces min/max constraints
- Handles optional fields
- Returns proper error messages
- Accepts valid input combinations

#### 3. Inflation Modeling (`src/lib/inflation.ts`)

Test `modelInflation` function:
- Correct compound interest calculation
- Zero inflation rate (should return original cost)
- High inflation rates (20%+)
- Multi-year projections
- Edge case: year 0 (should return initial cost)

#### 4. Unit Conversions (`src/lib/calculators/utils.ts`)

Test `tbToGb` and other conversion utilities:
- 1 TB = 1024 GB
- Zero values
- Decimal values
- Large numbers

### Medium Priority

#### 5. Form State Management

Test form hooks and watchers:
- `use-form-watchers.ts` - Ensure dependent fields update correctly
- `use-storage-calculation.ts` - Storage tier calculations
- `use-tier-handlers.ts` - Tier percentage handlers

Test scenarios:
- Toggling sections on/off updates form state
- Preset loading populates all fields correctly
- Form reset clears all values
- Validation triggers appropriately

#### 6. Export Functionality (`src/components/app/results/export-button.tsx`)

Test CSV export:
- All yearly data included
- Correct formatting
- Column headers match data
- Breakdown categories properly exported
- CapEx/OpEx totals included

#### 7. Breakdown Components

Test cost breakdown calculations:
- `on-prem-breakdown.tsx` - Correct category totals
- `cloud-breakdown.tsx` - Correct category totals
- Percentage calculations
- Empty state handling (no costs)

### Lower Priority

#### 8. UI Components

Focus on components with business logic:
- Form inputs maintain correct state
- Sliders show correct values
- Tooltips display accurate information
- Charts render with correct data

Don't extensively test shadcn/ui primitives (already tested by library).

## Test Structure

### Unit Tests

```typescript
// Example: src/lib/calculators/__tests__/index.test.ts
describe('calculateCosts', () => {
  describe('TCO mode', () => {
    it('should apply hardware costs in year 1 only', () => {})
    it('should apply salvage value in final year', () => {})
  })

  describe('Amortized mode', () => {
    it('should spread hardware costs across all years', () => {})
    it('should not apply salvage value', () => {})
  })

  describe('Inflation', () => {
    it('should apply inflation to all costs', () => {})
    it('should compound inflation year over year', () => {})
  })

  describe('Growth rates', () => {
    it('should apply storage growth rate correctly', () => {})
    it('should apply egress growth rate correctly', () => {})
  })

  describe('Breakeven calculation', () => {
    it('should identify breakeven year', () => {})
    it('should return null when no breakeven occurs', () => {})
  })

  describe('Edge cases', () => {
    it('should handle all zeros', () => {})
    it('should handle single year analysis', () => {})
    it('should handle disabled categories', () => {})
  })
})
```

### Integration Tests

```typescript
// Test with realistic preset data
describe('calculateCosts with presets', () => {
  it('should calculate correctly for startup preset', async () => {
    const result = await calculateCosts(startupPreset)
    expect(result.success).toBe(true)
    // Verify against manually calculated expected values
  })

  it('should calculate correctly for enterprise preset', async () => {})
  it('should calculate correctly for AI training preset', async () => {})
})
```

### Property-Based Tests (Optional)

```typescript
// Using fast-check for generative testing
describe('calculateCosts invariants', () => {
  it('cumulative costs should always increase or stay same', () => {
    fc.assert(
      fc.property(validInputArbitrary, async (input) => {
        const result = await calculateCosts(input)
        const yearlyData = result.data.yearlyCosts

        for (let i = 1; i < yearlyData.length; i++) {
          expect(yearlyData[i].cumulativeOnPrem)
            .toBeGreaterThanOrEqual(yearlyData[i-1].cumulativeOnPrem)
        }
      })
    )
  })

  it('CapEx + OpEx should equal total cost', () => {})
  it('breakdown categories should sum to total', () => {})
})
```

## Coverage Goals

- **Critical Priority**: 100% line and branch coverage
- **Medium Priority**: 80% coverage
- **Lower Priority**: 50% coverage (focus on logic, not rendering)

## Test Data

Create fixtures for common scenarios:
- `__fixtures__/minimal-input.ts` - Bare minimum valid input
- `__fixtures__/startup-preset.ts` - Small scale scenario
- `__fixtures__/enterprise-preset.ts` - Large scale scenario
- `__fixtures__/edge-cases.ts` - Zero values, extreme values

## Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test src/lib/calculators/__tests__/index.test.ts

# Run in watch mode
pnpm test:watch

# Run with UI
pnpm test:ui
```

## CI/CD Integration

Tests should:
- Run on every commit
- Block PR merges if tests fail
- Generate coverage reports
- Fail if critical code drops below 100% coverage

## Maintenance

- Add tests for every new feature
- Update tests when calculation logic changes
- Review and update fixtures annually (for inflation rates, typical costs)
- Add regression tests for any bugs discovered

---

**Remember**: This is a financial tool. Incorrect calculations can lead to multi-million dollar mistakes. Comprehensive testing isn't optional—it's essential.
