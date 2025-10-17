'use client'

import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { presets } from '@/lib/presets'
import type { CostFormValues } from '@/lib/types'

interface PresetSelectorProps {
  onPresetSelect: (values: CostFormValues) => void
}

export function PresetSelector({ onPresetSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Load a Preset</h2>
        </div>
        <p className="text-muted-foreground">
          Get started quickly with pre-configured scenarios tailored to common
          infrastructure needs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => (
          <Card
            key={preset.id}
            className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
            onClick={() => onPresetSelect(preset.values)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{preset.icon}</span>
                    {preset.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {preset.description}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onPresetSelect(preset.values)
                }}
              >
                Load Preset
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
