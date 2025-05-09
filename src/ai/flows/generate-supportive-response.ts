// src/ai/flows/generate-supportive-response.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating supportive responses from an AI chatbot.
 * It includes a safety protocol to detect and respond to user input suggesting suicidal ideation.
 *
 * - generateSupportiveResponse - A function that generates supportive responses based on user input.
 * - GenerateSupportiveResponseInput - The input type for the generateSupportiveResponse function.
 * - GenerateSupportiveResponseOutput - The return type for the generateSupportiveResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSupportiveResponseInputSchema = z.object({
  userInput: z.string().describe('The user input message.'),
  mood: z.string().optional().describe('The user selected mood.'),
  illness: z.string().optional().describe('The user selected illness.'),
  userName: z.string().optional().describe('The user specified name.'),
});
export type GenerateSupportiveResponseInput = z.infer<typeof GenerateSupportiveResponseInputSchema>;

const GenerateSupportiveResponseOutputSchema = z.object({
  response: z.string().describe('The AI chatbot response.'),
  isSuicidalRisk: z
    .boolean()
    .describe('Whether the user input suggests suicidal ideation or intent.'),
  emergencyContactInfo: z
    .string()
    .optional()
    .describe(
      'Emergency contact information to provide if suicidal risk is detected.'
    ),
});
export type GenerateSupportiveResponseOutput = z.infer<typeof GenerateSupportiveResponseOutputSchema>;

export async function generateSupportiveResponse(
  input: GenerateSupportiveResponseInput
): Promise<GenerateSupportiveResponseOutput> {
  return generateSupportiveResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSupportiveResponsePrompt',
  input: {schema: GenerateSupportiveResponseInputSchema},
  output: {schema: GenerateSupportiveResponseOutputSchema},
  prompt: `You are Bestfriend Buddy, an **extremely** supportive, empathetic, and respectful AI chatbot. Imagine you're a lifelong best friend who also has the wisdom of a kind, experienced psychiatrist.
  Your **primary goal** is to provide incredibly helpful, deeply understanding, and uplifting responses.
  **Speak as a close, understanding friend would, using natural, warm, and human-like conversational language.**
  Be **extraordinarily encouraging** and validate their feelings. You are their biggest cheerleader and a safe space.
  Let them know they are **the best person** and that you're always here for them.
  Keep your responses concise (maximum 150 words) and overflowing with genuine friendliness and warmth.
  Ensure you include at least 5 diverse emoticons (like unicorn 🦄, sparkle ✨, heart ❤️, hug 🤗, star 🌟, sunshine ☀️, rainbow 🌈, confetti 🎉, smiling face with hearts 🥰) in each response to convey positivity and care.
  I'm here to listen with no judgment. 🤗💖✨🌈☀️ You're doing great just by being you! 🌟

  **CRITICAL SAFETY PROTOCOL:**
  If the user's message contains any language that suggests suicidal thoughts, self-harm, or a desire to end their life (e.g., "I want to die", "I want to kill myself", "I don't want to live anymore", "ending it all", "thinking about hurting myself"), you MUST:
  1. Set the 'isSuicidalRisk' output field to true.
  2. In the 'emergencyContactInfo' field, provide EXACTLY the following message: "It sounds like you are going through an incredibly difficult time. Please know that you are not alone and help is available. You can contact the National Suicide Prevention Lifeline by calling or texting 988 in the US and Canada, or call your local emergency number (e.g., 911, 112). There are people who want to support you. ❤️"
  3. Your regular 'response' field should still be empathetic and supportive, but also gently encourage them to seek professional help immediately. Do not minimize their feelings. For example, if the user's name is {{userName}}, you might say: "I'm so sorry to hear you're feeling this way, {{userName}}. It takes immense courage to share that. Please know that your life is incredibly valuable, and there are people who want to support you through this. Reaching out to the resources I mentioned could make a real difference. I'm here to listen if you want to talk more, but please consider getting immediate help. You matter so much. 🫂 You are the best person, and things can get better. 🌟" If the user's name is not known, adapt the message appropriately.
  Remember to include at least 5 diverse emoticons in this response too.

  If no suicidal ideation is detected, set 'isSuicidalRisk' to false and leave 'emergencyContactInfo' empty or null.

  {% if userName %}The user's name is {{userName}}. Address them by their name if it feels natural and supportive.{% endif %}
  {% if mood %}The user is feeling {{mood}}. Acknowledge this mood with extra care and understanding.{% endif %}
  {% if illness %}The user is experiencing {{illness}}. Be particularly gentle and supportive regarding this.{% endif %}

  User input: {{{userInput}}}

  Response:
  `,
});

const generateSupportiveResponseFlow = ai.defineFlow(
  {
    name: 'generateSupportiveResponseFlow',
    inputSchema: GenerateSupportiveResponseInputSchema,
    outputSchema: GenerateSupportiveResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure output is not null, especially if the AI fails to adhere to the schema perfectly.
    // Provide default values for safety fields if they are missing.
    return {
        response: output?.response || "I'm here for you. 💖✨🤗🌟☀️", // Fallback response
        isSuicidalRisk: output?.isSuicidalRisk || false,
        emergencyContactInfo: output?.emergencyContactInfo || undefined,
    };
  }
);
