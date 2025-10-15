'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'
import { TooltipLabel } from '@/components/app/form/tooltip-label'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface GpuSectionProps {
  control: Control<CostFormValues>
  useOnPremTrainingGpu: boolean
  useOnPremInferenceGpu: boolean
  useCloudTrainingGpu: boolean
  useCloudInferenceGpu: boolean
}

export function GpuSection({
  control,
  useOnPremTrainingGpu,
  useOnPremInferenceGpu,
  useCloudTrainingGpu,
  useCloudInferenceGpu
}: GpuSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">GPU Resources</CardTitle>
        <CardDescription>
          Configure GPU infrastructure for compute-intensive workloads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise GPU</h3>

          {/* Training GPUs */}
          <FormField
            control={control}
            name="useOnPremTrainingGpu"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Training GPUs"
                    tooltip="High-performance GPUs optimized for machine learning model training (e.g., NVIDIA A100, H100)"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremTrainingGpu && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremTrainingGpuQuantity"
                label="Quantity"
                tooltip="Number of training GPU units"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="onPremTrainingGpuUnitCost"
                label="Unit Cost ($)"
                tooltip="Cost per training GPU unit"
                type="number"
                step={100}
              />
            </div>
          )}

          {/* Inference GPUs */}
          <FormField
            control={control}
            name="useOnPremInferenceGpu"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Inference GPUs"
                    tooltip="GPUs optimized for model inference and deployment (e.g., NVIDIA T4, L4)"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremInferenceGpu && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremInferenceGpuQuantity"
                label="Quantity"
                tooltip="Number of inference GPU units"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="onPremInferenceGpuUnitCost"
                label="Unit Cost ($)"
                tooltip="Cost per inference GPU unit"
                type="number"
                step={100}
              />
            </div>
          )}
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud GPU</h3>

          {/* Training GPUs */}
          <FormField
            control={control}
            name="useCloudTrainingGpu"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Training GPUs"
                    tooltip="Cloud GPU instances optimized for machine learning training workloads"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudTrainingGpu && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudTrainingGpuCount"
                label="Instance Count"
                tooltip="Number of training GPU instances"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudTrainingGpuHourlyRate"
                label="Hourly Rate ($/hour)"
                tooltip="Cost per hour for each training GPU instance"
                type="number"
                step={0.01}
              />
              <FormInput
                control={control}
                name="cloudTrainingGpuHoursPerMonth"
                label="Hours Used Per Month"
                tooltip="Average hours each training GPU runs per month (max 744)"
                type="number"
                step={1}
                max={744}
              />
            </div>
          )}

          {/* Inference GPUs */}
          <FormField
            control={control}
            name="useCloudInferenceGpu"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Inference GPUs"
                    tooltip="Cloud GPU instances optimized for model inference and deployment"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudInferenceGpu && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudInferenceGpuCount"
                label="Instance Count"
                tooltip="Number of inference GPU instances"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudInferenceGpuHourlyRate"
                label="Hourly Rate ($/hour)"
                tooltip="Cost per hour for each inference GPU instance"
                type="number"
                step={0.01}
              />
              <FormInput
                control={control}
                name="cloudInferenceGpuHoursPerMonth"
                label="Hours Used Per Month"
                tooltip="Average hours each inference GPU runs per month (max 744)"
                type="number"
                step={1}
                max={744}
              />
            </div>
          )}
        </div>
      </div>
      </CardContent>
    </Card>
  )
}
