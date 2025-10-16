'use client'

import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import { HardwareFieldGroup } from '@/components/app/form/hardware-field-group'
import { ToggleSection } from '@/components/app/form/toggle-section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CostFormValues } from '@/lib/types'

interface NetworkingSectionProps {
  control: Control<CostFormValues>
  useOnPremBandwidth: boolean
  useOnPremCdn: boolean
  useOnPremCoreSwitch: boolean
  useOnPremAggregationSwitch: boolean
  useOnPremAccessSwitch: boolean
  useOnPremCabling: boolean
  useOnPremQsfp: boolean
}

export function NetworkingSection({
  control,
  useOnPremBandwidth,
  useOnPremCdn,
  useOnPremCoreSwitch,
  useOnPremAggregationSwitch,
  useOnPremAccessSwitch,
  useOnPremCabling,
  useOnPremQsfp,
}: NetworkingSectionProps) {
  const useCloudEgress = useWatch({ control, name: 'useCloudEgress' })
  const useCloudIngress = useWatch({ control, name: 'useCloudIngress' })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Networking</CardTitle>
        <CardDescription>
          Configure bandwidth, CDN, and data transfer costs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-evenly gap-6">
          {/* On-Premise Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">On-Premise Networking</h3>

            <ToggleSection
              control={control}
              name="useOnPremBandwidth"
              label="Bandwidth Costs"
              tooltip="Include monthly internet bandwidth costs for data transfer to/from your on-premise infrastructure"
              isEnabled={useOnPremBandwidth}
            >
              <FormInput
                control={control}
                name="onPremBandwidthUsage"
                label="Bandwidth Usage (GB/month)"
                tooltip="Average monthly data transfer volume for internet connectivity"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremBandwidthCostPerGb"
                label="Bandwidth Cost ($/GB)"
                tooltip="Cost per gigabyte charged by your ISP or network provider"
                type="number"
                step={0.01}
              />
              <FormInput
                control={control}
                name="onPremAnnualTrafficGrowth"
                label="Annual Traffic Growth (%)"
                tooltip="Expected yearly percentage increase in bandwidth requirements"
                type="number"
                step={1}
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremCdn"
              label="Include CDN Costs"
              tooltip="Include Content Delivery Network costs for distributed content caching and delivery"
              isEnabled={useOnPremCdn}
            >
              <FormInput
                control={control}
                name="onPremCdnUsage"
                label="CDN Usage (GB/month)"
                tooltip="Monthly data volume delivered through CDN edge servers"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremCdnCostPerGb"
                label="CDN Cost ($/GB)"
                tooltip="Cost per gigabyte for CDN content delivery service"
                type="number"
                step={0.01}
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremCoreSwitch"
              label="Include Core Switch"
              tooltip="Core switches provide high-speed backbone connectivity between network segments and data centers"
              isEnabled={useOnPremCoreSwitch}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremCoreSwitch"
                quantityLabel="Core Switch Quantity"
                quantityTooltip="Number of core switches required for your network backbone"
                unitCostLabel="Core Switch Unit Cost ($)"
                unitCostTooltip="Purchase price per core switch including any licensing"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremAggregationSwitch"
              label="Aggregation Switch"
              tooltip="Aggregation switches connect access layer switches to the core network, providing traffic aggregation and filtering"
              isEnabled={useOnPremAggregationSwitch}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremAggregationSwitch"
                quantityLabel="Aggregation Switch Quantity"
                quantityTooltip="Number of aggregation layer switches connecting access to core"
                unitCostLabel="Aggregation Switch Unit Cost ($)"
                unitCostTooltip="Purchase price per aggregation switch including any licensing"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremAccessSwitch"
              label="Access Switch"
              tooltip="Access switches provide direct connectivity to end devices like servers, workstations, and storage systems"
              isEnabled={useOnPremAccessSwitch}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremAccessSwitch"
                quantityLabel="Access Switch Quantity"
                quantityTooltip="Number of access layer switches providing device connectivity"
                unitCostLabel="Access Switch Unit Cost ($)"
                unitCostTooltip="Purchase price per access switch including any licensing"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremCabling"
              label="Cabling"
              tooltip="Include network cabling infrastructure costs (fiber optic, copper, etc.) for connecting switches and devices"
              isEnabled={useOnPremCabling}
            >
              <FormInput
                control={control}
                name="onPremCablingLength"
                label="Cabling Length (meters)"
                tooltip="Total cable length required for all network connections"
                type="number"
                step={10}
              />
              <FormInput
                control={control}
                name="onPremCablingUnitPrice"
                label="Cabling Unit Price ($/meter)"
                tooltip="Cost per meter including cable, installation, and termination"
                type="number"
                step={0.5}
              />
              <FormInput
                control={control}
                name="onPremCablingSalvageValue"
                label="Salvage Value (%)"
                tooltip="Percentage of cabling value recoverable at end of lifecycle"
                type="number"
                step={1}
                min={0}
                max={100}
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremQsfp"
              label="QSFP+ / SFP+ Transceivers"
              tooltip="Include costs for fiber optic transceivers and modules (QSFP+, SFP+, etc.) for high-speed connections"
              isEnabled={useOnPremQsfp}
            >
              <HardwareFieldGroup
                control={control}
                prefix="onPremQsfp"
                quantityLabel="Transceiver Quantity"
                quantityTooltip="Number of optical transceivers for fiber connections"
                unitCostLabel="Transceiver Unit Cost ($)"
                unitCostTooltip="Purchase price per transceiver module"
              />
            </ToggleSection>
          </div>

          {/* Cloud Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">Cloud Networking</h3>
            <p className="text-sm text-muted-foreground">
              Cloud providers typically charge for data transfer out (egress)
              and sometimes for data transfer in (ingress).
            </p>

            <ToggleSection
              control={control}
              name="useCloudEgress"
              label="Data Egress (Outbound)"
              tooltip="Data transferred out from cloud to internet or other regions. Most cloud providers charge for egress."
              isEnabled={useCloudEgress}
            >
              <FormInput
                control={control}
                name="cloudEgress"
                label="Egress Data (TB/month)"
                tooltip="Monthly data volume transferred out from cloud infrastructure"
                type="number"
                step={0.1}
              />
              <FormInput
                control={control}
                name="cloudEgressGrowthRate"
                label="Annual Egress Growth (%)"
                tooltip="Expected yearly percentage increase in egress traffic"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudEgressCostPerUnit"
                label="Egress Cost ($/TB)"
                tooltip="Cost per terabyte of data transferred out (typically $0.05-$0.12/GB)"
                type="number"
                step={0.01}
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudIngress"
              label="Data Ingress (Inbound)"
              tooltip="Data transferred into cloud from internet. Usually free but some scenarios may incur charges."
              isEnabled={useCloudIngress}
            >
              <FormInput
                control={control}
                name="cloudIngress"
                label="Ingress Data (TB/month)"
                tooltip="Monthly data volume transferred into cloud infrastructure"
                type="number"
                step={0.1}
              />
              <FormInput
                control={control}
                name="cloudIngressGrowthRate"
                label="Annual Ingress Growth (%)"
                tooltip="Expected yearly percentage increase in ingress traffic"
                type="number"
                step={1}
              />
              <FormInput
                control={control}
                name="cloudIngressCostPerUnit"
                label="Ingress Cost ($/TB)"
                tooltip="Cost per terabyte of data transferred in (often free, but may vary)"
                type="number"
                step={0.01}
              />
            </ToggleSection>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
