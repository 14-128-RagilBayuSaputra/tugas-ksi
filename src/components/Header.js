// src/components/Header.js - Header dengan Warna & Gradient
import React from 'react';
import { Bell } from 'lucide-react';

export default function Header({ notifications, setShowNotification, showNotification, isLoggedIn }) {
  return (
    <header className="bg-gradient-to-r from-green-600 via-green-500 to-teal-500 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            {/* Logo Lampung Selatan */}
            <div className="w-14 h-14 flex-shrink-0 bg-white rounded-lg p-1.5 shadow-md">
              <img 
                src="/Logo Lampung selatan.png" 
                alt="Logo Lampung Selatan"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div>
              <h1 className="text-lg font-bold text-white drop-shadow-sm">
                Sistem Kritik & Saran Desa
              </h1>
              <p className="text-sm text-white/90 font-medium">Kabupaten Lampung Selatan</p>
            </div>
          </div>
          
          {/* Notification Bell */}
          <div className="flex items-center">
            <button 
              onClick={() => setShowNotification(!showNotification)}
              className="relative p-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-colors"
            >
              <Bell size={22} className="text-white" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}