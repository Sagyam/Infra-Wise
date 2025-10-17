# 📖 Usage Guide

## Quick Start

After [installation](INSTALLATION.md), InfraWise opens with realistic default values. You can immediately click **Calculate** to see a sample TCO analysis, or customize inputs to match your infrastructure.

## Interface Overview

### Navigation

The sidebar provides access to all sections:

- **Quick Start**: Load preset scenarios
- **General**: Analysis period, inflation, calculation mode
- **Energy**: On-premise power and colocation costs
- **Storage**: Drive configuration and cloud storage tiers
- **Compute**: Hardware and VM instances
- **GPU**: Training and inference GPU resources
- **Networking**: Switches, bandwidth, and egress costs
- **Human Cost**: Personnel salaries and counts
- **Software**: Licenses and managed services
- **Security & Compliance**: Certifications and security features
- **Analysis**: View results in Charts, Cumulative, and Breakdown views
- **Sensitivity Analysis**: Understand variable impact on TCO

### Global Search

Press `Cmd+K` (Mac) or `Ctrl+K` (Windows) to open the global search:

- Find any field or section instantly
- Fuzzy matching (works with typos)
- Navigate directly from search results

## Step-by-Step Guide

### 1. Choose a Preset (Optional)

Navigate to **Quick Start** in the sidebar:

1. Review available presets:
   - **Startup**: Early-stage company with minimal infrastructure
   - **Mid-Sized Company**: Growing infrastructure needs
   - **Enterprise**: Large-scale, complex deployments

2. Click **Load Preset** to populate all fields with realistic values

3. Modify any values to match your specific needs

### 2. Configure General Settings

Navigate to **General** section:

#### Analysis Period
- Set the timeframe for your TCO analysis (1-30 years)
- Longer periods show breakeven points for large upfront investments
- Example: 5 years for typical planning cycles

#### Data Unit
- Choose GB, TB, or PB based on your scale
- Affects storage and bandwidth input fields
- Example: TB for most mid-sized deployments

#### Inflation Rate
- Enter expected annual inflation rate (%)
- Applied to recurring costs each year
- Example: 3% for typical economic conditions

#### Calculation Mode
- **TCO Mode**: Shows total cost over analysis period
- **Amortized Mode**: Shows average annual cost
- Use Amortized for consistent budget planning

### 3. Configure On-Premise Costs

#### Energy (On-Premise Only)

Navigate to **Energy** section:

**Basic Power Settings:**
- **Power Rating (W)**: Total watts for all servers
- **Load Factor (%)**: Average load (typically 60-80%)
- **Electricity Cost ($/kWh)**: Your commercial rate
- **Hours Per Day**: Usually 24 for data centers

**Optional Components** (toggle to enable):

- **Colocation Facility**:
  - Monthly rental cost for rack space
  - One-time setup fees
  - Common for businesses without data centers

- **UPS System**:
  - Uninterruptible Power Supply capacity (kVA)
  - Unit cost per kVA
  - Maintenance costs

- **Backup Generator**:
  - Generator capacity (kW)
  - One-time purchase cost
  - Annual fuel and maintenance

- **HVAC System**:
  - Cooling capacity (tons)
  - Power consumption (W)
  - Installation and maintenance costs

#### Storage

Navigate to **Storage** section:

**On-Premise Tab:**

- **HDD Configuration**:
  - Drive count and capacity
  - Unit cost per drive
  - Annual failure rate (%)
  - Use for bulk storage

- **SSD Configuration**:
  - Drive count and capacity
  - Unit cost per drive
  - Annual failure rate (%)
  - Use for performance storage

- **RAID Overhead**:
  - Select RAID level (0, 1, 5, 6, 10)
  - Affects usable capacity calculations

- **Backup Storage**:
  - Additional drives for backups
  - Separate from primary storage

**Cloud Tab:**

- **Storage Size**: Total capacity needed
- **Growth Rate (%)**: Annual storage increase
- **Tier Distribution**:
  - Hot Storage (%): Frequently accessed (premium cost)
  - Standard Storage (%): Regular access
  - Archive Storage (%): Long-term retention (lowest cost)
- **Costs per GB**: Pricing for each tier
- **Egress Costs**: Data transfer out charges

#### Compute

Navigate to **Compute** section:

**On-Premise Tab:**

- **CPU**: Quantity and unit cost per processor
- **Motherboard**: Server motherboards needed
- **Memory**: Total GB and cost per GB
- **Chassis**: Server enclosures
- **Racks**: Physical rack infrastructure
- **Salvage Value (%)**: Residual value at end-of-life (typically 10-20%)

**Cloud Tab:**

- **General Purpose VMs**:
  - Instance count
  - Hourly rate per instance
  - Use for: Web servers, app servers

- **Compute-Optimized VMs**:
  - High-performance CPUs
  - Use for: Batch processing, analytics

- **Memory-Optimized VMs**:
  - Large memory footprints
  - Use for: In-memory databases, caching

- **Storage-Optimized VMs**:
  - High disk throughput
  - Use for: Data warehousing, big data

#### GPU

Navigate to **GPU** section:

**On-Premise Tab:**

- **Training GPUs**:
  - High-end GPUs (H100, A100)
  - Quantity and unit cost
  - Salvage value
  - Use for: ML model training

- **Inference GPUs**:
  - Optimized GPUs (L40, T4)
  - Quantity and unit cost
  - Salvage value
  - Use for: Model serving, inference workloads

**Cloud Tab:**

- **Training GPU Instances**:
  - Instance count
  - Hourly rate (e.g., $4-30/hr)
  - Monthly hours of usage

- **Inference GPU Instances**:
  - Instance count
  - Hourly rate (typically lower than training)
  - Monthly hours of usage

#### Networking

Navigate to **Networking** section:

**On-Premise Tab:**

- **Core Switches**: High-capacity backbone switches
- **Aggregation Switches**: Distribution layer
- **Access Switches**: Edge networking
- **Cabling**: Structured cabling costs
- **QSFP+ Modules**: High-speed transceivers
- **Bandwidth**: ISP bandwidth (TB/month) and cost per GB
- **CDN**: Content delivery network services

**Cloud Tab:**

- **Egress**: Data transfer out (TB/month)
- **Growth Rate (%)**: Annual egress increase
- **Cost per GB**: Cloud provider egress charges

#### Human Resources

Navigate to **Human Cost** section:

**On-Premise Personnel** (toggle each to enable):

- **System Administrators**: Server management
- **Network Engineers**: Network operations
- **Storage Administrators**: Storage systems
- **Security Engineers**: Security operations
- **Database Administrators**: Database management
- **Data Center Technicians**: Physical infrastructure

**Cloud Personnel** (toggle each to enable):

- **DevOps Engineers**: Infrastructure automation
- **Cloud Architects**: Solution design
- **Site Reliability Engineers**: Service reliability
- **Cloud Security Engineers**: Cloud security
- **Cloud Database Administrators**: Managed databases

For each role:
- **Count**: Number of employees
- **Annual Salary**: Yearly compensation
- **Annual Increment (%)**: Yearly raises

**Salary Defaults**: Pre-configured with California benchmarks.

#### Software

Navigate to **Software** section:

**On-Premise Licenses** (toggle each to enable):

- **Virtualization**: VMware, Hyper-V licenses
- **Operating System**: Windows Server, RHEL
- **Backup Software**: Veeam, Commvault
- **Monitoring**: Datadog, New Relic on-premise
- **Security**: Endpoint protection, SIEM

For each license:
- **Quantity**: Number of licenses
- **Unit Cost**: Cost per license
- **Support & Maintenance (%)**: Annual support fee percentage

**Cloud Services** (toggle each to enable):

- **Managed Databases**: RDS, Aurora, Cosmos DB
- **Analytics**: Redshift, BigQuery, Synapse
- **Telemetry**: Application monitoring
- **Monitoring**: CloudWatch, Azure Monitor
- **Security**: GuardDuty, Security Center

For each service:
- **Monthly Cost**: Recurring service fee

### 4. Configure Security & Compliance

Navigate to **Security & Compliance** section:

**Compliance Certifications** (toggle each to enable):

- **SOC 2**: Service organization controls
- **ISO 27001**: Information security management
- **HIPAA**: Healthcare data protection
- **PCI DSS**: Payment card security
- **GDPR**: EU data protection

**Security Features** (toggle each to enable):

- **DDoS Protection**: Attack mitigation
- **Web Application Firewall**: Application security
- **Bot Protection**: Bot detection and blocking
- **Security Audits**: Third-party assessments
- **Penetration Testing**: Ethical hacking tests

For each item:
- **Cost Type**: One-time or Recurring (Annual)
- **Cost ($)**: Implementation or annual cost

### 5. Calculate Results

Click the **Calculate** button at the top of the page to run the TCO analysis.

### 6. View Results

Navigate to **Analysis** section to see three views:

#### Charts View

- **Side-by-side comparison**: On-premise vs. cloud stacked bar charts
- **Year-by-year breakdown**: Cost progression over time
- **Color-coded categories**:
  - Energy (yellow)
  - Storage (orange)
  - Compute (red)
  - GPU (purple)
  - Networking (blue)
  - Human (teal)
  - Software (green)
  - Security & Compliance (pink)

#### Cumulative View

- **Running total**: Cumulative costs over analysis period
- **Summary cards**:
  - Total On-Premise TCO
  - Total Cloud TCO
  - Cost Difference
  - Winner (lower cost option)
  - Breakeven Year (if applicable)
- **CapEx/OpEx Visualization**:
  - Separate charts for on-premise and cloud
  - Stacked bars showing capital vs. operational expenditure
  - Year-by-year CapEx/OpEx breakdown

#### Breakdown View

- **Detailed tables**: All line items for on-premise and cloud
- **Category grouping**: Organized by cost category
- **Year-by-year values**: See costs for each year
- **Totals**: Sum for each category and overall

### 7. Export Results

Click **Export to CSV** button to download:
- Complete analysis data
- Year-by-year breakdown
- All cost categories
- Opens in Excel or Google Sheets

### 8. Sensitivity Analysis

Navigate to **Sensitivity Analysis** section:

1. **Enable**: Toggle "Enable Sensitivity Analysis"

2. **Select Variable**:
   - Click dropdown to open searchable list
   - Browse by category (General, Storage, Compute, etc.)
   - Select variable to analyze (e.g., "Inflation Rate", "Cloud Storage Size")

3. **Set Range**:
   - Enter percentage range to vary (e.g., ±20%)
   - Larger ranges show more dramatic impacts

4. **View Results**:
   - Line chart shows TCO impact
   - Blue line: On-premise costs
   - Orange line: Cloud costs
   - X-axis: Percentage change in variable
   - Y-axis: Total cost

5. **Interpret Results**:
   - Steeper lines = more sensitive to that variable
   - Flat lines = insensitive to changes
   - Use to identify cost drivers
   - Focus optimization efforts on high-impact variables

**Example Use Cases**:
- Test different inflation scenarios
- Understand storage growth impact
- Model salary changes
- Evaluate cloud pricing changes

## Tips & Best Practices

### Getting Accurate Results

1. **Use Realistic Values**:
   - Base on actual quotes or invoices
   - Include all costs (often forgotten: cooling, networking)

2. **Include All Personnel**:
   - Don't forget part-time contractors
   - Include benefits in salary costs (or add 20-30%)

3. **Model Growth**:
   - Storage and bandwidth typically grow 20-50% annually
   - Plan for actual growth, not just current state

4. **Consider Hidden Costs**:
   - On-prem: Space, power, cooling, maintenance
   - Cloud: Egress, API calls, data transfer

### Common Scenarios

#### Scenario 1: Cloud Migration Decision

1. Load "Mid-Sized Company" preset
2. Adjust on-prem values to match current infrastructure
3. Configure comparable cloud resources
4. Calculate and view cumulative results
5. Check breakeven year
6. Export for stakeholder presentation

#### Scenario 2: Budget Planning

1. Use **Amortized Mode** in General settings
2. Configure realistic infrastructure for next year
3. Include planned growth rates
4. Calculate to see average annual cost
5. Use for annual budget submissions

#### Scenario 3: Capacity Planning

1. Model current state
2. Run sensitivity analysis on storage size
3. Test different growth rates
4. Identify optimal scaling strategy
5. Plan procurement accordingly

#### Scenario 4: Cost Optimization

1. Calculate current infrastructure costs
2. Run sensitivity analysis on high-cost categories
3. Identify top cost drivers
4. Model alternative configurations
5. Compare results

### Keyboard Shortcuts

- `Cmd+K` / `Ctrl+K`: Open global search
- `Esc`: Close search dialog
- `Tab`: Navigate between form fields

## Understanding Results

### TCO vs. Amortized Mode

- **TCO Mode**: Shows cumulative total cost
  - Use for: Long-term planning, ROI calculations
  - Example: "Total cost over 5 years: $5M"

- **Amortized Mode**: Shows average annual cost
  - Use for: Annual budgets, consistent planning
  - Example: "Average annual cost: $1M/year"

### Breakeven Point

The year when cumulative costs become equal. Indicates:
- If on-prem is cheaper initially, breakeven shows when cloud becomes cheaper
- If cloud is cheaper initially, there may be no breakeven
- Useful for migration timing decisions

### CapEx vs. OpEx

- **CapEx (Capital Expenditure)**:
  - One-time hardware purchases
  - Infrastructure setup costs
  - Certification implementation fees
  - Shows up heavily in Year 1 for on-premise

- **OpEx (Operating Expenditure)**:
  - Recurring costs (salaries, power, licenses)
  - Cloud services (typically all OpEx)
  - Annual maintenance and support

**Why it matters**:
- Different budget pools in many organizations
- Tax treatment varies by expenditure type
- Cloud is mostly OpEx, on-prem is mixed

## Troubleshooting

### Unexpected Results

**Issue**: On-premise costs seem too high
- Check energy costs (often underestimated)
- Verify personnel costs are included
- Look at software licensing costs
- Review RAID overhead impact on storage

**Issue**: Cloud costs seem too high
- Check egress costs (often significant)
- Verify VM hourly rates are realistic
- Review storage tier distribution
- Check if growth rates are too aggressive

**Issue**: No breakeven point shown
- Costs may never cross over
- Try different analysis periods
- One option is consistently cheaper
- This is valid and useful information

### Form Validation Errors

- **Red borders**: Invalid input values
- **Error messages**: Specific guidance on what's wrong
- **Common issues**: Negative numbers, values outside ranges
- **Fix**: Adjust values to meet validation requirements

### Performance Issues

If the app feels slow:
- Simplify sensitivity analysis (fewer data points)
- Reduce analysis period if very long (20+ years)
- Close and reopen browser tab
- Clear browser cache

## Next Steps

- 📋 Explore all [Features](FEATURES.md)
- 🤝 [Contribute](CONTRIBUTING.md) improvements
- 💡 Share your TCO findings with your team
- ⭐ Star the project on GitHub
