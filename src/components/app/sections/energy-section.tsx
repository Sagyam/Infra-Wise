'use client'

import {FormInput} from '@/components/app/form/form-input'
import type {CostFormValues} from '@/lib/types'
import type {Control} from 'react-hook-form'

interface EnergySectionProps {
  control: Control<CostFormValues>
}

export function EnergySection({ control }: EnergySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Energy Costs</h2>
        <p className="text-sm text-muted-foreground">
          Configure power consumption and electricity costs for on-premise infrastructure.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Power Consumption</h3>

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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">UPS (Uninterruptible Power Supply)</h3>

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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Generators</h3>

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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">HVAC (Heating, Ventilation, Air Conditioning)</h3>

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
    </div>
  )
}
