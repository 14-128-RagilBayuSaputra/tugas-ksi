// src/AdminLayout.js
import React, { useState } from 'react';
import { Home, FileText, BarChart3, LogOut, Bell } from 'lucide-react';
import { notificationsData } from './data/appData';
import Footer from './components/Footer';
import NotificationPanel from './components/Notifikasi';

// Impor Halaman Admin
import AdminLogin from './pages/AdminLogin';
import AdminHomePage from './pages/AdminHomePage';
import TransparansiPage from './pages/Transparansi';
import DaftarLaporan from './pages/DaftarLaporan';

// Komponen Header Admin
const AdminHeader = ({ notifications, setShowNotification, showNotification, onLogout }) => (
  // Header kembali ke gradient biru
  <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-40">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        
        <img 
          src="/Logo Lampung selatan.png" 
          alt="Logo Lampung Selatan" 
          className="h-12 w-auto object-contain"
        />
        
        <div>
          <h1 className="text-xl font-bold">Admin Panel - Sistem Kritik & Saran</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setShowNotification(!showNotification)}
          // Hover kembali ke biru
          className="relative p-2 hover:bg-blue-600 rounded-lg transition-colors"
        >
          <Bell size={24} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  </header>
);

// Komponen Navbar Admin (Gaya "Pills" dengan shadow)
const AdminNavbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'daftar_laporan', label: 'Daftar Laporan', icon: FileText },
    { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-[76px] z-30">
      {/* (76px adalah perkiraan tinggi header h-12 + py-3) */}
      <div className="container mx-auto px-4 flex justify-center p-3 space-x-3">
        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              className={`
                flex items-center space-x-2 px-6 py-3 
                font-medium rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg transform -translate-y-1' // Gaya Aktif: Biru & Terangkat
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 hover:text-blue-600' // Gaya Normal: Putih & Shadow
                }
              `}
            >
              <nav.icon size={20} />
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};


// Layout Utama Admin
export default function AdminLayout({ laporan, onDelete, onUpdateStatus }) {
  // --- INI ADALAH BARIS YANG DIPERBAIKI ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // ------------------------------------
  
  const [currentPage, setCurrentPage] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications] = useState(notificationsData);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <AdminHomePage laporan={laporan} />;
      case 'daftar_laporan':
        return <DaftarLaporan 
                  laporan={laporan} 
                  onDelete={onDelete} 
                  onUpdateStatus={onUpdateStatus} 
                />;
      case 'transparansi':
        return <TransparansiPage laporan={laporan} />;
      default:
        return <AdminHomePage laporan={laporan} />;
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader 
        notifications={notifications}
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        onLogout={() => setIsLoggedIn(false)}
      />

      {showNotification && (
        <NotificationPanel notifications={notifications} />
      )}

      <AdminNavbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="container mx-auto px-4 py-8">
        {renderCurrentPage()}
      </main>

      <Footer />
    </div>
  );
}