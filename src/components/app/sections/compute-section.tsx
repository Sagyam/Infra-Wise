'use client'

import type { Control } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import { HardwareFieldGroup } from '@/components/app/form/hardware-field-group'
import { ToggleSection } from '@/components/app/form/toggle-section'
import { VmFieldGroup } from '@/components/app/form/vm-field-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CostFormValues } from '@/lib/types'

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
  useCloudStorageVm,
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

            <ToggleSection
              control={control}
              name="useOnPremCpu"
              label="CPU/Processors"
              tooltip="Physical processors for compute servers (e.g., Intel Xeon, AMD EPYC). Include all CPUs across your server infrastructure."
              isEnabled={useOnPremCpu}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremCpu"
                quantityLabel="Number of CPUs"
                quantityTooltip="Total number of physical CPU units (sockets) across all servers"
                unitCostLabel="Unit Cost per CPU ($)"
                unitCostTooltip="Purchase price per physical CPU/processor"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremMotherboard"
              label="Motherboards/Servers"
              tooltip="Server motherboards or complete server units (e.g., Dell PowerEdge, HP ProLiant). Includes integrated components like BIOS, BMC controllers."
              isEnabled={useOnPremMotherboard}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremMotherboard"
                quantityLabel="Number of Units"
                quantityTooltip="Total number of server motherboards or complete server units"
                unitCostLabel="Unit Cost ($)"
                unitCostTooltip="Purchase price per motherboard or server unit"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremMemory"
              label="RAM/Memory"
              tooltip="Server memory modules (DDR4, DDR5, etc.). Calculate total memory capacity needed across all servers."
              isEnabled={useOnPremMemory}
            >
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
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremChassis"
              label="Chassis/Enclosures"
              tooltip="Server chassis, blade enclosures, or rack-mount cases. Includes power supplies, fans, and backplanes."
              isEnabled={useOnPremChassis}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremChassis"
                quantityLabel="Number of Chassis"
                quantityTooltip="Total number of server chassis or blade enclosures"
                unitCostLabel="Unit Cost ($)"
                unitCostTooltip="Purchase price per chassis including PSUs and cooling"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremRacks"
              label="Racks & Cabinets"
              tooltip="Server racks, cabinets, and rack PDUs (Power Distribution Units). Standard sizes are 42U or 48U racks."
              isEnabled={useOnPremRacks}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremRacks"
                quantityLabel="Number of Racks"
                quantityTooltip="Total number of server racks or cabinets"
                unitCostLabel="Unit Cost ($)"
                unitCostTooltip="Purchase price per rack including PDUs and cable management"
              />
            </ToggleSection>
          </div>

          {/* Cloud Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">Cloud Compute</h3>
            <p className="text-sm text-muted-foreground">
              Cloud compute costs are calculated based on usage and instance
              types.
            </p>

            <ToggleSection
              control={control}
              name="useCloudGeneralVm"
              label="General Purpose VMs"
              tooltip="Balanced compute, memory, and networking resources for most workloads"
              isEnabled={useCloudGeneralVm}
            >
              <VmFieldGroup control={control} prefix="cloudGeneralVm" />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudComputeVm"
              label="Compute Optimized VMs"
              tooltip="High-performance processors for compute-intensive workloads"
              isEnabled={useCloudComputeVm}
            >
              <VmFieldGroup control={control} prefix="cloudComputeVm" />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudMemoryVm"
              label="Memory Optimized VMs"
              tooltip="High memory-to-CPU ratio for memory-intensive applications"
              isEnabled={useCloudMemoryVm}
            >
              <VmFieldGroup control={control} prefix="cloudMemoryVm" />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudStorageVm"
              label="Storage Optimized VMs"
              tooltip="High disk throughput and I/O for large databases and big data workloads"
              isEnabled={useCloudStorageVm}
            >
              <VmFieldGroup control={control} prefix="cloudStorageVm" />
            </ToggleSection>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
