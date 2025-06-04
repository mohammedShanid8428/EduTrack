"use client"

import React, { useState, useEffect } from "react"
import { getAllStudents, updateStudent, deleteStudent } from "@/services/AllApis"
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

// Static grade data
const gradeData = [
  { grade: "A", count: 50 },
  { grade: "B", count: 80 },
  { grade: "C", count: 40 },
  { grade: "D", count: 20 },
  { grade: "F", count: 10 },
]

// Helper function to get CSS variable values
const getColorVar = (name) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return `hsl(${value})`
}

const StudentListPage = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [colors, setColors] = useState({
    primary: "#8884d8",
    secondary: "#82ca9d",
    accent: "#ffc658",
    background: "#1d2c28",
    muted: "#1a2d24",
  })

  const headerData = ["ID", "Name", "Email", "Course", "Status", "Actions"]

  // Update chart colors when theme changes
  const updateChartColors = () => {
    setColors({
      primary: getColorVar("--primary"),
      secondary: getColorVar("--secondary"),
      accent: getColorVar("--accent"),
      background: getColorVar("--background"),
      muted: getColorVar("--muted"),
    })
  }

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await getAllStudents()
      setUserData(response.data)
    } catch (error) {
      console.error("Error Fetching User Data:", error.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle student update
  const handleUpdateStudent = async (studentId, updatedData) => {
    try {
      await updateStudent(studentId, updatedData)
      fetchUserData() // Refresh data
    } catch (error) {
      console.error("Error updating student:", error)
    }
  }

  // Handle student deletion
  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId)
      fetchUserData() // Refresh data
    } catch (error) {
      console.error("Error deleting student:", error)
    }
  }

  useEffect(() => {
    fetchUserData()
    updateChartColors()

    // Observe theme changes
    const observer = new MutationObserver(updateChartColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  // Chart data and configurations
  const courseData = [
    { course: "Math", students: 120 },
    { course: "Science", students: 95 },
    { course: "English", students: 80 },
    { course: "History", students: 60 },
    { course: "Computer", students: 145 },
  ]

  const courseChartConfig = {
    students: { label: "Students" },
    Math: { label: "Math", color: colors.primary },
    Science: { label: "Science", color: colors.secondary },
    English: { label: "English", color: colors.accent },
    History: { label: "History", color: colors.background },
    Computer: { label: "Computer", color: colors.muted },
  }

  const gradeChartConfig = {
    count: { label: "Students" },
    A: { label: "Grade A", color: colors.primary },
    B: { label: "Grade B", color: colors.secondary },
    C: { label: "Grade C", color: colors.accent },
    D: { label: "Grade D", color: colors.muted },
    F: { label: "Grade F", color: colors.background },
  }

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden">
      {/* Student Table Section - 55% of viewport */}
      <div className="h-[55vh] border dark:border-accent rounded-xl overflow-hidden mb-4">
        <h1 className="text-xl font-semibold px-4 pt-4 pb-2 border-b dark:border-b-accent">Students Data</h1>
        <div className="h-[calc(55vh-3.5rem)] overflow-auto px-4 pb-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              Loading students...
            </div>
          ) : (
            <TableData 
              HeadData={headerData} 
              rowData={userData} 
              onStudentsUpdate={fetchUserData}
              onEdit={handleUpdateStudent}
              onDelete={handleDeleteStudent}
            />
          )}
        </div>
      </div>

      {/* Charts Section - 45% of viewport */}
      <div className="h-[45vh] grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0 mb-5">
        {/* Course Distribution Card */}
        <Card className="h-full bg-background text-foreground dark:bg-background dark:text-background-foreground border border dark:border-accent">
          <CardHeader className="items-center pb-0">
            <CardTitle>Students Per Course</CardTitle>

          </CardHeader>
          <CardContent className="h-[calc(45vh-2rem)]">
            <ChartContainer config={courseChartConfig} className="py-2">
              <PieChart>
                <Pie
                  data={courseData}
                  dataKey="students"
                  nameKey="course"
                  outerRadius={80}
                  label
                >
                  {courseData.map((entry, index) => (
                    <Cell
                      key={`course-${index}`}
                      fill={courseChartConfig[entry.course]?.color || "#ccc"}
                    />
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

        {/* Grade Distribution Card */}
        <Card className="h-[45vh] bg-background text-foreground dark:bg-background dark:text-background-foreground border border dark:border-accent">
          <CardHeader className="items-center pb-0">
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Current Semester</CardDescription>
          </CardHeader>
          <CardContent className="h-[calc(45vh-2rem)]">
            <ChartContainer config={gradeChartConfig} className="py-2 ">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
                <Pie
                  data={gradeData}
                  dataKey="count"
                  nameKey="grade"
                  outerRadius={80}
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
          <CardFooter className="flex-col text-sm">
            <div className="flex items-center font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default StudentListPage