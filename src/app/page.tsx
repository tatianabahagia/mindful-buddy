"use client";

import { useState, useEffect, FormEvent } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ChatDisplay, type Message as ChatMessageType } from "@/components/chat/ChatDisplay";
import { UserInputBar } from "@/components/chat/UserInputBar";
import { getAiResponseAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_GREETING, ERROR_MESSAGE_AI } from "@/lib/constants";
import { v4 as uuidv4 } from 'uuid'; // For generating unique message IDs

// Add this if not already present
// npm install uuid
// npm install @types/uuid --save-dev


export default function MindfulBuddyPage() {
  const [userName, setUserName] = useState<string>("");
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [illness, setIllness] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<string>("en"); // Default to English
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState<boolean>(false);
  
  const { toast } = useToast();

  useEffect(() => {
    // Load preferences from localStorage if available
    const storedUserName = localStorage.getItem("mindfulBuddyUserName");
    if (storedUserName) setUserName(storedUserName);
    
    const storedMood = localStorage.getItem("mindfulBuddyMood");
    if (storedMood) setMood(storedMood);

    const storedIllness = localStorage.getItem("mindfulBuddyIllness");
    if (storedIllness) setIllness(storedIllness);

    const storedLanguage = localStorage.getItem("mindfulBuddyLanguage");
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

  // Save preferences to localStorage
  useEffect(() => {
    if (userName) localStorage.setItem("mindfulBuddyUserName", userName);
  }, [userName]);

  useEffect(() => {
    if (mood) localStorage.setItem("mindfulBuddyMood", mood);
    else localStorage.removeItem("mindfulBuddyMood");
  }, [mood]);
  
  useEffect(() => {
    if (illness) localStorage.setItem("mindfulBuddyIllness", illness);
    else localStorage.removeItem("mindfulBuddyIllness");
  }, [illness]);

  useEffect(() => {
    localStorage.setItem("mindfulBuddyLanguage", language);
  }, [language]);


  const handleSendMessage = async () => {
    const trimmedMessage = currentMessage.trim();
    if (!trimmedMessage) {
      // If only preferences changed, allow "sending" to update AI context (optional)
      // For now, require a message. Could be changed to send on preference change too.
      if(!userName && !mood && !illness) return;
    }

    const userMessage: ChatMessageType = {
      id: uuidv4(),
      role: "user",
      content: trimmedMessage || "...", // Send "..." if only preferences were changed
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setCurrentMessage("");
    setIsLoadingAiResponse(true);

    try {
      const aiResponse = await getAiResponseAction({
        userInput: trimmedMessage || `The user updated their information: Name: ${userName || 'not set'}, Mood: ${mood || 'not set'}, Condition: ${illness || 'not set'}. Please acknowledge or respond gently.`,
        userName: userName || undefined,
        mood: mood || undefined,
        illness: illness || undefined,
      });

      const assistantMessage: ChatMessageType = {
        id: uuidv4(),
        role: "assistant",
        content: aiResponse.response,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGE_AI;
      toast({
        variant: "destructive",
        title: "Oh no! 🥺",
        description: errorMessage,
      });
       const fallbackResponseMessage: ChatMessageType = {
        id: uuidv4(),
        role: "assistant",
        content: "I'm having a little trouble connecting right now, but I'm still here for you. Could you try sending your message again in a moment? 🙏",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, fallbackResponseMessage]);
    } finally {
      setIsLoadingAiResponse(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AppHeader />
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
    </div>
  );
}
