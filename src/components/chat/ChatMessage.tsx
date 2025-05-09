"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User as UserIcon } from "lucide-react";
import { AI_NAME } from "@/lib/constants";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface ChatMessageProps {
  message: Message;
  userName?: string;
}

export function ChatMessage({ message, userName }: ChatMessageProps) {
  const isUser = message.role === "user";

  // Function to parse markdown-like bold/italics and render emoticons correctly
  const formatContent = (text: string) => {
    // This is a very basic parser. For complex markdown, a library would be better.
    // It handles **bold** and *italic* and ensures emoticons are rendered.
    // The AI prompt requests emoticons, so they should come as unicode characters.
    // This primarily focuses on ensuring whitespace and newlines are respected.
    return text.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };


  return (
    <div className={cn("flex w-full items-start gap-3 py-2", isUser ? "justify-end pl-10" : "justify-start pr-10")}>
      {!isUser && (
        <Avatar className="h-9 w-9 border-2 border-primary/50 shadow-sm">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-xl p-3 shadow-md",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none border"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{formatContent(message.content)}</p>
        <p className={cn(
            "mt-1.5 text-xs opacity-80",
             isUser ? "text-right text-primary-foreground/80" : "text-left text-muted-foreground"
            )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 border-2 border-accent/50 shadow-sm">
          <AvatarFallback className="bg-accent/20 text-accent-foreground">
            {userName ? userName.charAt(0).toUpperCase() : <UserIcon size={20} />}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
