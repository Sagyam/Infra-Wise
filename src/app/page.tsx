'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Github } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppSidebar } from '@/components/app/app-sidebar'
import { FormFieldSearch } from '@/components/app/form/form-field-search'
import { FormSectionRenderer } from '@/components/app/form-section-renderer'
import { Header } from '@/components/app/header'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useFormWatchers } from '@/hooks/use-form-watchers'
import { useStorageCalculation } from '@/hooks/use-storage-calculation'
import { useTierHandlers } from '@/hooks/use-tier-handlers'
import { calculateCosts } from '@/lib/actions'
import { defaultValues } from '@/lib/default-form-values'
import { formFields } from '@/lib/form-fields'
import {
  type CalculationResult,
  CostFormSchema,
  type CostFormValues,
} from '@/lib/types'

export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [calculationMode, setCalculationMode] =
    useState<CostFormValues['calculationMode']>('tco')
  const [activeSection, setActiveSection] = useState('general')
  const [searchOpen, setSearchOpen] = useState(false)

  // Map category names to section names
  const categoryToSection: Record<string, string> = {
    General: 'general',
    Compute: 'compute',
    Energy: 'energy',
    GPU: 'gpu',
    'Human Resources': 'human-cost',
    Networking: 'networking',
    Software: 'software',
    'Security & Compliance': 'security-compliance',
    Storage: 'storage',
  }

  const handleFieldNavigation = (category: string, fieldId: string) => {
    const sectionName = categoryToSection[category]
    if (sectionName) {
      setActiveSection(sectionName)
      // Wait for section to render, then scroll to field
      setTimeout(() => {
        const element = document.getElementById(fieldId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Focus the input if it exists
          const input = element.querySelector('input, textarea, select')
          if (input instanceof HTMLElement) {
            setTimeout(() => input.focus(), 100)
          }
        }
      }, 100)
    }
  }

  const form = useForm<CostFormValues>({
    resolver: zodResolver(CostFormSchema),
    defaultValues,
  })

  // Get all form field watchers
  const watchers = useFormWatchers(form.control)

  // Storage calculation hook
  useStorageCalculation({
    useOnPremHdd: watchers.useOnPremHdd,
    onPremHddCount: watchers.onPremHddCount,
    onPremHddSizeTb: watchers.onPremHddSizeTb,
    onPremHddRaidFactor: watchers.onPremHddRaidFactor,
    useOnPremSsd: watchers.useOnPremSsd,
    onPremSsdCount: watchers.onPremSsdCount,
    onPremSsdSizeTb: watchers.onPremSsdSizeTb,
    onPremSsdRaidFactor: watchers.onPremSsdRaidFactor,
    setValue: form.setValue,
  })

  // Tier handlers
  const { handleHotChange, handleStandardChange } = useTierHandlers({
    cloudHotTier: watchers.cloudHotTier,
    cloudStandardTier: watchers.cloudStandardTier,
    setValue: form.setValue,
  })

  React.useEffect(() => {
    form.setValue('calculationMode', calculationMode)
  }, [calculationMode, form])

  // Calculate with default values on mount
  React.useEffect(() => {
    const calculateDefaultResults = async () => {
      const result = await calculateCosts(defaultValues)
      if (result.success) {
        setResults(result.data)
      }
    }
    calculateDefaultResults()
  }, [])

  const onSubmit = async (values: CostFormValues) => {
    setIsLoading(true)
    setError(null)
    const result = await calculateCosts(values)
    if (result.success) {
      setResults(result.data)
      setCalculationMode(result.data.calculationMode)
      setActiveSection('results-charts')
    } else {
      setError(result.error)
    }
    setIsLoading(false)
  }

  return (
    <SidebarProvider>
      <FormFieldSearch
        fields={formFields}
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onNavigate={handleFieldNavigation}
      />
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <SidebarInset className="flex flex-col">
          <Header onSearchClick={() => setSearchOpen(true)} />
          <main className="flex-1 p-6 flex flex-col items-center">
            <div className="w-full max-w-7xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div>
                    <FormSectionRenderer
                      activeSection={activeSection}
                      control={form.control}
                      setValue={form.setValue}
                      results={results}
                      calculationMode={calculationMode}
                      watchers={watchers}
                      onCalculationModeChange={setCalculationMode}
                      handleHotChange={handleHotChange}
                      handleStandardChange={handleStandardChange}
                    />
                    {!activeSection.startsWith('results-') && (
                      <div className="mt-8 flex flex-col gap-4 items-center">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          size="lg"
                          className="w-full max-w-md text-lg py-6"
                        >
                          {isLoading ? 'Calculating...' : 'Calculate'}
                        </Button>
                        {error && (
                          <p className="text-sm text-destructive flex items-center">
                            {error}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </main>
          <footer className="py-6 text-center text-muted-foreground text-sm border-t">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
              <div>Made with 💙 for infrastructure decision-makers!</div>
              <a
                href="https://github.com/Sagyam/Infra-Wise"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
