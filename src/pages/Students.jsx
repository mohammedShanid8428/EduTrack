"use client"

import React, { useState, useEffect } from "react";
import { getAllStudents, updateStudent, deleteStudent } from "@/services/AllApis";
import TableData from "@/components/TableData";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  LabelList, 
  XAxis, 
  YAxis, 
  PieChart, 
  Pie, 
  Cell, 
  Sector,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Static grade data
const gradeData = [
  { grade: "A", count: 50 },
  { grade: "B", count: 80 },
  { grade: "C", count: 40 },
  { grade: "D", count: 20 },
  { grade: "F", count: 10 },
];

// Helper function to get CSS variable values
const getColorVar = (name) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? `hsl(${value})` : "#8884d8"; // Fallback color
};

const StudentListPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [colors, setColors] = useState({
    primary: "hsl(161, 45%, 25%)", // Dark green from the theme
    secondary: "hsl(162, 65%, 41%)", // Light green from the theme
    background: "#1d2c28",
    muted: "#1a2d24",
  });

  const headerData = ["ID", "Name", "Email", "Course", "Status", "Actions"];

  const updateChartColors = () => {
    setColors({
      primary: getColorVar("--primary") || "hsl(161, 45%, 25%)",
      secondary: getColorVar("--secondary") || "hsl(162, 65%, 41%)",
      background: getColorVar("--background") || "#1d2c28",
      muted: getColorVar("--muted") || "#1a2d24",
    });
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getAllStudents();
      setUserData(response.data);
    } catch (error) {
      console.error("Error Fetching User Data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (studentId, updatedData) => {
    try {
      await updateStudent(studentId, updatedData);
      fetchUserData();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      fetchUserData();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    updateChartColors();
    const observer = new MutationObserver(updateChartColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Course enrollment data
  const courseData = [
    { course: "Computer Science", students: 650 },
    { course: "Mechanical Engineering", students: 420 },
    { course: "Electrical Engineering", students: 580 },
    { course: "Civil Engineering", students: 300 },
    { course: "Chemical Engineering", students: 200 },
    { course: "Biotechnology", students: 150 },
    { course: "Information Technology", students: 400 },
    { course: "Data Science", students: 500 },
  ];

  // Handle pie chart hover
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Active shape for pie chart
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  // Custom label for pie chart center
  const renderCustomizedLabel = ({ cx, cy }) => {
    const activeGrade = gradeData[activeIndex];
    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-foreground"
      >
        <tspan
          x={cx}
          y={cy}
          className="text-2xl font-bold"
        >
          {activeGrade.count}
        </tspan>
        <tspan
          x={cx}
          y={cy + 24}
          className="fill-muted-foreground text-sm"
        >
          {activeGrade.grade} Students
        </tspan>
      </text>
    );
  };

  return (
    <div className="h-screen flex flex-col p-4 overflow-y-auto">
      {/* Student Table Section */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0 mb-2 bg-background dark:bg-background">
        {/* Students Per Course Chart */}
        <Card className={'gap-2 bg-background dark:bg-background'}>
          <CardHeader className={'pb-2'}>
            <CardTitle>Students Per Course</CardTitle>
            <CardDescription>Current enrollment vs course capacity for Fall 2024 semester.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart 
                data={courseData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="course" 
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: "currentColor" }}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "currentColor" }}
                  domain={[0, 800]}
                  ticks={[0, 200, 400, 600, 800]}
                />
                <Tooltip />
                <Bar 
                  dataKey="students" 
                  fill="hsl(162, 65%, 59%)"
                  radius={[6, 6, 0, 0]} 
                >
                  <LabelList 
                    dataKey="students" 
                    position="top" 
                    fill={colors.primary}
                    className="font-bold text-sm"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className={'gap-2 bg-background dark:bg-background'}>
          <CardHeader className="flex flex-col items-center pb-0">
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Current Semester</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={gradeData}
                  dataKey="count"
                  nameKey="grade"
                  innerRadius={60}
                  outerRadius={80}
                  stroke="none"
                  onMouseEnter={onPieEnter}
                >
                  {gradeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0 ? "hsl(161, 45%, 25%)" : 
                        index === 1 ? "hsl(162, 65%, 41%)" : 
                        index === 2 ? "hsl(162, 65%, 30%)" : 
                        index === 3 ? "hsl(162, 65%, 20%)" : 
                        "hsl(162, 65%, 10%)"
                      }
                    />
                  ))}
                  {/* Custom center label */}
                  {renderCustomizedLabel({ cx: 150, cy: 150 })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex justify-center pt-0 pb-2">
            <div className="flex flex-wrap justify-center gap-4">
              {gradeData.map((grade, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: 
                        index === 0 ? "hsl(161, 45%, 25%)" : 
                        index === 1 ? "hsl(162, 65%, 41%)" : 
                        index === 2 ? "hsl(162, 65%, 30%)" : 
                        index === 3 ? "hsl(162, 65%, 20%)" : 
                        "hsl(162, 65%, 10%)"
                    }}
                  />
                  <span className="text-sm">{grade.grade}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StudentListPage;