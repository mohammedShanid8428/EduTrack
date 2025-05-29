import { Routes, Route,} from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Grades from './pages/Grades';

export default function App() {
  return (
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} /> {/* / route */}
        <Route path="students" element={<Students />} />
        <Route path="courses" element={<Courses />} />
        <Route path="grades" element={<Grades />} />
        {/* <Route path="assignments" element={<Assignments />} /> */}
      </Route>
    </Routes>
  );
}
