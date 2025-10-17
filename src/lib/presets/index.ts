export * from './types'
export { erpSystemPreset } from './erp-system'
export { ecommercePlatformPreset } from './ecommerce-platform'
export { aiTrainingPreset } from './ai-training'
export { webSaasPreset } from './web-saas'
export { gamingServerPreset } from './gaming-server'
export { healthcarePlatformPreset } from './healthcare-platform'
export { financialServicesPreset } from './financial-services'
export { governmentCloudPreset } from './government-cloud'
export { mediaStreamingPreset } from './media-streaming'
export { researchUniversityPreset } from './research-university'

import type { Preset } from './types'
import { erpSystemPreset } from './erp-system'
import { ecommercePlatformPreset } from './ecommerce-platform'
import { aiTrainingPreset } from './ai-training'
import { webSaasPreset } from './web-saas'
import { gamingServerPreset } from './gaming-server'
import { healthcarePlatformPreset } from './healthcare-platform'
import { financialServicesPreset } from './financial-services'
import { governmentCloudPreset } from './government-cloud'
import { mediaStreamingPreset } from './media-streaming'
import { researchUniversityPreset } from './research-university'

export const presets: Preset[] = [
  erpSystemPreset,
  ecommercePlatformPreset,
  aiTrainingPreset,
  webSaasPreset,
  gamingServerPreset,
  healthcarePlatformPreset,
  financialServicesPreset,
  governmentCloudPreset,
  mediaStreamingPreset,
  researchUniversityPreset,
]
