'use client'

import {FormInput} from '@/components/app/form/form-input'
import {TooltipLabel} from '@/components/app/form/tooltip-label'
import {FormControl, FormField, FormItem} from '@/components/ui/form'
import {Switch} from '@/components/ui/switch'
import type {CostFormValues} from '@/lib/types'
import type {Control} from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
  useCloudSecurity
}: SoftwareSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Software & Licensing</CardTitle>
        <CardDescription>
          Configure software licensing and subscription costs for your infrastructure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-evenly gap-6">
        {/* On-Premise Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">On-Premise Licensing</h3>

          {/* Virtualization */}
          <FormField
            control={control}
            name="useOnPremVirtualization"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Virtualization"
                    tooltip="Hypervisor and virtualization platform licenses (e.g., VMware vSphere, Microsoft Hyper-V, Proxmox). Used for running multiple virtual machines on physical hardware."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremVirtualization && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremVirtualizationUnitCost"
                label="Annual Unit Cost ($)"
                tooltip="Annual license cost per CPU socket, per host, or per seat depending on licensing model"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremVirtualizationLicenses"
                label="Number of Licenses"
                tooltip="Total number of virtualization licenses (e.g., number of CPU sockets or hosts)"
                type="number"
                step={1}
              />
            </div>
          )}

          {/* Operating System */}
          <FormField
            control={control}
            name="useOnPremOperatingSystem"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Operating System"
                    tooltip="Server and workstation OS licenses (e.g., Windows Server, Red Hat Enterprise Linux, SUSE Linux). Include client access licenses (CALs) if required."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremOperatingSystem && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremOperatingSystemUnitCost"
                label="Annual Unit Cost ($)"
                tooltip="Annual license cost per OS instance or subscription (includes support and updates)"
                type="number"
                step={50}
              />
              <FormInput
                control={control}
                name="onPremOperatingSystemLicenses"
                label="Number of Licenses"
                tooltip="Total number of OS licenses needed for servers, VMs, or physical machines"
                type="number"
                step={1}
              />
            </div>
          )}

          {/* Storage */}
          <FormField
            control={control}
            name="useOnPremStorage"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Storage Management"
                    tooltip="Storage management software for SAN, NAS, and distributed storage systems (e.g., NetApp ONTAP, Dell EMC, Ceph Enterprise). Includes data deduplication, replication, and snapshot features."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremStorage && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremStorageUnitCost"
                label="Annual Unit Cost ($)"
                tooltip="Annual license cost per TB managed, per controller, or per feature pack"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremStorageLicenses"
                label="Number of Licenses"
                tooltip="Total number of storage licenses (e.g., TB capacity, controllers, or nodes)"
                type="number"
                step={1}
              />
            </div>
          )}

          {/* Backup Software */}
          <FormField
            control={control}
            name="useOnPremBackupSoftware"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Backup Software"
                    tooltip="Backup and disaster recovery software (e.g., Veeam Backup & Replication, Commvault, Veritas NetBackup). Includes VM backup, database protection, and replication capabilities."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremBackupSoftware && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremBackupSoftwareUnitCost"
                label="Annual Unit Cost ($)"
                tooltip="Annual license cost per workload, per socket, or per VM backed up"
                type="number"
                step={100}
              />
              <FormInput
                control={control}
                name="onPremBackupSoftwareLicenses"
                label="Number of Licenses"
                tooltip="Total number of backup licenses (e.g., number of VMs, sockets, or workloads)"
                type="number"
                step={1}
              />
            </div>
          )}

          {/* Monitoring */}
          <FormField
            control={control}
            name="useOnPremMonitoring"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Monitoring & Observability"
                    tooltip="Infrastructure and application monitoring tools (e.g., Datadog, New Relic, Prometheus Enterprise, Grafana Enterprise). Provides metrics, logs, traces, and alerting for system health and performance."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremMonitoring && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremMonitoringUnitCost"
                label="Annual Unit Cost ($)"
                tooltip="Annual license cost per monitored host, container, or custom metric"
                type="number"
                step={50}
              />
              <FormInput
                control={control}
                name="onPremMonitoringLicenses"
                label="Number of Licenses"
                tooltip="Total number of monitored nodes, hosts, containers, or metric units"
                type="number"
                step={1}
              />
            </div>
          )}

          {/* Security */}
          <FormField
            control={control}
            name="useOnPremSecurity"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Security Software"
                    tooltip="Endpoint protection, antivirus, and security tools (e.g., CrowdStrike, Symantec, McAfee, Trend Micro). Includes threat detection, EDR, and compliance monitoring."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useOnPremSecurity && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="onPremSecurityUnitCost"
                label="Annual Unit Cost ($)"
                tooltip="Annual license cost per endpoint, device, or user protected"
                type="number"
                step={50}
              />
              <FormInput
                control={control}
                name="onPremSecurityLicenses"
                label="Number of Licenses"
                tooltip="Total number of security licenses (e.g., endpoints, servers, or users)"
                type="number"
                step={1}
              />
            </div>
          )}
        </div>

        {/* Cloud Column */}
        <div className="space-y-4 flex-1 max-w-xl">
          <h3 className="text-lg font-semibold">Cloud Software</h3>

          {/* Database */}
          <FormField
            control={control}
            name="useCloudDatabase"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Database Services"
                    tooltip="Managed database services (e.g., AWS RDS, Azure SQL Database, Google Cloud SQL, DynamoDB, Cosmos DB). Includes relational and NoSQL databases with automatic backups, scaling, and maintenance."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudDatabase && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudDatabaseMonthlyCost"
                label="Monthly Cost ($)"
                tooltip="Total monthly cost for all database instances including compute, storage, and backup"
                type="number"
                step={50}
              />
            </div>
          )}

          {/* Operating System */}
          <FormField
            control={control}
            name="useCloudOperatingSystem"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Operating System Licenses"
                    tooltip="Cloud-based OS licenses for Windows Server, SQL Server, or other commercial OS on cloud VMs. Often included as pay-as-you-go with cloud instances or through BYOL (Bring Your Own License)."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudOperatingSystem && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudOperatingSystemMonthlyCost"
                label="Monthly Cost ($)"
                tooltip="Total monthly cost for OS licenses running on cloud VMs (beyond base compute costs)"
                type="number"
                step={50}
              />
            </div>
          )}

          {/* Analytics */}
          <FormField
            control={control}
            name="useCloudAnalytics"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Analytics & BI"
                    tooltip="Business intelligence and data analytics platforms (e.g., Google BigQuery, AWS Redshift, Azure Synapse, Snowflake, Power BI, Tableau). Includes data warehousing, query processing, and visualization tools."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudAnalytics && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudAnalyticsMonthlyCost"
                label="Monthly Cost ($)"
                tooltip="Total monthly cost including data warehouse compute, storage, and query processing"
                type="number"
                step={100}
              />
            </div>
          )}

          {/* Telemetry */}
          <FormField
            control={control}
            name="useCloudTelemetry"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Telemetry & Logging"
                    tooltip="Log aggregation, metrics, and telemetry services (e.g., AWS CloudWatch, Azure Monitor, Google Cloud Logging, Splunk Cloud). Centralizes logs, metrics, and traces for troubleshooting and analysis."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudTelemetry && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudTelemetryMonthlyCost"
                label="Monthly Cost ($)"
                tooltip="Total monthly cost for log ingestion, storage, and query processing"
                type="number"
                step={50}
              />
            </div>
          )}

          {/* Monitoring */}
          <FormField
            control={control}
            name="useCloudMonitoring"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Monitoring & APM"
                    tooltip="Application Performance Monitoring and observability platforms (e.g., Datadog, New Relic, Dynatrace, AppDynamics). Provides real-time performance insights, distributed tracing, and custom dashboards."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudMonitoring && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudMonitoringMonthlyCost"
                label="Monthly Cost ($)"
                tooltip="Total monthly cost based on hosts monitored, custom metrics, and data retention"
                type="number"
                step={50}
              />
            </div>
          )}

          {/* Security */}
          <FormField
            control={control}
            name="useCloudSecurity"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <TooltipLabel
                    label="Security Services"
                    tooltip="Cloud-native security services (e.g., AWS WAF, Azure DDoS Protection, Google Cloud Armor, Security Center, GuardDuty). Includes threat detection, vulnerability scanning, compliance monitoring, and network protection."
                  />
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {useCloudSecurity && (
            <div className="ml-4 space-y-4">
              <FormInput
                control={control}
                name="cloudSecurityMonthlyCost"
                label="Monthly Cost ($)"
                tooltip="Total monthly cost for security services including WAF rules, DDoS protection, and security assessments"
                type="number"
                step={50}
              />
            </div>
          )}
        </div>
      </div>
      </CardContent>
    </Card>
  )
}
