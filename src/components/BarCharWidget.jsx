"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp } from "lucide-react"

const data = [
  { name: "Mon", present: 30, absent: 15 },
  { name: "Tue", present: 45, absent: 25 },
  { name: "Wed", present: 20, absent: 10 },
  { name: "Thu", present: 50, absent: 25 },
  { name: "Fri", present: 35, absent: 18 },
  { name: "Sat", present: 38, absent: 17 },
  { name: "Sun", present: 48, absent: 14 },
]

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(161, 45%, 25%)", // --primary
  },
  absent: {
    label: "Absent",
    color: "hsl(162, 65%, 41%)", // --accent
  },
}

export default function BarChartWidget() {
  return (
    <Card className="bg-background dark:bg-background text-card-foreground shadow-lg border dark:border-accent">
      <CardHeader>
        <CardTitle>Student Attendance</CardTitle>
        <CardDescription>Weekly attendance report</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tick={{ fill: "currentColor" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "currentColor" }}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)" }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="present"
                fill="hsl(161, 45%, 25%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="absent"
                fill="hsl(162, 65%, 41%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
