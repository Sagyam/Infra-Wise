import { Search } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github'
import { buttonVariants } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface HeaderProps {
  onSearchClick?: () => void
}

export function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-edge/5 bg-background/75 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger />
          <span className="h-4 w-px bg-edge/10" />
          <p className="truncate text-sm text-muted-foreground">
            Cloud vs. on-prem, total cost of ownership
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onSearchClick && (
            <button
              type="button"
              onClick={onSearchClick}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-input bg-background px-2.5 text-sm text-muted-foreground shadow-xs transition-colors hover:text-foreground dark:bg-input/30 sm:w-56"
              aria-label="Search fields"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline">Search fields…</span>
              <kbd className="kbd ml-auto hidden sm:inline-flex">⌘K</kbd>
            </button>
          )}
          <a
            href="https://github.com/Sagyam/Infra-Wise"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            aria-label="View source on GitHub"
          >
            <GithubIcon className="size-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}
