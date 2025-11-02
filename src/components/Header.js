// src/components/Header.js
import React from 'react';
import { FileText, Bell } from 'lucide-react'; // Hapus LogOut

// Hapus 'setIsLoggedIn' dan ganti dengan 'isLoggedIn'
export default function Header({ notifications, setShowNotification, showNotification, isLoggedIn }) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FileText size={32} />
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
          
          {/* Tombol Keluar dihapus karena user tidak login */}
        </div>
      </div>
    </header>
  );
}