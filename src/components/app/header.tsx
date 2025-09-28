import { Logo } from "@/components/icons/logo";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="p-4 sm:p-6 border-b bg-card">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Logo className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-headline text-primary">
              InfraWise
            </h1>
            <p className="text-muted-foreground">
              Cloud vs. On-Prem TCO Analysis
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
