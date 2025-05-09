"use client";

import React, { useRef, useEffect } from 'react';
import { ChatMessage, type Message } from './ChatMessage';
import { ScrollArea } from "@/components/ui/scroll-area";
import { AI_NAME } from '@/lib/constants';

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
    <ScrollArea className="flex-grow bg-background/30" viewportRef={viewportRef} ref={scrollAreaRef}>
      <div className="container mx-auto p-4 space-y-1.5"> {/* Adjusted spacing */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} userName={userName} />
        ))}
        {isLoadingAiResponse && (
          <div className="flex justify-start items-end p-2 ml-12"> {/* Align with assistant messages */}
            <div className="flex items-center space-x-2 bg-card p-3 rounded-lg shadow-md border border-border/70 rounded-bl-none">
                <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse delay-0"></div>
                <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse delay-400"></div>
                <span className="text-sm text-muted-foreground">{AI_NAME} is typing...</span>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
