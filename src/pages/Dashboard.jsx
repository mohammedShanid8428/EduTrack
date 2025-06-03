import StatCard from '../components/StatCard';
import BarChartWidget from '../components/BarCharWidget';
import TimeTableWidget from '../components/TimeTableWidget';
import { Users, BookOpen, BarChart2, CalendarPlus } from 'lucide-react';


export default function Dashboard() {


  return (
    <div className="flex  bg-background dark:bg-background min-h-screen ">

      <div className="flex-1 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 px-4">
          <StatCard label="Students" labelColor="text-gray-900 dark:text-gray-100" value="745 enrolled" icon={Users} />
          <StatCard label="Courses" labelColor="text-gray-900 dark:text-gray-100" value="12 active" icon={BookOpen} />
          <StatCard label="Grades" labelColor="text-gray-900 dark:text-gray-100" value="Average: A-" icon={BarChart2} />
          <StatCard label="Assignments" labelColor="text-gray-900 dark:text-gray-100" value="128 submitted" icon={CalendarPlus} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <BarChartWidget />
          <TimeTableWidget />
        </div>
      </div>
    </div>

  );
}
