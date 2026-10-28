import type { Control } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { CostFormValues } from '@/lib/types'

interface CalculationModeToggleProps {
  control: Control<CostFormValues>
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
}

const modes = [
  { value: 'tco', label: 'Total cost (TCO)' },
  { value: 'amortized', label: 'Amortized per year' },
] as const

export function CalculationModeToggle({
  control,
  onCalculationModeChange,
}: CalculationModeToggleProps) {
  return (
    <FormField
      control={control}
      name="calculationMode"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="block text-[13px] font-medium text-foreground/80">
            Calculation mode
          </FormLabel>
          <FormControl>
            {/* A segmented control, styled like the footer's theme switch. */}
            <fieldset
              aria-label="Calculation mode"
              className="inline-flex rounded-lg border border-edge/10 bg-edge/[0.03] p-0.5"
            >
              {modes.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={field.value === value}
                  onClick={() => {
                    field.onChange(value)
                    onCalculationModeChange(value)
                  }}
                  className="inline-flex h-8 items-center rounded-md px-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-background aria-pressed:font-medium aria-pressed:text-foreground aria-pressed:shadow-sm aria-pressed:ring-1 aria-pressed:ring-edge/10"
                >
                  {label}
                </button>
              ))}
            </fieldset>
          </FormControl>
          <FormDescription>
            {field.value === 'tco'
              ? 'Adds up every cost over the whole analysis period.'
              : 'Spreads the up-front spend evenly, giving an average cost per year.'}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
