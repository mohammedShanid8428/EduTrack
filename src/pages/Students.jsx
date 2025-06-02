"use client"

import React, { useState, useEffect } from "react"
import { getAllApis } from "@/services/AllApis"
import TableData from "@/components/TableData"
import { PieChart, Pie, Cell, LabelList } from "recharts"
import { TrendingUp } from "lucide-react"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Dummy data
const courseData = [
  { course: "Math", students: 120, fill: "var(--color-math)" },
  { course: "Science", students: 95, fill: "var(--color-science)" },
  { course: "English", students: 80, fill: "var(--color-english)" },
  { course: "History", students: 60, fill: "var(--color-history)" },
  { course: "Computer", students: 145, fill: "var(--color-computer)" },
]

const gradeData = [
  { grade: "A", count: 50 },
  { grade: "B", count: 80 },
  { grade: "C", count: 40 },
  { grade: "D", count: 20 },
  { grade: "F", count: 10 },
]

const courseChartConfig = {
  students: { label: "Students" },
  Math: { label: "Math", color: "var(--chart-1)" },
  Science: { label: "Science", color: "var(--chart-2)" },
  English: { label: "English", color: "var(--chart-3)" },
  History: { label: "History", color: "var(--chart-4)" },
  Computer: { label: "Computer", color: "var(--chart-5)" },
}

const gradeChartConfig = {
  count: { label: "Students" },
  A: { label: "Grade A", color: "var(--chart-1)" },
  B: { label: "Grade B", color: "var(--chart-2)" },
  C: { label: "Grade C", color: "var(--chart-3)" },
  D: { label: "Grade D", color: "var(--chart-4)" },
  F: { label: "Grade F", color: "var(--chart-5)" },
}

const StudentListPage = () => {
  const [userData, setUserData] = useState([])
  const headerData = ["Student ID", "Name", "Email", "Course", "Status"]

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await getAllApis()
      setUserData(response.data)
    } catch (error) {
      console.error("Error Fetching User Data:", error.message)
    }
  }

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden">
      {/* Top Section - Student Table */}
      <div className="flex-1 border rounded-xl overflow-hidden mb-4">
        <h1 className="text-xl font-semibold px-4 pt-4 pb-2">students data</h1>
        <div className="h-full overflow-auto px-4 pb-4">
          <TableData HeadData={headerData} rowData={userData} />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Students per Course */}
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Students Per Course</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer config={courseChartConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <Pie
                  data={courseData}
                  dataKey="students"
                  nameKey="course"
                  outerRadius={100}
                  label
                >
                  {courseData.map((entry, index) => (
                    <Cell key={`course-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="course" />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Current Semester</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer config={gradeChartConfig} className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
                <Pie
                  data={gradeData}
                  dataKey="count"
                  nameKey="grade"
                  outerRadius={90}
                  label
                >
                  <LabelList
                    dataKey="grade"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value) => gradeChartConfig[value]?.label ?? value}
                  />
                  {gradeData.map((entry, index) => (
                    <Cell
                      key={`grade-${index}`}
                      fill={gradeChartConfig[entry.grade]?.color || "#ccc"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              Showing student grade distribution
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default StudentListPage
