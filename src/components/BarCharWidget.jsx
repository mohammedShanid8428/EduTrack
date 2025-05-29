import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', students: 40 },
  { name: 'Tue', students: 35 },
  { name: 'Wed', students: 15 },
  { name: 'Thu', students: 25 },
  { name: 'Fri', students: 45 },
  { name: 'Sat', students: 38 },
  { name: 'Sun', students: 30 },
];

export default function BarChartWidget() {
  return (
    <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
       <h3 className="font-semibold text-lg mb-2">Total students</h3>
      <p className="font-medium mb-4">Bar Chart</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={v => `${v}`} />
          <Tooltip />
          <Bar dataKey="students" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
