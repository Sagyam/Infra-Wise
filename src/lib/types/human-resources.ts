import { z } from 'zod'

export const HumanResourcesSchema = z.object({
  // On-Premise System Administrator
  useOnPremSysAdmin: z.boolean().optional(),
  onPremSysAdminCount: z.number().int().min(0).optional(),
  onPremSysAdminSalary: z.number().min(0).optional(),
  onPremSysAdminSalaryIncrement: z.number().min(0).max(100).optional(),
  // On-Premise Network Engineer
  useOnPremNetworkEngineer: z.boolean().optional(),
  onPremNetworkEngineerCount: z.number().int().min(0).optional(),
  onPremNetworkEngineerSalary: z.number().min(0).optional(),
  onPremNetworkEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
  // On-Premise Storage Administrator
  useOnPremStorageAdmin: z.boolean().optional(),
  onPremStorageAdminCount: z.number().int().min(0).optional(),
  onPremStorageAdminSalary: z.number().min(0).optional(),
  onPremStorageAdminSalaryIncrement: z.number().min(0).max(100).optional(),
  // On-Premise Security Engineer
  useOnPremSecurityEngineer: z.boolean().optional(),
  onPremSecurityEngineerCount: z.number().int().min(0).optional(),
  onPremSecurityEngineerSalary: z.number().min(0).optional(),
  onPremSecurityEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
  // On-Premise Database Administrator
  useOnPremDatabaseAdmin: z.boolean().optional(),
  onPremDatabaseAdminCount: z.number().int().min(0).optional(),
  onPremDatabaseAdminSalary: z.number().min(0).optional(),
  onPremDatabaseAdminSalaryIncrement: z.number().min(0).max(100).optional(),
  // On-Premise Data Center Technician
  useOnPremDataCenterTech: z.boolean().optional(),
  onPremDataCenterTechCount: z.number().int().min(0).optional(),
  onPremDataCenterTechSalary: z.number().min(0).optional(),
  onPremDataCenterTechSalaryIncrement: z.number().min(0).max(100).optional(),
  // Cloud DevOps Engineer
  useCloudDevOpsEngineer: z.boolean().optional(),
  cloudDevOpsEngineerCount: z.number().int().min(0).optional(),
  cloudDevOpsEngineerSalary: z.number().min(0).optional(),
  cloudDevOpsEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
  // Cloud Architect
  useCloudCloudArchitect: z.boolean().optional(),
  cloudCloudArchitectCount: z.number().int().min(0).optional(),
  cloudCloudArchitectSalary: z.number().min(0).optional(),
  cloudCloudArchitectSalaryIncrement: z.number().min(0).max(100).optional(),
  // Cloud Site Reliability Engineer
  useCloudSiteReliabilityEngineer: z.boolean().optional(),
  cloudSiteReliabilityEngineerCount: z.number().int().min(0).optional(),
  cloudSiteReliabilityEngineerSalary: z.number().min(0).optional(),
  cloudSiteReliabilityEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
  // Cloud Security Engineer
  useCloudCloudSecurityEngineer: z.boolean().optional(),
  cloudCloudSecurityEngineerCount: z.number().int().min(0).optional(),
  cloudCloudSecurityEngineerSalary: z.number().min(0).optional(),
  cloudCloudSecurityEngineerSalaryIncrement: z.number().min(0).max(100).optional(),
  // Cloud Database Administrator
  useCloudCloudDatabaseAdmin: z.boolean().optional(),
  cloudCloudDatabaseAdminCount: z.number().int().min(0).optional(),
  cloudCloudDatabaseAdminSalary: z.number().min(0).optional(),
  cloudCloudDatabaseAdminSalaryIncrement: z.number().min(0).max(100).optional(),
})

export type HumanResourcesValues = z.infer<typeof HumanResourcesSchema>
