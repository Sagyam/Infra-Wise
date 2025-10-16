import type { Control, FieldPath } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import type { CostFormValues } from '@/lib/types'

interface MonthlyCostFieldProps {
  control: Control<CostFormValues>
  name: FieldPath<CostFormValues>
  label?: string
  tooltip?: string
}

export function MonthlyCostField({
  control,
  name,
  label = 'Monthly Cost ($)',
  tooltip = 'Monthly subscription cost for this service',
}: MonthlyCostFieldProps) {
  return (
    <FormInput
      control={control}
      name={name}
      label={label}
      tooltip={tooltip}
      type="number"
      step={10}
    />
  )
}
