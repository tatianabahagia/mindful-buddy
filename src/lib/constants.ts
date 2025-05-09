import type { LucideIcon } from 'lucide-react';
import { 
  Smile, Frown, ShieldAlert as IconAnxious, Wind as IconCalm, CloudCog as IconOverwhelmed, CloudRain as IconStressed,
  HeartCrack, Zap, History as IconPtsd, GitCompareArrows as IconBipolar, Clock as IconAdhd, CircleSlash,
  Languages, Brain
} from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export const APP_NAME = "Mindful Buddy";
export const AI_NAME = "Bestfriend Buddy";

export const MOOD_OPTIONS: SelectOption[] = [
  { value: "happy", label: "Happy", icon: Smile },
  { value: "sad", label: "Sad", icon: Frown },
  { value: "anxious", label: "Anxious", icon: IconAnxious },
  { value: "calm", label: "Calm", icon: IconCalm },
  { value: "stressed", label: "Stressed", icon: IconStressed },
  { value: "overwhelmed", label: "Overwhelmed", icon: IconOverwhelmed },
];

export const ILLNESS_OPTIONS: SelectOption[] = [
  { value: "none", label: "None", icon: CircleSlash },
  { value: "depression", label: "Depression", icon: HeartCrack },
  { value: "anxiety_disorder", label: "Anxiety Disorder", icon: Zap },
  { value: "ptsd", label: "PTSD", icon: IconPtsd },
  { value: "bipolar_disorder", label: "Bipolar Disorder", icon: IconBipolar },
  { value: "adhd", label: "ADHD", icon: IconAdhd },
  { value: "other", label: "Other", icon: Brain },
];

// For UI purposes, actual language support by AI model may vary.
export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: "en", label: "English", icon: Languages },
  { value: "es", label: "Español" }, // Example APAC-adjacent
  { value: "zh", label: "中文 (Mandarin)" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "ja", label: "日本語 (Japanese)" },
  { value: "ko", label: "한국어 (Korean)" },
];

export const DEFAULT_GREETING = `Hello! I'm ${AI_NAME}, your supportive companion from ${APP_NAME}. How are you feeling today? You can tell me your name, mood, or any conditions you're facing if you're comfortable. 🦄✨`;

export const ERROR_MESSAGE_AI = "Oh dear 😥, Bestfriend Buddy is feeling a bit under the weather and can't chat right now. Please try again in a little bit! ☀️";
