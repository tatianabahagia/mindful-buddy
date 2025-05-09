
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
    PRIVACY_DISCLAIMER_TITLE, 
    PRIVACY_DISCLAIMER_MESSAGE, 
    PRIVACY_DISCLAIMER_ACKNOWLEDGE_BUTTON 
} from "@/lib/constants";
import { Info } from "lucide-react";

interface PrivacyDisclaimerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function PrivacyDisclaimerDialog({
  isOpen,
  onOpenChange,
}: PrivacyDisclaimerDialogProps) {
  
  const handleAcknowledge = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Info className="mr-2 h-6 w-6 text-primary" />
            {PRIVACY_DISCLAIMER_TITLE}
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm text-muted-foreground">
            {PRIVACY_DISCLAIMER_MESSAGE}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button onClick={handleAcknowledge} className="w-full sm:w-auto">
            {PRIVACY_DISCLAIMER_ACKNOWLEDGE_BUTTON}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
