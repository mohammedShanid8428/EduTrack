"use client";

import { User, LayoutDashboard, BookOpenCheck, Bell } from "lucide-react";
import { useState, useRef } from "react";

export default function ProfileCard() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200); // small delay to avoid flicker
  };

  return (
    <div
      className="relative z-50"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <button onClick={() => setOpen(!open)}>
        <User className="text-gray-600 dark:text-gray-300" size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Top Green Card */}
          <div className="bg-[#8a996d] text-white p-5 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-white"
            />
            <h2 className="mt-2 font-semibold text-lg">Mohammed Shanid .T</h2>
            <p className="text-sm">Full Stack Development</p>
            <p className="text-xs text-gray-200 mt-1">
              mohammedshanid842@gmail.com
            </p>

            <div className="flex justify-between w-full mt-4 border-t border-white/30 pt-3">
              <div className="text-center flex-1">
                <p className="text-lg font-bold">5</p>
                <p className="text-xs">Courses</p>
              </div>
              <div className="w-px bg-white/30 h-full mx-2" />
              <div className="text-center flex-1">
                <p className="text-lg font-bold">20</p>
                <p className="text-xs">Tests</p>
              </div>
            </div>
          </div>

          {/* Lower Menu */}
          <div className="bg-white px-4 py-3 text-gray-800">
            <div className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary">
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary">
              <BookOpenCheck size={16} />
              <span>Study Material</span>
            </div>
            <div className="flex items-center gap-2 py-2 relative cursor-pointer hover:text-primary">
              <Bell size={16} />
              <span>Notifications</span>
              <span className="absolute right-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                2 New
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
