import { Home, User, BookOpen, GraduationCap, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'dashboard', icon: Home, path: '/' },
  { label: 'students', icon: User, path: '/students' },
  { label: 'courses', icon: BookOpen, path: '/courses' },
  { label: 'grades', icon: GraduationCap, path: '/grades' },
];

export default function Sidebar() {
  return (
    <>
    <div className="flex flex-col h-screen   p-4 justify-between bg-white w-64">
      <h1 className="text-2xl font-extrabold mb-10">EduTrack</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100
               ${isActive ? 'font-semibold bg-gray-100' : 'text-gray-600'}`
            }
          >
            <Icon size={18} />
            <span className="capitalize">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-3 ">
        <button className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full">
          <Settings size={18} />
          Setting
        </button>
        <button className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
    </>
  );
}
