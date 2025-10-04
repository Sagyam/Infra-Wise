import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { CostFormValues } from '@/lib/types'
import type { Control } from 'react-hook-form'
import { TooltipLabel } from './tooltip-label'

interface FormInputProps {
  control: Control<CostFormValues>
  name: keyof CostFormValues
  label: string
  icon: React.ReactNode
  unit?: string
  tooltip?: string
  step?: string
}

export function FormInput({
  control,
  name,
  label,
  icon,
  unit,
  tooltip,
  step = '1',
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {tooltip ? (
              <TooltipLabel label={label} tooltipText={tooltip} icon={icon} />
            ) : (
              <span className="flex items-center gap-2">
                {icon} {label}
              </span>
            )}
          </FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Input
                type="number"
                placeholder="0"
                step={step}
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                className="flex-1"
              />
            </FormControl>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
