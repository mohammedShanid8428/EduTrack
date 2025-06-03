"use client"

import React, { useEffect, useState } from "react"
import CourseTable from "@/components/CourseTable"
import { courseList, chartData } from "@/data/courseData"
import { ChevronRight, BookOpen, Clock, Award, PieChart } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setTimeout(() => {
      setCourses(courseList)
    }, 300)
  }, [])

  const popularCourses = [
    {
      id: "PC001",
      name: "COREX",
      description: "Sidon Oil Design With Talmud™",
      stats: "30 Lessons + 48 Hours",
      category: "engineering"
    },
    {
      id: "PC002",
      name: "AI Fundamentals",
      description: "Machine Learning Basics",
      stats: "25 Lessons + 40 Hours",
      category: "technology"
    },
    {
      id: "PC003",
      name: "Digital Marketing",
      description: "Social Media Strategies",
      stats: "20 Lessons + 35 Hours",
      category: "business"
    }
  ]

  const courseSummary = [
    { title: "Course", value: 24, icon: <BookOpen size={18} /> },
    { title: "Task Unit", value: 120, icon: <Clock size={18} /> },
    { title: "Exams", value: 18, icon: <Award size={18} /> }
  ]

  const courseTopics = [
    { name: "Design", value: 40, fill: "#8884d8" },
    { name: "Create", value: 50, fill: "#83a6ed" },
    { name: "Business", value: 30, fill: "#8dd1e1" },
    { name: "Data", value: 10, fill: "#82ca9d" }
  ]

  return (
    <div className="p-6 space-y-6 h-screen overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Dashboard</h1>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("all")}
          >
            All Courses
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === "my" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("my")}
          >
            My Courses
          </button>
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Popular Courses Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Popular Course</h2>
            <button className="text-sm text-blue-600 flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {popularCourses.map((course) => (
              <div key={course.id} className="border-b pb-4 last:border-0 last:pb-0">
                <h3 className="font-bold text-lg">{course.name}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
                <p className="text-gray-500 text-xs mt-1">{course.stats}</p>
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            {courseSummary.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-gray-500 text-sm">{item.title}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Completion Rate</span>
              <span className="text-sm font-semibold">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        {/* Course Topics Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Course Topic</h2>
            <button className="text-sm text-blue-600 flex items-center">
              <PieChart size={16} className="mr-1" /> View Details
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-40 h-40">
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
                  >
                    {courseTopics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-0 md:ml-6 mt-4 md:mt-0">
              <ul className="space-y-3">
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
        </div>
      </div>

      {/* Course Table Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">All Courses</h2>
          <div className="flex space-x-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Filter by Category</option>
              <option>Technology</option>
              <option>Business</option>
              <option>Design</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Add New Course
            </button>
          </div>
        </div>
        <CourseTable courses={courses} />
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Course Enrollment</h2>
          {/* Placeholder for enrollment chart */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Enrollment Chart</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BookOpen size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New course added: Advanced React</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses