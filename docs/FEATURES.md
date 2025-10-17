# 📋 Features

## 💰 Comprehensive Cost Modeling

InfraWise tracks all aspects of infrastructure costs for accurate TCO comparison.

### On-Premise Infrastructure

#### Energy Costs
- **Power Consumption**: Model watts, load factor, and electricity costs
- **Colocation Facilities**: Monthly colocation fees and setup costs
- **UPS Systems**: Uninterruptible Power Supply with capacity and costs
- **Backup Generators**: Diesel/natural gas generators with fuel costs
- **HVAC Systems**: Cooling systems with power ratings and efficiency

#### Storage
- **Drive Configuration**: HDD and SSD counts with unit costs
- **RAID Overhead**: Configurable RAID levels (RAID 5, RAID 6, RAID 10)
- **Failure Rates**: Annual drive failure rates for replacement budgeting
- **Backup Storage**: Separate backup drive configuration
- **Drive Capacity**: Flexible capacity per drive

#### Compute Hardware
- **CPUs**: Quantity and unit cost per processor
- **Motherboards**: Server-grade motherboards with costs
- **Memory**: RAM capacity and cost per GB
- **Chassis**: Server chassis/enclosures
- **Server Racks**: Rack infrastructure costs
- **Salvage Value**: Hardware depreciation and end-of-life value recovery

#### GPU Infrastructure
- **Training GPUs**: High-end GPUs (e.g., H100, A100) for ML training workloads
- **Inference GPUs**: Optimized GPUs (e.g., L40, T4) for inference workloads
- **Hardware Depreciation**: Salvage value calculation for GPU hardware

#### Networking
- **Core Switches**: High-capacity core network switches
- **Aggregation Switches**: Distribution layer switches
- **Access Switches**: Edge network switches
- **Cabling**: Structured cabling infrastructure
- **QSFP+ Modules**: High-speed network transceivers
- **Bandwidth**: ISP bandwidth costs with growth modeling
- **CDN Services**: Content delivery network costs

#### Human Resources
- **System Administrators**: Server and infrastructure management
- **Network Engineers**: Network design and operations
- **Storage Administrators**: Storage systems management
- **Security Engineers**: Security operations and compliance
- **Database Administrators**: Database management and optimization
- **Data Center Technicians**: Physical infrastructure maintenance
- **Annual Increments**: Configurable salary growth rates
- **California Salary Benchmarks**: Realistic default salaries

#### Software Licensing
- **Virtualization**: VMware, Hyper-V, or other hypervisors
- **Operating Systems**: Windows Server, RHEL, or other OS licenses
- **Backup Software**: Enterprise backup solutions
- **Monitoring Tools**: Infrastructure monitoring platforms
- **Security Software**: Endpoint protection, SIEM, and security tools

### Cloud Infrastructure

#### Storage
- **Multi-Tier Storage**:
  - Hot Storage: Frequently accessed data
  - Standard Storage: Regular access patterns
  - Archive Storage: Long-term retention
- **Configurable Growth Rates**: Model storage expansion over time
- **Egress Costs**: Data transfer out charges

#### Compute
- **General Purpose VMs**: Balanced compute, memory, and network
- **Compute-Optimized VMs**: High-performance processors
- **Memory-Optimized VMs**: Large memory footprints
- **Storage-Optimized VMs**: High local disk throughput
- **Flexible Instance Counts**: Scale VM counts per workload type

#### GPU Instances
- **Training GPU Instances**: Cloud GPU VMs for ML training (e.g., P4, P5 instances)
- **Inference GPU Instances**: Optimized for inference workloads (e.g., G4, G5 instances)
- **Hourly Pricing**: Pay-as-you-go GPU instance costs
- **Monthly Usage Hours**: Configure actual usage for cost accuracy

#### Networking
- **Data Egress**: Outbound data transfer charges
- **Growth Modeling**: Model egress increases over time
- **Regional Considerations**: Different egress pricing tiers

#### Human Resources
- **DevOps Engineers**: Cloud infrastructure automation
- **Cloud Architects**: Cloud solution design and optimization
- **Site Reliability Engineers (SREs)**: Service reliability and incident response
- **Cloud Security Engineers**: Cloud security and compliance
- **Cloud Database Administrators**: Managed database operations
- **Annual Increments**: Salary growth modeling

#### Cloud Services
- **Managed Databases**: RDS, Aurora, Cosmos DB, etc.
- **Analytics Services**: Data warehousing and analytics platforms
- **Telemetry**: Application performance monitoring
- **Monitoring**: Cloud-native monitoring solutions
- **Security Services**: Cloud security posture management

## 🛡️ Security & Compliance

### Compliance Certifications
- **SOC 2**: Service Organization Control 2 Type II certification
- **ISO 27001**: Information Security Management System certification
- **HIPAA**: Health Insurance Portability and Accountability Act compliance
- **PCI DSS**: Payment Card Industry Data Security Standard
- **GDPR**: General Data Protection Regulation compliance

### Security Features
- **DDoS Protection**: Distributed denial-of-service mitigation (Cloudflare, AWS Shield, Akamai)
- **Web Application Firewall (WAF)**: Application-layer protection
- **Bot Protection**: Bot detection and mitigation services
- **Security Audits**: Regular third-party security assessments
- **Penetration Testing**: Ethical hacking and vulnerability testing

### Cost Modeling
- **One-Time Costs**: Initial setup and implementation
- **Recurring Costs**: Annual certification renewals and service fees
- **CapEx/OpEx Classification**: Automatic categorization

## 📊 Advanced Analysis

### Dual Calculation Modes
- **TCO Mode**: Total Cost of Ownership over the entire analysis period
- **Amortized Mode**: Average annual cost for consistent budget planning

### Multi-Year Projections
- **Configurable Period**: 1-30 year analysis timeframes
- **Year-by-Year Breakdown**: Detailed annual cost projections
- **Cumulative View**: Running total cost comparison

### Financial Modeling
- **Inflation Adjustments**: Built-in inflation for all cost categories
- **Growth Rate Modeling**: Configurable growth for storage, bandwidth, and egress
- **Salvage Value Calculation**: Hardware residual value at end-of-life
- **Hardware Depreciation**: Realistic depreciation modeling
- **Salary Increments**: Annual compensation increases

### Breakeven Analysis
- **Automatic Detection**: Identifies when cumulative costs cross over
- **Visual Indicators**: Clear breakeven point visualization
- **Year Identification**: Exact year and quarter of cost parity

### CapEx/OpEx Tracking
- **Capital Expenditure (CapEx)**: One-time hardware and setup costs
- **Operating Expenditure (OpEx)**: Recurring operational costs
- **Separate Visualizations**: Dedicated CapEx/OpEx charts
- **Annual Breakdown**: Year-by-year CapEx and OpEx split
- **Summary Cards**: Total CapEx and OpEx for planning

### Sensitivity Analysis
- **80+ Variables**: Comprehensive variable selection
- **Interactive Selection**: Searchable dropdown with categories
- **Configurable Range**: Adjust sensitivity range (±1% to ±100%)
- **Real-Time Visualization**: See TCO impact immediately
- **Line Charts**: Compare on-premise vs. cloud sensitivity

#### Variable Categories
- General (inflation rate, analysis period)
- Cloud Storage (size, growth, tier costs)
- Cloud Networking (egress, growth rate)
- Cloud Compute (VM counts, hourly rates)
- Cloud GPU (instance counts, rates)
- On-Prem Energy (electricity, power, colocation)
- On-Prem Compute (CPU, memory, motherboard)
- On-Prem GPU (training, inference hardware)
- On-Prem Storage (HDD, SSD counts and costs)
- On-Prem Networking (switches, bandwidth)
- Personnel (both on-prem and cloud salaries)
- Software (licenses and service costs)

## 📈 Rich Visualizations

### Interactive Cost Charts
- **Stacked Bar Charts**: Year-by-year cost breakdown
- **7+ Color-Coded Categories**: Energy, Storage, Compute, GPU, Networking, Human, Software
- **Hover Details**: Detailed tooltips with exact values
- **Responsive Design**: Adapts to screen size

### Three-View Results Section

#### Charts View
- Side-by-side cost comparison
- On-premise and cloud stacked bar charts
- Visual cost category breakdown
- Multi-year trend visualization

#### Cumulative View
- Running total comparison
- Year-over-year TCO progression
- Summary cards with key metrics
- Breakeven point indicator
- CapEx/OpEx visualization

#### Breakdown View
- Detailed line-item cost tables
- Separate on-premise and cloud tables
- All cost categories itemized
- Expandable sections

### CapEx/OpEx Charts
- **Stacked Bar Charts**: Separate charts for on-premise and cloud
- **Color-Coded**: Distinct colors for CapEx and OpEx
- **Yearly Breakdown**: See capital vs. operational spending per year
- **Interactive Tooltips**: Exact values on hover

### Export Capabilities
- **CSV Export**: Download complete analysis
- **All Data Included**: Year-by-year costs, categories, totals
- **Excel Compatible**: Opens in spreadsheet applications
- **Timestamp**: Export filename includes date/time

## ⚡ Quick Start with Presets

### Pre-Configured Scenarios
- **Startup (Early-Stage)**: Small team, minimal infrastructure
- **Mid-Sized Company (Growth Phase)**: Growing infrastructure needs
- **Enterprise (Large-Scale)**: Complex, large-scale deployments

### Preset Features
- **Realistic Defaults**: Industry-standard configurations
- **One-Click Loading**: Instant scenario population
- **Comparable Setups**: Fair on-premise vs. cloud comparison
- **Starting Point**: Modify to match your specific needs

### Preset Details
- Startup: 5-10 servers, small team, basic infrastructure
- Mid-Sized: 50-100 servers, specialized teams, redundant systems
- Enterprise: 500+ servers, large teams, multi-datacenter setup

## 🎨 Modern User Experience

### Intuitive Navigation
- **Sidebar Navigation**: Quick access to all sections
- **Collapsible Sections**: Organize and focus on relevant areas
- **Section Icons**: Visual identification of categories
- **Smooth Scrolling**: Seamless navigation experience

### Advanced Search
- **Full-Text Search**: Find any field or section instantly
- **Keyboard Shortcut**: `Cmd+K` (Mac) or `Ctrl+K` (Windows)
- **Fuzzy Matching**: Finds results even with typos
- **Quick Navigation**: Jump to any section from search results

### Smart Defaults
- **Realistic Values**: Pre-configured with industry-standard costs
- **Quick Testing**: Start analyzing without extensive configuration
- **Override Anywhere**: Easily modify any default value
- **Context-Aware**: Defaults based on selected options

### Form Features
- **Real-Time Validation**: Instant feedback on inputs
- **Helper Tooltips**: Contextual help for every field
- **Conditional Fields**: Show/hide based on selections
- **Toggle Sections**: Enable/disable optional components
- **Range Sliders**: Intuitive percentage adjustments

### Design System
- **Theme Support**: Light and dark modes
- **Warm Color Palette**: Professional, easy-on-the-eyes colors
- **Responsive Layout**: Desktop and tablet optimized
- **Accessible**: WCAG compliant components
- **Consistent UI**: shadcn/ui component library

### Type Safety
- **Full TypeScript**: End-to-end type safety
- **Zod Validation**: Runtime schema validation
- **Compile-Time Checks**: Catch errors before runtime
- **IntelliSense Support**: Better developer experience

## 🔧 Technical Features

### Performance
- **Next.js 15**: Latest framework features
- **App Router**: Optimized routing and rendering
- **React 19**: Modern React features
- **Turbopack**: Faster development builds
- **Server Actions**: Efficient server-side calculations

### Form Management
- **React Hook Form**: Performant form handling
- **Zod Validation**: Type-safe schema validation
- **Conditional Rendering**: Dynamic form fields
- **Error Handling**: Clear validation messages

### Data Visualization
- **Recharts**: Flexible charting library
- **Responsive Charts**: Adapt to screen size
- **Custom Tooltips**: Rich data display
- **Interactive Legends**: Toggle chart categories

### Code Quality
- **ESLint**: Code linting and best practices
- **Prettier**: Consistent code formatting
- **TypeScript**: Static type checking
- **Strict Mode**: Enhanced type safety
