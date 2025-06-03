"use client"

import React, { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import CourseTable from "@/components/CoureTable"

import { courseList, summaryData, chartData, chartConfig } from "@/components/CourseData"

const Courses = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setCourses(courseList)
    }, 300)
  }, [])

  return (
    <div className="p-4 space-y-4 h-screen overflow-auto">
      <CourseTable courses={courses} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[45vh]">
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Custom Label</CardTitle>
            <p className="text-sm text-muted-foreground">January - June 2024</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ right: 16 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="month"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  hide
                />
                <XAxis dataKey="desktop" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="desktop"
                  layout="vertical"
                  fill="var(--color-desktop)"
                  radius={4}
                >
                  <LabelList
                    dataKey="month"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="desktop"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        <div className="w-full max-w-xs rounded-xl bg-white shadow-md p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-700">Summary</h2>
            <button className="text-gray-400 hover:text-gray-600">•••</button>
          </div>
          <div className="space-y-3">
            {summaryData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg hover:bg-gray-50 cursor-pointer p-2 transition"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.bg}`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 ml-3">
                  <div className="text-base font-semibold text-gray-800">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
                <div className="text-gray-400">&gt;</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
