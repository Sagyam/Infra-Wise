import { Github, Search } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from './theme-toggle'

interface HeaderProps {
  onSearchClick?: () => void
}

export function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="p-4 sm:p-6 border-b bg-card">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold font-headline text-primary">
              InfraWise
            </h1>
            <p className="text-muted-foreground">Cloud vs. On-Prem Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onSearchClick && (
            <button
              type="button"
              onClick={onSearchClick}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Search fields"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          )}
          <a
            href="https://github.com/Sagyam/Infra-Wise"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="View source on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
