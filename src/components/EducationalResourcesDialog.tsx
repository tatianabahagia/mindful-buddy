
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
import { EDUCATIONAL_CONTENT, type EducationalTopic } from "@/lib/constants";
import { BookOpen } from "lucide-react";

interface EducationalResourcesDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function EducationalResourcesDialog({
  isOpen,
  onOpenChange,
}: EducationalResourcesDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center text-2xl">
            <BookOpen className="mr-3 h-7 w-7 text-primary" />
            Educational Resources
          </DialogTitle>
          <DialogDescription className="pt-1">
            Explore these topics to learn more about mental well-being and coping strategies.
            Remember, this information is not a substitute for professional medical advice.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto px-6 pb-6">
          <Accordion type="single" collapsible className="w-full">
            {EDUCATIONAL_CONTENT.map((topic: EducationalTopic) => (
              <AccordionItem value={topic.id} key={topic.id}>
                <AccordionTrigger className="text-lg hover:no-underline">
                  <div className="flex items-center">
                    {topic.icon && <topic.icon className="mr-2.5 h-5 w-5 text-primary/80" />}
                    {topic.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {topic.content.map((paragraph, index) => (
                    <p key={index} className={index < topic.content.length - 1 ? "mb-2" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
