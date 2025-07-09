import { SidebarTrigger } from '@/components/ui/sidebar';
import { PlantingCalendarClient } from './PlantingCalendarClient';

export default function PlantingCalendarPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 p-4 lg:p-6 border-b">
        <SidebarTrigger className="lg:hidden" />
        <div>
          <h1 className="text-2xl font-bold font-headline">Planting Calendar</h1>
          <p className="text-muted-foreground">Find the best time to plant your crops.</p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <PlantingCalendarClient />
      </main>
    </div>
  );
}
