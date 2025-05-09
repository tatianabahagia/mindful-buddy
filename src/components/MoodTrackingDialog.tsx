
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"; // For potential future date/time override
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MOOD_TRACKING_ICON, MOOD_OPTIONS, type MoodEntry, MOOD_ADVICE } from "@/lib/constants";
import { getMoodEntries, addMoodEntry, deleteMoodEntry } from "@/lib/mood-storage";
import { AlertCircle, CheckCircle, Edit3, Info, Smile, Trash2 } from "lucide-react";

interface MoodTrackingDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const moodEntrySchema = z.object({
  mood: z.string().min(1, "Please select a mood."),
  notes: z.string().optional(),
});

type MoodEntryFormData = z.infer<typeof moodEntrySchema>;

export function MoodTrackingDialog({
  isOpen,
  onOpenChange,
}: MoodTrackingDialogProps) {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const form = useForm<MoodEntryFormData>({
    resolver: zodResolver(moodEntrySchema),
    defaultValues: {
      mood: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      setMoodEntries(getMoodEntries());
      // Reset form and hide it when dialog opens, unless there are no entries
      if (getMoodEntries().length > 0) {
        setShowAddForm(false);
      } else {
        setShowAddForm(true); // Show form if no entries exist
      }
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit: SubmitHandler<MoodEntryFormData> = (data) => {
    addMoodEntry(data);
    setMoodEntries(getMoodEntries()); // Refresh entries
    form.reset();
    setShowAddForm(false); // Hide form after submission
  };

  const handleDeleteEntry = (id: string) => {
    deleteMoodEntry(id);
    setMoodEntries(getMoodEntries()); // Refresh entries
  };

  const getMoodIcon = (moodValue: string) => {
    const moodOption = MOOD_OPTIONS.find(opt => opt.value === moodValue);
    return moodOption?.icon || Smile;
  };

  const getMoodLabel = (moodValue: string) => {
    const moodOption = MOOD_OPTIONS.find(opt => opt.value === moodValue);
    return moodOption?.label || "Mood";
  };
  
  const latestMood = useMemo(() => {
    if (moodEntries.length > 0) {
      return moodEntries[0].mood; // Assuming entries are sorted by timestamp desc
    }
    return null;
  }, [moodEntries]);

  const currentAdvice = useMemo(() => {
    if (latestMood && MOOD_ADVICE[latestMood]) {
      return MOOD_ADVICE[latestMood];
    }
    return MOOD_ADVICE.general;
  }, [latestMood]);


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center text-2xl">
            <MOOD_TRACKING_ICON className="mr-3 h-7 w-7 text-primary" />
            Mood Journal
          </DialogTitle>
          <DialogDescription className="pt-1">
            Track your moods over time to gain insights and reflect on your well-being.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Left Column: History */}
          <div className="md:col-span-2 border-r-0 md:border-r flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Mood History</h3>
              {!showAddForm && (
                 <Button variant="outline" size="sm" onClick={() => { setShowAddForm(true); form.reset(); }}>
                    <Edit3 className="mr-2 h-4 w-4" /> Add New Entry
                </Button>
              )}
            </div>
            <ScrollArea className="flex-grow p-2 sm:p-4">
              {moodEntries.length === 0 && !showAddForm && (
                <div className="text-center text-muted-foreground py-10">
                  <p>No mood entries yet.</p>
                  <p>Click "Add New Entry" to start tracking.</p>
                </div>
              )}
              <div className="space-y-4">
                {moodEntries.map((entry) => (
                  <Card key={entry.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {React.createElement(getMoodIcon(entry.mood), { className: "h-6 w-6 text-primary" })}
                          <CardTitle className="text-lg">{getMoodLabel(entry.mood)}</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteEntry(entry.id)}>
                          <Trash2 className="h-4 w-4" />
                           <span className="sr-only">Delete entry</span>
                        </Button>
                      </div>
                      <CardDescription className="text-xs pt-1">
                        {format(new Date(entry.timestamp), "PPpp")} {/* e.g., Aug 22, 2023, 4:30 PM */}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {entry.notes && <p className="text-sm text-foreground/80 whitespace-pre-wrap">{entry.notes}</p>}
                       {!entry.notes && <p className="text-sm text-muted-foreground italic">No additional notes.</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column: Add Form / Advice */}
          <div className="md:col-span-1 flex flex-col overflow-hidden bg-muted/30">
            {showAddForm ? (
            <>
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-foreground">Log Your Current Mood</h3>
                </div>
                <ScrollArea className="flex-grow p-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="mood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How are you feeling?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your mood" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {MOOD_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center">
                                    {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormItem>
                      <Label htmlFor="entry-datetime">Date & Time</Label>
                      <Input id="entry-datetime" type="text" value={format(new Date(), "PPpp")} disabled className="bg-muted/50" />
                       <p className="text-xs text-muted-foreground pt-1">Current date and time are automatically recorded.</p>
                    </FormItem>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any thoughts or details? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What's on your mind? What happened today?"
                              className="resize-none min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2 justify-end pt-2">
                        <Button type="button" variant="ghost" onClick={() => { setShowAddForm(false); form.reset();}}>Cancel</Button>
                        <Button type="submit">Save Entry</Button>
                    </div>
                  </form>
                </Form>
                </ScrollArea>
            </>
            ) : (
            <>
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-foreground">Reflection & Advice</h3>
                </div>
                <ScrollArea className="flex-grow p-4">
                    <Card className="bg-background shadow-none">
                        <CardHeader className="flex-row items-center gap-3 pb-3">
                             {React.createElement(currentAdvice.icon || Info, { className: "h-7 w-7 text-primary" })}
                            <CardTitle className="text-xl">{currentAdvice.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {currentAdvice.advice.map((tip, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <p className="text-foreground/80">{tip}</p>
                                </div>
                            ))}
                            {moodEntries.length === 0 && (
                                 <div className="flex items-start gap-2 text-muted-foreground pt-2">
                                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                    <p>Start logging your mood to get more personalized reflections!</p>
                                 </div>
                            )}
                        </CardContent>
                    </Card>
                </ScrollArea>
            </>
            )}
          </div>
        </div>
        
        <DialogFooter className="p-4 border-t bg-muted/30">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
