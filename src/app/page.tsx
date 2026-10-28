'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppSidebar } from '@/components/app/app-sidebar'
import { Footer } from '@/components/app/footer'
import { FormFieldSearch } from '@/components/app/form/form-field-search'
import { FormSectionRenderer } from '@/components/app/form-section-renderer'
import { Header } from '@/components/app/header'
import { PresetSelector } from '@/components/app/preset-selector'
import { LiveSummary } from '@/components/app/results/live-summary'
import { Form } from '@/components/ui/form'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useFormWatchers } from '@/hooks/use-form-watchers'
import { useStorageCalculation } from '@/hooks/use-storage-calculation'
import { useTierHandlers } from '@/hooks/use-tier-handlers'
import { useToast } from '@/hooks/use-toast'
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
  const [activeSection, setActiveSection] = useState('presets')
  const [searchOpen, setSearchOpen] = useState(false)
  const { toast } = useToast()

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
    Presets: 'presets',
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

  // Recalculate as the form changes, a moment after the last edit. A slow answer to an older edit
  // never overwrites a newer one.
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let latest = 0
    const subscription = form.watch(() => {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        const run = ++latest
        setIsLoading(true)
        const result = await calculateCosts(form.getValues())
        if (run !== latest) return
        setIsLoading(false)
        if (result.success) {
          setResults(result.data)
          setError(null)
        } else {
          setError(result.error)
        }
      }, 400)
    })
    return () => {
      subscription.unsubscribe()
      clearTimeout(timer)
    }
  }, [form])

  const onSubmit = () => setActiveSection('results-overview')

  const handlePresetSelect = (presetValues: CostFormValues) => {
    // Reset the form with preset values
    form.reset(presetValues)

    // Validate the form to check for errors
    const validationResult = CostFormSchema.safeParse(presetValues)
    if (!validationResult.success) {
      console.error('Preset validation errors:', validationResult.error.errors)
    }

    // Show success toast
    toast({
      title: 'Preset Loaded',
      description: 'The preset configuration has been applied successfully.',
    })

    // Navigate to general section to show the loaded values
    setActiveSection('general')
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
          <main className="flex-1 px-4 py-8 sm:px-6 flex flex-col items-center">
            <div className="w-full max-w-7xl">
              {activeSection === 'presets' ? (
                <PresetSelector onPresetSelect={handlePresetSelect} />
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                      <FormSectionRenderer
                        activeSection={activeSection}
                        control={form.control}
                        setValue={form.setValue}
                        results={results}
                        watchers={watchers}
                        onCalculationModeChange={setCalculationMode}
                        handleHotChange={handleHotChange}
                        handleStandardChange={handleStandardChange}
                      />
                      {!activeSection.startsWith('results-') &&
                        activeSection !== 'presets' &&
                        activeSection !== 'sensitivity-analysis' && (
                          <LiveSummary
                            results={results}
                            isCalculating={isLoading}
                            error={error}
                            onShowResults={onSubmit}
                          />
                        )}
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
