import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Droplets, Nut, Ruler, Sun, Sprout } from "lucide-react";
import Image from "next/image";

const plants = [
  {
    name: "Cherry Tomato",
    species: "Solanum lycopersicum var. cerasiforme",
    image: "https://placehold.co/600x400.png",
    aiHint: "cherry tomatoes",
    requirements: {
      light: "6-8+ hours",
      water: "Consistent moisture",
      nutrients: "Rich in phosphorus and potassium",
      spacing: "18-24 inches",
    },
  },
  {
    name: "Romaine Lettuce",
    species: "Lactuca sativa var. longifolia",
    image: "https://placehold.co/600x400.png",
    aiHint: "romaine lettuce",
    requirements: {
      light: "4-6 hours (can tolerate partial shade)",
      water: "Keep soil evenly moist",
      nutrients: "Nitrogen-rich fertilizer",
      spacing: "8-12 inches",
    },
  },
  {
    name: "Nantes Carrot",
    species: "Daucus carota subsp. sativus",
    image: "https://placehold.co/600x400.png",
    aiHint: "carrots garden",
    requirements: {
      light: "6+ hours",
      water: "Regular, deep watering",
      nutrients: "Low nitrogen, high potassium/phosphate",
      spacing: "2-3 inches",
    },
  },
  {
    name: "Marketmore Cucumber",
    species: "Cucumis sativus",
    image: "https://placehold.co/600x400.png",
    aiHint: "cucumber plant",
    requirements: {
      light: "6-8 hours",
      water: "Loves water, 1-2 inches per week",
      nutrients: "Balanced, all-purpose fertilizer",
      spacing: "12 inches (trellised)",
    },
  },
];

const Requirement = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-start gap-3">
        <div className="text-primary pt-1">{icon}</div>
        <div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">{value}</p>
        </div>
    </div>
)


export default function GrowingSpecsPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 p-4 lg:p-6 border-b">
        <SidebarTrigger className="lg:hidden" />
        <div>
          <h1 className="text-2xl font-bold font-headline">Growing Specifications</h1>
          <p className="text-muted-foreground">Detailed profiles for various plant species.</p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {plants.map((plant) => (
            <Card key={plant.name} className="overflow-hidden transition-all hover:shadow-lg">
              <Image src={plant.image} alt={plant.name} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={plant.aiHint} />
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-2xl">{plant.name}</CardTitle>
                        <CardDescription>{plant.species}</CardDescription>
                    </div>
                    <Badge variant="secondary"><Sprout className="w-4 h-4 mr-1.5" />Vegetable</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-bold mb-4">Requirements</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Requirement icon={<Sun />} label="Light" value={plant.requirements.light} />
                  <Requirement icon={<Droplets />} label="Water" value={plant.requirements.water} />
                  <Requirement icon={<Nut />} label="Nutrients" value={plant.requirements.nutrients} />
                  <Requirement icon={<Ruler />} label="Spacing" value={plant.requirements.spacing} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
