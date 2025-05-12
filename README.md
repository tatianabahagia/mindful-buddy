# Bestfriend Buddy
Bestfriend Buddy is an AI-powered chatbot designed to provide empathetic mental health support. It simulates a deeply mindful AI friend with the experience of a seasoned psychiatrist, offering features like mood and disorder selection, suicidal ideation detection, and integration of local mental health resources.

## Features

- **AI Chatbot**: Empathetic AI ("Your BestFriend Buddy") offering psychiatrist-like support. Culturally sensitive and multilingual.
- **Mood and Disorder Selection**: Users can select their mood (depressed, manic, anxious, neutral) and mental health disorder to tailor AI responses.
- **Suicidal Ideation Detection**: Proactively detects suicidal thoughts and provides hotline information.
- **Persistent Chat**: Saves chat history for continued conversations.
- **Emoticons**: Uses emoticons to enhance emotional tone.
- **Data Privacy Reminder**: Informs users that conversations are not end-to-end encrypted.
- **Prompt Asking for Name**: Asks for user's name after the first AI response to personalize the chat.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Environment Variables

Create a `.env.local` file in the root of your project and add your Google Maps API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY_HERE"

# If you are using Google AI services directly via Genkit, you might also need:
# GOOGLE_API_KEY="YOUR_GOOGLE_AI_STUDIO_API_KEY_OR_VERTEX_AI_KEY"
# GCLOUD_PROJECT="YOUR_GOOGLE_CLOUD_PROJECT_ID" (if using Vertex AI)
```

You can obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview). Make sure to enable the "Maps JavaScript API" and "Places API".

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mindful-buddy 
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

1. Start the Next.js development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This will typically start the app on `http://localhost:9002`.

2. If your Genkit flows are set up to run locally (e.g., for testing with local emulators or specific configurations), you might need to run the Genkit development server in a separate terminal:
   ```bash
   npm run genkit:dev
   # or for watching changes
   npm run genkit:watch
   ```
   The `genkit:dev` script (defined in `package.json`) starts the Genkit flows.

The application should now be running. Open your browser and navigate to the local URL.

## Project Structure

- `src/app/`: Main application pages and layouts (Next.js App Router).
  - `page.tsx`: The main chat interface.
  - `competitive-analysis/page.tsx`: Page for competitive analysis.
- `src/components/`: Reusable UI components.
  - `ui/`: ShadCN UI components.
- `src/hooks/`: Custom React hooks.
  - `use-chat-store.ts`: Zustand store for chat state.
  - `use-location.ts`: Hook for geolocation.
- `src/lib/`: Utility functions and server actions.
  - `actions.ts`: Server actions for chat logic.
- `src/ai/flows/`: Genkit AI flows.
- `src/services/`: Services like fetching mental health resources.
- `src/types/`: TypeScript type definitions.

## Building for Production

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [ShadCN UI](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vis.gl React Google Maps](https://visgl.github.io/react-google-maps/)
