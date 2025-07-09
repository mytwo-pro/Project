"use client";

import { useState } from "react";
import { addDays, addMonths, startOfMonth } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const crops = [
  { value: "tomato", label: "Tomato" },
  { value: "lettuce", label: "Lettuce" },
  { value: "carrot", label: "Carrot" },
  { value: "cucumber", label: "Cucumber" },
];

// Mock data generation for planting dates
const getPlantingDays = (crop: string): Date[] => {
    if (!crop) return [];
    const today = new Date();
    const monthStart = startOfMonth(today);
    switch(crop) {
        case 'tomato':
            return [addDays(monthStart, 10), addDays(monthStart, 12), addDays(monthStart, 25)];
        case 'lettuce':
            return [addDays(monthStart, 5), addDays(monthStart, 15), addDays(startOfMonth(addMonths(today, 1)), 5)];
        case 'carrot':
            return [addDays(monthStart, 20), addDays(startOfMonth(addMonths(today, 1)), 1), addDays(startOfMonth(addMonths(today, 1)), 2)];
        case 'cucumber':
            return [addDays(monthStart, 18), addDays(monthStart, 19), addDays(monthStart, 20)];
        default:
            return [];
    }
}

export function PlantingCalendarClient() {
  const [location, setLocation] = useState("California, USA");
  const [crop, setCrop] = useState("tomato");
  
  const plantingDays = getPlantingDays(crop);

  const plantingDayStyle = {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    borderRadius: 'var(--radius)',
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Select Your Crop</CardTitle>
                <CardDescription>Choose your location and crop to see optimal planting times.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="location" className="text-sm font-medium">Location</label>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="crop" className="text-sm font-medium">Target Crop</label>
                    <Select value={crop} onValueChange={setCrop}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {crops.map((c) => (
                                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card className="p-0">
            <Calendar
                mode="multiple"
                selected={plantingDays}
                defaultMonth={new Date()}
                className="p-4 w-full"
                modifiers={{ plantingDay: plantingDays }}
                modifiersStyles={{ plantingDay: plantingDayStyle }}
                classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full justify-around",
                    month: "space-y-4 w-full",
                }}
            />
        </Card>
      </div>
    </div>
  );
}
