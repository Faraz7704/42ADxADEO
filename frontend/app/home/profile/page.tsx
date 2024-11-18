"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "June", Questions: 5, Answers: 2 },
  { month: "July", Questions: 10, Answers: 4 },
  { month: "August", Questions: 6, Answers: 12 },
  { month: "September", Questions: 3, Answers: 10 },
  { month: "October", Questions: 16, Answers: 13 },
  { month: "November", Questions: 4, Answers: 5 },
];

const chartConfig = {
  Questions: {
    label: "Questions",
    color: "hsl(var(--chart-1))",
  },
  Answers: {
    label: "Answers",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
        {/* Profile Card */}
        <Card className="w-full shadow-md">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="/path-to-image.jpg" alt="User Avatar" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center text-lg font-semibold">
              Abdullah Almansouri
              </CardTitle>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Consultant
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email
                </label>
                <Input type="email" value="abdullah@stuff.adec.ae" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Sector
                </label>
                <Input type="text" value="Education" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Location
                </label>
                <Input type="text" value="UAE, Abu Dhabi" readOnly />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="w-full md:w-auto">
              Edit Profile
            </Button>
            <Button className="w-full md:w-auto">Log Out</Button>
          </CardFooter>
        </Card>

        {/* Questions Statistics Card */}
        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle>Questions and Answers</CardTitle>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              June - November 2024
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="Questions" fill="var(--color-Questions)" radius={4} />
                <Bar dataKey="Answers" fill="var(--color-Answers)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          
          <CardFooter className="flex-col items-start gap-2 text-sm">
            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
