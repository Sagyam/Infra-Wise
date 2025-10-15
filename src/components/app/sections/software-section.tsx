'use client'

import {FormInput} from '@/components/app/form/form-input'
import type {CostFormValues} from '@/lib/types'
import type {Control} from 'react-hook-form'

interface SoftwareSectionProps {
  control: Control<CostFormValues>
}

export function SoftwareSection({ control }: SoftwareSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Software & Licensing</h2>
        <p className="text-sm text-muted-foreground">
          Configure software licensing and subscription costs for your infrastructure.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Licensing</h3>

          <FormInput
            control={control}
            name="onPremYearlyLicensingCost"
            label="Yearly Licensing Cost ($)"
            tooltip="Annual software/OS licensing fees for on-premise systems"
            type="number"
            step={100}
          />
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Software</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Cloud software and subscription costs will be available in a future update. This includes SaaS licenses, cloud management tools, and monitoring software.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
