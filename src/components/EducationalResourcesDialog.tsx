
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
import { BookOpen, ExternalLink, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                  {topic.videoUrl && (
                    <div className="my-4 rounded-md overflow-hidden shadow-lg" data-ai-hint="education learning">
                       <video
                        key={topic.videoUrl}
                        className="w-full aspect-video"
                        controls
                        preload="metadata"
                      >
                        <source src={topic.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  {topic.content.map((paragraph, index) => (
                    <p key={index} className={index < topic.content.length - 1 ? "mb-2" : ""}>
                      {paragraph}
                    </p>
                  ))}
                  {topic.externalLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full group"
                      asChild
                    >
                      <a href={topic.externalLink} target="_blank" rel="noopener noreferrer">
                        {topic.externalLinkText || "Learn More"}
                        <ExternalLink className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {EDUCATIONAL_CONTENT.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <PlayCircle className="mx-auto h-12 w-12 text-primary/50 mb-2" />
              <p className="text-lg font-medium">Educational Content Coming Soon!</p>
              <p className="text-sm">We're working on bringing you helpful videos and resources.</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
