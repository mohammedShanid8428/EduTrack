import React from 'react'
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableActionMenu from "./TableActionMenu"
import { updateStudent, deleteStudent } from "@/services/AllApis"

const TableData = ({ HeadData, rowData, onStudentsUpdate }) => {
  const handleEdit = async (studentId, newData) => {
    try {
      await updateStudent(studentId, newData)
      onStudentsUpdate() // Refresh the student list
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId)
      onStudentsUpdate() // Refresh the student list
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

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
        {rowData.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.id}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.course}</TableCell>
            <TableCell>
              <Badge variant={data.status === 'Active' ? 'secondary' : 'destructive'}>
                {data.status}
              </Badge>
            </TableCell>
            <TableCell>
              <TableActionMenu 
                studentId={data.id} 
                initialData={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableData