
import { APP_NAME } from '@/lib/constants';
import { MessageSquareHeart, BookOpen, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  onToggleEducationalDialog: () => void;
  onToggleGuidedMeditationDialog: () => void; // New prop
}

export function AppHeader({ onToggleEducationalDialog, onToggleGuidedMeditationDialog }: AppHeaderProps) {
  return (
    <header className="p-4 border-b border-border/60 bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquareHeart className="h-8 w-8 text-primary" strokeWidth={2.5} />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{APP_NAME}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleEducationalDialog} aria-label="Open educational resources">
            <BookOpen className="h-6 w-6 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggleGuidedMeditationDialog} aria-label="Open guided meditations">
            <Headphones className="h-6 w-6 text-primary" />
          </Button>
        </div>
      </div>
    </header>
  );
}

