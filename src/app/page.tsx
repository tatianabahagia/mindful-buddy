
"use client";

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ChatDisplay, type Message as ChatMessageType } from "@/components/chat/ChatDisplay";
import { UserInputBar } from "@/components/chat/UserInputBar";
import { EducationalResourcesDialog } from "@/components/EducationalResourcesDialog"; // Added import
import { getAiResponseAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { 
  DEFAULT_GREETING, 
  ERROR_MESSAGE_AI, 
  AI_NAME,
  EMERGENCY_SUICIDE_WARNING_TITLE,
} from "@/lib/constants";
import { v4 as uuidv4 } from 'uuid';

export default function BestfriendBuddyPage() {
  const [userName, setUserName] = useState<string>("");
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [illness, setIllness] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<string>("en");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState<boolean>(false);
  const [isEducationalResourcesOpen, setIsEducationalResourcesOpen] = useState<boolean>(false); // Added state
  
  const { toast } = useToast();

  useEffect(() => {
    const storedUserName = localStorage.getItem("bestfriendBuddyUserName");
    if (storedUserName) setUserName(storedUserName);
    
    const storedMood = localStorage.getItem("bestfriendBuddyMood");
    if (storedMood && storedMood !== "none") setMood(storedMood); 

    const storedIllness = localStorage.getItem("bestfriendBuddyIllness");
    if (storedIllness && storedIllness !== "none") setIllness(storedIllness); 

    const storedLanguage = localStorage.getItem("bestfriendBuddyLanguage");
    if (storedLanguage) setLanguage(storedLanguage);

    setMessages([
      {
        id: uuidv4(),
        role: "assistant",
        content: DEFAULT_GREETING,
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (userName) localStorage.setItem("bestfriendBuddyUserName", userName);
    else localStorage.removeItem("bestfriendBuddyUserName"); 
  }, [userName]);

  useEffect(() => {
    if (mood && mood !== "none") localStorage.setItem("bestfriendBuddyMood", mood);
    else localStorage.removeItem("bestfriendBuddyMood");
  }, [mood]);
  
  useEffect(() => {
    if (illness && illness !== "none") localStorage.setItem("bestfriendBuddyIllness", illness);
    else localStorage.removeItem("bestfriendBuddyIllness");
  }, [illness]);

  useEffect(() => {
    localStorage.setItem("bestfriendBuddyLanguage", language);
  }, [language]);

  const handleToggleEducationalDialog = () => {
    setIsEducationalResourcesOpen(prev => !prev);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = currentMessage.trim();
    if (!trimmedMessage && !userName && !mood && !illness) {
        return; 
    }

    const userMessageContent = trimmedMessage || `(Shared an update to my profile)`;
    const userMessage: ChatMessageType = {
      id: uuidv4(),
      role: "user",
      content: userMessageContent,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setCurrentMessage("");
    setIsLoadingAiResponse(true);

    try {
      const aiResponse = await getAiResponseAction({
        userInput: trimmedMessage || `My current details: Name: ${userName || 'not set'}, Mood: ${mood || 'not set'}, Condition: ${illness || 'not set'}. How are you, ${AI_NAME}?`,
        userName: userName || undefined,
        mood: mood || undefined,
        illness: illness || undefined,
      });

      if (aiResponse.isSuicidalRisk && aiResponse.emergencyContactInfo) {
        toast({
          variant: "destructive",
          title: EMERGENCY_SUICIDE_WARNING_TITLE,
          description: aiResponse.emergencyContactInfo,
          duration: 30000, 
        });
      }

      const assistantMessage: ChatMessageType = {
        id: uuidv4(),
        role: "assistant",
        content: aiResponse.response,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessageContent = error instanceof Error && error.message !== ERROR_MESSAGE_AI 
        ? `Something went a little sideways: ${error.message} But I'm still here for you! 🤗` 
        : ERROR_MESSAGE_AI;
      
      toast({
        variant: "destructive",
        title: "Oh no! 🥺 Something went wrong...",
        description: errorMessageContent, 
      });
       const fallbackResponseMessage: ChatMessageType = {
        id: uuidv4(),
        role: "assistant",
        content: "I'm having a little trouble connecting right now, but I'm still here for you. Could you try sending your message again in a moment? 🙏 Your feelings are important to me. 💖",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, fallbackResponseMessage]);
    } finally {
      setIsLoadingAiResponse(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AppHeader onToggleEducationalDialog={handleToggleEducationalDialog} />
      <ChatDisplay messages={messages} userName={userName} isLoadingAiResponse={isLoadingAiResponse} />
      <UserInputBar
        userName={userName}
        setUserName={setUserName}
        mood={mood}
        setMood={setMood}
        illness={illness}
        setIllness={setIllness}
        language={language}
        setLanguage={setLanguage}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        onSendMessage={handleSendMessage}
        isLoading={isLoadingAiResponse}
      />
      <EducationalResourcesDialog 
        isOpen={isEducationalResourcesOpen} 
        onOpenChange={setIsEducationalResourcesOpen} 
      />
    </div>
  );
}
