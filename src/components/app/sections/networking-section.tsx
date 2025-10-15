'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { TooltipLabel } from '@/components/app/form/tooltip-label'

interface NetworkingSectionProps {
  control: Control<CostFormValues>
  useOnPremBandwidth: boolean
  useOnPremCdn: boolean
}

export function NetworkingSection({
  control,
  useOnPremBandwidth,
  useOnPremCdn,
}: NetworkingSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Networking</h2>
        <p className="text-sm text-muted-foreground">
          Configure bandwidth, CDN, and data transfer costs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Networking</h3>

        <FormField
          control={control}
          name="useOnPremBandwidth"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Include Bandwidth Costs"
                  tooltip="Toggle to include internet bandwidth costs in on-premise calculation"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremBandwidth && (
          <>
            <FormInput
              control={control}
              name="onPremBandwidthUsage"
              label="Bandwidth Usage (GB/month)"
              tooltip="Monthly bandwidth consumption"
              type="number"
              step={100}
            />

            <FormInput
              control={control}
              name="onPremBandwidthCostPerGb"
              label="Bandwidth Cost ($/GB)"
              tooltip="Cost per GB of bandwidth"
              type="number"
              step={0.01}
            />

            <FormInput
              control={control}
              name="onPremAnnualTrafficGrowth"
              label="Annual Traffic Growth (%)"
              tooltip="Expected yearly increase in bandwidth usage"
              type="number"
              step={1}
            />
          </>
        )}

        <FormField
          control={control}
          name="useOnPremCdn"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Include CDN Costs"
                  tooltip="Toggle to include CDN service costs"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremCdn && (
          <>
            <FormInput
              control={control}
              name="onPremCdnUsage"
              label="CDN Usage (GB/month)"
              tooltip="Monthly CDN data transfer"
              type="number"
              step={100}
            />

            <FormInput
              control={control}
              name="onPremCdnCostPerGb"
              label="CDN Cost ($/GB)"
              tooltip="Cost per GB of CDN transfer"
              type="number"
              step={0.01}
            />
          </>
        )}
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Networking</h3>

        <FormInput
          control={control}
          name="cloudEgress"
          label="Egress (TB/month)"
          tooltip="Monthly outbound data transfer from cloud"
          type="number"
          step={0.1}
        />

        <FormInput
          control={control}
          name="cloudEgressGrowthRate"
          label="Egress Growth Rate (%)"
          tooltip="Annual increase in egress traffic"
          type="number"
          step={1}
        />

        <FormInput
          control={control}
          name="cloudEgressCostPerUnit"
          label="Egress Cost ($/GB)"
          tooltip="Cost per GB of outbound data transfer"
          type="number"
          step={0.01}
        />
        </div>
      </div>
    </div>
  )
}
