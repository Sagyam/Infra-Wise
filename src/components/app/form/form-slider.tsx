import type React from 'react'
import type { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import type { CostFormValues } from '@/lib/types'
import { TooltipLabel } from './tooltip-label'
import { splitLabel } from './units'

interface FormSliderProps {
  control: Control<CostFormValues>
  name: keyof CostFormValues
  label: string
  icon?: React.ReactNode
  unit?: string
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
  const { text, unit: labelUnit } = splitLabel(label)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem id={name} className="space-y-2.5">
          <div className="flex items-baseline justify-between gap-4">
            <FormLabel className="text-[13px] font-medium text-foreground/80">
              {tooltip ? (
                <TooltipLabel label={text} tooltip={tooltip} icon={icon} />
              ) : (
                <span className="flex items-center gap-2">
                  {icon} {text}
                </span>
              )}
            </FormLabel>
            <span className="figures text-sm">
              {field.value.toFixed(step === 0.01 || step === 0.1 ? 2 : 0)}
              <span className="ml-0.5 text-xs text-muted-foreground">
                {unit ?? labelUnit}
              </span>
            </span>
          </div>
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
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
