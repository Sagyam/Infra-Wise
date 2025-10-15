'use client'

import {FormInput} from '@/components/app/form/form-input'
import {TooltipLabel} from '@/components/app/form/tooltip-label'
import {FormControl, FormField, FormItem} from '@/components/ui/form'
import {Switch} from '@/components/ui/switch'
import type {CostFormValues} from '@/lib/types'
import type {Control} from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EnergySectionProps {
  control: Control<CostFormValues>
  useOnPremPowerConsumption: boolean
  useOnPremUps: boolean
  useOnPremGenerator: boolean
  useOnPremHvac: boolean
  useOnPremColocation: boolean
}

export function EnergySection({
  control,
  useOnPremPowerConsumption,
  useOnPremUps,
  useOnPremGenerator,
  useOnPremHvac,
  useOnPremColocation
}: EnergySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Energy Costs</CardTitle>
        <CardDescription>
          Configure power consumption and electricity costs for on-premise infrastructure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Colocation */}
        <FormField
        control={control}
        name="useOnPremColocation"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <TooltipLabel
                label="Colocation"
                tooltip="Include monthly colocation facility costs (rack space, power, cooling)"
              />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {useOnPremColocation && (
        <div className="ml-4 space-y-4">
          <FormInput
            control={control}
            name="onPremColocationMonthlyCost"
            label="Monthly Colocation Cost ($)"
            tooltip="Monthly fee for colocation services including rack space, power, and cooling"
            type="number"
            step={100}
          />

          <FormInput
            control={control}
            name="onPremColocationAnnualIncrease"
            label="Annual Cost Increase (%)"
            tooltip="Yearly percentage increase in colocation costs"
            type="number"
            step={1}
            min={0}
            max={100}
          />
        </div>
      )}

      {/* Power Consumption */}
      <FormField
        control={control}
        name="useOnPremPowerConsumption"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <TooltipLabel
                label="Power Consumption"
                tooltip="Calculate electricity costs based on power rating and usage"
              />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {useOnPremPowerConsumption && (
        <div className="ml-4 space-y-4">
          <FormInput
            control={control}
            name="onPremPowerRating"
            label="Power Rating (Watts)"
            tooltip="Total power rating of your on-premise infrastructure in watts"
            type="number"
            step={1}
          />

          <FormInput
            control={control}
            name="onPremLoadFactor"
            label="Load Factor (%)"
            tooltip="Average percentage of maximum power draw (typically 50-80%)"
            type="number"
            step={1}
            min={0}
            max={100}
          />

          <FormInput
            control={control}
            name="onPremElectricityCost"
            label="Electricity Cost ($/kWh)"
            tooltip="Cost per kilowatt-hour of electricity"
            type="number"
            step={0.01}
          />
        </div>
      )}

      {/* UPS */}
      <FormField
        control={control}
        name="useOnPremUps"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <TooltipLabel
                label="UPS (Uninterruptible Power Supply)"
                tooltip="Include costs for UPS systems and battery replacements"
              />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {useOnPremUps && (
        <div className="ml-4 space-y-4">
          <FormInput
            control={control}
            name="onPremUpsUnitCost"
            label="UPS Unit Cost ($)"
            tooltip="Purchase price per UPS unit including installation"
            type="number"
            step={100}
          />

          <FormInput
            control={control}
            name="onPremUpsQuantity"
            label="Number of UPS Units"
            tooltip="Total number of UPS units for power backup"
            type="number"
            step={1}
          />

          <FormInput
            control={control}
            name="onPremUpsBatteryFailureRate"
            label="Battery Failure Rate (%/year)"
            tooltip="Annual percentage of UPS batteries requiring replacement"
            type="number"
            step={1}
            min={0}
            max={100}
          />

          <FormInput
            control={control}
            name="onPremUpsBatteryReplacementCost"
            label="Battery Replacement Cost ($)"
            tooltip="Cost to replace batteries in a single UPS unit"
            type="number"
            step={50}
          />
        </div>
      )}

      {/* Generators */}
      <FormField
        control={control}
        name="useOnPremGenerator"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <TooltipLabel
                label="Generators"
                tooltip="Include costs for backup generators and fuel consumption"
              />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {useOnPremGenerator && (
        <div className="ml-4 space-y-4">
          <FormInput
            control={control}
            name="onPremGeneratorUnitCost"
            label="Generator Unit Cost ($)"
            tooltip="Purchase price per backup generator including installation"
            type="number"
            step={1000}
          />

          <FormInput
            control={control}
            name="onPremGeneratorQuantity"
            label="Number of Generators"
            tooltip="Total number of backup generators"
            type="number"
            step={1}
          />

          <FormInput
            control={control}
            name="onPremGeneratorFuelConsumptionRate"
            label="Fuel Consumption Rate (L/hour)"
            tooltip="Liters of fuel consumed per hour of operation"
            type="number"
            step={0.5}
          />

          <FormInput
            control={control}
            name="onPremGeneratorFuelUnitCost"
            label="Fuel Unit Cost ($/L)"
            tooltip="Cost per liter of generator fuel"
            type="number"
            step={0.1}
          />

          <FormInput
            control={control}
            name="onPremGeneratorAnnualUsageHours"
            label="Annual Usage Hours"
            tooltip="Total hours of generator operation per year"
            type="number"
            step={10}
          />
        </div>
      )}

      {/* HVAC */}
      <FormField
        control={control}
        name="useOnPremHvac"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <TooltipLabel
                label="HVAC (Heating, Ventilation, Air Conditioning)"
                tooltip="Include costs for HVAC systems, power consumption, and maintenance"
              />
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {useOnPremHvac && (
        <div className="ml-4 space-y-4">
          <FormInput
            control={control}
            name="onPremHvacUnitCost"
            label="HVAC Unit Cost ($)"
            tooltip="Purchase price per HVAC unit including installation"
            type="number"
            step={1000}
          />

          <FormInput
            control={control}
            name="onPremHvacQuantity"
            label="Number of HVAC Units"
            tooltip="Total number of HVAC systems"
            type="number"
            step={1}
          />

          <FormInput
            control={control}
            name="onPremHvacPowerConsumption"
            label="Power Consumption per Unit (Watts)"
            tooltip="Average power consumption per HVAC unit in watts"
            type="number"
            step={100}
          />

          <FormInput
            control={control}
            name="onPremHvacLoadFactor"
            label="HVAC Load Factor (%)"
            tooltip="Average percentage of time HVAC runs at full capacity"
            type="number"
            step={1}
            min={0}
            max={100}
          />

          <FormInput
            control={control}
            name="onPremHvacTechnicianHourlyRate"
            label="Technician Hourly Rate ($/hour)"
            tooltip="Hourly rate for HVAC maintenance technicians"
            type="number"
            step={5}
          />

          <FormInput
            control={control}
            name="onPremHvacHoursWorked"
            label="Annual Maintenance Hours"
            tooltip="Total hours of HVAC maintenance work per year"
            type="number"
            step={10}
          />
        </div>
      )}
      </CardContent>
    </Card>
  )
}
