"use client";

import React, { useRef, useEffect } from 'react';
import { ChatMessage, type Message } from './ChatMessage';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatDisplayProps {
  messages: Message[];
  userName?: string;
  isLoadingAiResponse: boolean;
}

export function ChatDisplay({ messages, userName, isLoadingAiResponse }: ChatDisplayProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isLoadingAiResponse]);

  return (
    <ScrollArea className="flex-grow" viewportRef={viewportRef} ref={scrollAreaRef}>
      <div className="container mx-auto p-4 space-y-1">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} userName={userName} />
        ))}
        {isLoadingAiResponse && (
          <div className="flex justify-start items-center p-2">
            <div className="flex items-center space-x-2 bg-card p-3 rounded-lg shadow-md border rounded-bl-none">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-0"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-400"></div>
                <span className="text-sm text-muted-foreground">Bestfriend Buddy is typing...</span>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
