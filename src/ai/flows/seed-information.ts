'use server';

/**
 * @fileOverview Provides comprehensive information about a given seed variety.
 *
 * - getSeedInformation - A function that retrieves information about a specific seed.
 * - SeedInformationInput - The input type for the getSeedInformation function.
 * - SeedInformationOutput - The return type for the getSeedInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SeedInformationInputSchema = z.object({
  seedName: z.string().describe('The name of the seed for which information is requested.'),
});
export type SeedInformationInput = z.infer<typeof SeedInformationInputSchema>;

const SeedInformationOutputSchema = z.object({
  optimalPlantingTimes: z.string().describe('The optimal planting times for the seed.'),
  expectedYields: z.string().describe('The expected yields for the seed.'),
  commonIssues: z.string().describe('Common issues that may arise during the plant lifecycle.'),
});
export type SeedInformationOutput = z.infer<typeof SeedInformationOutputSchema>;

export async function getSeedInformation(input: SeedInformationInput): Promise<SeedInformationOutput> {
  return seedInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seedInformationPrompt',
  input: {schema: SeedInformationInputSchema},
  output: {schema: SeedInformationOutputSchema},
  prompt: `You are an expert agricultural advisor. Provide comprehensive information about the seed requested by the user, including optimal planting times, expected yields, and common issues.

  Seed Name: {{{seedName}}}`,
});

const seedInformationFlow = ai.defineFlow(
  {
    name: 'seedInformationFlow',
    inputSchema: SeedInformationInputSchema,
    outputSchema: SeedInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
