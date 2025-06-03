import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircleCheck, ArrowRight, Users2 } from "lucide-react";

const gpaData = [
  { name: "Test 01", student: 85, average: 70 },
  { name: "Test 02", student: 88, average: 75 },
  { name: "Mid Term", student: 92, average: 80 },
  { name: "Test 03", student: 81, average: 76 },
  { name: "Test 04", student: 84, average: 78 },
  { name: "Final", student: 89, average: 82 },
];

const bestStudents = [
  { name: "Dianne Russell", grade: "A+ (11 times)", avatar: "🧑‍🎓" },
  { name: "Savannah Nguyen", grade: "A+ (10 times)", avatar: "👩‍🎓" },
  { name: "Darrell Steward", grade: "A (9 times)", avatar: "🧑‍🎓" },
  { name: "Arlene McCoy", grade: "A (8 times)", avatar: "👩‍🎓" },
];

const Grades = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 min-h-screen font-sans">
      {/* GPA Card */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
        <div>
          <h2 className="text-sm text-gray-500 mb-1">Stay on top of your child's progress</h2>
          <select className="text-sm border rounded px-2 py-1">
            <option>Student</option>
            <option>James Peter</option>
          </select>
          <h1 className="text-6xl font-bold mt-4">A+</h1>
          <p className="text-2xl font-semibold">82%</p>
          <p className="text-xs text-gray-400 mt-1">Last updated: November 30, 2024</p>
        </div>
      </div>

      {/* GPA Analytics */}
      <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">GPA Analytics</h2>
          <p className="text-sm text-gray-400">This year</p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={gpaData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="student" fill="#1f2937" />
            <Bar dataKey="average" fill="#d1d5db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Best of School */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Best of School</h2>
        <ul>
          {bestStudents.map((student, index) => (
            <li key={index} className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{student.avatar}</span>
                <div>
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-gray-400">{student.grade}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-2 text-blue-500 text-sm flex items-center gap-1">
          View full list <ArrowRight size={16} />
        </button>
      </div>

      {/* Upcoming Tests */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Upcoming Tests</h2>
        <ul className="text-sm">
          <li className="mb-2">Mon 2 - General Math <span className="text-gray-400">by Will Smith</span></li>
          <li className="mb-2">Tue 3 - Physics <span className="text-gray-400">by John Doe</span></li>
          <li className="mb-2">Wed 4 - School Holiday</li>
          <li>Chemistry <span className="text-gray-400">by Mark Hussey</span></li>
        </ul>
      </div>

      {/* Attendance */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">87%</div>
          <p className="text-sm text-gray-500">Attendance</p>
          <div className="mt-4 text-sm">
            <p><span className="text-red-500">●</span> Absent: 23 Days</p>
            <p><span className="text-green-500">●</span> Presented: 184 Days</p>
          </div>
        </div>
      </div>

      {/* Yearly Report */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow text-center flex flex-col justify-center">
        <h2 className="text-lg font-semibold mb-2">Yearly Report</h2>
        <div className="h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <span className="text-xl">📄</span>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Download Report</button>
      </div>

      {/* Chat Club */}
      <div className="col-span-1 bg-orange-100 p-6 rounded-2xl shadow flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold">14</h2>
          <p className="text-sm text-gray-700">New chats added per week</p>
          <p className="text-xs mt-1">+2 Today</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex -space-x-2">
            <span className="w-8 h-8 bg-gray-300 rounded-full inline-block">👧</span>
            <span className="w-8 h-8 bg-gray-400 rounded-full inline-block">🧒</span>
            <span className="w-8 h-8 bg-gray-500 rounded-full inline-block">👦</span>
          </div>
          <button className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Users2 size={14} /> Join club
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grades;