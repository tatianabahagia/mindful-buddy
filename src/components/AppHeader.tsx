import { APP_NAME } from '@/lib/constants';
import { MessageSquareHeart } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="p-4 border-b border-border/60 bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center gap-3">
        <MessageSquareHeart className="h-8 w-8 text-primary" strokeWidth={2.5} />
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{APP_NAME}</h1>
      </div>
    </header>
  );
}
