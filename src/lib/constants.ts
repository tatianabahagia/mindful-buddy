
import type { LucideIcon } from 'lucide-react';
import { 
  Smile, Frown, ShieldAlert, Wind as IconCalm, CloudCog as IconOverwhelmed, CloudRain as IconStressed,
  HeartCrack, Zap, History as IconPtsd, GitCompareArrows as IconBipolar, Clock as IconAdhd, CircleSlash, Brain,
  Languages, Globe, BookOpen, Lightbulb, Bed, Users, Leaf, Headphones, PlayCircle, AlignLeft, ClipboardList
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
    icon: Lightbulb, 
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
    icon: Leaf,
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

export interface GuidedMeditationTopic {
  id: string;
  title: string;
  icon?: LucideIcon;
  description: string;
  script: string[];
}

export const GUIDED_MEDITATIONS: GuidedMeditationTopic[] = [
  {
    id: "breathing-meditation",
    title: "Breathing Meditation (5 Min)",
    icon: PlayCircle,
    description: "A short meditation to center yourself by focusing on your breath.",
    script: [
      "Find a comfortable position, either sitting or lying down.",
      "Gently close your eyes, or soften your gaze if you prefer.",
      "Take a moment to settle into your body. Notice where your body makes contact with the surface beneath you.",
      "Now, bring your attention to your breath. Observe the natural rhythm of your inhales and exhales.",
      "Notice the sensation of the air as it enters your nostrils or mouth, and as it leaves.",
      "Feel your chest or abdomen gently rise as you breathe in, and fall as you breathe out.",
      "There's no need to change your breathing in any way. Simply observe it, as it is.",
      "If your mind wanders, which is perfectly normal, gently acknowledge the thought without judgment, and then softly guide your attention back to your breath.",
      "Continue this for a few more moments, resting in the awareness of your breath.",
      "As this short meditation comes to an end, begin to deepen your breath slightly.",
      "Become aware of your body and your surroundings again.",
      "When you're ready, gently wiggle your fingers and toes.",
      "Slowly open your eyes. Carry this sense of calm with you."
    ]
  },
  {
    id: "body-scan-meditation",
    title: "Body Scan Meditation (10 Min)",
    icon: PlayCircle,
    description: "A longer meditation to cultivate awareness of bodily sensations.",
    script: [
      "Begin by finding a comfortable position, ideally lying down on your back, or sitting if that's more comfortable for you. Let your arms rest by your sides, palms facing up or down.",
      "Allow your eyes to gently close, or maintain a soft, unfocused gaze.",
      "Take a few deep, cleansing breaths. Inhale deeply through your nose, and exhale slowly through your mouth, releasing any initial tension.",
      "Now, bring your awareness to the toes of your left foot. Notice any sensations present there – perhaps warmth, coolness, tingling, or pressure. Simply observe without judgment.",
      "Slowly, let your awareness expand to include your entire left foot – the sole, the heel, the top of the foot.",
      "Continue this gentle scan up your left leg: your ankle, your calf, your shin, your knee. Notice any sensations as you pass through each area.",
      "Now, move to your left thigh, and then your left hip. Just observe what you feel.",
      "Shift your attention to the toes of your right foot. Observe any sensations here.",
      "Scan up through your right foot, ankle, calf, shin, and knee.",
      "Continue to your right thigh and right hip, noticing all sensations without judgment.",
      "Bring your awareness to your entire pelvic area, your abdomen, and your lower back.",
      "Move your attention to your chest and your upper back. Notice the gentle rise and fall with your breath.",
      "Scan your awareness down your left arm, from your shoulder to your fingertips. Then, do the same for your right arm.",
      "Bring your attention to your neck and throat, then to your jaw, allowing it to soften.",
      "Notice your face – your lips, your cheeks, your nose, your eyes, your forehead. Let go of any tension you might find.",
      "Finally, bring your awareness to the crown of your head.",
      "Now, feel your entire body as one whole, filled with sensation, breathing.",
      "Rest in this full-body awareness for a few moments.",
      "As you prepare to end this meditation, begin to deepen your breath.",
      "Gently wiggle your fingers and toes. Slowly bring movement back to your body.",
      "When you feel ready, slowly open your eyes, carrying this awareness with you into the rest of your day."
    ]
  },
  {
    id: "stress-relief-visualization",
    title: "Stress Relief Visualization (7 Min)",
    icon: PlayCircle,
    description: "Visualize a calming scene to release stress and tension.",
    script: [
      "Settle into a comfortable and quiet space where you won't be disturbed.",
      "Close your eyes gently and take three slow, deep breaths. With each exhale, imagine releasing any tension you're holding.",
      "Imagine yourself in a place that feels perfectly peaceful and safe to you. This could be a beautiful beach, a quiet forest, a serene mountaintop, or any place, real or imagined, where you feel completely at ease.",
      "Take a moment to absorb the details of this place. What do you see around you? Notice the colors, the light, the shapes.",
      "What do you hear? Perhaps the gentle lapping of waves, the rustling of leaves, the soft sound of wind, or complete silence.",
      "What do you feel? Maybe the warmth of the sun on your skin, a cool breeze, the soft grass beneath you.",
      "Allow yourself to fully immerse in this peaceful environment. Feel the sense of calm and tranquility washing over you.",
      "With each inhale, breathe in the peace and serenity of this place. With each exhale, let go of any remaining stress or worry.",
      "Imagine any tension in your body dissolving, like mist in the morning sun.",
      "Stay in this peaceful place for as long as you wish, soaking in the calm.",
      "Know that you can return to this peaceful place in your mind whenever you need to find a moment of calm.",
      "When you're ready to return, slowly begin to bring your awareness back to your physical surroundings.",
      "Take a few gentle breaths. Wiggle your fingers and toes.",
      "And when you're ready, open your eyes, feeling refreshed and more at ease."
    ]
  }
];

// Mood Tracking
export const MOOD_TRACKING_ICON = ClipboardList;
export const LOCAL_STORAGE_MOOD_ENTRIES_KEY = "bestfriendBuddyMoodEntries";

export interface MoodEntry {
  id: string;
  timestamp: number;
  mood: string; // From MOOD_OPTIONS value
  notes?: string;
}

export const MOOD_ADVICE: Record<string, { title: string, advice: string[], icon?: LucideIcon }> = {
  happy: {
    title: "Embrace the Joy! 😊",
    advice: [
      "Share your happiness with someone you care about.",
      "Take a moment to savor this feeling. What contributed to it?",
      "Consider doing something you love to prolong this positive state."
    ],
    icon: Smile
  },
  sad: {
    title: "It's Okay to Not Be Okay 💙",
    advice: [
      "Be gentle with yourself. Your feelings are valid.",
      "Consider reaching out to a friend, family member, or Bestfriend Buddy to talk.",
      "Engage in a comforting activity, like listening to music or watching a favorite movie."
    ],
    icon: Frown
  },
  anxious: {
    title: "Finding Your Calm Center 🧘",
    advice: [
      "Try a simple breathing exercise: inhale for 4, hold for 4, exhale for 6.",
      "Focus on your senses: What are 5 things you can see, 4 you can touch, 3 you can hear?",
      "Remember that this feeling will pass. You are stronger than your anxiety."
    ],
    icon: ShieldAlert
  },
  calm: {
    title: "Basking in Serenity ☀️",
    advice: [
      "Appreciate this moment of peace. What helps you feel calm?",
      "Use this clarity to reflect or plan something positive.",
      "Carry this feeling with you as you go about your day."
    ],
    icon: IconCalm
  },
  stressed: {
    title: "Managing the Pressure 🌬️",
    advice: [
      "Identify one small thing you can do to alleviate some stress.",
      "Take a short break to stretch, walk, or step away from the stressor.",
      "Remind yourself that you can handle this. Break tasks into smaller steps."
    ],
    icon: IconStressed
  },
  overwhelmed: {
    title: "One Step at a Time ☁️",
    advice: [
      "Focus on one task or thought at a time. It's okay to pause.",
      "Write down what's on your mind to help organize your thoughts.",
      "Don't hesitate to ask for help or delegate if possible."
    ],
    icon: IconOverwhelmed
  },
  general: {
    title: "Reflection & Self-Care Tips ✨",
    advice: [
      "Tracking your mood helps you understand patterns and triggers.",
      "Remember to be kind to yourself, no matter how you're feeling.",
      "Consider activities that nourish your mind and body, like exercise, hobbies, or spending time in nature.",
      "Connecting with others can provide support and perspective.",
      "If you're consistently struggling, exploring educational resources or seeking professional guidance can be very helpful."
    ],
    icon: Lightbulb
  }
};
