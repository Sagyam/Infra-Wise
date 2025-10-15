import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import type { CostFormValues } from '@/lib/types'
import type { Control } from 'react-hook-form'

interface FormSwitchProps {
  control: Control<CostFormValues>
  name: keyof CostFormValues
  label: string
}

export function FormSwitch({
  control,
  name,
  label,
}: FormSwitchProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2">
          {label && <FormLabel className="mb-0">{label}</FormLabel>}
          <FormControl>
            <Switch
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
