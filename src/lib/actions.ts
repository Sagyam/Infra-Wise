'use server'

import { modelInflation } from '@/lib/inflation'
import {
  type CalculationResult,
  type CostBreakdown,
  CostFormSchema,
  type CostFormValues,
  type YearlyCost,
} from '@/lib/types'

const tbToGb = (tb: number) => tb * 1024

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

    const data = parsed.data
    const { analysisPeriod, inflationRate, calculationMode } = data

    const yearlyData: YearlyCost[] = []
    let cumulativeCloudCost = 0
    let cumulativeOnPremCost = 0

    let currentCloudStorageUnits = data.cloudStorageSize
    let currentCloudEgressUnits = data.cloudEgress
    let currentOnPremBandwidthGb = data.onPremBandwidthUsage || 0

    const storageGrowthFactor = 1 + data.cloudGrowthRate / 100
    const egressGrowthFactor = 1 + data.cloudEgressGrowthRate / 100
    const onPremTrafficGrowthFactor = 1 + (data.onPremAnnualTrafficGrowth || 0) / 100
    const inflationDecimal = inflationRate / 100

    // Calculate one-time hardware costs
    const onPremComputeHardwareCost =
      (data.useOnPremCpu ? (data.onPremCpuQuantity || 0) * (data.onPremCpuUnitCost || 0) : 0) +
      (data.useOnPremMotherboard ? (data.onPremMotherboardQuantity || 0) * (data.onPremMotherboardUnitCost || 0) : 0) +
      (data.useOnPremMemory ? (data.onPremMemoryCapacityGb || 0) * (data.onPremMemoryCostPerGb || 0) : 0) +
      (data.useOnPremChassis ? (data.onPremChassisQuantity || 0) * (data.onPremChassisUnitCost || 0) : 0) +
      (data.useOnPremRacks ? (data.onPremRacksQuantity || 0) * (data.onPremRacksUnitCost || 0) : 0)

    const onPremGpuHardwareCost =
      (data.useOnPremTrainingGpu ? (data.onPremTrainingGpuQuantity || 0) * (data.onPremTrainingGpuUnitCost || 0) : 0) +
      (data.useOnPremInferenceGpu ? (data.onPremInferenceGpuQuantity || 0) * (data.onPremInferenceGpuUnitCost || 0) : 0)

    const onPremNetworkingHardwareCost =
      (data.useOnPremCoreSwitch ? (data.onPremCoreSwitchQuantity || 0) * (data.onPremCoreSwitchUnitCost || 0) : 0) +
      (data.useOnPremAggregationSwitch ? (data.onPremAggregationSwitchQuantity || 0) * (data.onPremAggregationSwitchUnitCost || 0) : 0) +
      (data.useOnPremAccessSwitch ? (data.onPremAccessSwitchQuantity || 0) * (data.onPremAccessSwitchUnitCost || 0) : 0) +
      (data.useOnPremCabling ? (data.onPremCablingLength || 0) * (data.onPremCablingUnitPrice || 0) : 0) +
      (data.useOnPremQsfp ? (data.onPremQsfpQuantity || 0) * (data.onPremQsfpUnitCost || 0) : 0)

    const onPremEnergyHardwareCost =
      (data.useOnPremUps ? (data.onPremUpsQuantity || 0) * (data.onPremUpsUnitCost || 0) : 0) +
      (data.useOnPremGenerator ? (data.onPremGeneratorQuantity || 0) * (data.onPremGeneratorUnitCost || 0) : 0) +
      (data.useOnPremHvac ? (data.onPremHvacQuantity || 0) * (data.onPremHvacUnitCost || 0) : 0)

    const onPremStorageHardwareCost =
      (data.useOnPremHdd ? (data.onPremHddCount || 0) * (data.onPremHddUnitCost || 0) : 0) +
      (data.useOnPremSsd ? (data.onPremSsdCount || 0) * (data.onPremSsdUnitCost || 0) : 0)

    const totalOnPremHardwareCost = onPremComputeHardwareCost + onPremGpuHardwareCost + onPremNetworkingHardwareCost + onPremEnergyHardwareCost + onPremStorageHardwareCost

    // Average salvage value
    const avgSalvagePercent = 10 // Simplified for now
    const salvageValueAmount = totalOnPremHardwareCost * (avgSalvagePercent / 100)

    for (let year = 1; year <= analysisPeriod; year++) {
      const onPremBreakdown: CostBreakdown = {
        Energy: 0,
        Storage: 0,
        Compute: 0,
        GPU: 0,
        Networking: 0,
        Human: 0,
        Software: 0,
      }
      const cloudBreakdown: CostBreakdown = {
        Storage: 0,
        Compute: 0,
        GPU: 0,
        Networking: 0,
        Human: 0,
        Software: 0,
      }

      // ===== ON-PREM COSTS =====

      // 1. ENERGY COSTS (On-Prem Only)
      let energyCost = 0

      // Power consumption
      if (data.useOnPremPowerConsumption) {
        const powerKwh = ((data.onPremPowerRating || 0) * ((data.onPremLoadFactor || 0) / 100) * 24 * 365) / 1000
        energyCost += powerKwh * (data.onPremElectricityCost || 0)
      }

      // UPS battery replacement
      if (data.useOnPremUps) {
        energyCost += (data.onPremUpsQuantity || 0) * ((data.onPremUpsBatteryFailureRate || 0) / 100) * (data.onPremUpsBatteryReplacementCost || 0)
      }

      // Generator fuel
      if (data.useOnPremGenerator) {
        energyCost += (data.onPremGeneratorFuelConsumptionRate || 0) * (data.onPremGeneratorFuelUnitCost || 0) * (data.onPremGeneratorAnnualUsageHours || 0)
      }

      // HVAC power + maintenance
      if (data.useOnPremHvac) {
        const hvacPowerKwh = ((data.onPremHvacPowerConsumption || 0) * ((data.onPremHvacLoadFactor || 0) / 100) * 24 * 365) / 1000
        energyCost += hvacPowerKwh * (data.onPremElectricityCost || 0)
        energyCost += (data.onPremHvacTechnicianHourlyRate || 0) * (data.onPremHvacHoursWorked || 0)
      }

      // Colocation
      if (data.useOnPremColocation) {
        const coloMonthly = data.onPremColocationMonthlyCost || 0
        const coloGrowthRate = (data.onPremColocationAnnualIncrease || 0) / 100
        const coloYearlyCost = coloMonthly * 12 * Math.pow(1 + coloGrowthRate, year - 1)
        energyCost += coloYearlyCost
      }

      // Energy hardware (one-time in year 1 or amortized)
      if (calculationMode === 'tco' && year === 1) {
        energyCost += onPremEnergyHardwareCost
      } else if (calculationMode === 'amortized') {
        energyCost += onPremEnergyHardwareCost / analysisPeriod
      }

      const { inflatedCost: inflatedEnergy } = await modelInflation({
        initialCost: energyCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Energy = inflatedEnergy

      // 2. STORAGE COSTS
      let onPremStorageCost = 0

      // Initial disk hardware cost (one-time or amortized)
      if (calculationMode === 'tco' && year === 1) {
        onPremStorageCost += onPremStorageHardwareCost
      } else if (calculationMode === 'amortized') {
        onPremStorageCost += onPremStorageHardwareCost / analysisPeriod
      }

      // Subtract salvage value in final year for TCO mode
      if (calculationMode === 'tco' && year === analysisPeriod) {
        const storageSalvage = onPremStorageHardwareCost * (avgSalvagePercent / 100)
        onPremStorageCost -= storageSalvage
      }

      // HDD replacement costs (annual)
      if (data.useOnPremHdd) {
        const hddReplacementCost = (data.onPremHddCount || 0) * ((data.onPremHddFailureRate || 0) / 100) * (data.onPremHddUnitCost || 0)
        onPremStorageCost += hddReplacementCost
      }

      // SSD replacement costs (annual)
      if (data.useOnPremSsd) {
        const ssdReplacementCost = (data.onPremSsdCount || 0) * ((data.onPremSsdFailureRate || 0) / 100) * (data.onPremSsdUnitCost || 0)
        onPremStorageCost += ssdReplacementCost
      }

      // Backup costs (storage is in TB, cost is per TB/year)
      if (data.useOnPremBackup && data.onPremBackupStorage && data.onPremBackupCostPerUnit) {
        onPremStorageCost += (data.onPremBackupStorage || 0) * (data.onPremBackupCostPerUnit || 0)
      }

      const { inflatedCost: inflatedOnPremStorage } = await modelInflation({
        initialCost: onPremStorageCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Storage = inflatedOnPremStorage

      // Cloud Storage (cloudStorageSize is in TB, costs are per GB/month)
      const currentCloudStorageGb = tbToGb(currentCloudStorageUnits)
      const hotStorageGb = currentCloudStorageGb * (data.cloudHotTier / 100)
      const standardStorageGb = currentCloudStorageGb * (data.cloudStandardTier / 100)
      const archiveStorageGb = currentCloudStorageGb * (data.cloudArchiveTier / 100)

      const cloudStorageCost =
        (hotStorageGb * data.cloudHotStorageCost * 12) +
        (standardStorageGb * data.cloudStandardStorageCost * 12) +
        (archiveStorageGb * data.cloudArchiveStorageCost * 12)

      const { inflatedCost: inflatedCloudStorage } = await modelInflation({
        initialCost: cloudStorageCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.Storage = inflatedCloudStorage

      // 3. COMPUTE COSTS
      let onPremComputeCost = 0
      if (calculationMode === 'tco' && year === 1) {
        onPremComputeCost = onPremComputeHardwareCost
      } else if (calculationMode === 'amortized') {
        onPremComputeCost = onPremComputeHardwareCost / analysisPeriod
      }

      // Subtract salvage value in final year for TCO mode
      if (calculationMode === 'tco' && year === analysisPeriod) {
        const computeSalvage = onPremComputeHardwareCost * (avgSalvagePercent / 100)
        onPremComputeCost -= computeSalvage
      }

      const { inflatedCost: inflatedOnPremCompute } = await modelInflation({
        initialCost: onPremComputeCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Compute = inflatedOnPremCompute

      // Cloud Compute (VMs)
      let cloudComputeCost = 0
      if (data.useCloudGeneralVm) {
        cloudComputeCost += (data.cloudGeneralVmCount || 0) * (data.cloudGeneralVmHourlyRate || 0) * (data.cloudGeneralVmHoursPerMonth || 0) * 12
      }
      if (data.useCloudComputeVm) {
        cloudComputeCost += (data.cloudComputeVmCount || 0) * (data.cloudComputeVmHourlyRate || 0) * (data.cloudComputeVmHoursPerMonth || 0) * 12
      }
      if (data.useCloudMemoryVm) {
        cloudComputeCost += (data.cloudMemoryVmCount || 0) * (data.cloudMemoryVmHourlyRate || 0) * (data.cloudMemoryVmHoursPerMonth || 0) * 12
      }
      if (data.useCloudStorageVm) {
        cloudComputeCost += (data.cloudStorageVmCount || 0) * (data.cloudStorageVmHourlyRate || 0) * (data.cloudStorageVmHoursPerMonth || 0) * 12
      }

      const { inflatedCost: inflatedCloudCompute } = await modelInflation({
        initialCost: cloudComputeCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.Compute = inflatedCloudCompute

      // 4. GPU COSTS
      let onPremGpuCost = 0
      if (calculationMode === 'tco' && year === 1) {
        onPremGpuCost = onPremGpuHardwareCost
      } else if (calculationMode === 'amortized') {
        onPremGpuCost = onPremGpuHardwareCost / analysisPeriod
      }

      if (calculationMode === 'tco' && year === analysisPeriod) {
        const gpuSalvage = onPremGpuHardwareCost * (avgSalvagePercent / 100)
        onPremGpuCost -= gpuSalvage
      }

      const { inflatedCost: inflatedOnPremGpu } = await modelInflation({
        initialCost: onPremGpuCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.GPU = inflatedOnPremGpu

      // Cloud GPU
      let cloudGpuCost = 0
      if (data.useCloudTrainingGpu) {
        cloudGpuCost += (data.cloudTrainingGpuCount || 0) * (data.cloudTrainingGpuHourlyRate || 0) * (data.cloudTrainingGpuHoursPerMonth || 0) * 12
      }
      if (data.useCloudInferenceGpu) {
        cloudGpuCost += (data.cloudInferenceGpuCount || 0) * (data.cloudInferenceGpuHourlyRate || 0) * (data.cloudInferenceGpuHoursPerMonth || 0) * 12
      }

      const { inflatedCost: inflatedCloudGpu } = await modelInflation({
        initialCost: cloudGpuCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.GPU = inflatedCloudGpu

      // 5. NETWORKING COSTS
      let onPremNetworkingCost = 0

      // Hardware (one-time or amortized)
      if (calculationMode === 'tco' && year === 1) {
        onPremNetworkingCost = onPremNetworkingHardwareCost
      } else if (calculationMode === 'amortized') {
        onPremNetworkingCost = onPremNetworkingHardwareCost / analysisPeriod
      }

      if (calculationMode === 'tco' && year === analysisPeriod) {
        const networkSalvage = onPremNetworkingHardwareCost * (avgSalvagePercent / 100)
        onPremNetworkingCost -= networkSalvage
      }

      // Bandwidth costs
      if (data.useOnPremBandwidth) {
        onPremNetworkingCost += currentOnPremBandwidthGb * (data.onPremBandwidthCostPerGb || 0)
      }

      // CDN costs
      if (data.useOnPremCdn) {
        onPremNetworkingCost += (data.onPremCdnUsage || 0) * (data.onPremCdnCostPerGb || 0) * Math.pow(onPremTrafficGrowthFactor, year - 1)
      }

      const { inflatedCost: inflatedOnPremNetworking } = await modelInflation({
        initialCost: onPremNetworkingCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Networking = inflatedOnPremNetworking

      // Cloud Networking (Egress - cloudEgress is in TB)
      const currentCloudEgressGb = tbToGb(currentCloudEgressUnits)
      const cloudNetworkingCost = currentCloudEgressGb * data.cloudEgressCostPerUnit

      const { inflatedCost: inflatedCloudNetworking } = await modelInflation({
        initialCost: cloudNetworkingCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.Networking = inflatedCloudNetworking

      // 6. HUMAN COSTS
      const calculateSalaryCost = (count: number, salary: number, increment: number) => {
        return count * salary * Math.pow(1 + increment / 100, year - 1)
      }

      let onPremHumanCost = 0
      onPremHumanCost += calculateSalaryCost(data.onPremSysAdminCount || 0, data.onPremSysAdminSalary || 0, data.onPremSysAdminSalaryIncrement || 0)
      onPremHumanCost += calculateSalaryCost(data.onPremNetworkEngineerCount || 0, data.onPremNetworkEngineerSalary || 0, data.onPremNetworkEngineerSalaryIncrement || 0)
      onPremHumanCost += calculateSalaryCost(data.onPremStorageAdminCount || 0, data.onPremStorageAdminSalary || 0, data.onPremStorageAdminSalaryIncrement || 0)
      onPremHumanCost += calculateSalaryCost(data.onPremSecurityEngineerCount || 0, data.onPremSecurityEngineerSalary || 0, data.onPremSecurityEngineerSalaryIncrement || 0)
      onPremHumanCost += calculateSalaryCost(data.onPremDatabaseAdminCount || 0, data.onPremDatabaseAdminSalary || 0, data.onPremDatabaseAdminSalaryIncrement || 0)
      onPremHumanCost += calculateSalaryCost(data.onPremDataCenterTechCount || 0, data.onPremDataCenterTechSalary || 0, data.onPremDataCenterTechSalaryIncrement || 0)

      onPremBreakdown.Human = onPremHumanCost

      let cloudHumanCost = 0
      cloudHumanCost += calculateSalaryCost(data.cloudDevOpsEngineerCount || 0, data.cloudDevOpsEngineerSalary || 0, data.cloudDevOpsEngineerSalaryIncrement || 0)
      cloudHumanCost += calculateSalaryCost(data.cloudCloudArchitectCount || 0, data.cloudCloudArchitectSalary || 0, data.cloudCloudArchitectSalaryIncrement || 0)
      cloudHumanCost += calculateSalaryCost(data.cloudSiteReliabilityEngineerCount || 0, data.cloudSiteReliabilityEngineerSalary || 0, data.cloudSiteReliabilityEngineerSalaryIncrement || 0)
      cloudHumanCost += calculateSalaryCost(data.cloudCloudSecurityEngineerCount || 0, data.cloudCloudSecurityEngineerSalary || 0, data.cloudCloudSecurityEngineerSalaryIncrement || 0)
      cloudHumanCost += calculateSalaryCost(data.cloudCloudDatabaseAdminCount || 0, data.cloudCloudDatabaseAdminSalary || 0, data.cloudCloudDatabaseAdminSalaryIncrement || 0)

      cloudBreakdown.Human = cloudHumanCost

      // 7. SOFTWARE COSTS
      let onPremSoftwareCost = 0
      if (data.useOnPremVirtualization) {
        onPremSoftwareCost += (data.onPremVirtualizationUnitCost || 0) * (data.onPremVirtualizationLicenses || 0)
      }
      if (data.useOnPremOperatingSystem) {
        onPremSoftwareCost += (data.onPremOperatingSystemUnitCost || 0) * (data.onPremOperatingSystemLicenses || 0)
      }
      if (data.useOnPremStorage) {
        onPremSoftwareCost += (data.onPremStorageUnitCost || 0) * (data.onPremStorageLicenses || 0)
      }
      if (data.useOnPremBackupSoftware) {
        onPremSoftwareCost += (data.onPremBackupSoftwareUnitCost || 0) * (data.onPremBackupSoftwareLicenses || 0)
      }
      if (data.useOnPremMonitoring) {
        onPremSoftwareCost += (data.onPremMonitoringUnitCost || 0) * (data.onPremMonitoringLicenses || 0)
      }
      if (data.useOnPremSecurity) {
        onPremSoftwareCost += (data.onPremSecurityUnitCost || 0) * (data.onPremSecurityLicenses || 0)
      }

      const { inflatedCost: inflatedOnPremSoftware } = await modelInflation({
        initialCost: onPremSoftwareCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Software = inflatedOnPremSoftware

      let cloudSoftwareCost = 0
      if (data.useCloudDatabase) {
        cloudSoftwareCost += (data.cloudDatabaseMonthlyCost || 0) * 12
      }
      if (data.useCloudOperatingSystem) {
        cloudSoftwareCost += (data.cloudOperatingSystemMonthlyCost || 0) * 12
      }
      if (data.useCloudAnalytics) {
        cloudSoftwareCost += (data.cloudAnalyticsMonthlyCost || 0) * 12
      }
      if (data.useCloudTelemetry) {
        cloudSoftwareCost += (data.cloudTelemetryMonthlyCost || 0) * 12
      }
      if (data.useCloudMonitoring) {
        cloudSoftwareCost += (data.cloudMonitoringMonthlyCost || 0) * 12
      }
      if (data.useCloudSecurity) {
        cloudSoftwareCost += (data.cloudSecurityMonthlyCost || 0) * 12
      }

      const { inflatedCost: inflatedCloudSoftware } = await modelInflation({
        initialCost: cloudSoftwareCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.Software = inflatedCloudSoftware

      // Calculate totals
      const totalAnnualOnPremCost = Object.values(onPremBreakdown).reduce((sum, val) => sum + (val || 0), 0)
      const totalAnnualCloudCost = Object.values(cloudBreakdown).reduce((sum, val) => sum + (val || 0), 0)

      cumulativeOnPremCost += totalAnnualOnPremCost
      cumulativeCloudCost += totalAnnualCloudCost

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
    }

    const savings = cumulativeOnPremCost - cumulativeCloudCost

    // Calculate breakeven point
    let breakevenPoint: string | null = null
    let breakevenYear = 0
    for (let i = 0; i < yearlyData.length; i++) {
      if (yearlyData[i].cumulativeOnPrem < yearlyData[i].cumulativeCloud && breakevenYear === 0) {
        breakevenYear = yearlyData[i].year
        breakevenPoint = `Year ${breakevenYear}`
        break
      }
    }

    return {
      success: true,
      data: {
        yearlyCosts: yearlyData,
        onPremTCO: cumulativeOnPremCost,
        cloudTCO: cumulativeCloudCost,
        savings,
        breakevenPoint,
        calculationMode,
        analysisPeriod,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: `Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
