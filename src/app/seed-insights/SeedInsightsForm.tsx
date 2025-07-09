"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import type { SeedInformationOutput } from "@/ai/flows/seed-information";
import { getSeedInfoAction } from "./actions";
import { Loader2, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  seedName: z.string().min(2, { message: "Seed name must be at least 2 characters." }),
});

export function SeedInsightsForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeedInformationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seedName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const { success, data, error } = await getSeedInfoAction(values);
    setLoading(false);

    if (success && data) {
      setResult(data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: error || "Failed to get seed information.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Enter Seed Name</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="seedName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seed Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cherry Tomato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Insights
            </Button>
          </form>
        </Form>

        {loading && (
          <div className="mt-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Analyzing...</p>
          </div>
        )}

        {result && (
          <div className="mt-6">
            <h3 className="text-xl font-bold font-headline mb-4">Results for {form.getValues("seedName")}</h3>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Optimal Planting Times
                  </div>
                </AccordionTrigger>
                <AccordionContent>{result.optimalPlantingTimes}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Expected Yields
                    </div>
                </AccordionTrigger>
                <AccordionContent>{result.expectedYields}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        Common Issues
                    </div>
                </AccordionTrigger>
                <AccordionContent>{result.commonIssues}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
