import type { Control, FieldPath } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import type { CostFormValues } from '@/lib/types'

interface PersonnelFieldGroupProps {
  control: Control<CostFormValues>
  prefix: string
}

export function PersonnelFieldGroup({
  control,
  prefix,
}: PersonnelFieldGroupProps) {
  return (
    <>
      <FormInput
        control={control}
        name={`${prefix}Count` as FieldPath<CostFormValues>}
        label="Number of People"
        tooltip="Number of personnel in this role"
        type="number"
        step={1}
      />
      <FormInput
        control={control}
        name={`${prefix}Salary` as FieldPath<CostFormValues>}
        label="Annual Salary ($)"
        tooltip="Average annual salary per person"
        type="number"
        step={1000}
      />
      <FormInput
        control={control}
        name={`${prefix}SalaryIncrement` as FieldPath<CostFormValues>}
        label="Annual Raise (%)"
        tooltip="Expected annual salary increase percentage"
        type="number"
        step={0.5}
        min={0}
        max={20}
      />
    </>
  )
}
