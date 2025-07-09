"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import type { SoilSuitabilityOutput } from "@/ai/flows/soil-suitability-analysis";
import { analyzeSoilAction } from "./actions";
import { Loader2, Leaf, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  texture: z.string().min(1, { message: "Please select a soil texture." }),
  ph: z.number().min(0).max(14),
  organicMatter: z.string().min(1, { message: "Please enter organic matter percentage." }),
  drainage: z.string().min(1, { message: "Please select a drainage type." }),
});

export function SoilAnalysisForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SoilSuitabilityOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      texture: "loamy",
      ph: 7,
      organicMatter: "3%",
      drainage: "well-drained",
    },
  });
  
  const phValue = form.watch('ph');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const { success, data, error } = await analyzeSoilAction(values);
    setLoading(false);

    if (success && data) {
      setResult(data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: error || "Failed to analyze soil.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Enter Soil Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="texture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soil Texture</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select texture" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="clayey">Clayey</SelectItem>
                      <SelectItem value="silty">Silty</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ph"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soil pH: <span className="font-bold text-primary">{phValue.toFixed(1)}</span></FormLabel>
                   <FormControl>
                     <Slider
                        min={0}
                        max={14}
                        step={0.1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organicMatter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organic Matter (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3%" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="drainage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drainage</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select drainage" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="well-drained">Well-drained</SelectItem>
                      <SelectItem value="moderately-drained">Moderately-drained</SelectItem>
                      <SelectItem value="poorly-drained">Poorly-drained</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Soil
            </Button>
          </form>
        </Form>

        {loading && (
          <div className="mt-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Analyzing your soil...</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><Leaf className="text-primary"/> Suitable Plants</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {result.suitablePlants.map(plant => (
                        <Badge key={plant} variant="secondary" className="text-base">{plant}</Badge>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><Wrench className="text-primary"/> Necessary Amendments</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{result.necessaryAmendments}</p>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
