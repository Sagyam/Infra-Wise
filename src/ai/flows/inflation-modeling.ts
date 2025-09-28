'use server';

/**
 * @fileOverview This file contains the Genkit flow for modeling inflation's impact on cloud and on-premise costs.
 *
 * - `modelInflation` - A function that applies an inflation rate to a given cost over a specified period.
 * - `InflationInput` - The input type for the `modelInflation` function, including the cost, inflation rate, and analysis period.
 * - `InflationOutput` - The return type for the `modelInflation` function, providing the inflated cost.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InflationInputSchema = z.object({
  initialCost: z
    .number()
    .describe('The initial cost to be adjusted for inflation.'),
  inflationRate: z
    .number()
    .describe(
      'The annual inflation rate, expressed as a decimal (e.g., 0.03 for 3%).'
    ),
  analysisPeriod: z
    .number()
    .describe('The number of years over which to project the cost.'),
});
export type InflationInput = z.infer<typeof InflationInputSchema>;

const InflationOutputSchema = z.object({
  inflatedCost: z
    .number()
    .describe('The total cost after applying inflation over the analysis period.'),
});
export type InflationOutput = z.infer<typeof InflationOutputSchema>;

/**
 * Applies an inflation rate to a given cost over a specified period.
 * @param input - The input parameters including initial cost, inflation rate, and analysis period.
 * @returns The total cost after applying inflation over the analysis period.
 */
export async function modelInflation(input: InflationInput): Promise<InflationOutput> {
  return modelInflationFlow(input);
}

const modelInflationFlow = ai.defineFlow(
  {
    name: 'modelInflationFlow',
    inputSchema: InflationInputSchema,
    outputSchema: InflationOutputSchema,
  },
  async input => {
    const {initialCost, inflationRate, analysisPeriod} = input;
    
    // Calculate the future value of a single sum
    // FV = P * (1 + r)^n
    const inflatedCost = initialCost * Math.pow(1 + inflationRate, analysisPeriod);

    return {inflatedCost: inflatedCost};
  }
);
