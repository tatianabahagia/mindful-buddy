"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Added AvatarImage
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

  const formatContent = (text: string) => {
    // Basic parser for **bold** and *italic*
    // Emoticons (unicode) should render correctly as they are part of the text.
    // This also respects newlines and whitespace for pre-wrap.
    return text.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      // Replace \n with <br /> for explicit line breaks if needed, but whitespace-pre-wrap handles most cases.
      // For now, relying on whitespace-pre-wrap.
      return part;
    });
  };

  const avatarInitial = userName ? userName.charAt(0).toUpperCase() : (isUser ? 'U' : AI_NAME.charAt(0));

  return (
    <div className={cn("flex w-full items-start gap-3 py-2.5", isUser ? "justify-end pl-10 sm:pl-16" : "justify-start pr-10 sm:pr-16")}>
      {!isUser && (
        <Avatar className="h-9 w-9 border-2 border-primary/30 shadow-sm bg-card">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {/* AI_NAME.charAt(0) or a Bot icon */}
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-3.5 py-2.5 shadow-md text-sm leading-relaxed", // Adjusted padding and text size
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none border border-border/70"
        )}
      >
        <p className="whitespace-pre-wrap">{formatContent(message.content)}</p>
        <p className={cn(
            "mt-1.5 text-xs opacity-70", // Slightly more subtle timestamp
             isUser ? "text-right text-primary-foreground/70" : "text-left text-muted-foreground"
            )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 border-2 border-accent/40 shadow-sm bg-card">
          {/* Optional: Add <AvatarImage src="/path-to-user-image.png" /> if user images are supported */}
          <AvatarFallback className="bg-accent/10 text-accent-foreground font-semibold">
            {userName ? avatarInitial : <UserIcon size={20} />}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
