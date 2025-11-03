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
    // Navbar putih 'sticky' di bawah header
    <nav className="bg-white shadow-md sticky top-[76px] z-30"> 
      {/* (76px adalah tinggi header h-12 + padding py-3) */}

      {/* Container untuk tombol-tombol */}
      <div className="container mx-auto px-4 flex justify-center p-3 space-x-3">
        {/* ^ Saya ganti p-2 -> p-3 dan space-x-2 -> space-x-3 agar lebih lega */}
        
        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              
              // --- PERUBAHAN GAYA DI SINI ---
              className={`
                flex items-center space-x-2 px-6 py-3 
                font-medium rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-green-600 text-white shadow-lg transform -translate-y-1' // Gaya Aktif: Terangkat dan Berwarna
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 hover:text-green-600' // Gaya Normal: Putih dan ber-shadow
                }
              `}
              // ---------------------------------
            >
              <nav.icon size={20} />
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}