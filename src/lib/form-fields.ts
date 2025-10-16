import type { FormFieldItem } from '@/components/app/form/form-field-search'

export const formFields: FormFieldItem[] = [
  // General (2 fields)
  {
    id: 'analysisPeriod',
    label: 'Analysis Period (Years)',
    category: 'General',
  },
  {
    id: 'inflationRate',
    label: 'Inflation Rate (%)',
    category: 'General',
  },

  // Compute (54 fields)
  // On-Premise CPU/Processors
  {
    id: 'useOnPremCpu',
    label: 'CPU/Processors',
    category: 'Compute',
  },
  {
    id: 'onPremCpuQuantity',
    label: 'Number of CPUs',
    category: 'Compute',
  },
  {
    id: 'onPremCpuUnitCost',
    label: 'Unit Cost per CPU ($)',
    category: 'Compute',
  },
  {
    id: 'onPremCpuSalvageValue',
    label: 'CPU Salvage Value (%)',
    category: 'Compute',
  },
  // On-Premise Motherboards/Servers
  {
    id: 'useOnPremMotherboard',
    label: 'Motherboards/Servers',
    category: 'Compute',
  },
  {
    id: 'onPremMotherboardQuantity',
    label: 'Number of Motherboards',
    category: 'Compute',
  },
  {
    id: 'onPremMotherboardUnitCost',
    label: 'Motherboard Unit Cost ($)',
    category: 'Compute',
  },
  {
    id: 'onPremMotherboardSalvageValue',
    label: 'Motherboard Salvage Value (%)',
    category: 'Compute',
  },
  // On-Premise RAM/Memory
  {
    id: 'useOnPremMemory',
    label: 'RAM/Memory',
    category: 'Compute',
  },
  {
    id: 'onPremMemoryCapacityGb',
    label: 'Total Memory Capacity (GB)',
    category: 'Compute',
  },
  {
    id: 'onPremMemoryCostPerGb',
    label: 'Memory Cost per GB ($)',
    category: 'Compute',
  },
  {
    id: 'onPremMemorySalvageValue',
    label: 'Memory Salvage Value (%)',
    category: 'Compute',
  },
  // On-Premise Chassis/Enclosures
  {
    id: 'useOnPremChassis',
    label: 'Chassis/Enclosures',
    category: 'Compute',
  },
  {
    id: 'onPremChassisQuantity',
    label: 'Number of Chassis',
    category: 'Compute',
  },
  {
    id: 'onPremChassisUnitCost',
    label: 'Chassis Unit Cost ($)',
    category: 'Compute',
  },
  {
    id: 'onPremChassisSalvageValue',
    label: 'Chassis Salvage Value (%)',
    category: 'Compute',
  },
  // On-Premise Racks & Cabinets
  {
    id: 'useOnPremRacks',
    label: 'Racks & Cabinets',
    category: 'Compute',
  },
  {
    id: 'onPremRacksQuantity',
    label: 'Number of Racks',
    category: 'Compute',
  },
  {
    id: 'onPremRacksUnitCost',
    label: 'Rack Unit Cost ($)',
    category: 'Compute',
  },
  {
    id: 'onPremRacksSalvageValue',
    label: 'Rack Salvage Value (%)',
    category: 'Compute',
  },
  // Cloud General Purpose VMs
  {
    id: 'useCloudGeneralVm',
    label: 'General Purpose VMs',
    category: 'Compute',
  },
  {
    id: 'cloudGeneralVmCount',
    label: 'General VM Instance Count',
    category: 'Compute',
  },
  {
    id: 'cloudGeneralVmHourlyRate',
    label: 'General VM Hourly Rate ($/hour)',
    category: 'Compute',
  },
  {
    id: 'cloudGeneralVmHoursPerMonth',
    label: 'General VM Hours Per Month',
    category: 'Compute',
  },
  // Cloud Compute Optimized VMs
  {
    id: 'useCloudComputeVm',
    label: 'Compute Optimized VMs',
    category: 'Compute',
  },
  {
    id: 'cloudComputeVmCount',
    label: 'Compute VM Instance Count',
    category: 'Compute',
  },
  {
    id: 'cloudComputeVmHourlyRate',
    label: 'Compute VM Hourly Rate ($/hour)',
    category: 'Compute',
  },
  {
    id: 'cloudComputeVmHoursPerMonth',
    label: 'Compute VM Hours Per Month',
    category: 'Compute',
  },
  // Cloud Memory Optimized VMs
  {
    id: 'useCloudMemoryVm',
    label: 'Memory Optimized VMs',
    category: 'Compute',
  },
  {
    id: 'cloudMemoryVmCount',
    label: 'Memory VM Instance Count',
    category: 'Compute',
  },
  {
    id: 'cloudMemoryVmHourlyRate',
    label: 'Memory VM Hourly Rate ($/hour)',
    category: 'Compute',
  },
  {
    id: 'cloudMemoryVmHoursPerMonth',
    label: 'Memory VM Hours Per Month',
    category: 'Compute',
  },
  // Cloud Storage Optimized VMs
  {
    id: 'useCloudStorageVm',
    label: 'Storage Optimized VMs',
    category: 'Compute',
  },
  {
    id: 'cloudStorageVmCount',
    label: 'Storage VM Instance Count',
    category: 'Compute',
  },
  {
    id: 'cloudStorageVmHourlyRate',
    label: 'Storage VM Hourly Rate ($/hour)',
    category: 'Compute',
  },
  {
    id: 'cloudStorageVmHoursPerMonth',
    label: 'Storage VM Hours Per Month',
    category: 'Compute',
  },

  // Energy (29 fields)
  // Colocation
  {
    id: 'useOnPremColocation',
    label: 'Colocation',
    category: 'Energy',
  },
  {
    id: 'onPremColocationMonthlyCost',
    label: 'Monthly Colocation Cost ($)',
    category: 'Energy',
  },
  {
    id: 'onPremColocationAnnualIncrease',
    label: 'Colocation Annual Cost Increase (%)',
    category: 'Energy',
  },
  // Power Consumption
  {
    id: 'useOnPremPowerConsumption',
    label: 'Power Consumption',
    category: 'Energy',
  },
  {
    id: 'onPremPowerRating',
    label: 'Power Rating (Watts)',
    category: 'Energy',
  },
  {
    id: 'onPremLoadFactor',
    label: 'Load Factor (%)',
    category: 'Energy',
  },
  {
    id: 'onPremElectricityCost',
    label: 'Electricity Cost ($/kWh)',
    category: 'Energy',
  },
  // UPS
  {
    id: 'useOnPremUps',
    label: 'UPS (Uninterruptible Power Supply)',
    category: 'Energy',
  },
  {
    id: 'onPremUpsUnitCost',
    label: 'UPS Unit Cost ($)',
    category: 'Energy',
  },
  {
    id: 'onPremUpsQuantity',
    label: 'Number of UPS Units',
    category: 'Energy',
  },
  {
    id: 'onPremUpsBatteryFailureRate',
    label: 'UPS Battery Failure Rate (%/year)',
    category: 'Energy',
  },
  {
    id: 'onPremUpsBatteryReplacementCost',
    label: 'UPS Battery Replacement Cost ($)',
    category: 'Energy',
  },
  // Generators
  {
    id: 'useOnPremGenerator',
    label: 'Generators',
    category: 'Energy',
  },
  {
    id: 'onPremGeneratorUnitCost',
    label: 'Generator Unit Cost ($)',
    category: 'Energy',
  },
  {
    id: 'onPremGeneratorQuantity',
    label: 'Number of Generators',
    category: 'Energy',
  },
  {
    id: 'onPremGeneratorFuelConsumptionRate',
    label: 'Generator Fuel Consumption Rate (L/hour)',
    category: 'Energy',
  },
  {
    id: 'onPremGeneratorFuelUnitCost',
    label: 'Generator Fuel Unit Cost ($/L)',
    category: 'Energy',
  },
  {
    id: 'onPremGeneratorAnnualUsageHours',
    label: 'Generator Annual Usage Hours',
    category: 'Energy',
  },
  // HVAC
  {
    id: 'useOnPremHvac',
    label: 'HVAC (Heating, Ventilation, Air Conditioning)',
    category: 'Energy',
  },
  {
    id: 'onPremHvacUnitCost',
    label: 'HVAC Unit Cost ($)',
    category: 'Energy',
  },
  {
    id: 'onPremHvacQuantity',
    label: 'Number of HVAC Units',
    category: 'Energy',
  },
  {
    id: 'onPremHvacPowerConsumption',
    label: 'HVAC Power Consumption per Unit (Watts)',
    category: 'Energy',
  },
  {
    id: 'onPremHvacLoadFactor',
    label: 'HVAC Load Factor (%)',
    category: 'Energy',
  },
  {
    id: 'onPremHvacTechnicianHourlyRate',
    label: 'HVAC Technician Hourly Rate ($/hour)',
    category: 'Energy',
  },
  {
    id: 'onPremHvacHoursWorked',
    label: 'HVAC Annual Maintenance Hours',
    category: 'Energy',
  },

  // GPU (16 fields)
  // On-Premise Training GPUs
  {
    id: 'useOnPremTrainingGpu',
    label: 'Training GPUs',
    category: 'GPU',
  },
  {
    id: 'onPremTrainingGpuQuantity',
    label: 'Training GPU Quantity',
    category: 'GPU',
  },
  {
    id: 'onPremTrainingGpuUnitCost',
    label: 'Training GPU Unit Cost ($)',
    category: 'GPU',
  },
  // On-Premise Inference GPUs
  {
    id: 'useOnPremInferenceGpu',
    label: 'Inference GPUs',
    category: 'GPU',
  },
  {
    id: 'onPremInferenceGpuQuantity',
    label: 'Inference GPU Quantity',
    category: 'GPU',
  },
  {
    id: 'onPremInferenceGpuUnitCost',
    label: 'Inference GPU Unit Cost ($)',
    category: 'GPU',
  },
  // Cloud Training GPUs
  {
    id: 'useCloudTrainingGpu',
    label: 'Cloud Training GPUs',
    category: 'GPU',
  },
  {
    id: 'cloudTrainingGpuCount',
    label: 'Cloud Training GPU Instance Count',
    category: 'GPU',
  },
  {
    id: 'cloudTrainingGpuHourlyRate',
    label: 'Cloud Training GPU Hourly Rate ($/hour)',
    category: 'GPU',
  },
  {
    id: 'cloudTrainingGpuHoursPerMonth',
    label: 'Cloud Training GPU Hours Per Month',
    category: 'GPU',
  },
  // Cloud Inference GPUs
  {
    id: 'useCloudInferenceGpu',
    label: 'Cloud Inference GPUs',
    category: 'GPU',
  },
  {
    id: 'cloudInferenceGpuCount',
    label: 'Cloud Inference GPU Instance Count',
    category: 'GPU',
  },
  {
    id: 'cloudInferenceGpuHourlyRate',
    label: 'Cloud Inference GPU Hourly Rate ($/hour)',
    category: 'GPU',
  },
  {
    id: 'cloudInferenceGpuHoursPerMonth',
    label: 'Cloud Inference GPU Hours Per Month',
    category: 'GPU',
  },

  // Human Resources (44 fields)
  // On-Premise System Administrator
  {
    id: 'useOnPremSysAdmin',
    label: 'System Administrator',
    category: 'Human Resources',
  },
  {
    id: 'onPremSysAdminCount',
    label: 'System Administrator Count',
    category: 'Human Resources',
  },
  {
    id: 'onPremSysAdminSalary',
    label: 'System Administrator Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'onPremSysAdminSalaryIncrement',
    label: 'System Administrator Salary Increment (%)',
    category: 'Human Resources',
  },
  // On-Premise Network Engineer
  {
    id: 'useOnPremNetworkEngineer',
    label: 'Network Engineer',
    category: 'Human Resources',
  },
  {
    id: 'onPremNetworkEngineerCount',
    label: 'Network Engineer Count',
    category: 'Human Resources',
  },
  {
    id: 'onPremNetworkEngineerSalary',
    label: 'Network Engineer Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'onPremNetworkEngineerSalaryIncrement',
    label: 'Network Engineer Salary Increment (%)',
    category: 'Human Resources',
  },
  // On-Premise Storage Administrator
  {
    id: 'useOnPremStorageAdmin',
    label: 'Storage Administrator',
    category: 'Human Resources',
  },
  {
    id: 'onPremStorageAdminCount',
    label: 'Storage Administrator Count',
    category: 'Human Resources',
  },
  {
    id: 'onPremStorageAdminSalary',
    label: 'Storage Administrator Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'onPremStorageAdminSalaryIncrement',
    label: 'Storage Administrator Salary Increment (%)',
    category: 'Human Resources',
  },
  // On-Premise Security Engineer
  {
    id: 'useOnPremSecurityEngineer',
    label: 'Security Engineer',
    category: 'Human Resources',
  },
  {
    id: 'onPremSecurityEngineerCount',
    label: 'Security Engineer Count',
    category: 'Human Resources',
  },
  {
    id: 'onPremSecurityEngineerSalary',
    label: 'Security Engineer Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'onPremSecurityEngineerSalaryIncrement',
    label: 'Security Engineer Salary Increment (%)',
    category: 'Human Resources',
  },
  // On-Premise Database Administrator
  {
    id: 'useOnPremDatabaseAdmin',
    label: 'Database Administrator',
    category: 'Human Resources',
  },
  {
    id: 'onPremDatabaseAdminCount',
    label: 'Database Administrator Count',
    category: 'Human Resources',
  },
  {
    id: 'onPremDatabaseAdminSalary',
    label: 'Database Administrator Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'onPremDatabaseAdminSalaryIncrement',
    label: 'Database Administrator Salary Increment (%)',
    category: 'Human Resources',
  },
  // On-Premise Data Center Technician
  {
    id: 'useOnPremDataCenterTech',
    label: 'Data Center Technician',
    category: 'Human Resources',
  },
  {
    id: 'onPremDataCenterTechCount',
    label: 'Data Center Technician Count',
    category: 'Human Resources',
  },
  {
    id: 'onPremDataCenterTechSalary',
    label: 'Data Center Technician Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'onPremDataCenterTechSalaryIncrement',
    label: 'Data Center Technician Salary Increment (%)',
    category: 'Human Resources',
  },
  // Cloud DevOps Engineer
  {
    id: 'useCloudDevOpsEngineer',
    label: 'DevOps Engineer',
    category: 'Human Resources',
  },
  {
    id: 'cloudDevOpsEngineerCount',
    label: 'DevOps Engineer Count',
    category: 'Human Resources',
  },
  {
    id: 'cloudDevOpsEngineerSalary',
    label: 'DevOps Engineer Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'cloudDevOpsEngineerSalaryIncrement',
    label: 'DevOps Engineer Salary Increment (%)',
    category: 'Human Resources',
  },
  // Cloud Architect
  {
    id: 'useCloudCloudArchitect',
    label: 'Cloud Architect',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudArchitectCount',
    label: 'Cloud Architect Count',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudArchitectSalary',
    label: 'Cloud Architect Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudArchitectSalaryIncrement',
    label: 'Cloud Architect Salary Increment (%)',
    category: 'Human Resources',
  },
  // Cloud Site Reliability Engineer
  {
    id: 'useCloudSiteReliabilityEngineer',
    label: 'Site Reliability Engineer',
    category: 'Human Resources',
  },
  {
    id: 'cloudSiteReliabilityEngineerCount',
    label: 'Site Reliability Engineer Count',
    category: 'Human Resources',
  },
  {
    id: 'cloudSiteReliabilityEngineerSalary',
    label: 'Site Reliability Engineer Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'cloudSiteReliabilityEngineerSalaryIncrement',
    label: 'Site Reliability Engineer Salary Increment (%)',
    category: 'Human Resources',
  },
  // Cloud Security Engineer
  {
    id: 'useCloudCloudSecurityEngineer',
    label: 'Cloud Security Engineer',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudSecurityEngineerCount',
    label: 'Cloud Security Engineer Count',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudSecurityEngineerSalary',
    label: 'Cloud Security Engineer Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudSecurityEngineerSalaryIncrement',
    label: 'Cloud Security Engineer Salary Increment (%)',
    category: 'Human Resources',
  },
  // Cloud Database Administrator
  {
    id: 'useCloudCloudDatabaseAdmin',
    label: 'Cloud Database Administrator',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudDatabaseAdminCount',
    label: 'Cloud Database Administrator Count',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudDatabaseAdminSalary',
    label: 'Cloud Database Administrator Annual Salary ($)',
    category: 'Human Resources',
  },
  {
    id: 'cloudCloudDatabaseAdminSalaryIncrement',
    label: 'Cloud Database Administrator Salary Increment (%)',
    category: 'Human Resources',
  },

  // Networking (40 fields)
  // On-Premise Bandwidth
  {
    id: 'useOnPremBandwidth',
    label: 'Bandwidth Costs',
    category: 'Networking',
  },
  {
    id: 'onPremBandwidthUsage',
    label: 'Bandwidth Usage (GB/month)',
    category: 'Networking',
  },
  {
    id: 'onPremBandwidthCostPerGb',
    label: 'Bandwidth Cost ($/GB)',
    category: 'Networking',
  },
  {
    id: 'onPremAnnualTrafficGrowth',
    label: 'Annual Traffic Growth (%)',
    category: 'Networking',
  },
  // On-Premise CDN
  {
    id: 'useOnPremCdn',
    label: 'Include CDN Costs',
    category: 'Networking',
  },
  {
    id: 'onPremCdnUsage',
    label: 'CDN Usage (GB/month)',
    category: 'Networking',
  },
  {
    id: 'onPremCdnCostPerGb',
    label: 'CDN Cost ($/GB)',
    category: 'Networking',
  },
  // On-Premise Core Switch
  {
    id: 'useOnPremCoreSwitch',
    label: 'Include Core Switch',
    category: 'Networking',
  },
  {
    id: 'onPremCoreSwitchQuantity',
    label: 'Core Switch Quantity',
    category: 'Networking',
  },
  {
    id: 'onPremCoreSwitchUnitCost',
    label: 'Core Switch Unit Cost ($)',
    category: 'Networking',
  },
  {
    id: 'onPremCoreSwitchSalvageValue',
    label: 'Core Switch Salvage Value (%)',
    category: 'Networking',
  },
  // On-Premise Aggregation Switch
  {
    id: 'useOnPremAggregationSwitch',
    label: 'Aggregation Switch',
    category: 'Networking',
  },
  {
    id: 'onPremAggregationSwitchQuantity',
    label: 'Aggregation Switch Quantity',
    category: 'Networking',
  },
  {
    id: 'onPremAggregationSwitchUnitCost',
    label: 'Aggregation Switch Unit Cost ($)',
    category: 'Networking',
  },
  {
    id: 'onPremAggregationSwitchSalvageValue',
    label: 'Aggregation Switch Salvage Value (%)',
    category: 'Networking',
  },
  // On-Premise Access Switch
  {
    id: 'useOnPremAccessSwitch',
    label: 'Access Switch',
    category: 'Networking',
  },
  {
    id: 'onPremAccessSwitchQuantity',
    label: 'Access Switch Quantity',
    category: 'Networking',
  },
  {
    id: 'onPremAccessSwitchUnitCost',
    label: 'Access Switch Unit Cost ($)',
    category: 'Networking',
  },
  {
    id: 'onPremAccessSwitchSalvageValue',
    label: 'Access Switch Salvage Value (%)',
    category: 'Networking',
  },
  // On-Premise Cabling
  {
    id: 'useOnPremCabling',
    label: 'Cabling',
    category: 'Networking',
  },
  {
    id: 'onPremCablingLength',
    label: 'Cabling Length (meters)',
    category: 'Networking',
  },
  {
    id: 'onPremCablingUnitPrice',
    label: 'Cabling Unit Price ($/meter)',
    category: 'Networking',
  },
  {
    id: 'onPremCablingSalvageValue',
    label: 'Cabling Salvage Value (%)',
    category: 'Networking',
  },
  // On-Premise QSFP
  {
    id: 'useOnPremQsfp',
    label: 'QSFP Cards',
    category: 'Networking',
  },
  {
    id: 'onPremQsfpQuantity',
    label: 'QSFP Quantity',
    category: 'Networking',
  },
  {
    id: 'onPremQsfpUnitCost',
    label: 'QSFP Unit Cost ($)',
    category: 'Networking',
  },
  {
    id: 'onPremQsfpSalvageValue',
    label: 'QSFP Salvage Value (%)',
    category: 'Networking',
  },
  // Cloud Egress
  {
    id: 'useCloudEgress',
    label: 'Egress Configuration',
    category: 'Networking',
  },
  {
    id: 'cloudEgress',
    label: 'Egress (TB/month)',
    category: 'Networking',
  },
  {
    id: 'cloudEgressGrowthRate',
    label: 'Egress Growth Rate (%)',
    category: 'Networking',
  },
  {
    id: 'cloudEgressCostPerUnit',
    label: 'Egress Cost ($/GB)',
    category: 'Networking',
  },
  // Cloud Ingress
  {
    id: 'useCloudIngress',
    label: 'Ingress Configuration',
    category: 'Networking',
  },
  {
    id: 'cloudIngress',
    label: 'Ingress (TB/month)',
    category: 'Networking',
  },
  {
    id: 'cloudIngressGrowthRate',
    label: 'Ingress Growth Rate (%)',
    category: 'Networking',
  },
  {
    id: 'cloudIngressCostPerUnit',
    label: 'Ingress Cost ($/GB)',
    category: 'Networking',
  },

  // Software (24 fields)
  // On-Premise Virtualization
  {
    id: 'useOnPremVirtualization',
    label: 'Virtualization',
    category: 'Software',
  },
  {
    id: 'onPremVirtualizationUnitCost',
    label: 'Virtualization Annual Unit Cost ($)',
    category: 'Software',
  },
  {
    id: 'onPremVirtualizationLicenses',
    label: 'Virtualization Licenses',
    category: 'Software',
  },
  // On-Premise Operating System
  {
    id: 'useOnPremOperatingSystem',
    label: 'Operating System',
    category: 'Software',
  },
  {
    id: 'onPremOperatingSystemUnitCost',
    label: 'Operating System Annual Unit Cost ($)',
    category: 'Software',
  },
  {
    id: 'onPremOperatingSystemLicenses',
    label: 'Operating System Licenses',
    category: 'Software',
  },
  // On-Premise Storage Management
  {
    id: 'useOnPremStorage',
    label: 'Storage Management',
    category: 'Software',
  },
  {
    id: 'onPremStorageUnitCost',
    label: 'Storage Management Annual Unit Cost ($)',
    category: 'Software',
  },
  {
    id: 'onPremStorageLicenses',
    label: 'Storage Management Licenses',
    category: 'Software',
  },
  // On-Premise Backup Software
  {
    id: 'useOnPremBackupSoftware',
    label: 'Backup Software',
    category: 'Software',
  },
  {
    id: 'onPremBackupSoftwareUnitCost',
    label: 'Backup Software Annual Unit Cost ($)',
    category: 'Software',
  },
  {
    id: 'onPremBackupSoftwareLicenses',
    label: 'Backup Software Licenses',
    category: 'Software',
  },
  // On-Premise Monitoring
  {
    id: 'useOnPremMonitoring',
    label: 'Monitoring & Observability',
    category: 'Software',
  },
  {
    id: 'onPremMonitoringUnitCost',
    label: 'Monitoring Annual Unit Cost ($)',
    category: 'Software',
  },
  {
    id: 'onPremMonitoringLicenses',
    label: 'Monitoring Licenses',
    category: 'Software',
  },
  // On-Premise Security
  {
    id: 'useOnPremSecurity',
    label: 'Security Software',
    category: 'Software',
  },
  {
    id: 'onPremSecurityUnitCost',
    label: 'Security Software Annual Unit Cost ($)',
    category: 'Software',
  },
  {
    id: 'onPremSecurityLicenses',
    label: 'Security Software Licenses',
    category: 'Software',
  },
  // Cloud Database
  {
    id: 'useCloudDatabase',
    label: 'Database Services',
    category: 'Software',
  },
  {
    id: 'cloudDatabaseMonthlyCost',
    label: 'Database Services Monthly Cost ($)',
    category: 'Software',
  },
  // Cloud Operating System
  {
    id: 'useCloudOperatingSystem',
    label: 'Operating System Licenses',
    category: 'Software',
  },
  {
    id: 'cloudOperatingSystemMonthlyCost',
    label: 'Operating System Monthly Cost ($)',
    category: 'Software',
  },
  // Cloud Analytics
  {
    id: 'useCloudAnalytics',
    label: 'Analytics & BI',
    category: 'Software',
  },
  {
    id: 'cloudAnalyticsMonthlyCost',
    label: 'Analytics Monthly Cost ($)',
    category: 'Software',
  },
  // Cloud Telemetry
  {
    id: 'useCloudTelemetry',
    label: 'Telemetry & Logging',
    category: 'Software',
  },
  {
    id: 'cloudTelemetryMonthlyCost',
    label: 'Telemetry Monthly Cost ($)',
    category: 'Software',
  },
  // Cloud Monitoring
  {
    id: 'useCloudMonitoring',
    label: 'Monitoring & APM',
    category: 'Software',
  },
  {
    id: 'cloudMonitoringMonthlyCost',
    label: 'Monitoring Monthly Cost ($)',
    category: 'Software',
  },
  // Cloud Security
  {
    id: 'useCloudSecurity',
    label: 'Security Services',
    category: 'Software',
  },
  {
    id: 'cloudSecurityMonthlyCost',
    label: 'Security Services Monthly Cost ($)',
    category: 'Software',
  },

  // Storage (28 fields)
  // On-Premise HDD
  {
    id: 'useOnPremHdd',
    label: 'HDD Configuration',
    category: 'Storage',
  },
  {
    id: 'onPremHddCount',
    label: 'Number of HDDs',
    category: 'Storage',
  },
  {
    id: 'onPremHddSizeTb',
    label: 'Size per HDD (TB)',
    category: 'Storage',
  },
  {
    id: 'onPremHddRaidFactor',
    label: 'HDD RAID Overhead (%)',
    category: 'Storage',
  },
  {
    id: 'onPremHddFailureRate',
    label: 'HDD Failure Rate (%)',
    category: 'Storage',
  },
  {
    id: 'onPremHddUnitCost',
    label: 'HDD Unit Cost ($)',
    category: 'Storage',
  },
  // On-Premise SSD
  {
    id: 'useOnPremSsd',
    label: 'SSD Configuration',
    category: 'Storage',
  },
  {
    id: 'onPremSsdCount',
    label: 'Number of SSDs',
    category: 'Storage',
  },
  {
    id: 'onPremSsdSizeTb',
    label: 'Size per SSD (TB)',
    category: 'Storage',
  },
  {
    id: 'onPremSsdRaidFactor',
    label: 'SSD RAID Overhead (%)',
    category: 'Storage',
  },
  {
    id: 'onPremSsdFailureRate',
    label: 'SSD Failure Rate (%)',
    category: 'Storage',
  },
  {
    id: 'onPremSsdUnitCost',
    label: 'SSD Unit Cost ($)',
    category: 'Storage',
  },
  // On-Premise Backup
  {
    id: 'useOnPremBackup',
    label: 'Backup Configuration',
    category: 'Storage',
  },
  {
    id: 'onPremBackupStorage',
    label: 'Backup Storage (TB)',
    category: 'Storage',
  },
  {
    id: 'onPremBackupCostPerUnit',
    label: 'Backup Cost ($/TB/year)',
    category: 'Storage',
  },
  // On-Premise Replication
  {
    id: 'useOnPremReplication',
    label: 'Replication Configuration',
    category: 'Storage',
  },
  {
    id: 'onPremReplicationFactor',
    label: 'Replication Factor',
    category: 'Storage',
  },
  // Cloud Storage
  {
    id: 'cloudStorageSize',
    label: 'Storage Size (TB)',
    category: 'Storage',
  },
  {
    id: 'cloudGrowthRate',
    label: 'Storage Growth Rate (%)',
    category: 'Storage',
  },
  {
    id: 'cloudHotTier',
    label: 'Hot Tier (%)',
    category: 'Storage',
  },
  {
    id: 'cloudStandardTier',
    label: 'Standard Tier (%)',
    category: 'Storage',
  },
  {
    id: 'cloudArchiveTier',
    label: 'Archive Tier (%)',
    category: 'Storage',
  },
  {
    id: 'cloudHotStorageCost',
    label: 'Hot Storage Cost ($/GB/month)',
    category: 'Storage',
  },
  {
    id: 'cloudStandardStorageCost',
    label: 'Standard Storage Cost ($/GB/month)',
    category: 'Storage',
  },
  {
    id: 'cloudArchiveStorageCost',
    label: 'Archive Storage Cost ($/GB/month)',
    category: 'Storage',
  },
]
