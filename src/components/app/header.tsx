import { ThemeToggle } from './theme-toggle'
import { Github } from 'lucide-react'

export function Header() {
  return (
    <header className="p-4 sm:p-6 border-b bg-card">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline text-primary">
            InfraWise
          </h1>
          <p className="text-muted-foreground">
            Cloud vs. On-Prem TCO Analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
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
