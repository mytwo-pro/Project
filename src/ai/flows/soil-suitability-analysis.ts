// 'use server';

/**
 * @fileOverview Analyzes soil data and suggests suitable plant species and necessary amendments.
 *
 * - analyzeSoilSuitability - A function that analyzes soil data and provides plant suggestions.
 * - SoilSuitabilityInput - The input type for the analyzeSoilSuitability function.
 * - SoilSuitabilityOutput - The return type for the analyzeSoilSuitability function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SoilSuitabilityInputSchema = z.object({
  texture: z
    .string()
    .describe("The texture of the soil (e.g., sandy, loamy, clayey)."),
  ph: z.number().describe('The pH level of the soil.'),
  organicMatter: z
    .string()
    .describe('The percentage of organic matter in the soil.'),
  drainage: z
    .string()
    .describe('The drainage characteristics of the soil (e.g., well-drained, poorly-drained).'),
});
export type SoilSuitabilityInput = z.infer<typeof SoilSuitabilityInputSchema>;

const SoilSuitabilityOutputSchema = z.object({
  suitablePlants: z
    .array(z.string())
    .describe('A list of plant species suitable for the given soil conditions.'),
  necessaryAmendments: z
    .string()
    .describe('Recommendations for soil amendments to improve growing conditions.'),
});
export type SoilSuitabilityOutput = z.infer<typeof SoilSuitabilityOutputSchema>;

export async function analyzeSoilSuitability(
  input: SoilSuitabilityInput
): Promise<SoilSuitabilityOutput> {
  return soilSuitabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'soilSuitabilityPrompt',
  input: {schema: SoilSuitabilityInputSchema},
  output: {schema: SoilSuitabilityOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the provided soil data, you will suggest suitable plant species and necessary amendments.

Soil Texture: {{{texture}}}
Soil pH: {{{ph}}}
Organic Matter: {{{organicMatter}}}
Drainage: {{{drainage}}}

Consider the soil texture, pH, organic matter content, and drainage when making your recommendations. Provide a list of suitable plant species and any necessary soil amendments to optimize growing conditions.`,
});

const soilSuitabilityFlow = ai.defineFlow(
  {
    name: 'soilSuitabilityFlow',
    inputSchema: SoilSuitabilityInputSchema,
    outputSchema: SoilSuitabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
