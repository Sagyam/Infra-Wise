'use client'

import { ArrowRight } from 'lucide-react'
import { presets } from '@/lib/presets'
import type { CostFormValues } from '@/lib/types'

interface PresetSelectorProps {
  onPresetSelect: (values: CostFormValues) => void
}

export function PresetSelector({ onPresetSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-12">
      <section className="relative isolate -mx-4 -mt-8 overflow-hidden px-4 pt-12 pb-4 text-center sm:-mx-6 sm:px-6">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
        <p className="inline-flex items-center gap-2 rounded-full border border-edge/10 bg-edge/5 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-amber" />
          Cloud vs. on-prem total cost of ownership
        </p>
        <h1 className="mx-auto mt-5 max-w-4xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Find the year{' '}
          <span className="text-primary">owning beats renting</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Model energy, storage, compute, GPUs, network, people and compliance
          on both sides, then see where the two cost curves cross.
        </p>
      </section>

      <section className="space-y-5">
        <div>
          <p className="flex items-center gap-x-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
            <span className="h-px w-8 bg-muted-foreground" />
            Start from a preset
          </p>
          <p className="mt-3 text-muted-foreground">
            Pick the scenario closest to yours. Every value stays editable.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onPresetSelect(preset.values)}
              className="group flex flex-col items-start gap-3 rounded-xl border border-edge/10 bg-card p-5 text-left shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-edge/5 text-xl">
                {preset.icon}
              </span>
              <span className="font-heading font-semibold">{preset.name}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {preset.description}
              </span>
              <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary">
                Load preset
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
