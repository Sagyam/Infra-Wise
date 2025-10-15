import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { CostFormValues } from '@/lib/types'
import type { Control } from 'react-hook-form'

interface CalculationModeToggleProps {
  control: Control<CostFormValues>
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
}

export function CalculationModeToggle({
  control,
  onCalculationModeChange,
}: CalculationModeToggleProps) {
  return (
    <FormField
      control={control}
      name="calculationMode"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Calculation Mode</FormLabel>
          <FormControl>
            <div className="relative grid grid-cols-2 rounded-lg border p-1 font-semibold">
              <div
                className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] bg-primary rounded-md transition-all duration-300"
                style={{
                  transform: `translateX(${
                    field.value === 'amortized' ? '100%' : '0%'
                  })`,
                }}
              />
              <button
                type="button"
                onClick={() => {
                  field.onChange('tco')
                  onCalculationModeChange('tco')
                }}
                className={`relative z-10 p-2 rounded-md text-center transition-colors ${
                  field.value === 'tco' ? 'text-primary-foreground' : ''
                }`}
              >
                TCO
              </button>
              <button
                type="button"
                onClick={() => {
                  field.onChange('amortized')
                  onCalculationModeChange('amortized')
                }}
                className={`relative z-10 p-2 rounded-md text-center transition-colors ${
                  field.value === 'amortized' ? 'text-primary-foreground' : ''
                }`}
              >
                Amortized
              </button>
            </div>
          </FormControl>
          <FormDescription>
            {field.value === 'tco'
              ? 'Total Cost of Ownership (TCO) shows the cumulative cost over the entire analysis period.'
              : 'Amortized Cost shows the average cost per year, spreading the initial investment over time.'}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
