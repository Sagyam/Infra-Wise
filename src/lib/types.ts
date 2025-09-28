import { z } from "zod";

export const CostFormSchema = z
  .object({
    analysisPeriod: z
      .number({ required_error: "Analysis period is required." })
      .min(1, "Must be at least 1 year.")
      .max(30, "Cannot exceed 30 years."),
    dataUnit: z.enum(["GB", "TB", "PB"], {
      required_error: "Data unit is required.",
    }),

    // On-premise
    onPremHardwareCost: z
      .number({ required_error: "Hardware cost is required." })
      .min(0, "Cost must be a positive number."),
    onPremSalvageValue: z.number().min(0).max(100).default(0),
    onPremYearlyLicensingCost: z
      .number({ required_error: "Licensing cost is required." })
      .min(0, "Cost must be a positive number."),
    onPremPowerRating: z
      .number({ required_error: "Power rating is required." })
      .min(0, "Power rating must be a positive number."),
    onPremLoadFactor: z
      .number({ required_error: "Load factor is required." })
      .min(0, "Load factor must be between 0 and 100.")
      .max(100, "Load factor must be between 0 and 100."),
    onPremElectricityCost: z
      .number({ required_error: "Electricity cost is required." })
      .min(0, "Cost must be a positive number."),
    onPremDriveFailureRate: z
      .number({ required_error: "Drive failure rate is required." })
      .min(0, "Rate must be a positive number.")
      .max(100, "Rate cannot exceed 100%."),
    onPremDriveReplacementCost: z
      .number({ required_error: "Drive replacement cost is required." })
      .min(0, "Cost must be a positive number."),
    onPremTotalDrives: z
      .number({ required_error: "Total drives is required." })
      .int("Must be a whole number.")
      .min(1, "There must be at least one drive."),
    onPremStoragePerDrive: z
      .number({ required_error: "Storage per drive is required." })
      .min(0, "Storage must be a positive number."),
    onPremRaidFactor: z
      .number()
      .min(0)
      .max(50, "RAID capacity loss cannot exceed 50%."),
    useOnPremSoftware: z.boolean().optional(),
    useOnPremBandwidth: z.boolean().optional(),
    onPremBandwidthUsage: z.number().min(0).optional(),
    onPremBandwidthCostPerGb: z.number().min(0).optional(),
    onPremAnnualTrafficGrowth: z.number().min(0).max(100).optional(),
    useOnPremCdn: z.boolean().optional(),
    onPremCdnUsage: z
      .number({ invalid_type_error: "CDN usage must be a number." })
      .min(0, "Usage must be a positive number.")
      .optional(),
    onPremCdnCostPerGb: z
      .number({ invalid_type_error: "CDN cost must be a number." })
      .min(0, "Cost must be a positive number.")
      .optional(),
    useOnPremBackup: z.boolean().optional(),
    onPremBackupStorage: z
      .number({ invalid_type_error: "Backup storage must be a number." })
      .min(0, "Storage must be a positive number.")
      .optional(),
    onPremBackupCostPerUnit: z
      .number({ invalid_type_error: "Backup cost must be a number." })
      .min(0, "Cost must be a positive number.")
      .optional(),
    useOnPremReplication: z.boolean().optional(),
    onPremReplicationFactor: z.number().int().min(0).max(10).optional(),

    // Cloud
    cloudStorageSize: z
      .number({ required_error: "Storage size is required." })
      .min(0, "Storage size must be a positive number."),
    cloudGrowthRate: z
      .number({ required_error: "Growth rate is required." })
      .min(0, "Growth rate must be between 0 and 100.")
      .max(100),
    cloudEgress: z
      .number({ required_error: "Egress is required." })
      .min(0, "Egress must be a positive number."),
    cloudEgressGrowthRate: z.number().min(0).max(100),
    cloudHotTier: z.number().min(0).max(100),
    cloudStandardTier: z.number().min(0).max(100),
    cloudArchiveTier: z.number().min(0).max(100),
    cloudHotStorageCost: z
      .number({ required_error: "Hot storage cost is required." })
      .min(0, "Cost must be a positive number."),
    cloudStandardStorageCost: z
      .number({ required_error: "Standard storage cost is required." })
      .min(0, "Cost must be a positive number."),
    cloudArchiveStorageCost: z
      .number({ required_error: "Archive storage cost is required." })
      .min(0, "Cost must be a positive number."),
    cloudEgressCostPerUnit: z
      .number({ required_error: "Egress cost is required." })
      .min(0, "Cost must be a positive number."),

    // General
    inflationRate: z
      .number({ required_error: "Inflation rate is required." })
      .min(0, "Inflation must be a positive number.")
      .max(100, "Inflation rate seems too high."),
    calculationMode: z.enum(["tco", "amortized"]),
  })
  .refine(
    data =>
      data.cloudHotTier + data.cloudStandardTier + data.cloudArchiveTier ===
      100,
    {
      message:
        "Hot, Standard, and Archive tier percentages must add up to 100.",
      path: ["cloudArchiveTier"],
    }
  );

export type CostFormValues = z.infer<typeof CostFormSchema>;

export type CostBreakdown = {
  [key: string]: number | undefined;
};

export type YearlyCost = {
  year: number;
  onPremCost: number;
  cloudCost: number;
  cumulativeOnPrem: number;
  cumulativeCloud: number;
  onPremBreakdown: CostBreakdown;
  cloudBreakdown: CostBreakdown;
};

export type CalculationResult = {
  yearlyCosts: YearlyCost[];
  onPremTCO: number;
  cloudTCO: number;
  savings: number;
  breakevenPoint: string | null;
  calculationMode: "tco" | "amortized";
  analysisPeriod: number;
};
