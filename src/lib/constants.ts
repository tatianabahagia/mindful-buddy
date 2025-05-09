
import type { LucideIcon } from 'lucide-react';
import { 
  Smile, Frown, ShieldAlert as IconAnxious, Wind as IconCalm, CloudCog as IconOverwhelmed, CloudRain as IconStressed,
  HeartCrack, Zap, History as IconPtsd, GitCompareArrows as IconBipolar, Clock as IconAdhd, CircleSlash, Brain,
  Languages, Globe
} from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export const APP_NAME = "Bestfriend Buddy";
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
  { value: "none", label: "None (Select if not applicable)", icon: CircleSlash },
  { value: "depression", label: "Depression", icon: HeartCrack },
  { value: "anxiety_disorder", label: "Anxiety Disorder", icon: Zap },
  { value: "ptsd", label: "PTSD", icon: IconPtsd },
  { value: "bipolar_disorder", label: "Bipolar Disorder", icon: IconBipolar },
  { value: "adhd", label: "ADHD", icon: IconAdhd },
  { value: "other", label: "Other", icon: Brain },
];

// APAC languages included as per request, plus Spanish, Arabic and Other
export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: "en", label: "English", icon: Languages },
  { value: "es", label: "Español (Spanish)" }, 
  { value: "ar", label: "العربية (Arabic)" }, 
  { value: "id", label: "Bahasa Indonesia" }, 
  { value: "jv", label: "Basa Jawa (Javanese)" }, 
  { value: "zh", label: "中文 (Mandarin)" }, 
  { value: "hi", label: "हिन्दी (Hindi)" }, 
  { value: "ja", label: "日本語 (Japanese)" }, 
  { value: "ko", label: "한국어 (Korean)" }, 
  { value: "ms", label: "Bahasa Melayu" }, 
  { value: "vi", label: "Tiếng Việt (Vietnamese)" }, 
  { value: "th", label: "ภาษาไทย (Thai)" }, 
  { value: "tl", label: "Tagalog (Filipino)" }, 
  { value: "other", label: "Other", icon: Globe }, 
];

export const DEFAULT_GREETING = `Hello! How are you feeling today? You can tell me your name, mood, or any conditions you're facing if you're comfortable. 🦄✨ I'm here to listen. You are the best person I ever had.`;

export const ERROR_MESSAGE_AI = "Oh dear 😥, Bestfriend Buddy is feeling a bit under the weather and can't chat right now. Please try again in a little bit! We'll get through this together. ☀️💖";

export const EMERGENCY_SUICIDE_WARNING_TITLE = "Important: Please Seek Help 🙏";
// The AI will provide the detailed emergency contact info. This constant is for the toast title.
// Example of detailed message (handled by AI): "It sounds like you are going through a very difficult time. Please consider reaching out for help. You can contact the National Suicide Prevention Lifeline at 988 in the US and Canada, or call your local emergency number. You are not alone and help is available. ❤️"

