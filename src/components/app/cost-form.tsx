"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightLeft,
  Calendar,
  Container,
  Copy,
  DollarSign,
  Factory,
  FileText,
  Globe,
  HardDrive,
  Info,
  Network,
  Percent,
  Power,
  Receipt,
  Replace,
  Save,
  Server,
  TestTube2,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription as CardDesc,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateCosts } from "@/lib/actions";
import {
  type CalculationResult,
  CostFormSchema,
  type CostFormValues,
} from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

interface CostFormProps {
  onCalculate: (data: CalculationResult | null, error: string | null) => void;
  onLoading: () => void;
  isLoading: boolean;
  calculationMode: CostFormValues["calculationMode"];
  onCalculationModeChange: (mode: CostFormValues["calculationMode"]) => void;
}

const defaultValues: CostFormValues = {
  analysisPeriod: 5,
  dataUnit: "TB",

  // On-prem
  onPremHardwareCost: 25000,
  onPremSalvageValue: 10,
  onPremYearlyLicensingCost: 4000,
  onPremPowerRating: 600,
  onPremLoadFactor: 65,
  onPremElectricityCost: 0.14,
  onPremDriveFailureRate: 2,
  onPremDriveReplacementCost: 250,
  onPremTotalDrives: 24,
  onPremStoragePerDrive: 8, // in TB
  onPremRaidFactor: 20,
  onPremBandwidthUsage: 5000,
  onPremBandwidthCostPerGb: 0.02,
  onPremAnnualTrafficGrowth: 15,
  useOnPremCdn: false,
  onPremCdnUsage: 0,
  onPremCdnCostPerGb: 0.04,
  useOnPremBackup: true,
  onPremBackupStorage: 153.6, // auto-calculated
  onPremBackupCostPerUnit: 15, // $/TB/year for an offsite service or tapes
  useOnPremReplication: false,
  onPremReplicationFactor: 0,

  // Cloud (based on a blend of major providers)
  cloudStorageSize: 150, // TB
  cloudGrowthRate: 20, // %
  cloudEgress: 2, // TB
  cloudEgressGrowthRate: 15, // %
  cloudHotTier: 60,
  cloudStandardTier: 30,
  cloudArchiveTier: 10,
  cloudHotStorageCost: 0.021, // $/GB/mo (e.g., S3 Standard)
  cloudStandardStorageCost: 0.0125, // $/GB/mo (e.g., S3 Standard-IA)
  cloudArchiveStorageCost: 0.0036, // $/GB/mo (e.g., S3 Glacier Flexible Retrieval)
  cloudEgressCostPerUnit: 0.09, // $/GB

  // General
  inflationRate: 3.0,
  calculationMode: "tco",
};

const TooltipLabel = ({
  label,
  tooltipText,
  icon,
}: {
  label: string;
  tooltipText: string;
  icon: React.ReactNode;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="flex items-center gap-2 cursor-help">
          {icon} {label} <Info className="h-3 w-3 text-muted-foreground" />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs">{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function CostForm({
  onCalculate,
  onLoading,
  isLoading,
  calculationMode,
  onCalculationModeChange,
}: CostFormProps) {
  const form = useForm<CostFormValues>({
    resolver: zodResolver(CostFormSchema),
    defaultValues,
  });

  React.useEffect(() => {
    form.setValue("calculationMode", calculationMode);
  }, [calculationMode, form]);

  const onSubmit = async (values: CostFormValues) => {
    onLoading();
    const result = await calculateCosts(values);
    if (result.success) {
      onCalculate(result.data, null);
    } else {
      onCalculate(null, result.error);
    }
  };

  const dataUnit = useWatch({ control: form.control, name: "dataUnit" });
  const onPremStoragePerDrive = useWatch({
    control: form.control,
    name: "onPremStoragePerDrive",
  });
  const onPremTotalDrives = useWatch({
    control: form.control,
    name: "onPremTotalDrives",
  });
  const onPremRaidFactor = useWatch({
    control: form.control,
    name: "onPremRaidFactor",
  });

  React.useEffect(() => {
    const onPremStoragePerDriveInUnit = onPremStoragePerDrive; // always TB
    const totalRawSize = onPremStoragePerDriveInUnit * onPremTotalDrives;
    const raidOverhead = totalRawSize * (onPremRaidFactor / 100);
    const usableSize = totalRawSize - raidOverhead;

    const conversionFactor = { GB: 1024, TB: 1, PB: 1 / 1024 }[dataUnit] || 1;
    const usableSizeInDataUnit = usableSize * conversionFactor;

    form.setValue("onPremBackupStorage", Math.max(0, usableSizeInDataUnit));
  }, [
    onPremStoragePerDrive,
    onPremTotalDrives,
    onPremRaidFactor,
    dataUnit,
    form,
  ]);

  const cloudHotTier = useWatch({
    control: form.control,
    name: "cloudHotTier",
  });
  const cloudStandardTier = useWatch({
    control: form.control,
    name: "cloudStandardTier",
  });

  const handleHotChange = (value: number) => {
    const archiveTier = 100 - value - cloudStandardTier;
    if (archiveTier >= 0) {
      form.setValue("cloudHotTier", value);
      form.setValue("cloudArchiveTier", archiveTier);
    }
  };

  const handleStandardChange = (value: number) => {
    const archiveTier = 100 - cloudHotTier - value;
    if (archiveTier >= 0) {
      form.setValue("cloudStandardTier", value);
      form.setValue("cloudArchiveTier", archiveTier);
    }
  };

  const useOnPremCdn = useWatch({
    control: form.control,
    name: "useOnPremCdn",
  });
  const useOnPremBackup = useWatch({
    control: form.control,
    name: "useOnPremBackup",
  });
  const useOnPremReplication = useWatch({
    control: form.control,
    name: "useOnPremReplication",
  });

  const renderInput = (
    name: keyof CostFormValues,
    label: string,
    icon: React.ReactNode,
    unit?: string,
    tooltip?: string,
    step: string = "1"
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {tooltip ? (
              <TooltipLabel label={label} tooltipText={tooltip} icon={icon} />
            ) : (
              <span className="flex items-center gap-2">
                {icon} {label}
              </span>
            )}
          </FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Input
                type="number"
                placeholder="0"
                step={step}
                {...field}
                onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                className="flex-1"
              />
            </FormControl>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderSlider = (
    name: keyof CostFormValues,
    label: string,
    icon: React.ReactNode,
    unit: string,
    tooltip?: string,
    props: {
      max?: number;
      min?: number;
      step?: number;
      disabled?: boolean;
      onValueChange?: (value: number) => void;
    } = {}
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {tooltip ? (
              <TooltipLabel label={label} tooltipText={tooltip} icon={icon} />
            ) : (
              <span className="flex items-center gap-2">
                {icon} {label}
              </span>
            )}
          </FormLabel>
          <div className="flex items-center gap-4">
            <FormControl>
              <Slider
                value={[field.value]}
                onValueChange={vals => {
                  field.onChange(vals[0]);
                  if (props.onValueChange) props.onValueChange(vals[0]);
                }}
                max={props.max ?? 100}
                min={props.min ?? 0}
                step={props.step ?? 1}
                disabled={props.disabled}
              />
            </FormControl>
            <span className="text-sm font-medium w-20 text-right">
              {field.value.toFixed(
                props.step === 0.01 || props.step === 0.1 ? 2 : 0
              )}{" "}
              {unit}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="h-full flex flex-col max-h-[calc(100vh-10rem)]">
      <CardHeader>
        <CardTitle className="font-headline">Cost Modeling Inputs</CardTitle>
        <CardDesc>Provide the parameters for your TCO analysis.</CardDesc>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <Tabs
            defaultValue="general"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="onprem">On-Premise</TabsTrigger>
                <TabsTrigger value="cloud">Cloud</TabsTrigger>
              </TabsList>
            </div>
            <CardContent className="flex-1 overflow-y-auto pt-6">
              <div className="space-y-6">
                <TabsContent value="general" className="mt-0 space-y-6">
                  {renderInput(
                    "analysisPeriod",
                    "Analysis Period",
                    <Calendar />,
                    "Years",
                    "The number of years to forecast costs."
                  )}
                  <FormField
                    control={form.control}
                    name="dataUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Container />
                          Data Unit
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="GB">GB (Gigabyte)</SelectItem>
                            <SelectItem value="TB">TB (Terabyte)</SelectItem>
                            <SelectItem value="PB">PB (Petabyte)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {renderSlider(
                    "inflationRate",
                    "Annual Inflation Rate",
                    <TrendingUp />,
                    "%",
                    "The expected annual rate of inflation, used to project future costs.",
                    { step: 0.1 }
                  )}
                  <FormField
                    control={form.control}
                    name="calculationMode"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Calculation Mode</FormLabel>
                        <FormControl>
                          <div className="relative grid grid-cols-2 rounded-lg border p-1 font-semibold">
                            <div
                              className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] bg-primary rounded-md transition-all duration-300"
                              style={{
                                transform: `translateX(${
                                  field.value === "amortized" ? "100%" : "0%"
                                })`,
                              }}
                            ></div>
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange("tco");
                                onCalculationModeChange("tco");
                              }}
                              className={`relative z-10 p-2 rounded-md text-center transition-colors ${
                                field.value === "tco"
                                  ? "text-primary-foreground"
                                  : ""
                              }`}
                            >
                              TCO
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange("amortized");
                                onCalculationModeChange("amortized");
                              }}
                              className={`relative z-10 p-2 rounded-md text-center transition-colors ${
                                field.value === "amortized"
                                  ? "text-primary-foreground"
                                  : ""
                              }`}
                            >
                              Amortized
                            </button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          {field.value === "tco"
                            ? "Total Cost of Ownership (TCO) shows the cumulative cost over the entire analysis period."
                            : "Amortized Cost shows the average cost per year, spreading the initial investment over time."}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="onprem" className="mt-0 space-y-6">
                  <p className="text-sm font-medium">Hardware</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderInput(
                      "onPremHardwareCost",
                      "Upfront Hardware Cost",
                      <Server />,
                      "$",
                      "Initial capital expenditure for all on-premise hardware (servers, racks, networking)."
                    )}
                    {renderSlider(
                      "onPremSalvageValue",
                      "Salvage Value",
                      <Receipt />,
                      "%",
                      "The residual value of the hardware at the end of the analysis period, as a percentage of the initial cost."
                    )}
                    {renderInput(
                      "onPremStoragePerDrive",
                      "Storage per Drive",
                      <HardDrive />,
                      "TB",
                      "Capacity of a single drive in your on-premise setup (in Terabytes)."
                    )}
                    {renderInput(
                      "onPremTotalDrives",
                      "Number of Drives",
                      <Factory />,
                      "drives",
                      "Total number of physical drives in your on-premise setup."
                    )}
                    {renderSlider(
                      "onPremRaidFactor",
                      "RAID Capacity Loss",
                      <Percent />,
                      "%",
                      "The percentage of total storage capacity lost to RAID overhead for redundancy.",
                      { max: 50 }
                    )}
                    {renderSlider(
                      "onPremDriveFailureRate",
                      "Annual Drive Failure Rate",
                      <TestTube2 />,
                      "%",
                      "The percentage of drives expected to fail and need replacement each year."
                    )}
                    {renderInput(
                      "onPremDriveReplacementCost",
                      "Cost per Replacement Drive",
                      <Replace />,
                      "$",
                      "The cost to purchase a single replacement drive."
                    )}
                  </div>

                  <p className="text-sm font-medium">Software</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderInput(
                      "onPremYearlyLicensingCost",
                      "Yearly Licensing Cost",
                      <FileText />,
                      "$/year",
                      "Annual recurring cost for software licenses (e.g., operating systems, databases, virtualization)."
                    )}
                  </div>

                  <p className="text-sm font-medium">Power</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderInput(
                      "onPremPowerRating",
                      "Power Rating per Server",
                      <Power />,
                      "Watts",
                      "The power consumption of a single server under load."
                    )}
                    {renderSlider(
                      "onPremLoadFactor",
                      "Avg. Load Factor",
                      <Percent />,
                      "%",
                      "The average utilization percentage of your servers."
                    )}
                    {renderInput(
                      "onPremElectricityCost",
                      "Electricity Cost",
                      <Zap />,
                      "$/kWh",
                      "The cost of electricity from your utility provider.",
                      "0.01"
                    )}
                  </div>

                  <p className="text-sm font-medium">Bandwidth</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderInput(
                      "onPremBandwidthUsage",
                      "Annual Bandwidth Usage",
                      <Network />,
                      "GB/year",
                      "Estimated total data transferred out from your data center annually."
                    )}
                    {renderInput(
                      "onPremBandwidthCostPerGb",
                      "Bandwidth Cost per GB",
                      <DollarSign />,
                      "$/GB",
                      "The price per GB of data transferred.",
                      "0.001"
                    )}
                    {renderSlider(
                      "onPremAnnualTrafficGrowth",
                      "Annual Traffic Growth",
                      <TrendingUp />,
                      "%",
                      "The percentage by which your egress traffic is expected to grow each year."
                    )}
                  </div>

                  <p className="text-sm font-medium">
                    Content Delivery Network (CDN)
                  </p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    <FormField
                      control={form.control}
                      name="useOnPremCdn"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel>Use External CDN</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {useOnPremCdn && (
                      <>
                        {renderInput(
                          "onPremCdnUsage",
                          "Annual CDN Usage",
                          <Globe />,
                          "GB/year",
                          "Estimated total data transferred via your Content Delivery Network annually."
                        )}
                        {renderInput(
                          "onPremCdnCostPerGb",
                          "CDN Cost per GB",
                          <DollarSign />,
                          "$/GB",
                          "The price per GB of data transferred through the CDN.",
                          "0.01"
                        )}
                      </>
                    )}
                  </div>

                  <p className="text-sm font-medium">Backup</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    <FormField
                      control={form.control}
                      name="useOnPremBackup"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel>Use On-Prem Backup</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {useOnPremBackup && (
                      <>
                        {renderInput(
                          "onPremBackupStorage",
                          "Data to Backup",
                          <Save />,
                          dataUnit,
                          "Total amount of data to be backed up. Auto-calculated from drive specs but can be overridden."
                        )}
                        {renderInput(
                          "onPremBackupCostPerUnit",
                          "Backup Cost per Unit",
                          <DollarSign />,
                          `$/${dataUnit}/year`,
                          "The cost to store one unit of backup data for a year.",
                          "0.01"
                        )}
                      </>
                    )}
                  </div>

                  <p className="text-sm font-medium">Replication</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    <FormField
                      control={form.control}
                      name="useOnPremReplication"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel>Use On-Prem Replication</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={checked => {
                                field.onChange(checked);
                                if (!checked) {
                                  form.setValue("onPremReplicationFactor", 0);
                                } else {
                                  form.setValue("onPremReplicationFactor", 1);
                                }
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {useOnPremReplication && (
                      <div className="pt-4">
                        {renderSlider(
                          "onPremReplicationFactor",
                          "Replication Sites",
                          <Copy />,
                          "sites",
                          "The number of additional, fully replicated on-premise sites for disaster recovery.",
                          { min: 1, max: 10, step: 1 }
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="cloud" className="mt-0 space-y-6">
                  <p className="text-sm font-medium">Storage</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderInput(
                      "cloudStorageSize",
                      "Initial Storage Size",
                      <Container />,
                      dataUnit,
                      "The starting amount of data you will store in the cloud."
                    )}
                    {renderSlider(
                      "cloudGrowthRate",
                      "Annual Data Growth Rate",
                      <TrendingUp />,
                      "%",
                      "The percentage by which your stored data is expected to grow each year."
                    )}
                  </div>

                  <p className="text-sm font-medium">Bandwidth</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderInput(
                      "cloudEgress",
                      "Monthly Data Egress",
                      <ArrowRightLeft />,
                      "TB",
                      "The amount of data transferred out of the cloud each month."
                    )}
                    {renderSlider(
                      "cloudEgressGrowthRate",
                      "Annual Egress Growth",
                      <TrendingUp />,
                      "%",
                      "The percentage by which your egress traffic is expected to grow each year."
                    )}
                  </div>

                  <p className="text-sm font-medium">Cloud Pricing</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderInput(
                      "cloudHotStorageCost",
                      "Hot Storage Price",
                      <DollarSign />,
                      "$/GB/mo",
                      "Price for frequently accessed data. Typically the most expensive tier.",
                      "0.001"
                    )}
                    {renderInput(
                      "cloudStandardStorageCost",
                      "Standard Storage Price",
                      <DollarSign />,
                      "$/GB/mo",
                      "Price for less frequently accessed data with slightly lower retrieval times.",
                      "0.001"
                    )}
                    {renderInput(
                      "cloudArchiveStorageCost",
                      "Archive Storage Price",
                      <DollarSign />,
                      "$/GB/mo",
                      "Price for long-term data archival with the slowest retrieval times. Typically the cheapest tier.",
                      "0.0001"
                    )}
                    {renderInput(
                      "cloudEgressCostPerUnit",
                      "Egress Price",
                      <DollarSign />,
                      `$/GB`,
                      `Price to transfer one GB of data out of the cloud provider's network.`,
                      "0.01"
                    )}
                  </div>

                  <p className="text-sm font-medium">Storage Tier Split</p>
                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                    {renderSlider(
                      "cloudHotTier",
                      "Hot Tier Split",
                      <Percent />,
                      "%",
                      "Percentage of your data in the high-performance 'Hot' tier, for frequently accessed data.",
                      { onValueChange: handleHotChange }
                    )}
                    {renderSlider(
                      "cloudStandardTier",
                      "Standard Tier Split",
                      <Percent />,
                      "%",
                      "Percentage of your data in the 'Standard' tier, for regularly accessed data.",
                      { onValueChange: handleStandardChange }
                    )}
                    {renderSlider(
                      "cloudArchiveTier",
                      "Archive Tier Split",
                      <Percent />,
                      "%",
                      "Percentage of your data in the 'Archive' tier, for long-term backups. (This is calculated automatically).",
                      { disabled: true }
                    )}
                  </div>
                </TabsContent>
              </div>
            </CardContent>
          </Tabs>
          <CardFooter className="pt-6 border-t">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Calculating..." : "Calculate"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
