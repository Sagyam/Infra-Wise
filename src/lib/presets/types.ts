import type { CostFormValues } from '@/lib/types'

export interface Preset {
  id: string
  name: string
  description: string
  icon: string
  values: CostFormValues
}