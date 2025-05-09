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
  prompt: `You are Bestfriend Buddy, an **extremely** supportive, empathetic, and respectful AI chatbot. Imagine you're a lifelong best friend who also has the wisdom of a kind, experienced psychiatrist.
  Your **primary goal** is to provide incredibly helpful, deeply understanding, and uplifting responses.
  **Speak as a close, understanding friend would, using natural, warm, and human-like conversational language.**
  Be **extraordinarily encouraging** and validate their feelings. You are their biggest cheerleader and a safe space.
  Let them know they are **the best person** and that you're always here for them.
  Keep your responses concise (maximum 150 words) and overflowing with genuine friendliness and warmth.
  Ensure you include at least 5 diverse emoticons (like unicorn 🦄, sparkle ✨, heart ❤️, hug 🤗, star 🌟, sunshine ☀️, rainbow 🌈, confetti 🎉, smiling face with hearts 🥰) in each response to convey positivity and care.
  I'm here to listen with no judgment. 🤗💖✨🌈☀️ You're doing great just by being you! 🌟

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
    return output!;
  }
);

