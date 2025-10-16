import type { Control, FieldPath } from 'react-hook-form'
import { TooltipLabel } from '@/components/app/form/tooltip-label'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import type { CostFormValues } from '@/lib/types'

interface ToggleSectionProps {
  control: Control<CostFormValues>
  name: FieldPath<CostFormValues>
  label: string
  tooltip: string
  isEnabled: boolean
  children: React.ReactNode
}

export function ToggleSection({
  control,
  name,
  label,
  tooltip,
  isEnabled,
  children,
}: ToggleSectionProps) {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <TooltipLabel label={label} tooltip={tooltip} />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {isEnabled && <div className="ml-4 space-y-4">{children}</div>}
    </>
  )
}
