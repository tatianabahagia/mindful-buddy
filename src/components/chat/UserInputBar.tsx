"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MOOD_OPTIONS, ILLNESS_OPTIONS, LANGUAGE_OPTIONS, SelectOption } from "@/lib/constants";
import { User, Languages, Send, Sparkles, HeartPulse, Brain } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


interface UserInputBarProps {
  userName: string;
  setUserName: (name: string) => void;
  mood: string | undefined;
  setMood: (mood: string | undefined) => void;
  illness: string | undefined;
  setIllness: (illness: string | undefined) => void;
  language: string;
  setLanguage: (language: string) => void;
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export function UserInputBar({
  userName, setUserName,
  mood, setMood,
  illness, setIllness,
  language, setLanguage,
  currentMessage, setCurrentMessage,
  onSendMessage, isLoading
}: UserInputBarProps) {

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() || userName || mood || illness ) { // Allow sending if any preference is set or message typed
        onSendMessage();
    }
  };
  
  const renderSelectOption = (option: SelectOption) => (
    <SelectItem key={option.value} value={option.value}>
      <div className="flex items-center gap-2">
        {option.icon && <option.icon className="h-4 w-4 opacity-70" />}
        <span>{option.label}</span>
      </div>
    </SelectItem>
  );

  return (
    <div className="border-t bg-background/80 backdrop-blur-sm p-3 sm:p-4 sticky bottom-0">
      <div className="container mx-auto">
        <ScrollArea className="w-full whitespace-nowrap pb-2.5">
            <div className="flex w-max space-x-3 sm:space-x-4 mb-3">
                <div className="space-y-1.5 min-w-[150px]">
                  <Label htmlFor="userName" className="text-xs text-muted-foreground flex items-center"><User size={12} className="mr-1"/> Name</Label>
                  <Input
                    id="userName"
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="h-9 text-sm"
                    aria-label="Your Name"
                  />
                </div>
                <div className="space-y-1.5 min-w-[150px]">
                  <Label htmlFor="mood" className="text-xs text-muted-foreground flex items-center"><Sparkles size={12} className="mr-1"/>Mood</Label>
                  <Select value={mood} onValueChange={(value) => setMood(value === "none" ? undefined : value)}>
                    <SelectTrigger id="mood" className="h-9 text-sm" aria-label="Select Mood">
                      <SelectValue placeholder="Select Mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 opacity-70" /><span>Select Mood</span></div>
                      </SelectItem>
                      {MOOD_OPTIONS.map(renderSelectOption)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 min-w-[170px]">
                  <Label htmlFor="illness" className="text-xs text-muted-foreground flex items-center"><HeartPulse size={12} className="mr-1"/>Condition</Label>
                  <Select value={illness} onValueChange={(value) => setIllness(value === "none" ? undefined : value)}>
                    <SelectTrigger id="illness" className="h-9 text-sm" aria-label="Select Condition">
                      <SelectValue placeholder="Select Condition" />
                    </SelectTrigger>
                    <SelectContent>
                       {ILLNESS_OPTIONS.map(renderSelectOption)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 min-w-[150px]">
                  <Label htmlFor="language" className="text-xs text-muted-foreground flex items-center"><Languages size={12} className="mr-1"/>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="h-9 text-sm" aria-label="Select Language">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map(renderSelectOption)}
                    </SelectContent>
                  </Select>
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        <form onSubmit={handleSendMessage} className="flex items-end gap-2 sm:gap-3">
          <Textarea
            placeholder="Type your message or concerns here..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            className="flex-grow resize-none text-sm min-h-[40px] max-h-[120px] shadow-sm"
            aria-label="Your message"
            rows={1}
          />
          <Button 
            type="submit" 
            disabled={isLoading || (!currentMessage.trim() && !userName && !mood && !illness)} 
            className="h-10 w-10 p-0 sm:h-auto sm:w-auto sm:px-6 sm:py-2 rounded-full sm:rounded-md shadow-md transition-all duration-150 ease-in-out hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Send message"
          >
            <Send size={18} />
            <span className="hidden sm:inline ml-2">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
