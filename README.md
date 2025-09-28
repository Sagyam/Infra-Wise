# InfraWise: AI-Powered Cloud vs. On-Premise TCO Analysis

InfraWise is a web-based financial modeling tool designed to provide a comprehensive Total Cost of Ownership (TCO) comparison between cloud and on-premise infrastructure solutions. By leveraging detailed user inputs and an AI-powered inflation model, InfraWise delivers clear, actionable insights to help businesses make informed infrastructure decisions.

This application is built with Next.js, React, ShadCN, Tailwind CSS, and Genkit.

## Core Features

-   **Data-Driven Analysis**: Collects detailed user inputs for a wide range of cost factors, including hardware, software, power, bandwidth, storage tiers, and data egress.
-   **Cloud vs. On-Premise Calculation**: Computes the TCO for both cloud and on-premise setups over a specified analysis period.
-   **AI-Powered Inflation Modeling**: Integrates a Genkit AI flow to project the impact of inflation on future costs, providing a more realistic long-term forecast.
-   **Breakeven and Savings Analysis**: Pinpoints the exact moment one solution becomes more cost-effective than the other and quantifies the total potential savings.
-   **Interactive Results Visualization**: Displays results through clear summary cards, detailed data tables, and interactive stacked bar charts to show the evolution of costs over time.
-   **TCO vs. Amortized Views**: Offers two distinct calculation modes—Total Cost of Ownership for a cumulative view and Amortized Cost for an average annual perspective.
-   **CSV Export**: Allows users to download the complete, detailed cost analysis as a CSV file for offline analysis or reporting.
-   **Responsive Design**: Features a clean, responsive interface with a switchable light/dark theme, optimized for both desktop and mobile use.

## Tech Stack

-   **Frontend**: Next.js (App Router), React, TypeScript
-   **UI Components**: ShadCN UI
-   **Styling**: Tailwind CSS
-   **AI/Generative**: Genkit, Google AI
-   **Form Management**: React Hook Form, Zod
-   **Charts**: Recharts
-   **Testing**: Vitest, React Testing Library

## Getting Started

To run this project locally, you'll need Node.js and npm installed.

### 1. Install Dependencies

Clone the repository and install the required packages:

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Genkit for its AI features, which requires an API key for the Google AI provider.

1.  Create a `.env` file in the root of the project.
2.  Add your Google AI API key to the file:

```
GEMINI_API_KEY=your_api_key_here
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

### 4. Running Tests

To run the unit tests for the calculation logic, use the following command:

```bash
npm run test
```

This will execute the test files using Vitest and provide a summary of the results.

