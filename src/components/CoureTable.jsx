import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableActionMenu from "./TableActionMenu";

const CourseTable = ({ HeadData, rowData, onCoursesUpdate }) => {
  const handleEdit = async (courseId, newData) => {
    try {
      await updateCourse(courseId, newData);
      onCoursesUpdate(); // Refresh the course list
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      onCoursesUpdate(); // Refresh the course list
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {HeadData.map((header, index) => (
            <TableHead className="first:w-[100px]" key={index}>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowData.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{course.id}</TableCell>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.duration}</TableCell>
            <TableCell>{course.instructor}</TableCell>
            <TableCell className="max-w-[300px] truncate">{course.description}</TableCell>
            <TableCell>
              <TableActionMenu 
                itemId={course.id} 
                initialData={course}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CourseTable;