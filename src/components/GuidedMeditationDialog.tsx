
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GUIDED_MEDITATIONS, type GuidedMeditationTopic } from "@/lib/constants";
import { Headphones, AlignLeft } from "lucide-react";

interface GuidedMeditationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function GuidedMeditationDialog({
  isOpen,
  onOpenChange,
}: GuidedMeditationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center text-2xl">
            <Headphones className="mr-3 h-7 w-7 text-primary" />
            Guided Meditations
          </DialogTitle>
          <DialogDescription className="pt-1">
            Find a quiet space, relax, and choose a meditation to guide you.
            These are for relaxation and are not a substitute for professional therapy.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto px-6 pb-6">
          <Accordion type="single" collapsible className="w-full">
            {GUIDED_MEDITATIONS.map((meditation: GuidedMeditationTopic) => (
              <AccordionItem value={meditation.id} key={meditation.id}>
                <AccordionTrigger className="text-lg hover:no-underline">
                  <div className="flex items-center">
                    {meditation.icon ? <meditation.icon className="mr-2.5 h-5 w-5 text-primary/80" /> : <AlignLeft className="mr-2.5 h-5 w-5 text-primary/80" /> }
                    {meditation.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-3 italic">{meditation.description}</p>
                  {meditation.script.map((paragraph, index) => (
                    <p key={index} className={index < meditation.script.length - 1 ? "mb-2.5" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {GUIDED_MEDITATIONS.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              More guided meditations coming soon!
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
