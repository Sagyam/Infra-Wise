import type { Control, FieldPath } from 'react-hook-form'
import { FormSwitch } from '@/components/app/form/form-switch'
import { PersonnelFieldGroup } from '@/components/app/form/personnel-field-group'
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
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">{title}</h4>
        <FormSwitch control={control} name={name} label="" />
      </div>
      {isEnabled && <PersonnelFieldGroup control={control} prefix={prefix} />}
    </div>
  )
}
