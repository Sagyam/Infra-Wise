'use client'

import type { Control } from 'react-hook-form'
import { LicenseFieldGroup } from '@/components/app/form/license-field-group'
import { MonthlyCostField } from '@/components/app/form/monthly-cost-field'
import { ToggleSection } from '@/components/app/form/toggle-section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CostFormValues } from '@/lib/types'

interface SoftwareSectionProps {
  control: Control<CostFormValues>
  useOnPremVirtualization: boolean
  useOnPremOperatingSystem: boolean
  useOnPremStorage: boolean
  useOnPremBackupSoftware: boolean
  useOnPremMonitoring: boolean
  useOnPremSecurity: boolean
  useCloudDatabase: boolean
  useCloudOperatingSystem: boolean
  useCloudAnalytics: boolean
  useCloudTelemetry: boolean
  useCloudMonitoring: boolean
  useCloudSecurity: boolean
}

export function SoftwareSection({
  control,
  useOnPremVirtualization,
  useOnPremOperatingSystem,
  useOnPremStorage,
  useOnPremBackupSoftware,
  useOnPremMonitoring,
  useOnPremSecurity,
  useCloudDatabase,
  useCloudOperatingSystem,
  useCloudAnalytics,
  useCloudTelemetry,
  useCloudMonitoring,
  useCloudSecurity,
}: SoftwareSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Software & Licensing</CardTitle>
        <CardDescription>
          Configure software licensing and subscription costs for your
          infrastructure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-evenly gap-6">
          {/* On-Premise Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">On-Premise Licensing</h3>

            <ToggleSection
              control={control}
              name="useOnPremVirtualization"
              label="Virtualization"
              tooltip="Hypervisor and virtualization platform licenses (e.g., VMware vSphere, Microsoft Hyper-V, Proxmox). Used for running multiple virtual machines on physical hardware."
              isEnabled={useOnPremVirtualization}
            >
              <LicenseFieldGroup
                control={control}
                prefix="onPremVirtualization"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremOperatingSystem"
              label="Operating System"
              tooltip="Server and workstation OS licenses (e.g., Windows Server, Red Hat Enterprise Linux, SUSE Linux). Include client access licenses (CALs) if required."
              isEnabled={useOnPremOperatingSystem}
            >
              <LicenseFieldGroup
                control={control}
                prefix="onPremOperatingSystem"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremStorage"
              label="Storage Management"
              tooltip="Storage management software for SAN, NAS, and distributed storage systems (e.g., NetApp ONTAP, Dell EMC, Ceph Enterprise). Includes data deduplication, replication, and snapshot features."
              isEnabled={useOnPremStorage}
            >
              <LicenseFieldGroup control={control} prefix="onPremStorage" />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremBackupSoftware"
              label="Backup Software"
              tooltip="Backup and disaster recovery software (e.g., Veeam Backup & Replication, Commvault, Veritas NetBackup). Includes VM backup, database protection, and replication capabilities."
              isEnabled={useOnPremBackupSoftware}
            >
              <LicenseFieldGroup
                control={control}
                prefix="onPremBackupSoftware"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremMonitoring"
              label="Monitoring & Observability"
              tooltip="Infrastructure and application monitoring tools (e.g., Datadog, New Relic, Prometheus Enterprise, Grafana Enterprise). Provides metrics, logs, traces, and alerting for system health and performance."
              isEnabled={useOnPremMonitoring}
            >
              <LicenseFieldGroup control={control} prefix="onPremMonitoring" />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useOnPremSecurity"
              label="Security Software"
              tooltip="Endpoint protection, antivirus, and security tools (e.g., CrowdStrike, Symantec, McAfee, Trend Micro). Includes threat detection, EDR, and compliance monitoring."
              isEnabled={useOnPremSecurity}
            >
              <LicenseFieldGroup control={control} prefix="onPremSecurity" />
            </ToggleSection>
          </div>

          {/* Cloud Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">Cloud Services</h3>
            <p className="text-sm text-muted-foreground">
              Cloud software and SaaS subscription costs for infrastructure
              services.
            </p>

            <ToggleSection
              control={control}
              name="useCloudDatabase"
              label="Managed Databases"
              tooltip="Managed database services (e.g., AWS RDS, Azure SQL Database, Google Cloud SQL, DynamoDB). Includes compute, storage, backups, and managed maintenance."
              isEnabled={useCloudDatabase}
            >
              <MonthlyCostField
                control={control}
                name="cloudDatabaseMonthlyCost"
                tooltip="Total monthly cost for all database instances including compute, storage, and backup"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudOperatingSystem"
              label="Operating System Licenses"
              tooltip="Cloud-based OS licenses for Windows Server, SQL Server, or other commercial OS on cloud VMs. Often included as pay-as-you-go with cloud instances or through BYOL (Bring Your Own License)."
              isEnabled={useCloudOperatingSystem}
            >
              <MonthlyCostField
                control={control}
                name="cloudOperatingSystemMonthlyCost"
                tooltip="Total monthly cost for OS licenses running on cloud VMs (beyond base compute costs)"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudAnalytics"
              label="Analytics & BI"
              tooltip="Business intelligence and data analytics platforms (e.g., Google BigQuery, AWS Redshift, Azure Synapse, Snowflake, Power BI, Tableau). Includes data warehousing, query processing, and visualization tools."
              isEnabled={useCloudAnalytics}
            >
              <MonthlyCostField
                control={control}
                name="cloudAnalyticsMonthlyCost"
                tooltip="Total monthly cost including data warehouse compute, storage, and query processing"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudTelemetry"
              label="Telemetry & Logging"
              tooltip="Log aggregation, metrics, and telemetry services (e.g., AWS CloudWatch, Azure Monitor, Google Cloud Logging, Splunk Cloud). Centralizes logs, metrics, and traces for troubleshooting and analysis."
              isEnabled={useCloudTelemetry}
            >
              <MonthlyCostField
                control={control}
                name="cloudTelemetryMonthlyCost"
                tooltip="Total monthly cost for log ingestion, storage, and query processing"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudMonitoring"
              label="Monitoring & APM"
              tooltip="Application Performance Monitoring and observability platforms (e.g., Datadog, New Relic, Dynatrace, AppDynamics). Provides real-time performance insights, distributed tracing, and custom dashboards."
              isEnabled={useCloudMonitoring}
            >
              <MonthlyCostField
                control={control}
                name="cloudMonitoringMonthlyCost"
                tooltip="Total monthly cost for APM, metrics, and custom dashboards"
              />
            </ToggleSection>

            <ToggleSection
              control={control}
              name="useCloudSecurity"
              label="Cloud Security"
              tooltip="Cloud-native security services (e.g., AWS GuardDuty, Azure Security Center, Google Cloud Armor, CloudFlare). Includes threat detection, DDoS protection, WAF, and security posture management."
              isEnabled={useCloudSecurity}
            >
              <MonthlyCostField
                control={control}
                name="cloudSecurityMonthlyCost"
                tooltip="Total monthly cost for security services, threat detection, and compliance tools"
              />
            </ToggleSection>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
