'use client'

import type { Control } from 'react-hook-form'
import type { CostFormValues } from '@/lib/types'
import { FormInput } from '@/components/app/form/form-input'
import { FormSwitch } from '@/components/app/form/form-switch'
import { useWatch } from 'react-hook-form'

interface HumanCostSectionProps {
  control: Control<CostFormValues>
}

export function HumanCostSection({ control }: HumanCostSectionProps) {
  const useOnPremSysAdmin = useWatch({ control, name: 'useOnPremSysAdmin' })
  const useOnPremNetworkEngineer = useWatch({ control, name: 'useOnPremNetworkEngineer' })
  const useOnPremStorageAdmin = useWatch({ control, name: 'useOnPremStorageAdmin' })
  const useOnPremSecurityEngineer = useWatch({ control, name: 'useOnPremSecurityEngineer' })
  const useOnPremDatabaseAdmin = useWatch({ control, name: 'useOnPremDatabaseAdmin' })
  const useOnPremDataCenterTech = useWatch({ control, name: 'useOnPremDataCenterTech' })

  const useCloudDevOpsEngineer = useWatch({ control, name: 'useCloudDevOpsEngineer' })
  const useCloudCloudArchitect = useWatch({ control, name: 'useCloudCloudArchitect' })
  const useCloudSiteReliabilityEngineer = useWatch({ control, name: 'useCloudSiteReliabilityEngineer' })
  const useCloudCloudSecurityEngineer = useWatch({ control, name: 'useCloudCloudSecurityEngineer' })
  const useCloudCloudDatabaseAdmin = useWatch({ control, name: 'useCloudCloudDatabaseAdmin' })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-2">Human Costs</h2>
        <p className="text-sm text-muted-foreground">
          Configure personnel and operational overhead costs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Personnel</h3>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">System Administrator</h4>
              <FormSwitch
                control={control}
                name="useOnPremSysAdmin"
                label=""
              />
            </div>
            {useOnPremSysAdmin && (
              <>
                <FormInput
                  control={control}
                  name="onPremSysAdminCount"
                  label="Number of People"
                  tooltip="Number of system administrators"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremSysAdminSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per system administrator"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="onPremSysAdminSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Network Engineer</h4>
              <FormSwitch
                control={control}
                name="useOnPremNetworkEngineer"
                label=""
              />
            </div>
            {useOnPremNetworkEngineer && (
              <>
                <FormInput
                  control={control}
                  name="onPremNetworkEngineerCount"
                  label="Number of People"
                  tooltip="Number of network engineers"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremNetworkEngineerSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per network engineer"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="onPremNetworkEngineerSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Storage Administrator</h4>
              <FormSwitch
                control={control}
                name="useOnPremStorageAdmin"
                label=""
              />
            </div>
            {useOnPremStorageAdmin && (
              <>
                <FormInput
                  control={control}
                  name="onPremStorageAdminCount"
                  label="Number of People"
                  tooltip="Number of storage administrators"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremStorageAdminSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per storage administrator"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="onPremStorageAdminSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Security Engineer</h4>
              <FormSwitch
                control={control}
                name="useOnPremSecurityEngineer"
                label=""
              />
            </div>
            {useOnPremSecurityEngineer && (
              <>
                <FormInput
                  control={control}
                  name="onPremSecurityEngineerCount"
                  label="Number of People"
                  tooltip="Number of security engineers"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremSecurityEngineerSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per security engineer"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="onPremSecurityEngineerSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Database Administrator</h4>
              <FormSwitch
                control={control}
                name="useOnPremDatabaseAdmin"
                label=""
              />
            </div>
            {useOnPremDatabaseAdmin && (
              <>
                <FormInput
                  control={control}
                  name="onPremDatabaseAdminCount"
                  label="Number of People"
                  tooltip="Number of database administrators"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremDatabaseAdminSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per database administrator"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="onPremDatabaseAdminSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Data Center Technician</h4>
              <FormSwitch
                control={control}
                name="useOnPremDataCenterTech"
                label=""
              />
            </div>
            {useOnPremDataCenterTech && (
              <>
                <FormInput
                  control={control}
                  name="onPremDataCenterTechCount"
                  label="Number of People"
                  tooltip="Number of data center technicians"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="onPremDataCenterTechSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per data center technician"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="onPremDataCenterTechSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Personnel</h3>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">DevOps Engineer</h4>
              <FormSwitch
                control={control}
                name="useCloudDevOpsEngineer"
                label=""
              />
            </div>
            {useCloudDevOpsEngineer && (
              <>
                <FormInput
                  control={control}
                  name="cloudDevOpsEngineerCount"
                  label="Number of People"
                  tooltip="Number of DevOps engineers"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="cloudDevOpsEngineerSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per DevOps engineer"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="cloudDevOpsEngineerSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Cloud Architect</h4>
              <FormSwitch
                control={control}
                name="useCloudCloudArchitect"
                label=""
              />
            </div>
            {useCloudCloudArchitect && (
              <>
                <FormInput
                  control={control}
                  name="cloudCloudArchitectCount"
                  label="Number of People"
                  tooltip="Number of cloud architects"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="cloudCloudArchitectSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per cloud architect"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="cloudCloudArchitectSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Site Reliability Engineer</h4>
              <FormSwitch
                control={control}
                name="useCloudSiteReliabilityEngineer"
                label=""
              />
            </div>
            {useCloudSiteReliabilityEngineer && (
              <>
                <FormInput
                  control={control}
                  name="cloudSiteReliabilityEngineerCount"
                  label="Number of People"
                  tooltip="Number of site reliability engineers"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="cloudSiteReliabilityEngineerSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per site reliability engineer"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="cloudSiteReliabilityEngineerSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Cloud Security Engineer</h4>
              <FormSwitch
                control={control}
                name="useCloudCloudSecurityEngineer"
                label=""
              />
            </div>
            {useCloudCloudSecurityEngineer && (
              <>
                <FormInput
                  control={control}
                  name="cloudCloudSecurityEngineerCount"
                  label="Number of People"
                  tooltip="Number of cloud security engineers"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="cloudCloudSecurityEngineerSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per cloud security engineer"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="cloudCloudSecurityEngineerSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Cloud Database Administrator</h4>
              <FormSwitch
                control={control}
                name="useCloudCloudDatabaseAdmin"
                label=""
              />
            </div>
            {useCloudCloudDatabaseAdmin && (
              <>
                <FormInput
                  control={control}
                  name="cloudCloudDatabaseAdminCount"
                  label="Number of People"
                  tooltip="Number of cloud database administrators"
                  type="number"
                  step={1}
                />
                <FormInput
                  control={control}
                  name="cloudCloudDatabaseAdminSalary"
                  label="Annual Salary ($)"
                  tooltip="Annual salary per cloud database administrator"
                  type="number"
                  step={1000}
                />
                <FormInput
                  control={control}
                  name="cloudCloudDatabaseAdminSalaryIncrement"
                  label="Annual Salary Increment (%)"
                  tooltip="Yearly percentage increase in salary"
                  type="number"
                  step={0.5}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
