import { SidebarTrigger } from '@/components/ui/sidebar';
import { SeedInsightsForm } from './SeedInsightsForm';

export default function SeedInsightsPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 p-4 lg:p-6 border-b">
        <SidebarTrigger className="lg:hidden" />
        <div>
          <h1 className="text-2xl font-bold font-headline">Seed Insights</h1>
          <p className="text-muted-foreground">Get AI-powered information about any seed variety.</p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-2xl mx-auto">
            <SeedInsightsForm />
        </div>
      </main>
    </div>
  );
}
