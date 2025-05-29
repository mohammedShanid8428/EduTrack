import StatCard from '../components/StatCard';
import BarChartWidget from '../components/BarCharWidget';
import TimeTableWidget from '../components/TimeTableWidget';
import StarStudents from '../components/StarStudents';


export default function Dashboard() {
 

  return (
    <div className="flex  bg-gray-100 dark:bg-gray-900 min-h-screen ">

      <div className="flex-1 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <StatCard label="students" value="745 enrolled" />
          <StatCard label="courses" value="12 active" />
          <StatCard label="grades" value="Average: A-" />
          <StatCard label="assignments" value="128 submitted" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <BarChartWidget />
          <TimeTableWidget />
        </div>

        {/* Star Students section */}
        <div className="bg-white dark:bg-gray-400 rounded-xl shadow p-1 mt-4">
          {/* <h3 className="font-semibold text-lg mb-2">Star students</h3> */}
          <StarStudents />
        </div>
      </div>
    </div>

  );
}
