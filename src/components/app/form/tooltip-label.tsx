import type React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TooltipLabelProps {
  label: string
  tooltip: string
  icon?: React.ReactNode
}

/** A label whose dotted underline says there is more to read on hover or focus. */
export function TooltipLabel({ label, tooltip, icon }: TooltipLabelProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-help items-center gap-2">
            {icon}
            <span className="underline decoration-muted-foreground/40 decoration-dotted underline-offset-4">
              {label}
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
