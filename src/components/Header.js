// src/components/Header.js

import React from 'react';
import { Bell } from 'lucide-react'; 

export default function Header({ notifications, setShowNotification, showNotification, isLoggedIn }) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-40">
      {/* Kita gunakan py-3 (padding atas-bawah) */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* --- PERUBAHAN DI SINI --- */}
        <div className="flex items-center space-x-3 min-w-0"> {/* Tambahkan min-w-0 */}
          
          <img 
            src="/Logo Lampung selatan.png" 
            alt="Logo Lampung Selatan" 
            // Ukuran logo di HP (h-10) dan di desktop (md:h-12)
            className="h-10 md:h-12 w-auto object-contain flex-shrink-0" 
          />
          
          <div className="min-w-0">
            {/* Ukuran teks di HP (text-base) dan di desktop (md:text-xl) */}
            {/* Hapus 'whitespace-nowrap' agar teks bisa turun */}
            <h1 className="text-base md:text-xl font-bold truncate">Sistem Kritik & Saran Desa</h1>
            
            {/* Tetap sembunyikan di HP */}
            <p className="text-sm text-green-100 hidden md:block">Portal Aspirasi Warga</p>
          </div>
        </div>
        {/* ------------------------- */}
        
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          <button 
            onClick={() => setShowNotification(!showNotification)}
            className="relative p-2 hover:bg-green-500 rounded-lg transition-colors"
          >
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          
          {isLoggedIn && (
            <button 
              onClick={() => alert('Logout action')}
              className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400 transition-colors"
            >
              <span>Keluar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}