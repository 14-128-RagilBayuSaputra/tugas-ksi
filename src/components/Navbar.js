// src/components/Navbar.js - Simple & Clean Version
import React from 'react';
import { Home, Send, BarChart3 } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'laporan', label: 'Buat Laporan', icon: Send },
  { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
];

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex space-x-1">
          {navItems.map(nav => (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              className={`
                flex items-center space-x-2 px-6 py-3 font-medium text-sm
                transition-colors border-b-2
                ${currentPage === nav.id 
                  ? 'text-green-600 border-green-600' 
                  : 'text-gray-600 hover:text-green-600 border-transparent hover:border-green-300'
                }
              `}
            >
              <nav.icon size={18} />
              <span>{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}