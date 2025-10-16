'use client'

import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { PersonnelToggleSection } from '@/components/app/form/personnel-toggle-section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CostFormValues } from '@/lib/types'

interface HumanCostSectionProps {
  control: Control<CostFormValues>
}

export function HumanCostSection({ control }: HumanCostSectionProps) {
  // On-Premise watchers
  const useOnPremSysAdmin = useWatch({ control, name: 'useOnPremSysAdmin' })
  const useOnPremNetworkEngineer = useWatch({
    control,
    name: 'useOnPremNetworkEngineer',
  })
  const useOnPremStorageAdmin = useWatch({
    control,
    name: 'useOnPremStorageAdmin',
  })
  const useOnPremSecurityEngineer = useWatch({
    control,
    name: 'useOnPremSecurityEngineer',
  })
  const useOnPremDatabaseAdmin = useWatch({
    control,
    name: 'useOnPremDatabaseAdmin',
  })
  const useOnPremDataCenterTech = useWatch({
    control,
    name: 'useOnPremDataCenterTech',
  })

  // Cloud watchers
  const useCloudDevOpsEngineer = useWatch({
    control,
    name: 'useCloudDevOpsEngineer',
  })
  const useCloudCloudArchitect = useWatch({
    control,
    name: 'useCloudCloudArchitect',
  })
  const useCloudSiteReliabilityEngineer = useWatch({
    control,
    name: 'useCloudSiteReliabilityEngineer',
  })
  const useCloudCloudSecurityEngineer = useWatch({
    control,
    name: 'useCloudCloudSecurityEngineer',
  })
  const useCloudCloudDatabaseAdmin = useWatch({
    control,
    name: 'useCloudCloudDatabaseAdmin',
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Human Costs</CardTitle>
        <CardDescription>
          Configure personnel and operational overhead costs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-evenly gap-6">
          {/* On-Premise Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">On-Premise Personnel</h3>

            <PersonnelToggleSection
              control={control}
              name="useOnPremSysAdmin"
              prefix="onPremSysAdmin"
              title="System Administrator"
              isEnabled={useOnPremSysAdmin}
            />

            <PersonnelToggleSection
              control={control}
              name="useOnPremNetworkEngineer"
              prefix="onPremNetworkEngineer"
              title="Network Engineer"
              isEnabled={useOnPremNetworkEngineer}
            />

            <PersonnelToggleSection
              control={control}
              name="useOnPremStorageAdmin"
              prefix="onPremStorageAdmin"
              title="Storage Administrator"
              isEnabled={useOnPremStorageAdmin}
            />

            <PersonnelToggleSection
              control={control}
              name="useOnPremSecurityEngineer"
              prefix="onPremSecurityEngineer"
              title="Security Engineer"
              isEnabled={useOnPremSecurityEngineer}
            />

            <PersonnelToggleSection
              control={control}
              name="useOnPremDatabaseAdmin"
              prefix="onPremDatabaseAdmin"
              title="Database Administrator"
              isEnabled={useOnPremDatabaseAdmin}
            />

            <PersonnelToggleSection
              control={control}
              name="useOnPremDataCenterTech"
              prefix="onPremDataCenterTech"
              title="Data Center Technician"
              isEnabled={useOnPremDataCenterTech}
            />
          </div>

          {/* Cloud Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">Cloud Personnel</h3>

            <PersonnelToggleSection
              control={control}
              name="useCloudDevOpsEngineer"
              prefix="cloudDevOpsEngineer"
              title="DevOps Engineer"
              isEnabled={useCloudDevOpsEngineer}
            />

            <PersonnelToggleSection
              control={control}
              name="useCloudCloudArchitect"
              prefix="cloudCloudArchitect"
              title="Cloud Architect"
              isEnabled={useCloudCloudArchitect}
            />

            <PersonnelToggleSection
              control={control}
              name="useCloudSiteReliabilityEngineer"
              prefix="cloudSiteReliabilityEngineer"
              title="Site Reliability Engineer (SRE)"
              isEnabled={useCloudSiteReliabilityEngineer}
            />

            <PersonnelToggleSection
              control={control}
              name="useCloudCloudSecurityEngineer"
              prefix="cloudCloudSecurityEngineer"
              title="Cloud Security Engineer"
              isEnabled={useCloudCloudSecurityEngineer}
            />

            <PersonnelToggleSection
              control={control}
              name="useCloudCloudDatabaseAdmin"
              prefix="cloudCloudDatabaseAdmin"
              title="Cloud Database Administrator"
              isEnabled={useCloudCloudDatabaseAdmin}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
