import { Calendar, Container, TrendingUp } from 'lucide-react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TabsContent } from '@/components/ui/tabs'
import type { CostFormValues } from '@/lib/types'
import type { Control } from 'react-hook-form'
import { CalculationModeToggle } from './calculation-mode-toggle'
import { FormInput } from './form-input'
import { FormSlider } from './form-slider'

interface GeneralTabProps {
  control: Control<CostFormValues>
  onCalculationModeChange: (mode: CostFormValues['calculationMode']) => void
}

export function GeneralTab({ control, onCalculationModeChange }: GeneralTabProps) {
  return (
    <TabsContent value="general" className="mt-0 space-y-6">
      <FormInput
        control={control}
        name="analysisPeriod"
        label="Analysis Period"
        icon={<Calendar />}
        unit="Years"
        tooltip="The number of years to forecast costs."
      />
      <FormField
        control={control}
        name="dataUnit"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Container />
              Data Unit
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="GB">GB (Gigabyte)</SelectItem>
                <SelectItem value="TB">TB (Terabyte)</SelectItem>
                <SelectItem value="PB">PB (Petabyte)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormSlider
        control={control}
        name="inflationRate"
        label="Annual Inflation Rate"
        icon={<TrendingUp />}
        unit="%"
        tooltip="The expected annual rate of inflation, used for amortization."
        step={0.1}
      />
      <CalculationModeToggle control={control} onCalculationModeChange={onCalculationModeChange} />
    </TabsContent>
  )
}
