// src/components/Navbar.js
import React from 'react';
import { Home, Send, BarChart3 } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'laporan', label: 'Buat Laporan', icon: Send },
  { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
];

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-white shadow-md sticky top-[68px] z-30"> 
    {/* ^ Ubah top-[76px] -> top-[68px] (karena header lebih pendek di HP) */}

      <div className="container mx-auto px-2 py-3 flex justify-start md:justify-center overflow-x-auto space-x-2">
        
        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              
              className={`
                {/* --- PERUBAHAN DI SINI --- */}
                flex items-center space-x-2 px-3 md:px-6 py-3 {/* Ubah px-4 -> px-3 */}
                {/* ------------------------- */}
                font-medium rounded-lg
                transition-all duration-200 ease-in-out
                flex-shrink-0 whitespace-nowrap
                ${isActive 
                  ? 'bg-green-600 text-white shadow-lg transform -translate-y-1' 
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 hover:text-green-600'
                }
              `}
            >
              <nav.icon size={18} />
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}