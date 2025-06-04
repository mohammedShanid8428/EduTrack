"use client"

import React, { useEffect, useState } from "react"
import GradeTable from "@/components/GradeTable"
import { getAllGrades } from "@/services/AllApis"
import { Download, MessageCircle } from "lucide-react"

const Grades = () => {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await getAllGrades()
        setStudents(res.data)
        if (res.data.length > 0) {
          setSelectedStudent(res.data[0])
        }
      } catch (error) {
        console.error("Failed to fetch student grades:", error)
      }
    }
    fetchGrades()
  }, [])

  const handleStudentChange = (studentId) => {
    const student = students.find(s => s.studentId === studentId)
    setSelectedStudent(student)
  }

  const upcomingTests = [
    { date: "Mon 2", subject: "General Math", teacher: "Will Smith" },
    { date: "Tue 3", subject: "Physics", teacher: "John Doe" },
    { date: "Wed 4", subject: "School Holiday", teacher: "-" },
    { date: "Thu 5", subject: "Chemistry", teacher: "Mark Hussey" },
  ]

  const calculateGPA = (subjects) => {
    if (!subjects) return "A+"
    const gradePoints = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D+": 1.3, "D": 1.0, "F": 0.0
    }
    const total = subjects.reduce((sum, subject) => {
      return sum + (gradePoints[subject.grade] || 0)
    }, 0)
    const average = total / subjects.length
    if (average >= 3.7) return "A"
    if (average >= 3.3) return "A-"
    if (average >= 3.0) return "B+"
    if (average >= 2.7) return "B"
    return "B-"
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Row 1: GPA Summary and Grades Table */}
      <div className="lg:col-span-4 bg-background dark:bg-background rounded-xl p-6 shadow-sm border dark:border-accent">
        <div className="text-gray-600 dark:text-foreground text-sm mb-1">Stay on top of</div>
        <h2 className="text-lg font-semibold">your child's progress</h2>
        
        <select 
          className="mt-4 w-full text-sm border px-3 py-2 rounded-lg dark:bg-gray-800 dark:text-gray-200 focus:outline focus:ring-2 focus:ring-green-500"
          onChange={(e) => handleStudentChange(e.target.value)}
          value={selectedStudent?.studentId || ""}
        >
          {students.map((student) => (
            <option key={student.id} value={student.studentId}>
              {student.studentId} - {student.course}
            </option>
          ))}
        </select>

        <div className="mt-8 space-y-4">
          <div className="flex items-end gap-4">
            <div className="text-5xl font-bold text-green-600">
              {selectedStudent ? calculateGPA(selectedStudent.subjects) : "N/A"}
            </div>
            <div className="text-2xl font-semibold mb-1">82%</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-gray-50 dark:bg-background border dark:border-accent p-2 rounded">
              <div className="text-gray-500 dark:text-gray-200">Semester</div>
              <div className="font-medium">4th</div>
            </div>
            <div className="bg-gray-50 dark:bg-background border dark:border-accent p-2 rounded">
              <div className="text-gray-500 dark:text-gray-200">Credits</div>
              <div className="font-medium">18/24</div>
            </div>
            <div className="bg-gray-50 dark:bg-background border dark:border-accent p-2 rounded">
              <div className="text-gray-500 dark:text-gray-200">Rank</div>
              <div className="font-medium">Top 10%</div>
            </div>
          </div>

          <div className="text-xs text-gray-400 mt-4">
            Last updated: November 30, 2024
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 bg-background dark:bg-background border dark:border-accent rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          Grades {selectedStudent?.course && `- ${selectedStudent.course}`}
        </h3>
        {selectedStudent ? (
          <div className="max-w-3xl">
            <GradeTable subjects={selectedStudent.subjects} />
          </div>
        ) : (
          <p>No student selected or no grades available</p>
        )}
      </div>

      {/* Row 2: Smaller cards */}
      <div className="lg:col-span-3 bg-background dark:bg-background border dark:border-accent rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium mb-4">Upcoming Tests</h3>
        <ul className="space-y-3">
          {upcomingTests.map((test, idx) => (
            <li key={idx} className="flex items-start justify-between">
              <span className="text-sm font-semibold text-foreground dark:text-foreground">{test.date}</span>
              <div className="text-sm text-right">
                <div>{test.subject}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">by {test.teacher}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3 bg-background dark:bg-background border dark:border-accent rounded-xl p-6 shadow-sm text-center">
        <h3 className="text-sm font-medium mb-2">Attendance</h3>
        <div className="relative w-32 h-32 mx-auto mb-4 border rounded-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold">87%</div>
          </div>
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
              d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831"
            />
            <path
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeDasharray="87, 100"
              d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831"
            />
          </svg>
        </div>
        <div className="text-sm">Present: 184 days</div>
        <div className="text-sm text-gray-500 dark:text-gray-200">Absent: 23 days</div>
      </div>

      <div className="lg:col-span-3 bg-gradient-to-tr from-gray-800 to-gray-600 text-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold">Yearly Report</h3>
          <p className="text-2xl font-bold mt-2">2024</p>
        </div>
        <button className="mt-6 flex items-center justify-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
          <Download className="w-4 h-4" /> Download
        </button>
      </div>

      <div className="lg:col-span-3 bg-background dark:bg-background border dark:border-accent rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-semibold">Chats This Week</h3>
            <p className="text-3xl font-bold">14</p>
            <p className="text-xs text-green-500 mt-1">+2 Today</p>
          </div>
          <MessageCircle className="w-10 h-10 text-orange-500 bg-orange-100 p-2 rounded-full" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/40?img=${i + 10}`}
              alt="user"
              className="w-8 h-8 rounded-full border"
            />
          ))}
          <button className="ml-auto bg-orange-100 text-orange-600 px-3 py-1 text-xs rounded-full font-medium hover:bg-orange-200">
            Join Club
          </button>
        </div>
      </div>
    </div>
  )
}

export default Grades