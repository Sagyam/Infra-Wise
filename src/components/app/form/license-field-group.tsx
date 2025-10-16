import type { Control, FieldPath } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import type { CostFormValues } from '@/lib/types'

interface LicenseFieldGroupProps {
  control: Control<CostFormValues>
  prefix: string
  isAnnual?: boolean
}

export function LicenseFieldGroup({
  control,
  prefix,
  isAnnual = true,
}: LicenseFieldGroupProps) {
  const costLabel = isAnnual ? 'Annual Unit Cost ($)' : 'Monthly Cost ($)'
  const costTooltip = isAnnual
    ? 'Annual license cost per unit'
    : 'Monthly subscription or license cost'

  return (
    <>
      <FormInput
        control={control}
        name={`${prefix}UnitCost` as FieldPath<CostFormValues>}
        label={costLabel}
        tooltip={costTooltip}
        type="number"
        step={isAnnual ? 100 : 10}
      />
      <FormInput
        control={control}
        name={`${prefix}Licenses` as FieldPath<CostFormValues>}
        label="Number of Licenses"
        tooltip="Total number of licenses required"
        type="number"
        step={1}
      />
    </>
  )
}
