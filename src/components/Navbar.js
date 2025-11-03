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
    <nav className="bg-white shadow-md sticky top-[76px] z-30"> 
      {/* (76px adalah tinggi header h-12 + padding py-3) */}

      {/* --- PERUBAHAN DI SINI --- */}
      {/* 1. 'overflow-x-auto': Membuat konten di dalamnya bisa di-scroll horizontal di HP
        2. 'justify-start md:justify-center': Mulai dari kiri di HP, tapi tetap di tengah di desktop
        3. 'px-2 py-3': Sesuaikan padding untuk mobile
      */}
      <div className="container mx-auto px-2 py-3 flex justify-start md:justify-center overflow-x-auto space-x-2">
      {/* ------------------------- */}
        
        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              
              // --- PERUBAHAN DI SINI ---
              className={`
                flex items-center space-x-2 px-4 md:px-6 py-3 
                font-medium rounded-lg
                transition-all duration-200 ease-in-out
                flex-shrink-0 whitespace-nowrap {/* <-- Mencegah tombol terpotong/wrap */}
                ${isActive 
                  ? 'bg-green-600 text-white shadow-lg transform -translate-y-1' 
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 hover:text-green-600'
                }
              `}
              // ---------------------------------
            >
              <nav.icon size={18} /> {/* Ukuran ikon dikecilkan sedikit */}
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}