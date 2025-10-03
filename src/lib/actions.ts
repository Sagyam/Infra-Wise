'use server'

import { modelInflation } from '@/lib/inflation'
import {
  type CalculationResult,
  type CostBreakdown,
  CostFormSchema,
  type CostFormValues,
  type YearlyCost,
} from '@/lib/types'

const unitToGb = (value: number, unit: 'GB' | 'TB' | 'PB') => {
  switch (unit) {
    case 'GB':
      return value
    case 'TB':
      return value * 1024
    case 'PB':
      return value * 1024 * 1024
    default:
      return value
  }
}

export async function calculateCosts(
  values: CostFormValues,
): Promise<
  { success: true; data: CalculationResult } | { success: false; error: string }
> {
  try {
    const parsed = CostFormSchema.safeParse(values)
    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((issue) => `${issue.path.join('.')} - ${issue.message}`)
        .join('; ')
      return { success: false, error: `Invalid input. ${issues}` }
    }

    const {
      analysisPeriod,
      dataUnit,
      // On-prem
      onPremHardwareCost,
      onPremSalvageValue,
      onPremYearlyLicensingCost,
      onPremPowerRating,
      onPremLoadFactor,
      onPremElectricityCost,
      onPremDriveFailureRate,
      onPremDriveReplacementCost,
      onPremTotalDrives,
      onPremStoragePerDrive,
      onPremRaidFactor,
      onPremBandwidthUsage,
      onPremBandwidthCostPerGb,
      onPremAnnualTrafficGrowth,
      useOnPremCdn,
      onPremCdnUsage,
      onPremCdnCostPerGb,
      useOnPremBackup,
      onPremBackupStorage,
      onPremBackupCostPerUnit,
      useOnPremReplication,
      onPremReplicationFactor,
      // Cloud
      cloudStorageSize,
      cloudGrowthRate,
      cloudEgress,
      cloudEgressGrowthRate,
      cloudHotTier,
      cloudStandardTier,
      cloudArchiveTier,
      cloudHotStorageCost,
      cloudStandardStorageCost,
      cloudArchiveStorageCost,
      cloudEgressCostPerUnit,
      // General
      inflationRate,
      calculationMode,
    } = parsed.data

    const yearlyData: YearlyCost[] = []
    let cumulativeCloudCost = 0
    let cumulativeOnPremCost = 0

    let currentCloudStorageUnits = cloudStorageSize
    let currentCloudEgressUnits = cloudEgress
    let currentOnPremBandwidthGb = onPremBandwidthUsage || 0
    let currentOnPremCdnUsageGb = useOnPremCdn ? onPremCdnUsage || 0 : 0

    const storageGrowthFactor = 1 + cloudGrowthRate / 100
    const egressGrowthFactor = 1 + cloudEgressGrowthRate / 100
    const onPremTrafficGrowthFactor = 1 + (onPremAnnualTrafficGrowth || 0) / 100
    const inflationDecimal = inflationRate / 100

    const salvageValueAmount = onPremHardwareCost * (onPremSalvageValue / 100)

    const netHardwareCost = onPremHardwareCost - salvageValueAmount
    const amortizedHardwareCost = netHardwareCost / analysisPeriod

    for (let year = 1; year <= analysisPeriod; year++) {
      const onPremBreakdown: CostBreakdown = {}
      const cloudBreakdown: CostBreakdown = {}

      // --- Cloud Costs ---
      const currentCloudStorageGb = unitToGb(currentCloudStorageUnits, dataUnit)
      const currentCloudEgressGb =
        unitToGb(currentCloudEgressUnits, 'TB') * 1024 // Egress cost is per GB

      const hotStorageGb = currentCloudStorageGb * (cloudHotTier / 100)
      const standardStorageGb =
        currentCloudStorageGb * (cloudStandardTier / 100)
      const archiveStorageGb = currentCloudStorageGb * (cloudArchiveTier / 100)

      const hotCost = hotStorageGb * cloudHotStorageCost * 12
      const standardCost = standardStorageGb * cloudStandardStorageCost * 12
      const archiveCost = archiveStorageGb * cloudArchiveStorageCost * 12

      const baseCloudStorageCost = hotCost + standardCost + archiveCost
      const baseCloudEgressCost = currentCloudEgressGb * cloudEgressCostPerUnit

      let totalAnnualCloudCost = 0

      const [inflatedStorage, inflatedEgress] = await Promise.all([
        modelInflation({
          initialCost: baseCloudStorageCost,
          inflationRate: inflationDecimal,
          analysisPeriod: year - 1,
        }),
        modelInflation({
          initialCost: baseCloudEgressCost,
          inflationRate: inflationDecimal,
          analysisPeriod: year - 1,
        }),
      ])
      totalAnnualCloudCost =
        inflatedStorage.inflatedCost + inflatedEgress.inflatedCost
      cloudBreakdown['Hot Storage'] =
        inflatedStorage.inflatedCost * (hotCost / baseCloudStorageCost)
      cloudBreakdown['Standard Storage'] =
        inflatedStorage.inflatedCost * (standardCost / baseCloudStorageCost)
      cloudBreakdown['Archive Storage'] =
        inflatedStorage.inflatedCost * (archiveCost / baseCloudStorageCost)
      cloudBreakdown['Bandwidth (Egress)'] = inflatedEgress.inflatedCost

      // --- On-Prem Costs ---
      let hardwareCost = 0
      let salvageCredit = 0

      if (calculationMode === 'tco') {
        if (year === 1) hardwareCost = onPremHardwareCost
        if (year === analysisPeriod) salvageCredit = -salvageValueAmount
      } else {
        // Amortized
        const { inflatedCost } = await modelInflation({
          initialCost: onPremHardwareCost / analysisPeriod,
          inflationRate: inflationDecimal,
          analysisPeriod: year - 1,
        })
        hardwareCost = inflatedCost
        const { inflatedCost: inflatedSalvage } = await modelInflation({
          initialCost: salvageValueAmount / analysisPeriod,
          inflationRate: inflationDecimal,
          analysisPeriod: year - 1,
        })
        salvageCredit = -inflatedSalvage
      }

      let softwareCost = onPremYearlyLicensingCost

      let powerCost =
        ((onPremPowerRating * (onPremLoadFactor / 100) * 24 * 365) / 1000) *
        onPremElectricityCost

      let driveReplacementCost =
        onPremTotalDrives *
        (onPremDriveFailureRate / 100) *
        onPremDriveReplacementCost

      let bandwidthCost = currentOnPremBandwidthGb * onPremBandwidthCostPerGb
      let cdnCost = useOnPremCdn
        ? currentOnPremCdnUsageGb * onPremCdnCostPerGb
        : 0

      let backupCost = 0
      if (useOnPremBackup && onPremBackupStorage && onPremBackupCostPerUnit) {
        const backupCostPerUnitInGb =
          onPremBackupCostPerUnit /
          { GB: 1, TB: 1024, PB: 1024 * 1024 }[dataUnit]
        const backupStorageInGb = unitToGb(onPremBackupStorage, dataUnit)
        backupCost = backupStorageInGb * backupCostPerUnitInGb
      }

      const replicationFactor =
        useOnPremReplication && onPremReplicationFactor
          ? onPremReplicationFactor
          : 0

      // Inflate all recurring costs
      const recurringCosts = {
        softwareCost,
        powerCost,
        driveReplacementCost,
        bandwidthCost,
        cdnCost,
        backupCost,
      }
      const inflatedRecurring: { [key: string]: number } = {}

      for (const key in recurringCosts) {
        const cost = recurringCosts[key as keyof typeof recurringCosts]
        if (cost > 0) {
          const { inflatedCost } = await modelInflation({
            initialCost: cost,
            inflationRate: inflationDecimal,
            analysisPeriod: year - 1,
          })
          inflatedRecurring[key] = inflatedCost
        } else {
          inflatedRecurring[key] = 0
        }
      }

      onPremBreakdown['Hardware'] =
        hardwareCost + inflatedRecurring.driveReplacementCost
      onPremBreakdown['Software'] = inflatedRecurring.softwareCost
      onPremBreakdown['Power'] = inflatedRecurring.powerCost
      onPremBreakdown['Bandwidth'] = inflatedRecurring.bandwidthCost
      onPremBreakdown['CDN'] = inflatedRecurring.cdnCost
      onPremBreakdown['Backup'] = inflatedRecurring.backupCost
      onPremBreakdown['Salvage Value'] = salvageCredit

      let totalAnnualOnPremCost =
        hardwareCost + salvageCredit + inflatedRecurring.driveReplacementCost

      const replicatedCosts = [
        inflatedRecurring.softwareCost,
        inflatedRecurring.powerCost,
        inflatedRecurring.bandwidthCost,
        inflatedRecurring.cdnCost,
      ]
      if (calculationMode === 'tco' && year === 1) {
        replicatedCosts.push(onPremHardwareCost)
      } else if (calculationMode === 'amortized') {
        replicatedCosts.push(hardwareCost)
      }

      let replicationCost = 0
      if (replicationFactor > 0) {
        // Base costs for one site
        const singleSiteRecurring =
          inflatedRecurring.softwareCost +
          inflatedRecurring.powerCost +
          inflatedRecurring.bandwidthCost +
          inflatedRecurring.cdnCost +
          inflatedRecurring.driveReplacementCost
        let singleSiteHardware = 0
        if (calculationMode === 'tco' && year === 1)
          singleSiteHardware = onPremHardwareCost
        if (calculationMode === 'amortized') singleSiteHardware = hardwareCost

        const singleSiteTotal = singleSiteRecurring + singleSiteHardware
        replicationCost = singleSiteTotal * replicationFactor

        // Add to breakdowns
        onPremBreakdown['Hardware'] += singleSiteHardware * replicationFactor
        onPremBreakdown['Software'] +=
          inflatedRecurring.softwareCost * replicationFactor

        onPremBreakdown['Power'] +=
          inflatedRecurring.powerCost * replicationFactor
        onPremBreakdown['Bandwidth'] +=
          inflatedRecurring.bandwidthCost * replicationFactor
        onPremBreakdown['CDN'] += inflatedRecurring.cdnCost * replicationFactor
      }

      totalAnnualOnPremCost = Object.values(onPremBreakdown).reduce(
        (sum, val) => sum + (val || 0),
        0,
      )

      cumulativeCloudCost += totalAnnualCloudCost
      cumulativeOnPremCost += totalAnnualOnPremCost

      yearlyData.push({
        year: year,
        onPremCost: totalAnnualOnPremCost,
        cloudCost: totalAnnualCloudCost,
        cumulativeOnPrem: cumulativeOnPremCost,
        cumulativeCloud: cumulativeCloudCost,
        onPremBreakdown,
        cloudBreakdown,
      })

      // Update variables for the next iteration
      currentCloudStorageUnits *= storageGrowthFactor
      currentCloudEgressUnits *= egressGrowthFactor
      currentOnPremBandwidthGb *= onPremTrafficGrowthFactor
      if (useOnPremCdn) {
        currentOnPremCdnUsageGb *= onPremTrafficGrowthFactor
      }
    }

    let breakevenPoint: string | null = null

    // Check if a crossover happens
    const initialOnPremIsCheaper =
      yearlyData[0].cumulativeOnPrem < yearlyData[0].cumulativeCloud
    const finalOnPremIsCheaper = cumulativeOnPremCost < cumulativeCloudCost

    if (initialOnPremIsCheaper !== finalOnPremIsCheaper) {
      for (let i = 0; i < yearlyData.length; i++) {
        const currentYearData = yearlyData[i]
        const prevYearData =
          i > 0
            ? yearlyData[i - 1]
            : { cumulativeOnPrem: 0, cumulativeCloud: 0 }

        const prevOnPremWasCheaper =
          prevYearData.cumulativeOnPrem < prevYearData.cumulativeCloud
        const currentOnPremIsCheaper =
          currentYearData.cumulativeOnPrem < currentYearData.cumulativeCloud

        if (prevOnPremWasCheaper !== currentOnPremIsCheaper) {
          const costDiffAtStartOfYear =
            prevYearData.cumulativeOnPrem - prevYearData.cumulativeCloud
          const costDiffAtEndOfYear =
            currentYearData.cumulativeOnPrem - currentYearData.cumulativeCloud
          const totalChangeInDiff = costDiffAtEndOfYear - costDiffAtStartOfYear

          if (totalChangeInDiff !== 0) {
            const crossoverFraction = -costDiffAtStartOfYear / totalChangeInDiff
            const months = Math.ceil(crossoverFraction * 12)
            if (months > 0 && months <= 12) {
              breakevenPoint = `Year ${currentYearData.year}, Month ${months}`
            } else {
              breakevenPoint = `Year ${currentYearData.year}`
            }
          } else {
            breakevenPoint = `Year ${currentYearData.year}`
          }
          break
        }
      }
    }

    const result: CalculationResult = {
      yearlyCosts: yearlyData,
      onPremTCO: cumulativeOnPremCost,
      cloudTCO: cumulativeCloudCost,
      savings: cumulativeOnPremCost - cumulativeCloudCost,
      breakevenPoint: breakevenPoint,
      calculationMode,
      analysisPeriod,
    }

    return { success: true, data: result }
  } catch (e) {
    console.error('Calculation failed:', e)
    const errorMessage =
      e instanceof Error ? e.message : 'An unexpected error occurred.'
    return { success: false, error: `Calculation failed: ${errorMessage}` }
  }
}
