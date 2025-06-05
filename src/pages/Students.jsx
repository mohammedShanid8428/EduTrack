"use client";

import React, { useState, useEffect } from "react";
import {
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "@/services/AllApis";
import TableData from "@/components/TableData";
import {
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const gradeData = [
  { grade: "A", count: 50 },
  { grade: "B", count: 80 },
  { grade: "C", count: 40 },
  { grade: "D", count: 20 },
  { grade: "F", count: 10 },
];

const StudentListPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const headerData = ["ID", "Name", "Email", "Course", "Status", "Actions"];

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
  }, []);

  const chartData = [
    { course: "CSE", value1: 120, value2: 100 },
    { course: "ECE", value1: 150, value2: 90 },
    { course: "MECH", value1: 110, value2: 130 },
    { course: "CIV", value1: 140, value2: 120 },
    { course: "EEE", value1: 160, value2: 80 },
    { course: "IT", value1: 100, value2: 140 },
    { course: "BIO", value1: 130, value2: 110 },
    { course: "CHEM", value1: 90, value2: 150 },
    
  ];

  const chartConfig = {
    mathematics: {
      label: "Mathematics",
      color: "hsl(var(--primary))",
    },
    science: {
      label: "Science",
      color: "hsl(var(--accent))",
    },
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

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

  const renderCustomizedLabel = ({ cx, cy }) => {
    const activeGrade = gradeData[activeIndex];
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
        <tspan x={cx} y={cy} className="text-2xl font-bold">
          {activeGrade.count}
        </tspan>
        <tspan x={cx} y={cy + 24} className="fill-muted-foreground text-sm">
          {activeGrade.grade} Students
        </tspan>
      </text>
    );
  };

  return (
    <div className="h-screen flex flex-col p-4 overflow-y-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0 mb-2">
        <Card className="bg-background dark:bg-background gap-2">
          <CardHeader className="pb-1 pt-2">
            <CardTitle>Students per Course</CardTitle>
            <CardDescription>Tooltip with line indicator.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 px-2 pt-2" width="100%" height={140}>
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="course"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={false}
                />
                <Bar
                  dataKey="value1"
                  stackId="a"
                  fill="hsl(var(--primary))"
                  radius={[2, 2, 4, 4]}
                />
                <Bar
                  dataKey="value2"
                  stackId="a"
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="line" />}
                  cursor={false}
                  defaultIndex={2}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-background dark:bg-background gap-2">
          <CardHeader className="flex flex-col items-center pb-1 pt-2">
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Current Semester</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center mt-5 pb-3">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={gradeData}
                  dataKey="count"
                  nameKey="grade"
                  innerRadius={70}
                  outerRadius={90}
                  stroke="none"
                  onMouseEnter={onPieEnter}
                  labelLine={false}
                  label={renderCustomizedLabel}
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
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex justify-center pt-1 pb-2">
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
                                "hsl(162, 65%, 10%)",
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
