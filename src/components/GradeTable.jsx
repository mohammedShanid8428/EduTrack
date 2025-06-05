import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const GradeTable = ({ subjects }) => {
  return (
    <div className="max-h-64 overflow-y-auto border rounded-md">
      <Table className="min-w-full text-sm text-left">
        <TableHeader className="bg-background dark:bg-background">
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={index} className="hover:bg-muted transition">
              <TableCell className="font-medium">{subject.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    subject.grade.startsWith("A")
                      ? "secondary"
                      : subject.grade.startsWith("B")
                      ? "default"
                      : "destructive"
                  }
                >
                  {subject.grade}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GradeTable;
