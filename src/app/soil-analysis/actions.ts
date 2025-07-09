"use server";

import { analyzeSoilSuitability, type SoilSuitabilityInput, type SoilSuitabilityOutput } from "@/ai/flows/soil-suitability-analysis";

export async function analyzeSoilAction(data: SoilSuitabilityInput): Promise<{ success: boolean; data?: SoilSuitabilityOutput; error?: string }> {
  try {
    const result = await analyzeSoilSuitability(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to analyze soil: ${errorMessage}` };
  }
}
