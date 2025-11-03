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


// --- 1. KOMPONEN SIDEBAR BARU ---
// Ini adalah Navbar Anda yang diubah menjadi vertikal
const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'daftar_laporan', label: 'Daftar Laporan', icon: FileText },
    { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
  ];

  return (
    // Sidebar container: Lebar tetap, tinggi penuh, 'sticky', dan bg gelap
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col shadow-lg sticky top-0">
      
      {/* Bagian Logo/Header di dalam Sidebar */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-700">
        <img 
          src="/Logo Lampung selatan.png" 
          alt="Logo Lampung Selatan" 
          className="h-12 w-auto object-contain"
        />
        <div>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <p className="text-xs text-gray-400">Kritik & Saran</p>
        </div>
      </div>
      
      {/* Navigasi Links */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              className={`
                flex items-center space-x-3 w-full px-4 py-3 
                font-medium rounded-lg
                transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md' // Gaya Aktif
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Gaya Normal
                }
              `}
            >
              <nav.icon size={20} />
              <span>{nav.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};


// --- 2. KOMPONEN HEADER BARU ---
// Ini HANYA berisi tombol Notifikasi dan Logout
const AdminHeader = ({ notifications, setShowNotification, showNotification, onLogout }) => (
  <header className="bg-white shadow-sm z-10">
    <div className="container mx-auto px-4 py-4 flex justify-end items-center">
      {/* Mendorong semua item ke kanan */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setShowNotification(!showNotification)}
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell size={24} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white">
              {notifications.length}
            </span>
          )}
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  </header>
);


// --- 3. LAYOUT UTAMA ADMIN (YANG DI-EXPORT) ---
export default function AdminLayout({ laporan, onDelete, onUpdateStatus }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Tampilkan Login Admin jika belum login
  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Tampilkan Layout Dashboard Admin jika sudah login
  return (
    // Gunakan 'flex' untuk membagi Sidebar dan Konten Utama
    <div className="flex min-h-screen bg-gray-100">
      
      {/* --- Sidebar (Kolom Kiri) --- */}
      <AdminSidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      {/* --- Area Konten (Kolom Kanan) --- */}
      <div className="flex-1 flex flex-col">
        
        <AdminHeader 
          notifications={notifications}
          setShowNotification={setShowNotification}
          showNotification={showNotification}
          onLogout={() => setIsLoggedIn(false)}
        />
        
        {/* Notifikasi akan muncul di atas kanan, relative to viewport */}
        {showNotification && (
          <NotificationPanel notifications={notifications} />
        )}

        {/* Konten Halaman */}
        <main className="container mx-auto px-4 py-8">
          {renderCurrentPage()}
        </main>
        
        {/* Footer bisa kita hilangkan di layout admin jika mau, tapi kita biarkan dulu */}
        <Footer /> 
      </div>
    </div>
  );
}