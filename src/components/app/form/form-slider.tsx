import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import type { CostFormValues } from '@/lib/types'
import type { Control } from 'react-hook-form'
import { TooltipLabel } from './tooltip-label'

interface FormSliderProps {
  control: Control<CostFormValues>
  name: keyof CostFormValues
  label: string
  icon: React.ReactNode
  unit: string
  tooltip?: string
  max?: number
  min?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: number) => void
}

export function FormSlider({
  control,
  name,
  label,
  icon,
  unit,
  tooltip,
  max = 100,
  min = 0,
  step = 1,
  disabled,
  onValueChange,
}: FormSliderProps) {
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
          <div className="flex items-center gap-4">
            <FormControl>
              <Slider
                value={[field.value]}
                onValueChange={(vals) => {
                  field.onChange(vals[0])
                  if (onValueChange) onValueChange(vals[0])
                }}
                max={max}
                min={min}
                step={step}
                disabled={disabled}
              />
            </FormControl>
            <span className="text-sm font-medium w-20 text-right">
              {field.value.toFixed(step === 0.01 || step === 0.1 ? 2 : 0)} {unit}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
