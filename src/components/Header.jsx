import { Search, Moon, Sun,Bell,User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [dark, setDark] = useState(false);

  

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        {/* search box */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="search"
            className="pl-8 pr-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button>
          <Bell className="text-gray-600" size={20} />
        </button>

        {/* profile icon */}
        <button>
          <User className="text-gray-600" size={20} />
        </button>

        {/* dark / light toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-5 rounded-full border flex items-center p-0.5"
        >
          <span
            className={`h-4 w-4 rounded-full transition-transform ${
              dark ? 'translate-x-4 bg-gray-800' : 'bg-yellow-400'
            }`}
          />
        </button>
      </div>
    </header>
  );
}
