import type { UseFormSetValue } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'

interface UseTierHandlersProps {
  cloudHotTier: number
  cloudStandardTier: number
  setValue: UseFormSetValue<CostFormValues>
}

export function useTierHandlers({
  cloudHotTier,
  cloudStandardTier,
  setValue,
}: UseTierHandlersProps) {
  const handleHotChange = (value: number) => {
    // Clamp hot tier so hot + standard never exceeds 100
    const maxHot = 100 - cloudStandardTier
    const clampedHot = Math.min(value, maxHot)
    const archiveTier = 100 - clampedHot - cloudStandardTier

    setValue('cloudHotTier', clampedHot)
    setValue('cloudArchiveTier', archiveTier)
  }

  const handleStandardChange = (value: number) => {
    // Clamp standard tier so hot + standard never exceeds 100
    const maxStandard = 100 - cloudHotTier
    const clampedStandard = Math.min(value, maxStandard)
    const archiveTier = 100 - cloudHotTier - clampedStandard

    setValue('cloudStandardTier', clampedStandard)
    setValue('cloudArchiveTier', archiveTier)
  }

  return { handleHotChange, handleStandardChange }
}
