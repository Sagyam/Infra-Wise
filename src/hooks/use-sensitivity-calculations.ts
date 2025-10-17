import { useMemo } from 'react'
import type { CostFormValues } from '@/lib/types'

interface SensitivityDataPoint {
  change: string
  onPrem: number
  cloud: number
  value: number
}

export function useSensitivityCalculations(
  enabled: boolean,
  selectedVariable: string | undefined,
  formValues: CostFormValues,
  rangePercent: number,
  baseOnPremTCO: number,
  baseCloudTCO: number,
) {
  return useMemo(() => {
    if (!enabled || !selectedVariable) return []

    const baseValue =
      (formValues[selectedVariable as keyof CostFormValues] as number) || 0
    const steps = 10 // Number of data points on each side

    const dataPoints: SensitivityDataPoint[] = []

    for (let i = -steps; i <= steps; i++) {
      const percentChange = (i / steps) * rangePercent
      const adjustedValue = baseValue * (1 + percentChange / 100)

      // Calculate impact based on the variable type using actual TCO values
      let onPremImpact = baseOnPremTCO
      let cloudImpact = baseCloudTCO

      // Different variables have different impacts
      switch (selectedVariable) {
        case 'inflationRate':
          // Higher inflation increases both costs proportionally
          onPremImpact *= 1 + percentChange / 100
          cloudImpact *= 1 + percentChange / 100
          break

        case 'analysisPeriod':
          // Longer period increases total costs linearly
          onPremImpact *= 1 + percentChange / 100
          cloudImpact *= 1 + percentChange / 100
          break

        case 'cloudStorageSize':
        case 'cloudEgress':
          // Cloud storage/egress primarily impacts cloud costs
          cloudImpact *= 1 + percentChange / 80 // Less sensitive
          onPremImpact *= 1 + percentChange / 200 // Minimal impact
          break

        case 'cloudGrowthRate':
        case 'cloudEgressGrowthRate':
          // Growth rates compound over time
          cloudImpact *= 1 + percentChange / 50
          onPremImpact *= 1 + percentChange / 150
          break

        case 'onPremElectricityCost':
          // Electricity primarily impacts on-prem
          onPremImpact *= 1 + percentChange / 50
          cloudImpact *= 1 + percentChange / 500 // Minimal impact
          break

        case 'cloudGeneralVmCount':
          // VM count directly impacts cloud costs
          cloudImpact *= 1 + percentChange / 60
          onPremImpact *= 1 + percentChange / 300 // Minimal impact
          break

        case 'onPremSysAdminSalary':
          // Salary impacts on-prem costs
          onPremImpact *= 1 + percentChange / 100
          cloudImpact *= 1 + percentChange / 400 // Some impact for cloud admins too
          break

        default:
          // Generic case - proportional impact
          onPremImpact *= 1 + percentChange / 100
          cloudImpact *= 1 + percentChange / 100
      }

      dataPoints.push({
        change: percentChange.toFixed(1),
        onPrem: Math.round(onPremImpact),
        cloud: Math.round(cloudImpact),
        value: adjustedValue,
      })
    }

    return dataPoints
  }, [
    enabled,
    selectedVariable,
    formValues,
    rangePercent,
    baseOnPremTCO,
    baseCloudTCO,
  ])
}
