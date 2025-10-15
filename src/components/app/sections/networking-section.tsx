'use client'

import {FormInput} from '@/components/app/form/form-input'
import {FormSwitch} from '@/components/app/form/form-switch'
import {TooltipLabel} from '@/components/app/form/tooltip-label'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {FormControl, FormField, FormItem,} from '@/components/ui/form'
import {Switch} from '@/components/ui/switch'
import type {CostFormValues} from '@/lib/types'
import type {Control} from 'react-hook-form'
import {useWatch} from 'react-hook-form'

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

        <FormField
          control={control}
          name="useOnPremBandwidth"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Bandwidth Costs"
                  tooltip="Include monthly internet bandwidth costs for data transfer to/from your on-premise infrastructure"
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
                  tooltip="Include Content Delivery Network costs for distributed content caching and delivery"
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
          </>
        )}

        <FormField
          control={control}
          name="useOnPremCoreSwitch"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Include Core Switch"
                  tooltip="Core switches provide high-speed backbone connectivity between network segments and data centers"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremCoreSwitch && (
          <div className="ml-4 space-y-4">
            <FormInput
              control={control}
              name="onPremCoreSwitchQuantity"
              label="Core Switch Quantity"
              tooltip="Number of core switches required for your network backbone"
              type="number"
              step={1}
            />

            <FormInput
              control={control}
              name="onPremCoreSwitchUnitCost"
              label="Core Switch Unit Cost ($)"
              tooltip="Purchase price per core switch including any licensing"
              type="number"
              step={100}
            />

            <FormInput
              control={control}
              name="onPremCoreSwitchSalvageValue"
              label="Salvage Value (%)"
              tooltip="Percentage of core switch value recoverable at end of lifecycle"
              type="number"
              step={1}
              min={0}
              max={100}
            />
          </div>
        )}

        <FormField
          control={control}
          name="useOnPremAggregationSwitch"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Aggregation Switch"
                  tooltip="Aggregation switches connect access layer switches to the core network, providing traffic aggregation and filtering"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremAggregationSwitch && (
          <div className="ml-4 space-y-4">
            <FormInput
              control={control}
              name="onPremAggregationSwitchQuantity"
              label="Aggregation Switch Quantity"
              tooltip="Number of aggregation layer switches connecting access to core"
              type="number"
              step={1}
            />

            <FormInput
              control={control}
              name="onPremAggregationSwitchUnitCost"
              label="Aggregation Switch Unit Cost ($)"
              tooltip="Purchase price per aggregation switch including any licensing"
              type="number"
              step={100}
            />

            <FormInput
              control={control}
              name="onPremAggregationSwitchSalvageValue"
              label="Salvage Value (%)"
              tooltip="Percentage of aggregation switch value recoverable at end of lifecycle"
              type="number"
              step={1}
              min={0}
              max={100}
            />
          </div>
        )}

        <FormField
          control={control}
          name="useOnPremAccessSwitch"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Access Switch"
                  tooltip="Access switches provide direct connectivity to end devices like servers, workstations, and storage systems"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremAccessSwitch && (
          <div className="ml-4 space-y-4">
            <FormInput
              control={control}
              name="onPremAccessSwitchQuantity"
              label="Access Switch Quantity"
              tooltip="Number of access layer switches providing device connectivity"
              type="number"
              step={1}
            />

            <FormInput
              control={control}
              name="onPremAccessSwitchUnitCost"
              label="Access Switch Unit Cost ($)"
              tooltip="Purchase price per access switch including any licensing"
              type="number"
              step={100}
            />

            <FormInput
              control={control}
              name="onPremAccessSwitchSalvageValue"
              label="Salvage Value (%)"
              tooltip="Percentage of access switch value recoverable at end of lifecycle"
              type="number"
              step={1}
              min={0}
              max={100}
            />
          </div>
        )}

        <FormField
          control={control}
          name="useOnPremCabling"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="Cabling"
                  tooltip="Include network cabling infrastructure costs (fiber optic, copper, etc.) for connecting switches and devices"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremCabling && (
          <div className="ml-4 space-y-4">
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
          </div>
        )}

        <FormField
          control={control}
          name="useOnPremQsfp"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <TooltipLabel
                  label="QSFP Cards"
                  tooltip="QSFP (Quad Small Form-factor Pluggable) transceivers enable high-speed fiber optic connections between switches"
                />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {useOnPremQsfp && (
          <div className="ml-4 space-y-4">
            <FormInput
              control={control}
              name="onPremQsfpQuantity"
              label="QSFP Quantity"
              tooltip="Total number of QSFP modules needed for switch interconnections"
              type="number"
              step={1}
            />

            <FormInput
              control={control}
              name="onPremQsfpUnitCost"
              label="QSFP Unit Cost ($)"
              tooltip="Purchase price per QSFP transceiver module"
              type="number"
              step={50}
            />

            <FormInput
              control={control}
              name="onPremQsfpSalvageValue"
              label="Salvage Value (%)"
              tooltip="Percentage of QSFP module value recoverable at end of lifecycle"
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
          <h3 className="text-lg font-semibold">Cloud Networking</h3>

          {/* Egress Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Egress Configuration</h4>
              <FormSwitch
                control={control}
                name="useCloudEgress"
                label=""
              />
            </div>
            {useCloudEgress && (
              <>
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
              </>
            )}
          </div>

          {/* Ingress Section */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Ingress Configuration</h4>
              <FormSwitch
                control={control}
                name="useCloudIngress"
                label=""
              />
            </div>
            {useCloudIngress && (
              <>
                <FormInput
                  control={control}
                  name="cloudIngress"
                  label="Ingress (TB/month)"
                  tooltip="Monthly inbound data transfer to cloud"
                  type="number"
                  step={0.1}
                />

                <FormInput
                  control={control}
                  name="cloudIngressGrowthRate"
                  label="Ingress Growth Rate (%)"
                  tooltip="Annual increase in ingress traffic"
                  type="number"
                  step={1}
                />

                <FormInput
                  control={control}
                  name="cloudIngressCostPerUnit"
                  label="Ingress Cost ($/GB)"
                  tooltip="Cost per GB of inbound data transfer"
                  type="number"
                  step={0.01}
                />
              </>
            )}
          </div>
        </div>
      </div>
      </CardContent>
    </Card>
  )
}
