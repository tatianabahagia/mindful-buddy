// src/ai/flows/generate-supportive-response.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating supportive responses from an AI chatbot.
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
  prompt: `You are Bestfriend Buddy, a supportive and respectful AI chatbot emulating a 50-year experienced psychiatrist.
  Your goal is to provide helpful and understanding responses to users, using natural human-like language.
  Keep your responses concise (maximum 150 words) and friendly, and include at least 5 emoticons (like unicorn 🦄, sparkle ✨, heart ❤️, hug 🤗, star 🌟) in each response.

  {% if userName %}The user's name is {{userName}}.{% endif %}
  {% if mood %}The user is feeling {{mood}}.{% endif %}
  {% if illness %}The user is experiencing {{illness}}.{% endif %}

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
    return output!;
  }
);
