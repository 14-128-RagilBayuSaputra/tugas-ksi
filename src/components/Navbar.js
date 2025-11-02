import React from 'react';
import { Home, Send, BarChart3 } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'laporan', label: 'Buat Laporan', icon: Send },
  { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
];

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {navItems.map(nav => (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                currentPage === nav.id 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <nav.icon size={20} />
              <span>{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}