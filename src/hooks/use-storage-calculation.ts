import React from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'

interface UseStorageCalculationProps {
  useOnPremHdd: boolean
  onPremHddCount: number
  onPremHddSizeTb: number
  onPremHddRaidFactor: number
  useOnPremSsd: boolean
  onPremSsdCount: number
  onPremSsdSizeTb: number
  onPremSsdRaidFactor: number
  setValue: UseFormSetValue<CostFormValues>
}

export function useStorageCalculation({
  useOnPremHdd,
  onPremHddCount,
  onPremHddSizeTb,
  onPremHddRaidFactor,
  useOnPremSsd,
  onPremSsdCount,
  onPremSsdSizeTb,
  onPremSsdRaidFactor,
  setValue,
}: UseStorageCalculationProps) {
  React.useEffect(() => {
    let totalUsableStorage = 0

    // Calculate HDD usable storage
    if (useOnPremHdd) {
      const hddRawSize = (onPremHddSizeTb || 0) * (onPremHddCount || 0)
      const hddRaidOverhead = hddRawSize * ((onPremHddRaidFactor || 0) / 100)
      totalUsableStorage += hddRawSize - hddRaidOverhead
    }

    // Calculate SSD usable storage
    if (useOnPremSsd) {
      const ssdRawSize = (onPremSsdSizeTb || 0) * (onPremSsdCount || 0)
      const ssdRaidOverhead = ssdRawSize * ((onPremSsdRaidFactor || 0) / 100)
      totalUsableStorage += ssdRawSize - ssdRaidOverhead
    }

    setValue('onPremBackupStorage', Math.max(0, totalUsableStorage))
  }, [
    useOnPremHdd,
    onPremHddCount,
    onPremHddSizeTb,
    onPremHddRaidFactor,
    useOnPremSsd,
    onPremSsdCount,
    onPremSsdSizeTb,
    onPremSsdRaidFactor,
    setValue,
  ])
}
