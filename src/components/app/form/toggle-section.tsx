import type { Control, FieldPath } from 'react-hook-form'
import { TooltipLabel } from '@/components/app/form/tooltip-label'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import type { CostFormValues } from '@/lib/types'

interface ToggleSectionProps {
  control: Control<CostFormValues>
  name: FieldPath<CostFormValues>
  label: string
  tooltip?: string
  isEnabled: boolean
  children?: React.ReactNode
}

/**
 * One cost line that can be switched off: a card whose header holds the name and the switch, and
 * whose body lays the fields out side by side while it is on.
 */
export function ToggleSection({
  control,
  name,
  label,
  tooltip,
  isEnabled,
  children,
}: ToggleSectionProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card transition-colors',
        !isEnabled && 'bg-transparent',
      )}
    >
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex items-center justify-between gap-4 space-y-0 px-4 py-3">
            <span
              className={cn(
                'text-sm font-medium',
                !isEnabled && 'text-muted-foreground',
              )}
            >
              {tooltip ? (
                <TooltipLabel label={label} tooltip={tooltip} />
              ) : (
                label
              )}
            </span>
            <FormControl>
              <Switch
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
                aria-label={label}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {isEnabled && children && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-x-4 gap-y-4 border-t border-edge/5 px-4 pt-4 pb-4">
          {children}
        </div>
      )}
    </div>
  )
}
