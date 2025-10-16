import type { Control, FieldPath } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import type { CostFormValues } from '@/lib/types'

interface HardwareFieldGroupProps {
  control: Control<CostFormValues>
  prefix: string
  quantityLabel?: string
  quantityTooltip?: string
  unitCostLabel?: string
  unitCostTooltip?: string
  showSalvage?: boolean
}

export function HardwareFieldGroup({
  control,
  prefix,
  quantityLabel = 'Quantity',
  quantityTooltip = 'Number of units',
  unitCostLabel = 'Unit Cost ($)',
  unitCostTooltip = 'Cost per unit',
  showSalvage = true,
}: HardwareFieldGroupProps) {
  return (
    <>
      <FormInput
        control={control}
        name={`${prefix}Quantity` as FieldPath<CostFormValues>}
        label={quantityLabel}
        tooltip={quantityTooltip}
        type="number"
        step={1}
      />
      <FormInput
        control={control}
        name={`${prefix}UnitCost` as FieldPath<CostFormValues>}
        label={unitCostLabel}
        tooltip={unitCostTooltip}
        type="number"
        step={100}
      />
      {showSalvage && (
        <FormInput
          control={control}
          name={`${prefix}SalvageValue` as FieldPath<CostFormValues>}
          label="Salvage Value (%)"
          tooltip="Percentage of value recoverable at end of lifecycle"
          type="number"
          step={1}
          min={0}
          max={100}
        />
      )}
    </>
  )
}
