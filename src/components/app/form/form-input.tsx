import type React from 'react'
import type { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { CostFormValues } from '@/lib/types'
import { TooltipLabel } from './tooltip-label'
import { splitLabel, unitAdornments } from './units'

interface FormInputProps {
  control: Control<CostFormValues>
  name: keyof CostFormValues
  label: string
  icon?: React.ReactNode
  unit?: string
  tooltip?: string
  step?: string | number
  type?: string
  min?: number
  max?: number
}

export function FormInput({
  control,
  name,
  label,
  icon,
  unit,
  tooltip,
  step = '1',
  type = 'number',
  min,
  max,
}: FormInputProps) {
  // The unit shows inside the box; a unit written into the label moves there too.
  const { text, unit: labelUnit } = splitLabel(label)
  const { prefix, suffix } = unitAdornments(unit ?? labelUnit)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem id={name} className="space-y-1.5">
          <FormLabel className="text-[13px] font-medium text-foreground/80">
            {tooltip ? (
              <TooltipLabel label={text} tooltip={tooltip} icon={icon} />
            ) : (
              <span className="flex items-center gap-2">
                {icon} {text}
              </span>
            )}
          </FormLabel>
          <div className="flex h-9 items-center rounded-md border border-input bg-background transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25 has-[[aria-invalid=true]]:border-destructive">
            {prefix && (
              <span className="pl-3 font-mono text-sm text-muted-foreground select-none">
                {prefix}
              </span>
            )}
            <FormControl>
              <Input
                type={type}
                placeholder="0"
                step={step}
                min={min}
                max={max}
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                className="figures h-full min-w-0 flex-1 border-0 bg-transparent px-2.5 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </FormControl>
            {suffix && (
              <span className="pr-3 font-mono text-xs text-muted-foreground select-none">
                {suffix}
              </span>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
