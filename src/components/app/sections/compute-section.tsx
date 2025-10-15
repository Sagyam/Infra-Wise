'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'
import { TooltipLabel } from '@/components/app/form/tooltip-label'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ComputeSectionProps {
  control: Control<CostFormValues>
  useOnPremCpu: boolean
  useOnPremMotherboard: boolean
  useOnPremMemory: boolean
  useOnPremChassis: boolean
  useOnPremRacks: boolean
  useCloudGeneralVm: boolean
  useCloudComputeVm: boolean
  useCloudMemoryVm: boolean
  useCloudStorageVm: boolean
}

export function ComputeSection({
  control,
  useOnPremCpu,
  useOnPremMotherboard,
  useOnPremMemory,
  useOnPremChassis,
  useOnPremRacks,
  useCloudGeneralVm,
  useCloudComputeVm,
  useCloudMemoryVm,
  useCloudStorageVm
}: ComputeSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Compute Resources</CardTitle>
        <CardDescription>
          Configure compute hardware and VM costs for your infrastructure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Hardware</h3>

          {/* CPU/Processors */}
          <FormField
            control={control}
            name="useOnPremCpu"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="CPU/Processors"
                    tooltip="Physical processors for compute servers (e.g., Intel Xeon, AMD EPYC). Include all CPUs across your server infrastructure."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremCpu && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremCpuQuantity"
                label="Number of CPUs"
                tooltip="Total number of physical CPU units (sockets) across all servers"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="onPremCpuUnitCost"
                label="Unit Cost per CPU ($)"
                tooltip="Purchase price per physical CPU/processor"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremCpuSalvageValue"
                label="Salvage Value (%)"
                tooltip="Percentage of CPU value recoverable at end of lifecycle"
                type="number"
                step={1}
                min={0}
                max={100}
              />
            </div>
          )}

          {/* Motherboards/Servers */}
          <FormField
            control={control}
            name="useOnPremMotherboard"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Motherboards/Servers"
                    tooltip="Server motherboards or complete server units (e.g., Dell PowerEdge, HP ProLiant). Includes integrated components like BIOS, BMC controllers."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremMotherboard && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremMotherboardQuantity"
                label="Number of Units"
                tooltip="Total number of server motherboards or complete server units"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="onPremMotherboardUnitCost"
                label="Unit Cost ($)"
                tooltip="Purchase price per motherboard or server unit"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremMotherboardSalvageValue"
                label="Salvage Value (%)"
                tooltip="Percentage of motherboard/server value recoverable at end of lifecycle"
                type="number"
                step={1}
                min={0}
                max={100}
              />
            </div>
          )}

          {/* RAM/Memory */}
          <FormField
            control={control}
            name="useOnPremMemory"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="RAM/Memory"
                    tooltip="Server memory modules (DDR4, DDR5, etc.). Calculate total memory capacity needed across all servers."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremMemory && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremMemoryCapacityGb"
                label="Total Capacity (GB)"
                tooltip="Total RAM capacity in gigabytes across all servers"
                type="number"
                step={16}
              />
              <FormInput
                control={control}
                name="onPremMemoryCostPerGb"
                label="Cost per GB ($)"
                tooltip="Average cost per gigabyte of server memory"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="onPremMemorySalvageValue"
                label="Salvage Value (%)"
                tooltip="Percentage of memory value recoverable at end of lifecycle"
                type="number"
                step={1}
                min={0}
                max={100}
              />
            </div>
          )}

          {/* Chassis/Enclosures */}
          <FormField
            control={control}
            name="useOnPremChassis"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Chassis/Enclosures"
                    tooltip="Server chassis, blade enclosures, or rack-mount cases. Includes power supplies, fans, and backplanes."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremChassis && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremChassisQuantity"
                label="Number of Chassis"
                tooltip="Total number of server chassis or blade enclosures"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="onPremChassisUnitCost"
                label="Unit Cost ($)"
                tooltip="Purchase price per chassis including PSUs and cooling"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremChassisSalvageValue"
                label="Salvage Value (%)"
                tooltip="Percentage of chassis value recoverable at end of lifecycle"
                type="number"
                step={1}
                min={0}
                max={100}
              />
            </div>
          )}

          {/* Racks & Cabinets */}
          <FormField
            control={control}
            name="useOnPremRacks"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Racks & Cabinets"
                    tooltip="Server racks, cabinets, and rack PDUs (Power Distribution Units). Standard sizes are 42U or 48U racks."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremRacks && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremRacksQuantity"
                label="Number of Racks"
                tooltip="Total number of server racks or cabinets"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="onPremRacksUnitCost"
                label="Unit Cost ($)"
                tooltip="Purchase price per rack including PDUs and cable management"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremRacksSalvageValue"
                label="Salvage Value (%)"
                tooltip="Percentage of rack value recoverable at end of lifecycle"
                type="number"
                step={1}
                min={0}
                max={100}
              />
            </div>
          )}
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Compute</h3>
          <p className="text-sm text-muted-foreground">
            Cloud compute costs are calculated based on usage and instance types.
          </p>

          {/* General Purpose VMs */}
          <FormField
            control={control}
            name="useCloudGeneralVm"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="General Purpose VMs"
                    tooltip="Balanced compute, memory, and networking resources for most workloads"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudGeneralVm && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudGeneralVmCount"
                label="Instance Count"
                tooltip="Number of general purpose VM instances"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudGeneralVmHourlyRate"
                label="Hourly Rate ($/hour)"
                tooltip="Cost per hour for each general purpose VM instance"
                type="number"
                step={0.01}
              />
              <FormInput
                control={control}
                name="cloudGeneralVmHoursPerMonth"
                label="Hours Used Per Month"
                tooltip="Average hours each instance runs per month (max 744)"
                type="number"
                step={1}
                max={744}
              />
            </div>
          )}

          {/* Compute Optimized VMs */}
          <FormField
            control={control}
            name="useCloudComputeVm"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Compute Optimized VMs"
                    tooltip="High-performance processors for compute-intensive workloads"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudComputeVm && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudComputeVmCount"
                label="Instance Count"
                tooltip="Number of compute optimized VM instances"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudComputeVmHourlyRate"
                label="Hourly Rate ($/hour)"
                tooltip="Cost per hour for each compute optimized VM instance"
                type="number"
                step={0.01}
              />
              <FormInput
                control={control}
                name="cloudComputeVmHoursPerMonth"
                label="Hours Used Per Month"
                tooltip="Average hours each instance runs per month (max 744)"
                type="number"
                step={1}
                max={744}
              />
            </div>
          )}

          {/* Memory Optimized VMs */}
          <FormField
            control={control}
            name="useCloudMemoryVm"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Memory Optimized VMs"
                    tooltip="High memory-to-CPU ratio for memory-intensive applications"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudMemoryVm && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudMemoryVmCount"
                label="Instance Count"
                tooltip="Number of memory optimized VM instances"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudMemoryVmHourlyRate"
                label="Hourly Rate ($/hour)"
                tooltip="Cost per hour for each memory optimized VM instance"
                type="number"
                step={0.01}
              />
              <FormInput
                control={control}
                name="cloudMemoryVmHoursPerMonth"
                label="Hours Used Per Month"
                tooltip="Average hours each instance runs per month (max 744)"
                type="number"
                step={1}
                max={744}
              />
            </div>
          )}

          {/* Storage Optimized VMs */}
          <FormField
            control={control}
            name="useCloudStorageVm"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Storage Optimized VMs"
                    tooltip="High disk throughput and I/O for large databases and big data workloads"
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudStorageVm && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudStorageVmCount"
                label="Instance Count"
                tooltip="Number of storage optimized VM instances"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudStorageVmHourlyRate"
                label="Hourly Rate ($/hour)"
                tooltip="Cost per hour for each storage optimized VM instance"
                type="number"
                step={0.01}
              />
              <FormInput
                control={control}
                name="cloudStorageVmHoursPerMonth"
                label="Hours Used Per Month"
                tooltip="Average hours each instance runs per month (max 744)"
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
