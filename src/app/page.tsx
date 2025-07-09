import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowRight, CalendarDays, BookOpen, Search, Sprout, TestTube2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featureCards = [
  {
    title: "Seed Insights",
    description: "Get detailed information about any seed variety.",
    href: "/seed-insights",
    icon: <Sprout className="w-8 h-8 text-primary" />,
  },
  {
    title: "Soil Analysis",
    description: "Analyze your soil and get plant recommendations.",
    href: "/soil-analysis",
    icon: <TestTube2 className="w-8 h-8 text-primary" />,
  },
    {
    title: "Planting Calendar",
    description: "Find the optimal planting times for your crops.",
    href: "/planting-calendar",
    icon: <CalendarDays className="w-8 h-8 text-primary" />,
  },
  {
    title: "Growing Specs",
    description: "Browse detailed plant requirement profiles.",
    href: "/growing-specs",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 p-4 lg:p-6 border-b">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="space-y-6">
          <Card className="shadow-none border-0 bg-gradient-to-br from-primary/20 to-background">
            <CardHeader className="flex flex-row items-center gap-6">
              <div className="flex-1 space-y-2">
                <CardTitle className="text-3xl font-headline">Welcome to VerdantAI</CardTitle>
                <CardDescription className="text-lg">
                  Your AI-powered assistant for all your agricultural needs.
                </CardDescription>
                <div className="relative max-w-lg mt-4">
                  <Input placeholder="Search for seeds, plants, or soil types..." className="pr-10" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <Image src="https://placehold.co/200x200.png" alt="VerdantAI illustration" width={200} height={200} className="rounded-lg hidden md:block" data-ai-hint="agriculture technology" />
            </CardHeader>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                  {feature.icon}
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link href={feature.href}>
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
