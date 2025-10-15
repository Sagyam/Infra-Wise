# InfraWise 📊

A comprehensive financial modeling tool for comparing Total Cost of Ownership (TCO) between cloud and on-premise infrastructure solutions. Make informed infrastructure decisions with detailed cost breakdowns, multi-year projections, and breakeven analysis across all aspects of your infrastructure stack.

# Video Demo
[demo.webm](https://github.com/user-attachments/assets/71da08f1-70a2-46ec-bc1f-d6a5fd43b454)

## ✨ Features

### 💰 Comprehensive Cost Modeling

#### On-Premise Infrastructure
- **Energy Costs**: Power consumption, UPS systems, backup generators, HVAC, colocation facilities
- **Storage**: Drive replacement, RAID configurations, backup storage with customizable costs
- **Compute Hardware**: CPUs, motherboards, memory, chassis, server racks with salvage value calculation
- **GPU Infrastructure**: Training GPUs (A100) and inference GPUs (T4) with hardware depreciation
- **Networking**: Core/aggregation/access switches, cabling, QSFP+ modules, bandwidth, CDN services
- **Human Resources**: System admins, network engineers, storage admins, security engineers, DBAs, data center technicians (California salary benchmarks included)
- **Software Licensing**: Virtualization, operating systems, backup software, monitoring, security tools

#### Cloud Infrastructure
- **Storage**: Multi-tier storage (hot/standard/archive) with configurable growth rates
- **Compute**: General purpose, compute-optimized, memory-optimized, and storage-optimized VMs
- **GPU Instances**: Training and inference GPU instances with hourly pricing
- **Networking**: Data egress costs with growth modeling
- **Human Resources**: DevOps engineers, cloud architects, SREs, cloud security engineers, cloud DBAs
- **Cloud Services**: Managed databases, analytics, telemetry, monitoring, and security services

### 📊 Advanced Analysis

- **Dual Calculation Modes**:
  - TCO Mode: Total Cost of Ownership over analysis period
  - Amortized Mode: Average annual cost for budget planning
- **Multi-Year Projections**: Up to 30-year analysis with configurable periods
- **Inflation Modeling**: Built-in inflation adjustments for all cost categories
- **Growth Rate Modeling**: Configurable growth for storage, bandwidth, and egress
- **Breakeven Analysis**: Automatic identification of cost crossover points
- **Salvage Value Calculation**: Hardware depreciation and end-of-life value recovery

### 📈 Rich Visualizations

- **Interactive Cost Charts**: Stacked bar charts with 7+ unique color-coded categories
- **Three-View Results Section**:
  - **Charts**: Visual cost breakdown for on-premise and cloud over time
  - **Cumulative**: Year-over-year TCO with summary cards
  - **Breakdown**: Detailed itemized cost tables for all categories
- **Real-time Updates**: Instant recalculation as you modify inputs
- **Export Capabilities**: Download complete analysis as CSV for reporting

### 🎨 Modern User Experience

- **Intuitive Navigation**: Sidebar-based section navigation (General, Energy, Storage, Compute, GPU, Networking, Human Cost, Software)
- **Smart Defaults**: Pre-configured with realistic values for quick scenario testing
- **Responsive Design**: Optimized for desktop and tablet use
- **Theme Support**: Clean light mode with warm color palette and dark mode
- **Form Validation**: Real-time input validation with helpful error messages
- **Type Safety**: Full TypeScript implementation for reliability

## 🛠️ Tech Stack

- ⚡ **Framework**: Next.js 15 with App Router
- 📝 **Language**: TypeScript
- 🎨 **Styling**: Tailwind CSS
- 🧩 **UI Components**: Radix UI primitives with shadcn/ui
- 📋 **Forms**: React Hook Form with Zod validation
- 📊 **Charts**: Recharts
- 📦 **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 22+ 
- pnpm 10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sagyam/Infra-Wise.git
cd infra-wise
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 💡 Usage Guide

### Quick Start

InfraWise comes pre-configured with realistic default values for a mid-sized infrastructure deployment, making it easy to get started:

1. **Navigate Sections**: Use the sidebar to explore different cost categories (General, Energy, Storage, Compute, GPU, Networking, Human Cost, Software)
2. **Modify Inputs**: Adjust values to match your infrastructure requirements
3. **Calculate Costs**: Click the "Calculate" button to generate your TCO analysis
4. **View Results**: Navigate to the Analysis section to view:
   - **Charts**: Visual comparison of cost breakdowns
   - **Cumulative**: Year-over-year cost progression
   - **Breakdown**: Detailed line-item costs

### Configuration Sections

#### General
- Analysis period (1-30 years)
- Data unit (GB/TB/PB)
- Inflation rate
- Calculation mode (TCO or Amortized)

#### Energy (On-Premise Only)
- Power consumption (watts, load factor, electricity cost)
- Colocation facility costs
- UPS systems (optional)
- Backup generators (optional)
- HVAC systems (optional)

#### Storage
- **On-Premise**: Drive configuration, RAID overhead, failure rates, backup storage
- **Cloud**: Storage capacity, growth rate, tier distribution (hot/standard/archive), egress costs

#### Compute
- **On-Premise**: CPUs, motherboards, memory, chassis, racks with salvage value
- **Cloud**: VM types (general, compute-optimized, memory-optimized, storage-optimized)

#### GPU
- **On-Premise**: Training GPUs (e.g., A100) and inference GPUs (e.g., T4) with one-time costs
- **Cloud**: GPU instances with hourly rates and monthly usage hours

#### Networking
- **On-Premise**: Switches (core/aggregation/access), cabling, QSFP+ modules, bandwidth, CDN
- **Cloud**: Data egress with growth modeling

#### Human Cost
- **On-Premise**: System admins, network engineers, storage admins, security engineers, DBAs, data center techs
- **Cloud**: DevOps engineers, cloud architects, SREs, cloud security engineers, cloud DBAs
- All positions include annual salary increments

#### Software
- **On-Premise**: Virtualization, OS licenses, backup software, monitoring, security tools
- **Cloud**: Managed databases, analytics, telemetry, monitoring, security services

### Default Values

The application includes realistic defaults based on:
- **California salary benchmarks** for all human resources
- **Nvidia GPU pricing** for A100 (training) and T4 (inference) hardware
- **Industry-standard costs** for hardware, power, bandwidth, and cloud services
- **Comparable configurations** between on-premise and cloud to enable fair comparison

## 📜 Available Scripts

- `pnpm dev` - Start development server with Turbopack ⚡
- `pnpm build` - Build for production 🏗️
- `pnpm start` - Start production server 🌐
- `pnpm lint` - Run ESLint with auto-fix 🧹
- `pnpm lint:check` - Check linting without fixes 👀
- `pnpm format` - Format code with Prettier ✨
- `pnpm format:check` - Check formatting without changes 🔍
- `pnpm typecheck` - Run TypeScript type checking 🔒

## 🎯 Use Cases

InfraWise is designed for:

- **Infrastructure Planning**: Evaluate whether to build on-premise or migrate to cloud
- **Budget Forecasting**: Generate multi-year cost projections for infrastructure investments
- **Migration Analysis**: Calculate ROI and breakeven points for cloud migration initiatives
- **Capacity Planning**: Model cost implications of infrastructure growth over time
- **Vendor Negotiations**: Use detailed breakdowns to inform vendor discussions
- **Executive Reporting**: Export comprehensive TCO analysis for stakeholder presentations
- **FinOps Teams**: Optimize infrastructure spending with data-driven insights

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main application page
│   └── globals.css                 # Global styles and theme
├── components/
│   ├── app/
│   │   ├── sections/               # Configuration sections
│   │   │   ├── general-section.tsx
│   │   │   ├── energy-section.tsx
│   │   │   ├── storage-section.tsx
│   │   │   ├── compute-section.tsx
│   │   │   ├── gpu-section.tsx
│   │   │   ├── networking-section.tsx
│   │   │   ├── human-cost-section.tsx
│   │   │   ├── software-section.tsx
│   │   │   ├── results-charts-section.tsx
│   │   │   ├── results-cumulative-section.tsx
│   │   │   └── results-breakdown-section.tsx
│   │   ├── app-sidebar.tsx         # Navigation sidebar
│   │   ├── header.tsx              # Application header
│   │   ├── cost-chart.tsx          # Chart visualization
│   │   ├── breakdown-table.tsx     # Cost breakdown tables
│   │   └── form/                   # Reusable form components
│   ├── icons/                      # Icon components
│   └── ui/                         # shadcn/ui components
├── hooks/                          # Custom React hooks
└── lib/
    ├── actions.ts                  # Server actions for calculations
    ├── types.ts                    # TypeScript types and Zod schemas
    └── inflation.ts                # Inflation modeling utilities
```

## 🧑‍💻 Development

### Code Quality Tools

This project uses:
- 🧹 **ESLint** for code linting
- ✨ **Prettier** for code formatting
- 🔒 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling

Run `pnpm lint` and `pnpm typecheck` before committing changes.

### Calculation Methodology

InfraWise uses a sophisticated financial modeling approach:

1. **Hardware Costs**: One-time costs in Year 1 (TCO mode) or amortized over analysis period (Amortized mode)
2. **Salvage Value**: Applied in final year to account for hardware resale/reuse value
3. **Recurring Costs**: Annual costs (power, licenses, salaries) with inflation adjustments
4. **Growth Modeling**: Storage and bandwidth costs grow at configurable rates
5. **Salary Increments**: Human resource costs increase annually based on configured rates
6. **Inflation**: All costs are adjusted for inflation using compound growth formulas

### Cost Categories

- **Energy**: On-premise only (power, cooling, colocation)
- **Storage**: Drive maintenance + backup (on-prem), tiered storage (cloud)
- **Compute**: Hardware depreciation (on-prem), VM instances (cloud)
- **GPU**: Training/inference hardware (on-prem), GPU instances (cloud)
- **Networking**: Infrastructure + bandwidth (on-prem), egress costs (cloud)
- **Human**: Salaries with annual increments (both)
- **Software**: Licenses (on-prem), managed services (cloud)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`pnpm lint && pnpm typecheck`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Areas for Contribution

- Additional cost categories (e.g., disaster recovery, compliance)
- More cloud provider templates (AWS, Azure, GCP)
- Enhanced visualizations and charts
- Multi-currency support
- Export formats (PDF, Excel)
- Scenario comparison features
- Documentation improvements

## 📄 License

MIT License. See `LICENSE` for details.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Recharts](https://recharts.org/) - Chart library
- [React Hook Form](https://react-hook-form.com/) - Form management
- [Zod](https://zod.dev/) - Schema validation

---

**Made with 💙 for infrastructure teams making data-driven decisions**
