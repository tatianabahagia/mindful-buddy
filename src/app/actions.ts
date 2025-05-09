"use server";

import { 
  generateSupportiveResponse, 
  type GenerateSupportiveResponseInput, 
  type GenerateSupportiveResponseOutput 
} from "@/ai/flows/generate-supportive-response";
import { ERROR_MESSAGE_AI } from "@/lib/constants";

export async function getAiResponseAction(
  input: GenerateSupportiveResponseInput
): Promise<GenerateSupportiveResponseOutput> {
  try {
    // Ensure input fields are either strings or undefined, not empty strings for optional fields if the AI expects that.
    const sanitizedInput: GenerateSupportiveResponseInput = {
      userInput: input.userInput,
      userName: input.userName || undefined,
      mood: input.mood || undefined,
      illness: input.illness || undefined,
    };
    const response = await generateSupportiveResponse(sanitizedInput);
    return response;
  } catch (error) {
    console.error("Error getting AI response from action:", error);
    // The user requested human error popups, this provides a default message.
    // The client-side toast can use this or a more specific one.
    throw new Error(ERROR_MESSAGE_AI);
  }
}
