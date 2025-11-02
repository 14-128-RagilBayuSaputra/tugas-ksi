// src/AdminLayout.js
import React, { useState } from 'react';
import { Home, FileText, BarChart3, LogOut, Bell } from 'lucide-react';
import { notificationsData } from './data/appData';
import Footer from './components/Footer';
import NotificationPanel from './components/Notifikasi';

// Impor Halaman Admin
import AdminLogin from './pages/AdminLogin';
import AdminHomePage from './pages/AdminHomePage'; // <-- GANTI: Impor Beranda Admin
import TransparansiPage from './pages/Transparansi';
import DaftarLaporan from './pages/DaftarLaporan';

// (Salin kode AdminHeader dari respons saya sebelumnya ke sini...)
const AdminHeader = ({ notifications, setShowNotification, showNotification, onLogout }) => (
  <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <FileText size={32} />
        <div>
          <h1 className="text-xl font-bold">Admin Panel - Sistem Kritik & Saran</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setShowNotification(!showNotification)}
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

// (Salin kode AdminNavbar dari respons saya sebelumnya ke sini...)
const AdminNavbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'daftar_laporan', label: 'Daftar Laporan', icon: FileText },
    { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {navItems.map(nav => (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                currentPage === nav.id 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <nav.icon size={20} />
              <span>{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};


// Layout Utama Admin
export default function AdminLayout({ laporan, onDelete, onUpdateStatus }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications] = useState(notificationsData);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        // --- PERUBAHAN DI SINI ---
        return <AdminHomePage laporan={laporan} />; // Ganti ke AdminHomePage
      case 'daftar_laporan':
        return <DaftarLaporan 
                  laporan={laporan} 
                  onDelete={onDelete} 
                  onUpdateStatus={onUpdateStatus} 
                />;
      case 'transparansi':
        return <TransparansiPage laporan={laporan} />;
      default:
        // --- PERUBAHAN DI SINI ---
        return <AdminHomePage laporan={laporan} />; // Ganti ke AdminHomePage
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        notifications={notifications}
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        onLogout={() => setIsLoggedIn(false)}
      />

      {showNotification && (
        <NotificationPanel notifications={notifications} />
      )}

      {/* Baris ini sekarang akan merender Navbar Admin */}
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