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
      
      {/* --- PERUBAHAN RESPONSIVE --- */}
      {/* Hapus 'overflow-x-auto', 'space-x-2', 'justify-start' */}
      {/* Tambah 'justify-center', 'flex-wrap', 'gap-2' */}
      <div className="container mx-auto px-2 py-3 flex justify-center flex-wrap gap-2">
        
        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              
              className={`
                flex items-center space-x-2 px-3 md:px-6 py-3
                font-medium rounded-lg
                transition-all duration-200 ease-in-out
                flex-shrink-0 whitespace-nowrap
                ${isActive 
                  ? 'bg-green-600 text-white shadow-lg' 
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