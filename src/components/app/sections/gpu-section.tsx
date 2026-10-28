'use client'

import { ColumnHeading } from '@/components/app/form/column-heading'
import { ToggleSection } from '@/components/app/form/toggle-section'
import type { Control } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CostFormValues } from '@/lib/types'

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
  useCloudInferenceGpu,
}: GpuSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">GPU Resources</CardTitle>
        <CardDescription>
          Configure GPU infrastructure for compute-intensive workloads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* On-Premise Column */}
          <div className="min-w-0 space-y-3">
            <ColumnHeading side="on-prem">On-Premise GPU</ColumnHeading>

            {/* Training GPUs */}
            <ToggleSection
              control={control}
              name="useOnPremTrainingGpu"
              label="Training GPUs"
              tooltip="High-performance GPUs optimized for machine learning model training (e.g., NVIDIA A100, H100)"
              isEnabled={useOnPremTrainingGpu}
            >
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
            </ToggleSection>

            {/* Inference GPUs */}
            <ToggleSection
              control={control}
              name="useOnPremInferenceGpu"
              label="Inference GPUs"
              tooltip="GPUs optimized for model inference and deployment (e.g., NVIDIA T4, L4)"
              isEnabled={useOnPremInferenceGpu}
            >
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
            </ToggleSection>
          </div>

          {/* Cloud Column */}
          <div className="min-w-0 space-y-3">
            <ColumnHeading side="cloud">Cloud GPU</ColumnHeading>

            {/* Training GPUs */}
            <ToggleSection
              control={control}
              name="useCloudTrainingGpu"
              label="Training GPUs"
              tooltip="Cloud GPU instances optimized for machine learning training workloads"
              isEnabled={useCloudTrainingGpu}
            >
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
            </ToggleSection>

            {/* Inference GPUs */}
            <ToggleSection
              control={control}
              name="useCloudInferenceGpu"
              label="Inference GPUs"
              tooltip="Cloud GPU instances optimized for model inference and deployment"
              isEnabled={useCloudInferenceGpu}
            >
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
            </ToggleSection>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
