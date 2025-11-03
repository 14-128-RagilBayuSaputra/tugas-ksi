// src/components/Header.js

import React from 'react';
// Hapus ikon navigasi, sisakan Bell
import { Bell } from 'lucide-react'; 

// Hapus props 'currentPage' dan 'setCurrentPage'
export default function Header({ 
  notifications, 
  setShowNotification, 
  showNotification, 
  isLoggedIn 
}) {
  return (
    // Kita buat sticky agar tetap di atas
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-40">
      {/* Kembalikan padding py-3 */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="flex items-center space-x-3">
          {/* Logo h-12 Anda tetap di sini */}
          <img 
            src="/Logo Lampung selatan.png" 
            alt="Logo Lampung Selatan" 
            className="h-12 w-auto object-contain" 
          />
          <div>
            <h1 className="text-xl font-bold">Sistem Kritik & Saran Desa</h1>
            <p className="text-sm text-green-100">Portal Aspirasi Warga</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
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
          {/* (Tombol isLoggedIn tidak akan tampil di UserLayout) */}
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

      {/* HAPUS SEMUA KODE NAVBAR YANG DIGABUNG DARI SINI */}

    </header>
  );
}