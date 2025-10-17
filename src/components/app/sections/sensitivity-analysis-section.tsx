'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { FormInput } from '@/components/app/form/form-input'
import { FormSwitch } from '@/components/app/form/form-switch'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSensitivityCalculations } from '@/hooks/use-sensitivity-calculations'
import type { CalculationResult, CostFormValues } from '@/lib/types'
import { cn } from '@/lib/utils'
import { formatCurrency } from '../chart/chart-config'
import { ChartLegend } from '../chart/chart-legend'

interface SensitivityAnalysisSectionProps {
  control: Control<CostFormValues>
  results: CalculationResult | null
}

interface SensitivityVariable {
  value: string
  label: string
  unit: string
  category: string
}

// Define available variables for sensitivity analysis organized by category
const SENSITIVITY_VARIABLES: SensitivityVariable[] = [
  // General
  {
    value: 'inflationRate',
    label: 'Inflation Rate',
    unit: '%',
    category: 'General',
  },
  {
    value: 'analysisPeriod',
    label: 'Analysis Period',
    unit: 'years',
    category: 'General',
  },

  // Cloud Storage
  {
    value: 'cloudStorageSize',
    label: 'Cloud Storage Size',
    unit: 'TB',
    category: 'Cloud Storage',
  },
  {
    value: 'cloudGrowthRate',
    label: 'Storage Growth Rate',
    unit: '%',
    category: 'Cloud Storage',
  },
  {
    value: 'cloudHotStorageCost',
    label: 'Hot Storage Cost',
    unit: '$/GB',
    category: 'Cloud Storage',
  },
  {
    value: 'cloudStandardStorageCost',
    label: 'Standard Storage Cost',
    unit: '$/GB',
    category: 'Cloud Storage',
  },
  {
    value: 'cloudArchiveStorageCost',
    label: 'Archive Storage Cost',
    unit: '$/GB',
    category: 'Cloud Storage',
  },
  {
    value: 'cloudHotTier',
    label: 'Hot Tier Percentage',
    unit: '%',
    category: 'Cloud Storage',
  },
  {
    value: 'cloudStandardTier',
    label: 'Standard Tier Percentage',
    unit: '%',
    category: 'Cloud Storage',
  },

  // Cloud Networking
  {
    value: 'cloudEgress',
    label: 'Cloud Egress',
    unit: 'TB',
    category: 'Cloud Networking',
  },
  {
    value: 'cloudEgressGrowthRate',
    label: 'Egress Growth Rate',
    unit: '%',
    category: 'Cloud Networking',
  },
  {
    value: 'cloudEgressCostPerUnit',
    label: 'Egress Cost Per Unit',
    unit: '$/GB',
    category: 'Cloud Networking',
  },

  // Cloud Compute
  {
    value: 'cloudGeneralVmCount',
    label: 'General VM Count',
    unit: 'instances',
    category: 'Cloud Compute',
  },
  {
    value: 'cloudGeneralVmHourlyRate',
    label: 'General VM Hourly Rate',
    unit: '$/hr',
    category: 'Cloud Compute',
  },
  {
    value: 'cloudComputeVmCount',
    label: 'Compute VM Count',
    unit: 'instances',
    category: 'Cloud Compute',
  },
  {
    value: 'cloudComputeVmHourlyRate',
    label: 'Compute VM Hourly Rate',
    unit: '$/hr',
    category: 'Cloud Compute',
  },
  {
    value: 'cloudMemoryVmCount',
    label: 'Memory VM Count',
    unit: 'instances',
    category: 'Cloud Compute',
  },
  {
    value: 'cloudMemoryVmHourlyRate',
    label: 'Memory VM Hourly Rate',
    unit: '$/hr',
    category: 'Cloud Compute',
  },

  // Cloud GPU
  {
    value: 'cloudTrainingGpuCount',
    label: 'Training GPU Count',
    unit: 'instances',
    category: 'Cloud GPU',
  },
  {
    value: 'cloudTrainingGpuHourlyRate',
    label: 'Training GPU Hourly Rate',
    unit: '$/hr',
    category: 'Cloud GPU',
  },
  {
    value: 'cloudInferenceGpuCount',
    label: 'Inference GPU Count',
    unit: 'instances',
    category: 'Cloud GPU',
  },
  {
    value: 'cloudInferenceGpuHourlyRate',
    label: 'Inference GPU Hourly Rate',
    unit: '$/hr',
    category: 'Cloud GPU',
  },

  // On-Prem Energy
  {
    value: 'onPremElectricityCost',
    label: 'Electricity Cost',
    unit: '$/kWh',
    category: 'On-Prem Energy',
  },
  {
    value: 'onPremPowerRating',
    label: 'Power Rating',
    unit: 'W',
    category: 'On-Prem Energy',
  },
  {
    value: 'onPremLoadFactor',
    label: 'Load Factor',
    unit: '%',
    category: 'On-Prem Energy',
  },
  {
    value: 'onPremColocationMonthlyCost',
    label: 'Colocation Monthly Cost',
    unit: '$',
    category: 'On-Prem Energy',
  },

  // On-Prem Compute Hardware
  {
    value: 'onPremCpuQuantity',
    label: 'CPU Quantity',
    unit: 'units',
    category: 'On-Prem Compute',
  },
  {
    value: 'onPremCpuUnitCost',
    label: 'CPU Unit Cost',
    unit: '$',
    category: 'On-Prem Compute',
  },
  {
    value: 'onPremMotherboardQuantity',
    label: 'Motherboard Quantity',
    unit: 'units',
    category: 'On-Prem Compute',
  },
  {
    value: 'onPremMotherboardUnitCost',
    label: 'Motherboard Unit Cost',
    unit: '$',
    category: 'On-Prem Compute',
  },
  {
    value: 'onPremMemoryCapacityGb',
    label: 'Memory Capacity',
    unit: 'GB',
    category: 'On-Prem Compute',
  },
  {
    value: 'onPremMemoryCostPerGb',
    label: 'Memory Cost Per GB',
    unit: '$/GB',
    category: 'On-Prem Compute',
  },

  // On-Prem GPU Hardware
  {
    value: 'onPremTrainingGpuQuantity',
    label: 'Training GPU Quantity',
    unit: 'units',
    category: 'On-Prem GPU',
  },
  {
    value: 'onPremTrainingGpuUnitCost',
    label: 'Training GPU Unit Cost',
    unit: '$',
    category: 'On-Prem GPU',
  },
  {
    value: 'onPremInferenceGpuQuantity',
    label: 'Inference GPU Quantity',
    unit: 'units',
    category: 'On-Prem GPU',
  },
  {
    value: 'onPremInferenceGpuUnitCost',
    label: 'Inference GPU Unit Cost',
    unit: '$',
    category: 'On-Prem GPU',
  },

  // On-Prem Storage
  {
    value: 'onPremHddCount',
    label: 'HDD Count',
    unit: 'units',
    category: 'On-Prem Storage',
  },
  {
    value: 'onPremHddUnitCost',
    label: 'HDD Unit Cost',
    unit: '$',
    category: 'On-Prem Storage',
  },
  {
    value: 'onPremSsdCount',
    label: 'SSD Count',
    unit: 'units',
    category: 'On-Prem Storage',
  },
  {
    value: 'onPremSsdUnitCost',
    label: 'SSD Unit Cost',
    unit: '$',
    category: 'On-Prem Storage',
  },

  // On-Prem Networking
  {
    value: 'onPremBandwidthUsage',
    label: 'Bandwidth Usage',
    unit: 'GB',
    category: 'On-Prem Networking',
  },
  {
    value: 'onPremBandwidthCostPerGb',
    label: 'Bandwidth Cost Per GB',
    unit: '$/GB',
    category: 'On-Prem Networking',
  },
  {
    value: 'onPremCoreSwitchQuantity',
    label: 'Core Switch Quantity',
    unit: 'units',
    category: 'On-Prem Networking',
  },
  {
    value: 'onPremCoreSwitchUnitCost',
    label: 'Core Switch Unit Cost',
    unit: '$',
    category: 'On-Prem Networking',
  },

  // Human Resources - On-Prem
  {
    value: 'onPremSysAdminCount',
    label: 'System Admin Count',
    unit: 'people',
    category: 'On-Prem Personnel',
  },
  {
    value: 'onPremSysAdminSalary',
    label: 'System Admin Salary',
    unit: '$',
    category: 'On-Prem Personnel',
  },
  {
    value: 'onPremNetworkEngineerCount',
    label: 'Network Engineer Count',
    unit: 'people',
    category: 'On-Prem Personnel',
  },
  {
    value: 'onPremNetworkEngineerSalary',
    label: 'Network Engineer Salary',
    unit: '$',
    category: 'On-Prem Personnel',
  },
  {
    value: 'onPremSecurityEngineerCount',
    label: 'Security Engineer Count',
    unit: 'people',
    category: 'On-Prem Personnel',
  },
  {
    value: 'onPremSecurityEngineerSalary',
    label: 'Security Engineer Salary',
    unit: '$',
    category: 'On-Prem Personnel',
  },

  // Human Resources - Cloud
  {
    value: 'cloudDevOpsEngineerCount',
    label: 'DevOps Engineer Count',
    unit: 'people',
    category: 'Cloud Personnel',
  },
  {
    value: 'cloudDevOpsEngineerSalary',
    label: 'DevOps Engineer Salary',
    unit: '$',
    category: 'Cloud Personnel',
  },
  {
    value: 'cloudCloudArchitectCount',
    label: 'Cloud Architect Count',
    unit: 'people',
    category: 'Cloud Personnel',
  },
  {
    value: 'cloudCloudArchitectSalary',
    label: 'Cloud Architect Salary',
    unit: '$',
    category: 'Cloud Personnel',
  },
  {
    value: 'cloudSiteReliabilityEngineerCount',
    label: 'SRE Count',
    unit: 'people',
    category: 'Cloud Personnel',
  },
  {
    value: 'cloudSiteReliabilityEngineerSalary',
    label: 'SRE Salary',
    unit: '$',
    category: 'Cloud Personnel',
  },

  // Software - Cloud
  {
    value: 'cloudDatabaseMonthlyCost',
    label: 'Database Monthly Cost',
    unit: '$',
    category: 'Cloud Software',
  },
  {
    value: 'cloudAnalyticsMonthlyCost',
    label: 'Analytics Monthly Cost',
    unit: '$',
    category: 'Cloud Software',
  },
  {
    value: 'cloudMonitoringMonthlyCost',
    label: 'Monitoring Monthly Cost',
    unit: '$',
    category: 'Cloud Software',
  },
  {
    value: 'cloudSecurityMonthlyCost',
    label: 'Security Monthly Cost',
    unit: '$',
    category: 'Cloud Software',
  },

  // Software - On-Prem
  {
    value: 'onPremVirtualizationUnitCost',
    label: 'Virtualization License Cost',
    unit: '$',
    category: 'On-Prem Software',
  },
  {
    value: 'onPremOperatingSystemUnitCost',
    label: 'OS License Cost',
    unit: '$',
    category: 'On-Prem Software',
  },
  {
    value: 'onPremMonitoringUnitCost',
    label: 'Monitoring License Cost',
    unit: '$',
    category: 'On-Prem Software',
  },
  {
    value: 'onPremSecurityUnitCost',
    label: 'Security License Cost',
    unit: '$',
    category: 'On-Prem Software',
  },
]

const chartConfig = {
  onPrem: {
    label: 'On-Premise',
    color: 'hsl(var(--chart-1))',
  },
  cloud: {
    label: 'Cloud',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

// Custom tooltip component
function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <div className="mb-2 font-medium">Change: {label}%</div>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.name}:</span>
            <span className="ml-auto font-mono font-medium">
              {formatCurrency(entry.value || 0)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SensitivityAnalysisSection({
  control,
  results,
}: SensitivityAnalysisSectionProps) {
  const [open, setOpen] = useState(false)
  const [selectedVariable, setSelectedVariable] = useState<string>(
    SENSITIVITY_VARIABLES[0].value,
  )

  const enableSensitivityAnalysis = useWatch({
    control,
    name: 'enableSensitivityAnalysis',
    defaultValue: true,
  })

  // Get all form values for sensitivity analysis
  const formValues = useWatch({ control }) as CostFormValues

  // Get base TCO values from results
  const baseOnPremTCO = results?.onPremTCO || 100000
  const baseCloudTCO = results?.cloudTCO || 80000

  // Use the sensitivity calculations hook
  const sensitivityData = useSensitivityCalculations(
    enableSensitivityAnalysis,
    selectedVariable,
    formValues,
    formValues.sensitivityRangePercent || 20,
    baseOnPremTCO,
    baseCloudTCO,
  )

  const selectedVariableInfo = SENSITIVITY_VARIABLES.find(
    (v) => v.value === selectedVariable,
  )

  const activeCategories = ['onPrem', 'cloud']

  // Group variables by category
  const groupedVariables = SENSITIVITY_VARIABLES.reduce(
    (acc, variable) => {
      if (!acc[variable.category]) {
        acc[variable.category] = []
      }
      acc[variable.category].push(variable)
      return acc
    },
    {} as Record<string, SensitivityVariable[]>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Sensitivity Analysis</CardTitle>
        <CardDescription>
          See how changes in key variables impact the total cost of ownership
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormSwitch
          control={control}
          name="enableSensitivityAnalysis"
          label="Enable Sensitivity Analysis"
          description="Toggle to show/hide sensitivity analysis"
        />

        {enableSensitivityAnalysis && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-0">
                <Label>Select Variable</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedVariable
                        ? SENSITIVITY_VARIABLES.find(
                            (variable) => variable.value === selectedVariable,
                          )?.label
                        : 'Select variable...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search variable..." />
                      <CommandList>
                        <CommandEmpty>No variable found.</CommandEmpty>
                        {Object.entries(groupedVariables).map(
                          ([category, variables]) => (
                            <CommandGroup key={category} heading={category}>
                              {variables.map((variable) => (
                                <CommandItem
                                  key={variable.value}
                                  value={variable.value}
                                  onSelect={(currentValue) => {
                                    setSelectedVariable(currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      selectedVariable === variable.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                  {variable.label}
                                  <span className="ml-auto text-xs text-muted-foreground">
                                    {variable.unit}
                                  </span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ),
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <FormInput
                control={control}
                name="sensitivityRangePercent"
                label="Range (%)"
                tooltip="Percentage range to vary the selected variable (e.g., ±20%)"
                type="number"
                step={1}
                min={1}
                max={100}
              />
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-4">
                Impact of {selectedVariableInfo?.label} Changes on TCO
              </h4>
              <ChartContainer
                config={chartConfig}
                className="min-h-[400px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={sensitivityData}
                  margin={{ left: 10, right: 10, top: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="change"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    label={{
                      value: `Change in ${selectedVariableInfo?.label} (%)`,
                      position: 'insideBottom',
                      offset: -10,
                    }}
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: 'Total Cost ($)',
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    content={({ payload }) => (
                      <ChartLegend
                        payload={payload}
                        activeCategories={activeCategories}
                        activeChartConfig={chartConfig}
                      />
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="onPrem"
                    stroke={chartConfig.onPrem.color}
                    strokeWidth={2}
                    dot={{
                      fill: chartConfig.onPrem.color,
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                    name={chartConfig.onPrem.label}
                  />
                  <Line
                    type="monotone"
                    dataKey="cloud"
                    stroke={chartConfig.cloud.color}
                    strokeWidth={2}
                    dot={{
                      fill: chartConfig.cloud.color,
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                    name={chartConfig.cloud.label}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
