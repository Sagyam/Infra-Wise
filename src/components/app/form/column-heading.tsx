import { cn } from '@/lib/utils'

interface ColumnHeadingProps {
  side: 'on-prem' | 'cloud'
  children: React.ReactNode
}

/** Heads an on-premise or cloud column, with the dot that side wears in every chart. */
export function ColumnHeading({ side, children }: ColumnHeadingProps) {
  return (
    <div className="flex items-center gap-2.5 pb-1">
      <span
        aria-hidden="true"
        className={cn(
          'size-2.5 shrink-0 rounded-full',
          side === 'on-prem' ? 'bg-on-prem' : 'bg-cloud',
        )}
      />
      <h3 className="font-heading text-base font-semibold tracking-tight">
        {children}
      </h3>
    </div>
  )
}
