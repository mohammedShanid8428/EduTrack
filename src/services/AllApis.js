import { baseUrl } from "@/baseUrl"
import axios from "axios"

export const getAllStudents = async () => {
  return await axios.get(`${baseUrl}/students`)
}

export const updateStudent = async (studentId, studentData) => {
  return await axios.put(`${baseUrl}/students/${studentId}`, studentData)
}

export const deleteStudent = async (studentId) => {
  return await axios.delete(`${baseUrl}/students/${studentId}`)
}

export const getAllGrades = async () => {
  return await axios.get(`${baseUrl}/grades`);
};

export const getStudentGrades = async (studentId) => {
  return await axios.get(`${baseUrl}/grades/${studentId}`);
};

// Update grades of a student by studentId
export const getAllCourses = async () => {
  return await axios.get(`${baseUrl}/courses`);
};