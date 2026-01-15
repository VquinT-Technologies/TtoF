'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User, Settings } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              FlowGen
            </span>
          </div>

          <nav className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition">
              Dashboard
            </Link>
            <Link href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">
              My Projects
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-full flex items-center justify-center font-bold hover:shadow-lg transition"
              >
                D
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
