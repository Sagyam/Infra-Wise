import type { Control, FieldPath } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import type { CostFormValues } from '@/lib/types'

interface VmFieldGroupProps {
  control: Control<CostFormValues>
  prefix: string
}

export function VmFieldGroup({ control, prefix }: VmFieldGroupProps) {
  return (
    <>
      <FormInput
        control={control}
        name={`${prefix}Count` as FieldPath<CostFormValues>}
        label="Instance Count"
        tooltip="Number of VM instances"
        type="number"
        step={1}
      />
      <FormInput
        control={control}
        name={`${prefix}HourlyRate` as FieldPath<CostFormValues>}
        label="Hourly Rate ($/hour)"
        tooltip="Cost per hour for each VM instance"
        type="number"
        step={0.01}
      />
      <FormInput
        control={control}
        name={`${prefix}HoursPerMonth` as FieldPath<CostFormValues>}
        label="Hours Used Per Month"
        tooltip="Average hours each instance runs per month (max 744)"
        type="number"
        step={1}
        max={744}
      />
    </>
  )
}
