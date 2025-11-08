import React from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { calculateUsableStorage } from '@/lib/storage-utils'

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
      totalUsableStorage += calculateUsableStorage(
        onPremHddCount,
        onPremHddSizeTb,
        onPremHddRaidFactor,
      )
    }

    // Calculate SSD usable storage
    if (useOnPremSsd) {
      totalUsableStorage += calculateUsableStorage(
        onPremSsdCount,
        onPremSsdSizeTb,
        onPremSsdRaidFactor,
      )
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
