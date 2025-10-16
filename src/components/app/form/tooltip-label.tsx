import { Info } from 'lucide-react'
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

export function TooltipLabel({ label, tooltip, icon }: TooltipLabelProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center gap-2 cursor-help">
            {icon} {label}{' '}
            <Info className="h-4 w-4 md:h-3 md:w-3 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
