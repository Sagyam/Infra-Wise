'use server'

import { modelInflation } from '@/lib/inflation'
import type {
  CalculationResult,
  CostBreakdown,
  CostFormValues,
  YearlyCost,
} from '@/lib/types'
import { CostFormSchema } from '@/lib/types'
import { tbToGb } from './utils'

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
    const onPremTrafficGrowthFactor =
      1 + (data.onPremAnnualTrafficGrowth || 0) / 100
    const inflationDecimal = inflationRate / 100

    // Calculate one-time hardware costs
    const onPremComputeHardwareCost =
      (data.useOnPremCpu
        ? (data.onPremCpuQuantity || 0) * (data.onPremCpuUnitCost || 0)
        : 0) +
      (data.useOnPremMotherboard
        ? (data.onPremMotherboardQuantity || 0) *
          (data.onPremMotherboardUnitCost || 0)
        : 0) +
      (data.useOnPremMemory
        ? (data.onPremMemoryCapacityGb || 0) * (data.onPremMemoryCostPerGb || 0)
        : 0) +
      (data.useOnPremChassis
        ? (data.onPremChassisQuantity || 0) * (data.onPremChassisUnitCost || 0)
        : 0) +
      (data.useOnPremRacks
        ? (data.onPremRacksQuantity || 0) * (data.onPremRacksUnitCost || 0)
        : 0)

    const onPremGpuHardwareCost =
      (data.useOnPremTrainingGpu
        ? (data.onPremTrainingGpuQuantity || 0) *
          (data.onPremTrainingGpuUnitCost || 0)
        : 0) +
      (data.useOnPremInferenceGpu
        ? (data.onPremInferenceGpuQuantity || 0) *
          (data.onPremInferenceGpuUnitCost || 0)
        : 0)

    const onPremNetworkingHardwareCost =
      (data.useOnPremCoreSwitch
        ? (data.onPremCoreSwitchQuantity || 0) *
          (data.onPremCoreSwitchUnitCost || 0)
        : 0) +
      (data.useOnPremAggregationSwitch
        ? (data.onPremAggregationSwitchQuantity || 0) *
          (data.onPremAggregationSwitchUnitCost || 0)
        : 0) +
      (data.useOnPremAccessSwitch
        ? (data.onPremAccessSwitchQuantity || 0) *
          (data.onPremAccessSwitchUnitCost || 0)
        : 0) +
      (data.useOnPremCabling
        ? (data.onPremCablingLength || 0) * (data.onPremCablingUnitPrice || 0)
        : 0) +
      (data.useOnPremQsfp
        ? (data.onPremQsfpQuantity || 0) * (data.onPremQsfpUnitCost || 0)
        : 0)

    const onPremEnergyHardwareCost =
      (data.useOnPremUps
        ? (data.onPremUpsQuantity || 0) * (data.onPremUpsUnitCost || 0)
        : 0) +
      (data.useOnPremGenerator
        ? (data.onPremGeneratorQuantity || 0) *
          (data.onPremGeneratorUnitCost || 0)
        : 0) +
      (data.useOnPremHvac
        ? (data.onPremHvacQuantity || 0) * (data.onPremHvacUnitCost || 0)
        : 0)

    const onPremStorageHardwareCost =
      (data.useOnPremHdd
        ? (data.onPremHddCount || 0) * (data.onPremHddUnitCost || 0)
        : 0) +
      (data.useOnPremSsd
        ? (data.onPremSsdCount || 0) * (data.onPremSsdUnitCost || 0)
        : 0)

    const _totalOnPremHardwareCost =
      onPremComputeHardwareCost +
      onPremGpuHardwareCost +
      onPremNetworkingHardwareCost +
      onPremEnergyHardwareCost +
      onPremStorageHardwareCost

    const avgSalvagePercent = 10

    // Track cumulative CapEx and OpEx
    let totalOnPremCapEx = 0
    let totalOnPremOpEx = 0
    let totalCloudCapEx = 0
    let totalCloudOpEx = 0

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

      // Track CapEx and OpEx for this year
      let yearOnPremCapEx = 0
      let yearOnPremOpEx = 0
      // Cloud typically has no CapEx (all OpEx for pay-as-you-go services)
      const yearCloudCapEx = 0
      let yearCloudOpEx = 0

      // ENERGY COSTS
      let energyCost = 0
      let energyCapEx = 0
      let energyOpEx = 0

      if (data.useOnPremPowerConsumption) {
        const powerKwh =
          ((data.onPremPowerRating || 0) *
            ((data.onPremLoadFactor || 0) / 100) *
            24 *
            365) /
          1000
        energyOpEx += powerKwh * (data.onPremElectricityCost || 0)
      }

      if (data.useOnPremUps) {
        energyOpEx +=
          (data.onPremUpsQuantity || 0) *
          ((data.onPremUpsBatteryFailureRate || 0) / 100) *
          (data.onPremUpsBatteryReplacementCost || 0)
      }

      if (data.useOnPremGenerator) {
        energyOpEx +=
          (data.onPremGeneratorFuelConsumptionRate || 0) *
          (data.onPremGeneratorFuelUnitCost || 0) *
          (data.onPremGeneratorAnnualUsageHours || 0)
      }

      if (data.useOnPremHvac) {
        const hvacPowerKwh =
          ((data.onPremHvacPowerConsumption || 0) *
            ((data.onPremHvacLoadFactor || 0) / 100) *
            24 *
            365) /
          1000
        energyOpEx += hvacPowerKwh * (data.onPremElectricityCost || 0)
        energyOpEx +=
          (data.onPremHvacTechnicianHourlyRate || 0) *
          (data.onPremHvacHoursWorked || 0)
      }

      if (data.useOnPremColocation) {
        const coloMonthly = data.onPremColocationMonthlyCost || 0
        const coloGrowthRate = (data.onPremColocationAnnualIncrease || 0) / 100
        const coloYearlyCost =
          coloMonthly * 12 * (1 + coloGrowthRate) ** (year - 1)
        energyOpEx += coloYearlyCost
      }

      // Hardware costs are CapEx
      if (calculationMode === 'tco' && year === 1) {
        energyCapEx += onPremEnergyHardwareCost
      } else if (calculationMode === 'amortized') {
        energyCapEx += onPremEnergyHardwareCost / analysisPeriod
      }

      energyCost = energyCapEx + energyOpEx

      const { inflatedCost: inflatedEnergy } = await modelInflation({
        initialCost: energyCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Energy = inflatedEnergy

      // Track CapEx/OpEx with inflation
      const { inflatedCost: inflatedEnergyCapEx } = await modelInflation({
        initialCost: energyCapEx,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      const { inflatedCost: inflatedEnergyOpEx } = await modelInflation({
        initialCost: energyOpEx,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      yearOnPremCapEx += inflatedEnergyCapEx
      yearOnPremOpEx += inflatedEnergyOpEx

      // STORAGE COSTS
      let onPremStorageCost = 0
      let storageCapEx = 0
      let storageOpEx = 0

      // Hardware costs are CapEx
      if (calculationMode === 'tco' && year === 1) {
        storageCapEx += onPremStorageHardwareCost
      } else if (calculationMode === 'amortized') {
        storageCapEx += onPremStorageHardwareCost / analysisPeriod
      }

      if (calculationMode === 'tco' && year === analysisPeriod) {
        const storageSalvage =
          onPremStorageHardwareCost * (avgSalvagePercent / 100)
        storageCapEx -= storageSalvage
      }

      // Replacement costs are OpEx
      if (data.useOnPremHdd) {
        const hddReplacementCost =
          (data.onPremHddCount || 0) *
          ((data.onPremHddFailureRate || 0) / 100) *
          (data.onPremHddUnitCost || 0)
        storageOpEx += hddReplacementCost
      }

      if (data.useOnPremSsd) {
        const ssdReplacementCost =
          (data.onPremSsdCount || 0) *
          ((data.onPremSsdFailureRate || 0) / 100) *
          (data.onPremSsdUnitCost || 0)
        storageOpEx += ssdReplacementCost
      }

      // Backup costs are OpEx
      if (
        data.useOnPremBackup &&
        data.onPremBackupStorage &&
        data.onPremBackupCostPerUnit
      ) {
        storageOpEx +=
          (data.onPremBackupStorage || 0) * (data.onPremBackupCostPerUnit || 0)
      }

      onPremStorageCost = storageCapEx + storageOpEx

      const { inflatedCost: inflatedOnPremStorage } = await modelInflation({
        initialCost: onPremStorageCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Storage = inflatedOnPremStorage

      // Track CapEx/OpEx with inflation
      const { inflatedCost: inflatedStorageCapEx } = await modelInflation({
        initialCost: storageCapEx,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      const { inflatedCost: inflatedStorageOpEx } = await modelInflation({
        initialCost: storageOpEx,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      yearOnPremCapEx += inflatedStorageCapEx
      yearOnPremOpEx += inflatedStorageOpEx

      // Cloud Storage - All OpEx (recurring)
      const currentCloudStorageGb = tbToGb(currentCloudStorageUnits)
      const hotStorageGb = currentCloudStorageGb * (data.cloudHotTier / 100)
      const standardStorageGb =
        currentCloudStorageGb * (data.cloudStandardTier / 100)
      const archiveStorageGb =
        currentCloudStorageGb * (data.cloudArchiveTier / 100)

      const cloudStorageCost =
        hotStorageGb * data.cloudHotStorageCost * 12 +
        standardStorageGb * data.cloudStandardStorageCost * 12 +
        archiveStorageGb * data.cloudArchiveStorageCost * 12

      const { inflatedCost: inflatedCloudStorage } = await modelInflation({
        initialCost: cloudStorageCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.Storage = inflatedCloudStorage
      yearCloudOpEx += inflatedCloudStorage

      // COMPUTE COSTS - Hardware is CapEx
      let onPremComputeCost = 0
      let computeCapEx = 0

      if (calculationMode === 'tco' && year === 1) {
        computeCapEx = onPremComputeHardwareCost
      } else if (calculationMode === 'amortized') {
        computeCapEx = onPremComputeHardwareCost / analysisPeriod
      }

      if (calculationMode === 'tco' && year === analysisPeriod) {
        const computeSalvage =
          onPremComputeHardwareCost * (avgSalvagePercent / 100)
        computeCapEx -= computeSalvage
      }

      onPremComputeCost = computeCapEx

      const { inflatedCost: inflatedOnPremCompute } = await modelInflation({
        initialCost: onPremComputeCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Compute = inflatedOnPremCompute
      yearOnPremCapEx += inflatedOnPremCompute

      // Cloud Compute - All OpEx (recurring)
      let cloudComputeCost = 0
      if (data.useCloudGeneralVm) {
        cloudComputeCost +=
          (data.cloudGeneralVmCount || 0) *
          (data.cloudGeneralVmHourlyRate || 0) *
          (data.cloudGeneralVmHoursPerMonth || 0) *
          12
      }
      if (data.useCloudComputeVm) {
        cloudComputeCost +=
          (data.cloudComputeVmCount || 0) *
          (data.cloudComputeVmHourlyRate || 0) *
          (data.cloudComputeVmHoursPerMonth || 0) *
          12
      }
      if (data.useCloudMemoryVm) {
        cloudComputeCost +=
          (data.cloudMemoryVmCount || 0) *
          (data.cloudMemoryVmHourlyRate || 0) *
          (data.cloudMemoryVmHoursPerMonth || 0) *
          12
      }
      if (data.useCloudStorageVm) {
        cloudComputeCost +=
          (data.cloudStorageVmCount || 0) *
          (data.cloudStorageVmHourlyRate || 0) *
          (data.cloudStorageVmHoursPerMonth || 0) *
          12
      }

      const { inflatedCost: inflatedCloudCompute } = await modelInflation({
        initialCost: cloudComputeCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.Compute = inflatedCloudCompute
      yearCloudOpEx += inflatedCloudCompute

      // GPU COSTS - Hardware is CapEx
      let onPremGpuCost = 0
      let gpuCapEx = 0

      if (calculationMode === 'tco' && year === 1) {
        gpuCapEx = onPremGpuHardwareCost
      } else if (calculationMode === 'amortized') {
        gpuCapEx = onPremGpuHardwareCost / analysisPeriod
      }

      if (calculationMode === 'tco' && year === analysisPeriod) {
        const gpuSalvage = onPremGpuHardwareCost * (avgSalvagePercent / 100)
        gpuCapEx -= gpuSalvage
      }

      onPremGpuCost = gpuCapEx

      const { inflatedCost: inflatedOnPremGpu } = await modelInflation({
        initialCost: onPremGpuCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.GPU = inflatedOnPremGpu
      yearOnPremCapEx += inflatedOnPremGpu

      // Cloud GPU - All OpEx (recurring)
      let cloudGpuCost = 0
      if (data.useCloudTrainingGpu) {
        cloudGpuCost +=
          (data.cloudTrainingGpuCount || 0) *
          (data.cloudTrainingGpuHourlyRate || 0) *
          (data.cloudTrainingGpuHoursPerMonth || 0) *
          12
      }
      if (data.useCloudInferenceGpu) {
        cloudGpuCost +=
          (data.cloudInferenceGpuCount || 0) *
          (data.cloudInferenceGpuHourlyRate || 0) *
          (data.cloudInferenceGpuHoursPerMonth || 0) *
          12
      }

      const { inflatedCost: inflatedCloudGpu } = await modelInflation({
        initialCost: cloudGpuCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.GPU = inflatedCloudGpu
      yearCloudOpEx += inflatedCloudGpu

      // NETWORKING COSTS
      let onPremNetworkingCost = 0
      let networkingCapEx = 0
      let networkingOpEx = 0

      // Hardware costs are CapEx
      if (calculationMode === 'tco' && year === 1) {
        networkingCapEx = onPremNetworkingHardwareCost
      } else if (calculationMode === 'amortized') {
        networkingCapEx = onPremNetworkingHardwareCost / analysisPeriod
      }

      if (calculationMode === 'tco' && year === analysisPeriod) {
        const networkSalvage =
          onPremNetworkingHardwareCost * (avgSalvagePercent / 100)
        networkingCapEx -= networkSalvage
      }

      // Bandwidth and CDN costs are OpEx
      if (data.useOnPremBandwidth) {
        networkingOpEx +=
          currentOnPremBandwidthGb * (data.onPremBandwidthCostPerGb || 0)
      }

      if (data.useOnPremCdn) {
        networkingOpEx +=
          (data.onPremCdnUsage || 0) *
          (data.onPremCdnCostPerGb || 0) *
          onPremTrafficGrowthFactor ** (year - 1)
      }

      onPremNetworkingCost = networkingCapEx + networkingOpEx

      const { inflatedCost: inflatedOnPremNetworking } = await modelInflation({
        initialCost: onPremNetworkingCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Networking = inflatedOnPremNetworking

      // Track CapEx/OpEx with inflation
      const { inflatedCost: inflatedNetworkingCapEx } = await modelInflation({
        initialCost: networkingCapEx,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      const { inflatedCost: inflatedNetworkingOpEx } = await modelInflation({
        initialCost: networkingOpEx,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      yearOnPremCapEx += inflatedNetworkingCapEx
      yearOnPremOpEx += inflatedNetworkingOpEx

      // Cloud Networking - All OpEx (recurring)
      const currentCloudEgressGb = tbToGb(currentCloudEgressUnits)
      const cloudNetworkingCost =
        currentCloudEgressGb * data.cloudEgressCostPerUnit

      const { inflatedCost: inflatedCloudNetworking } = await modelInflation({
        initialCost: cloudNetworkingCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      cloudBreakdown.Networking = inflatedCloudNetworking
      yearCloudOpEx += inflatedCloudNetworking

      // HUMAN COSTS - All OpEx (salaries are recurring expenses)
      const calculateSalaryCost = (
        count: number,
        salary: number,
        increment: number,
      ) => {
        return count * salary * (1 + increment / 100) ** (year - 1)
      }

      let onPremHumanCost = 0
      onPremHumanCost += calculateSalaryCost(
        data.onPremSysAdminCount || 0,
        data.onPremSysAdminSalary || 0,
        data.onPremSysAdminSalaryIncrement || 0,
      )
      onPremHumanCost += calculateSalaryCost(
        data.onPremNetworkEngineerCount || 0,
        data.onPremNetworkEngineerSalary || 0,
        data.onPremNetworkEngineerSalaryIncrement || 0,
      )
      onPremHumanCost += calculateSalaryCost(
        data.onPremStorageAdminCount || 0,
        data.onPremStorageAdminSalary || 0,
        data.onPremStorageAdminSalaryIncrement || 0,
      )
      onPremHumanCost += calculateSalaryCost(
        data.onPremSecurityEngineerCount || 0,
        data.onPremSecurityEngineerSalary || 0,
        data.onPremSecurityEngineerSalaryIncrement || 0,
      )
      onPremHumanCost += calculateSalaryCost(
        data.onPremDatabaseAdminCount || 0,
        data.onPremDatabaseAdminSalary || 0,
        data.onPremDatabaseAdminSalaryIncrement || 0,
      )
      onPremHumanCost += calculateSalaryCost(
        data.onPremDataCenterTechCount || 0,
        data.onPremDataCenterTechSalary || 0,
        data.onPremDataCenterTechSalaryIncrement || 0,
      )

      onPremBreakdown.Human = onPremHumanCost
      yearOnPremOpEx += onPremHumanCost

      let cloudHumanCost = 0
      cloudHumanCost += calculateSalaryCost(
        data.cloudDevOpsEngineerCount || 0,
        data.cloudDevOpsEngineerSalary || 0,
        data.cloudDevOpsEngineerSalaryIncrement || 0,
      )
      cloudHumanCost += calculateSalaryCost(
        data.cloudCloudArchitectCount || 0,
        data.cloudCloudArchitectSalary || 0,
        data.cloudCloudArchitectSalaryIncrement || 0,
      )
      cloudHumanCost += calculateSalaryCost(
        data.cloudSiteReliabilityEngineerCount || 0,
        data.cloudSiteReliabilityEngineerSalary || 0,
        data.cloudSiteReliabilityEngineerSalaryIncrement || 0,
      )
      cloudHumanCost += calculateSalaryCost(
        data.cloudCloudSecurityEngineerCount || 0,
        data.cloudCloudSecurityEngineerSalary || 0,
        data.cloudCloudSecurityEngineerSalaryIncrement || 0,
      )
      cloudHumanCost += calculateSalaryCost(
        data.cloudCloudDatabaseAdminCount || 0,
        data.cloudCloudDatabaseAdminSalary || 0,
        data.cloudCloudDatabaseAdminSalaryIncrement || 0,
      )

      cloudBreakdown.Human = cloudHumanCost
      yearCloudOpEx += cloudHumanCost

      // SOFTWARE COSTS - All OpEx (licenses are recurring)
      let onPremSoftwareCost = 0
      if (data.useOnPremVirtualization) {
        onPremSoftwareCost +=
          (data.onPremVirtualizationUnitCost || 0) *
          (data.onPremVirtualizationLicenses || 0)
      }
      if (data.useOnPremOperatingSystem) {
        onPremSoftwareCost +=
          (data.onPremOperatingSystemUnitCost || 0) *
          (data.onPremOperatingSystemLicenses || 0)
      }
      if (data.useOnPremStorage) {
        onPremSoftwareCost +=
          (data.onPremStorageUnitCost || 0) * (data.onPremStorageLicenses || 0)
      }
      if (data.useOnPremBackupSoftware) {
        onPremSoftwareCost +=
          (data.onPremBackupSoftwareUnitCost || 0) *
          (data.onPremBackupSoftwareLicenses || 0)
      }
      if (data.useOnPremMonitoring) {
        onPremSoftwareCost +=
          (data.onPremMonitoringUnitCost || 0) *
          (data.onPremMonitoringLicenses || 0)
      }
      if (data.useOnPremSecurity) {
        onPremSoftwareCost +=
          (data.onPremSecurityUnitCost || 0) *
          (data.onPremSecurityLicenses || 0)
      }

      const { inflatedCost: inflatedOnPremSoftware } = await modelInflation({
        initialCost: onPremSoftwareCost,
        inflationRate: inflationDecimal,
        analysisPeriod: year - 1,
      })
      onPremBreakdown.Software = inflatedOnPremSoftware
      yearOnPremOpEx += inflatedOnPremSoftware

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
      yearCloudOpEx += inflatedCloudSoftware

      // Calculate totals
      const totalAnnualOnPremCost = Object.values(onPremBreakdown).reduce(
        (sum, val) => sum + (val || 0),
        0,
      )
      const totalAnnualCloudCost = Object.values(cloudBreakdown).reduce(
        (sum, val) => sum + (val || 0),
        0,
      )

      cumulativeOnPremCost += totalAnnualOnPremCost
      cumulativeCloudCost += totalAnnualCloudCost

      // Track cumulative totals
      totalOnPremCapEx += yearOnPremCapEx
      totalOnPremOpEx += yearOnPremOpEx
      totalCloudCapEx += yearCloudCapEx
      totalCloudOpEx += yearCloudOpEx

      yearlyData.push({
        year: year,
        onPremCost: totalAnnualOnPremCost,
        cloudCost: totalAnnualCloudCost,
        cumulativeOnPrem: cumulativeOnPremCost,
        cumulativeCloud: cumulativeCloudCost,
        onPremBreakdown,
        cloudBreakdown,
        onPremCapEx: yearOnPremCapEx,
        onPremOpEx: yearOnPremOpEx,
        cloudCapEx: yearCloudCapEx,
        cloudOpEx: yearCloudOpEx,
      })

      // Update variables for next iteration
      currentCloudStorageUnits *= storageGrowthFactor
      currentCloudEgressUnits *= egressGrowthFactor
      currentOnPremBandwidthGb *= onPremTrafficGrowthFactor
    }

    const savings = cumulativeOnPremCost - cumulativeCloudCost

    // Calculate breakeven point
    let breakevenPoint: string | null = null
    let breakevenYear = 0
    for (let i = 0; i < yearlyData.length; i++) {
      if (
        yearlyData[i].cumulativeOnPrem < yearlyData[i].cumulativeCloud &&
        breakevenYear === 0
      ) {
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
        totalOnPremCapEx,
        totalOnPremOpEx,
        totalCloudCapEx,
        totalCloudOpEx,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: `Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
