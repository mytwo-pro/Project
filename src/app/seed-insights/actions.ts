"use server";

import { getSeedInformation, type SeedInformationInput, type SeedInformationOutput } from "@/ai/flows/seed-information";

export async function getSeedInfoAction(data: SeedInformationInput): Promise<{ success: boolean; data?: SeedInformationOutput; error?: string }> {
  try {
    const result = await getSeedInformation(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to get seed information: ${errorMessage}` };
  }
}
