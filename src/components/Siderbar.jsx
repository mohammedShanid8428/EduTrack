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
    <div className="flex flex-col h-screen   p-4 justify-between bg-background w-64  dark:bg-background dark:text-foreground">
      <h1 className="text-2xl font-extrabold mb-10 text-accent">EduTrack</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
               ${isActive ? 'font-semibold bg-background dark:bg-background' : 'text-foreground dark:text-foreground'}`
            }
          >
            <Icon size={18} />
            <span className="capitalize dark:text-white">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-3">
  <NavLink
    to="/settings"
    className={({ isActive }) =>
      `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
       ${isActive ? 'font-semibold bg-background dark:bg-background' : 'text-foreground dark:text-foreground'}`
    }
  >
    <Settings size={18} />
    <span className="capitalize dark:text-white">Settings</span>
  </NavLink>
  <button className="flex items-center gap-3 p-2 rounded-lg text-foreground dark:text-foreground hover:bg-gray-100 w-full">
    <LogOut size={18} />
    Logout
  </button>
</div>
    </div>
    </>
  );
}
