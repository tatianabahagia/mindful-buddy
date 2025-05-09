import { APP_NAME } from '@/lib/constants';
import { MessageSquareHeart } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="p-4 border-b border-border/60 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-2">
        <MessageSquareHeart className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">{APP_NAME}</h1>
      </div>
    </header>
  );
}
