"use client";

import {
  Bell,
  BookOpen,
  FileText,
  CalendarClock,
  AlertTriangle,
  BadgeCheck,
  MoreVertical
} from "lucide-react";
import { useState, useRef } from "react";

export default function NotificationCard() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const notifications = [
    {
      icon: <AlertTriangle className="text-red-500 w-5 h-5" />,
      title: "Emergency Maintenance Alert",
      time: "4:00 PM",
      date: "15 Aug"
    },
    {
      icon: <FileText className="text-blue-500 w-5 h-5" />,
      title: "Upcoming Exam Notification",
      time: "4:20 PM",
      date: "15 Aug"
    },
    {
      icon: <BookOpen className="text-green-500 w-5 h-5" />,
      title: "New Study Material Uploaded",
      time: "4:30 PM",
      date: "15 Aug"
    },
    {
      icon: <CalendarClock className="text-purple-500 w-5 h-5" />,
      title: "Exam Schedule Updated",
      time: "4:40 PM",
      date: "15 Aug"
    },
    {
      icon: <BadgeCheck className="text-yellow-500 w-5 h-5" />,
      title: "Course Completed Successfully",
      time: "4:50 PM",
      date: "15 Aug"
    }
  ];

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="text-gray-600 dark:text-gray-300" size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {notifications.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white">
              Notifications
            </h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              View All
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((note, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="mt-1">{note.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {note.title}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-between">
                    <span>{note.time}</span>
                    <span>{note.date}</span>
                  </div>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
