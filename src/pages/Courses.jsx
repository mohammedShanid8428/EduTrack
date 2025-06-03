"use client"

import React, { useEffect, useState } from "react"
import { ChevronRight, PieChart as PieChartIcon, BookOpen, Users, Clock, Award } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { getAllCourses } from "@/services/AllApis"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses()
      setCourses(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching courses:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const tableHeaders = ['ID', 'Name', 'Duration', 'Instructor', 'Description', 'Status']

  // Popular courses data
  const popularCourses = [
    {
      id: "PC001",
      name: "Computer Science",
      description: "Core programming and algorithms",
      stats: "40 Lessons + 60 Hours",
      icon: <BookOpen className="w-5 h-5 text-blue-500" />
    },
    {
      id: "PC002",
      name: "Data Science",
      description: "Data analysis and machine learning",
      stats: "35 Lessons + 50 Hours",
      icon: <BookOpen className="w-5 h-5 text-green-500" />
    },
    {
      id: "PC003",
      name: "UI/UX Design",
      description: "Design principles and prototyping",
      stats: "30 Lessons + 45 Hours",
      icon: <BookOpen className="w-5 h-5 text-purple-500" />
    },
    {
      id: "PC004",
      name: "Cybersecurity",
      description: "Network security and ethical hacking",
      stats: "25 Lessons + 40 Hours",
      icon: <BookOpen className="w-5 h-5 text-red-500" />
    },
    {
      id: "PC005",
      name: "Cloud Computing",
      description: "Cloud services and architecture",
      stats: "30 Lessons + 55 Hours",
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />
    },
    {
      id: "PC006",
      name: "Mobile Development",
      description: "Building apps for iOS and Android",
      stats: "28 Lessons + 48 Hours",
      icon: <BookOpen className="w-5 h-5 text-teal-500" />
    }
  ]


  // Summary data with icons
  const courseSummary = [
    {
      title: "Total Courses",
      value: 24,
      icon: <BookOpen className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Active Courses",
      value: 18,
      icon: <Award className="w-6 h-6 text-green-500" />
    },
    {
      title: "Instructors",
      value: 12,
      icon: <Users className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Avg Duration",
      value: "3 Years",
      icon: <Clock className="w-6 h-6 text-orange-500" />
    }
  ]

  // Pie chart data
  const courseTopics = [
    { name: "Technology", value: 35 },
    { name: "Business", value: 25 },
    { name: "Design", value: 20 },
    { name: "Science", value: 20 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden bg-background dark:bg-background">
      {/* Courses Table - 45vh */}
      <div className="h-[45vh] bg-gray-150 dark:bg-background rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="p-4 border-b border-gray-300 dark:border-accent bg-gray-100 dark:bg-background">
          <h1 className="text-lg font-semibold text-foreground dark:text-foreground">Courses Table</h1>
        </div>
        <div className="h-[calc(45vh-3.5rem)] overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              Loading courses...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:border-accent">
              <thead className="bg-gray-150 dark:bg-background text-foreground dark:text-foreground ">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-foreground uppercase tracking-wider sticky top-0 bg-gray-50 dark:bg-background shadow-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-100  dark:bg-background divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-background transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {course.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                      {course.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100 max-w-xs truncate">
                      {course.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100">
                      <Badge variant={Math.random() > 0.5 ? 'secondary' : 'destructive'}>
                        {Math.random() > 0.5 ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Bottom Section - 55vh */}
      <div className="h-[55vh] grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Popular Courses - Left Column */}
        <Card className="h-full bg-background text-foreground dark:bg-background dark:text-background-foreground">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Popular Courses</CardTitle>
              <button className="text-sm text-blue-600 flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(55vh-5rem)] overflow-y-auto">
            <div className="space-y-4">
              {popularCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{course.name}</h3>
                      <p className="text-gray-600 dark:text-gray-200 text-sm mt-1">{course.description}</p>
                      <p className="text-gray-500 dark:text-gray-200 text-xs mt-2">{course.stats}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards - Middle Column */}
        <Card className="h-full bg-background text-foreground dark:bg-background dark:text-background-foreground">
          <CardHeader>
            <CardTitle>Course Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 h-full">
              {courseSummary.map((item, index) => (
                <div key={index} className="bg-white dark:bg-background rounded-lg p-4 shadow-sm border">
                  <div className="flex flex-col items-center">
                    <div className="p-1 bg-gray-100 rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 dark:text-gray-200 mt-1">{item.title}</h3>
                      <p className="text-xl font-bold text-center">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Right Column */}
        <Card className="h-full bg-background text-foreground dark:bg-background dark:text-background-foreground">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Course Topics</CardTitle>
              <button className="text-sm text-blue-600 flex items-center">
                <PieChartIcon size={16} className="mr-1" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(48vh-2rem)]">
            <div className="flex flex-col h-full">
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full h-full max-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={courseTopics}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {courseTopics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4">
                <ul className="grid grid-cols-2 gap-2">
                  {courseTopics.map((topic, index) => (
                    <li key={index} className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></span>
                      <span className="text-sm">{topic.name} ({topic.value}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CoursesPage