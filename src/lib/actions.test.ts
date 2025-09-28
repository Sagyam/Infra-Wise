import { describe, expect, it, vi } from "vitest";
import { calculateCosts } from "./actions";
import type { CostFormValues } from "./types";

// Mock the AI inflation model to return a predictable value
vi.mock("@/ai/flows/inflation-modeling", () => ({
  modelInflation: vi.fn(
    async ({ initialCost, inflationRate, analysisPeriod }) => {
      // FV = P * (1 + r)^n
      const inflatedCost =
        initialCost * Math.pow(1 + inflationRate, analysisPeriod);
      return { inflatedCost: inflatedCost };
    }
  ),
}));

const defaultTestValues: CostFormValues = {
  analysisPeriod: 5,
  dataUnit: "TB",
  onPremHardwareCost: 50000,
  onPremSalvageValue: 10, // Added salvage value
  onPremYearlyLicensingCost: 5000,
  onPremPowerRating: 500,
  onPremLoadFactor: 70,
  onPremElectricityCost: 0.12,
  onPremDriveFailureRate: 3,
  onPremDriveReplacementCost: 200,
  onPremTotalDrives: 100,
  onPremStoragePerDrive: 16,
  onPremRaidFactor: 20,
  onPremBandwidthUsage: 10000,
  onPremBandwidthCostPerGb: 0.01,
  onPremAnnualTrafficGrowth: 10,
  useOnPremCdn: false,
  onPremCdnUsage: 0,
  onPremCdnCostPerGb: 0,
  useOnPremBackup: true,
  onPremBackupStorage: 1280, // Assuming this is in TB
  onPremBackupCostPerUnit: 10, // Assuming this is $/TB/year
  useOnPremReplication: false,
  onPremReplicationFactor: 0,
  cloudStorageSize: 100,
  cloudGrowthRate: 20,
  cloudEgress: 10, // TB
  cloudEgressGrowthRate: 15,
  cloudHotTier: 70,
  cloudStandardTier: 20,
  cloudArchiveTier: 10,
  cloudHotStorageCost: 0.021,
  cloudStandardStorageCost: 0.0125,
  cloudArchiveStorageCost: 0.0036,
  cloudEgressCostPerUnit: 0.09,
  inflationRate: 2.5,
  calculationMode: "tco",
};

describe("calculateCosts", () => {
  it("should calculate TCO correctly for a simple scenario", async () => {
    const values = { ...defaultTestValues };
    const result = await calculateCosts(values);

    if (!result.success) {
      throw new Error(result.error);
    }

    // These are snapshot values. If the logic changes, they need to be updated.
    expect(result.data.onPremTCO).toBeCloseTo(151240.2, 1);
    expect(result.data.cloudTCO).toBeCloseTo(350175.7, 1);
    expect(result.data.savings).toBeCloseTo(-198935.5, 1);
    expect(result.data.yearlyCosts.length).toBe(5);
    expect(result.data.breakevenPoint).toBeNull();
  });

  it("should handle a 1-year analysis period", async () => {
    const values = { ...defaultTestValues, analysisPeriod: 1 };
    const result = await calculateCosts(values);

    if (!result.success) {
      throw new Error(result.error);
    }

    expect(result.data.onPremTCO).toBeCloseTo(69106, 0);
    expect(result.data.cloudTCO).toBeCloseTo(42086, 0);
    expect(result.data.savings).toBeCloseTo(27020, 0);
    expect(result.data.breakevenPoint).toBe("Year 1");
  });

  it("should factor in replication costs", async () => {
    const values: CostFormValues = {
      ...defaultTestValues,
      analysisPeriod: 1,
      useOnPremReplication: true,
      onPremReplicationFactor: 1, // One extra site
    };
    const result = await calculateCosts(values);

    if (!result.success) {
      throw new Error(result.error);
    }

    // On-prem TCO should roughly double the hardware and recurring costs, but not backup or salvage
    expect(result.data.onPremTCO).toBeCloseTo(133662, 0);
    expect(result.data.cloudTCO).toBeCloseTo(42086, 0);
  });

  it("should return an error for invalid input", async () => {
    const values = { ...defaultTestValues, analysisPeriod: 0 };
    const result = await calculateCosts(values as any);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("Analysis period");
    }
  });

  it("should correctly identify a breakeven point", async () => {
    const values = {
      ...defaultTestValues,
      onPremHardwareCost: 10000, // Lower initial on-prem cost
      analysisPeriod: 5,
    };
    const result = await calculateCosts(values);
    if (!result.success) {
      throw new Error(result.error);
    }
    expect(result.data.breakevenPoint).toBe("Year 1, Month 3");
  });
});
