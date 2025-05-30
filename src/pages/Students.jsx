import React, { useState } from 'react';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const initialData = [
  { id: 1, name: 'John Doe', email: 'john_dmt@inc', course: 'Web Design', status: 'Active' },
  { id: 2, name: 'Louisa Smith', email: 'louis_smith@in', course: 'Data Science', status: 'Active' },
  { id: 3, name: 'James Wilson', email: 'james_wilson@m', course: 'Marketing', status: 'Active' },
  { id: 4, name: 'Emily Johnson', email: 'emily_johnson@n', course: 'Machine Learning', status: 'Active' },
  { id: 5, name: 'Michael Brown', email: 'michael.brown@v', course: 'Data Science', status: 'Inactive' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Students() {
  const [students, setStudents] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({ ...student });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = () => {
    setStudents(students.map(s => s.id === editingId ? formData : s));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const studentsPerCourse = Object.entries(
    students.reduce((acc, curr) => {
      acc[curr.course] = (acc[curr.course] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const gradesData = [
    { name: 'A', value: 8 },
    { name: 'B', value: 5 },
    { name: 'C', value: 2 },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="border rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-700 ">
        <h2 className="text-xl font-bold mb-4">Student Data</h2>
        <table className="w-full border border-gray-700 text-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black border-2 p-2">Name</th>
              <th className="border border-black border-2 p-2">Email</th>
              <th className="border border-black border-2 p-2">Course</th>
              <th className="border border-black border-2 p-2">Status</th>
              <th className="border border-black border-2 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                {editingId === student.id ? (
                  <>
                    <td className="border border-black border-2 p-2">
                      <input name="name" value={formData.name} onChange={handleChange} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input name="email" value={formData.email} onChange={handleChange} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input name="course" value={formData.course} onChange={handleChange} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <select name="status" value={formData.status} onChange={handleChange} className="w-full">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-black border-1 p-2">{student.name}</td>
                    <td className="border border-black border-1 p-2">{student.email}</td>
                    <td className="border border-black border-1 p-2">{student.course}</td>
                    <td className="border border-black border-1 p-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {student.status}
                      </span>
                    </td>
                  </>
                )}
                <td className="border p-2 text-center border-black border-1">
                  {editingId === student.id ? (
                    <div className="flex gap-2 justify-center">
                      <button onClick={handleSave}><Save size={16} className="text-green-600" /></button>
                      <button onClick={handleCancel}><X size={16} className="text-red-600" /></button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => handleEdit(student)}><Pencil size={16} className="text-blue-600" /></button>
                      <button onClick={() => handleDelete(student.id)}><Trash2 size={16} className="text-red-600" /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-4 bg-white dark:bg-gray-700">
          <h3 className="text-lg font-semibold mb-2">Students per Course</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={studentsPerCourse} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {studentsPerCourse.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="border rounded-2xl p-4 bg-white dark:bg-gray-700">
          <h3 className="text-lg font-semibold mb-2">Grades</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={gradesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {gradesData.map((entry, index) => (
                  <Cell key={`cell-grade-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Students;
