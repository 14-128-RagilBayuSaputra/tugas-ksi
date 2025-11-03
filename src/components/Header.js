// src/components/Header.js

import React from 'react';
import { Bell } from 'lucide-react'; 

export default function Header({ notifications, setShowNotification, showNotification, isLoggedIn }) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-40">
      {/* Tambahkan padding horizontal 'px-4' untuk mobile */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 overflow-hidden"> {/* Tambahkan overflow-hidden */}
          
          <img 
            src="/Logo Lampung selatan.png" 
            alt="Logo Lampung Selatan" 
            className="h-12 w-auto object-contain flex-shrink-0" // Tambahkan flex-shrink-0
          />
          
          <div>
            {/* --- PERUBAHAN DI SINI --- */}
            {/* Ukuran teks di HP (text-lg) dan di desktop (md:text-xl) */}
            <h1 className="text-lg md:text-xl font-bold whitespace-nowrap">Sistem Kritik & Saran Desa</h1>
            {/* Sembunyikan di HP (hidden), tampilkan di tablet/desktop (md:block) */}
            <p className="text-sm text-green-100 hidden md:block">Portal Aspirasi Warga</p>
            {/* ------------------------- */}
          </div>
        </div>
        
        {/* Kurangi jarak di HP */}
        <div className="flex items-center space-x-2 md:space-x-4">
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