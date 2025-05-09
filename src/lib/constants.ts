
import type { LucideIcon } from 'lucide-react';
import { 
  Smile, Frown, ShieldAlert, Wind as IconCalm, CloudCog as IconOverwhelmed, CloudRain as IconStressed,
  HeartCrack, Zap, History as IconPtsd, GitCompareArrows as IconBipolar, Clock as IconAdhd, CircleSlash, Brain,
  Languages, Globe, BookOpen, Lightbulb, Bed, Users, Leaf
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
  { value: "anxious", label: "Anxious", icon: ShieldAlert },
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

export interface EducationalTopic {
  id: string;
  title: string;
  icon?: LucideIcon;
  content: string[];
}

export const EDUCATIONAL_CONTENT: EducationalTopic[] = [
  {
    id: "understanding-anxiety",
    title: "Understanding Anxiety",
    icon: ShieldAlert,
    content: [
      "Anxiety is a natural human response to stress, involving feelings of fear or apprehension about what's to come. It's okay to feel anxious sometimes.",
      "Common symptoms can include: feeling nervous, restless, or tense; having an increased heart rate; rapid breathing; sweating; trembling; difficulty concentrating; and trouble sleeping.",
      "A simple grounding technique like the 5-4-3-2-1 method can be helpful: Acknowledge 5 things you see, 4 things you can touch, 3 things you hear, 2 things you can smell, and 1 thing you can taste. This can help bring your focus to the present moment."
    ]
  },
  {
    id: "coping-with-stress",
    title: "Coping with Stress",
    icon: Lightbulb, // Using Lightbulb for general coping ideas
    content: [
      "Stress is a part of life, but chronic stress can impact your well-being. Identifying your stressors is the first step to managing them.",
      "Deep breathing exercises can be very effective. Try inhaling slowly through your nose, holding for a few seconds, and exhaling slowly through your mouth. Repeat several times.",
      "Remember to take regular breaks throughout your day, even if it's just for a few minutes to stretch or step away from your work. Short breaks can make a big difference."
    ]
  },
  {
    id: "importance-of-sleep",
    title: "The Value of Sleep for Mental Health",
    icon: Bed,
    content: [
      "Quality sleep is crucial for mental and emotional health. During sleep, your brain works to process emotions and memories, and a lack of sleep can affect your mood and resilience.",
      "Tips for better sleep: Try to maintain a consistent sleep schedule, create a relaxing bedtime routine, make sure your bedroom is dark and quiet, and avoid caffeine or heavy meals close to bedtime.",
      "If you consistently have trouble sleeping, it might be helpful to talk to a healthcare professional."
    ]
  },
  {
    id: "mindfulness-basics",
    title: "Mindfulness Basics",
    icon: Leaf, // Replaced Lotus with Leaf
    content: [
      "Mindfulness is the practice of paying attention to the present moment without judgment. It can help reduce stress and increase self-awareness.",
      "A simple mindfulness exercise: Sit comfortably, close your eyes if you wish, and focus on your breath. Notice the sensation of air entering and leaving your body. If your mind wanders, gently bring your attention back to your breath.",
      "You can practice mindfulness anywhere, anytime – while walking, eating, or even washing dishes."
    ]
  },
  {
    id: "seeking-professional-help",
    title: "When to Seek Professional Help",
    icon: Users,
    content: [
      "While self-help strategies are valuable, sometimes professional support is needed. It's a sign of strength to seek help when you need it.",
      "Consider reaching out if: your feelings are intense and overwhelming, your symptoms are persistent and interfere with daily life, you're struggling to cope, or you have thoughts of harming yourself or others.",
      "You can talk to your doctor, a mental health professional (like a therapist or counselor), or look for resources through reputable mental health organizations (e.g., NAMI, Mental Health America)."
    ]
  }
];

