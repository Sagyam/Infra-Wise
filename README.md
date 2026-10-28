<p align="center">
  <img src="public/logo.svg" width="140" alt="InfraWise logo: a rising cloud-cost line crossing a flat on-prem line at a breakeven dot">
</p>

<h1 align="center">InfraWise</h1>

<h3 align="center">Find the year owning beats renting.</h3>

<p align="center">
  <a href="https://infrawise.sagyamthapa.com.np">Live demo</a> ·
  <a href="#tour">Tour</a> ·
  <a href="#quick-start">Quick start</a> ·
  <a href="docs/USAGE.md">Guide</a> ·
  <a href="docs/FEATURES.md">Features</a>
</p>

<p align="center">
  <b>A total-cost-of-ownership calculator for cloud vs. on-premise infrastructure.</b><br>
  Model energy, storage, compute, GPUs, network, people and compliance, then see where the two curves cross.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Bun-1.4-000000?style=flat-square&logo=bun&logoColor=white" alt="Bun 1.4">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui">
  <br>
  <img src="https://img.shields.io/badge/tests-388%20passing-2ea44f?style=flat-square" alt="388 tests passing">
  <img src="https://img.shields.io/badge/presets-10%20scenarios-5b5bd6?style=flat-square" alt="10 preset scenarios">
  <img src="https://img.shields.io/badge/inputs-80%2B%20variables-5b5bd6?style=flat-square" alt="80+ input variables">
  <img src="https://img.shields.io/badge/license-MIT-f2b134?style=flat-square" alt="MIT license">
</p>

<p align="center">
  <img src="docs/screenshots/demo.gif" width="960" alt="Loading the e-commerce preset, then stepping through general settings, compute, cost charts, cumulative TCO, the itemised breakdown and sensitivity analysis">
</p>

## Tour

<table>
<tr>
<td width="50%"><img src="docs/screenshots/presets.png" alt="Presets"><br><b>Presets.</b> Ten realistic starting points, from a SaaS app to an AI training cluster.</td>
<td width="50%"><img src="docs/screenshots/compute.png" alt="Compute inputs"><br><b>Inputs.</b> Hardware on one side, cloud instances on the other. Every field explains itself.</td>
</tr>
<tr>
<td><img src="docs/screenshots/cumulative.png" alt="Cumulative TCO"><br><b>Cumulative.</b> Total cost per side, the savings and the breakeven year, exportable as CSV.</td>
<td><img src="docs/screenshots/charts.png" alt="Cost charts"><br><b>Charts.</b> Where each year's money goes, by category.</td>
</tr>
<tr>
<td><img src="docs/screenshots/breakdown.png" alt="Breakdown"><br><b>Breakdown.</b> Every category, every year, on both sides.</td>
<td><img src="docs/screenshots/sensitivity.png" alt="Sensitivity analysis"><br><b>Sensitivity.</b> Swing one variable and watch the totals move.</td>
</tr>
</table>

## Quick start

```bash
git clone https://github.com/Sagyam/Infra-Wise.git
cd Infra-Wise
bun install
bun dev         # http://localhost:3100
```

More in the [installation](docs/INSTALLATION.md) and [usage](docs/USAGE.md) guides.

## License

MIT. See [LICENSE](LICENSE).
