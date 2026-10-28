import type { Control, FieldPath } from 'react-hook-form'
import { PersonnelFieldGroup } from '@/components/app/form/personnel-field-group'
import { ToggleSection } from '@/components/app/form/toggle-section'
import type { CostFormValues } from '@/lib/types'

interface PersonnelToggleSectionProps {
  control: Control<CostFormValues>
  name: FieldPath<CostFormValues>
  prefix: string
  title: string
  isEnabled: boolean
}

export function PersonnelToggleSection({
  control,
  name,
  prefix,
  title,
  isEnabled,
}: PersonnelToggleSectionProps) {
  return (
    <ToggleSection
      control={control}
      name={name}
      label={title}
      isEnabled={isEnabled}
    >
      <PersonnelFieldGroup control={control} prefix={prefix} />
    </ToggleSection>
  )
}
