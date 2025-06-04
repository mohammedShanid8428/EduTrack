import {
  Home,
  User,
  BookOpen,
  GraduationCap,
  Settings,
  LogOut,
  FolderKanban, // ✅ Import the Assignments icon
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'dashboard', icon: Home, path: '/' },
  { label: 'students', icon: User, path: '/students' },
  { label: 'courses', icon: BookOpen, path: '/courses' },
  { label: 'grades', icon: GraduationCap, path: '/grades' },
  { label: 'assignments', icon: FolderKanban, path: '/assignments' }, // ✅ New item
];

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col h-screen sticky top-0 p-4 justify-between bg-background w-64 dark:bg-background dark:text-foreground">
        <h1 className="text-2xl font-extrabold mb-8 mt-2 text-accent drop-shadow-md">EduTrack</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-xl hover:bg-secondary dark:hover:bg-accent transition-colors font-semibold 
                ${isActive ? 'font-bold bg-secondary dark:bg-accent ' : 'text-foreground dark:text-foreground'}`
              }
            >
              <Icon size={22} />
              <span className="capitalize dark:text-white">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-xl font-semibold hover:bg-secondary dark:hover:bg-accent transition-colors 
              ${isActive ? 'font-bold bg-background dark:bg-background' : 'text-foreground dark:text-foreground'}`
            }
          >
            <Settings size={18} />
            <span className="capitalize dark:text-white">Settings</span>
          </NavLink>

          <button className="flex items-center gap-3 p-2 rounded-xl font-semibold text-foreground dark:text-foreground hover:bg-secondary dark:hover-bg-accent w-full">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
