// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Siderbar';
import Header from './Header';

export default function Layout() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark); 
  }, [dark]);


  return (
    <div className="flex bg-background dark:bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header dark={dark} setDark={setDark} />
        <Outlet /> {/* This renders the page content (Dashboard, Students, etc.) */}
      </div>
    </div>
  );
}
