// src/AdminLayout.js
import React, { useState } from 'react';
import { Home, FileText, BarChart3, LogOut, Bell, Check, Loader, Clock, Menu, X } from 'lucide-react';
import { notificationsData } from './data/appData';
import Footer from './components/Footer';
import NotificationPanel from './components/Notifikasi';

// Impor Halaman Admin
import AdminLogin from './pages/AdminLogin';
import AdminHomePage from './pages/AdminHomePage';
import TransparansiPage from './pages/Transparansi';
import DaftarLaporan from './pages/DaftarLaporan';


// --- 1. KOMPONEN HEADER SIDEBAR (KONSISTEN) ---
const SidebarHeader = ({ isExpanded = true, onCloseMobile }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-700 h-[81px]">
    <div className="flex items-center space-x-3 min-w-0">
      <img 
        src="/Logo Lampung selatan.png" 
        alt="Logo Lampung Selatan" 
        className="h-10 w-10 object-contain flex-shrink-0"
      />
      <div className={`transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <h1 className="text-lg font-semibold text-white truncate">Admin Panel</h1>
        <p className="text-xs text-gray-400">Kritik & Saran</p>
      </div>
    </div>
    {/* Tampilkan tombol 'X' jika ini adalah sidebar mobile */}
    {onCloseMobile && (
      <button 
        onClick={onCloseMobile} 
        className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg"
      >
        <X size={20} />
      </button>
    )}
  </div>
);


// --- 2. KOMPONEN KONTEN SIDEBAR ---
const SidebarContent = ({ currentPage, setCurrentPage, laporan, onLogout, isExpanded, onToggleDesktop }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'daftar_laporan', label: 'Daftar Laporan', icon: FileText },
    { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
  ];

  const totalSelesai = laporan.filter(l => l.status === 'Selesai').length;
  const totalProses = laporan.filter(l => l.status === 'Proses').length;
  const totalPending = laporan.filter(l => l.status === 'Pending').length;

  return (
    <>
      {/* Navigasi Utama */}
      <nav className="px-3 py-4 space-y-2">
        
        {/* Tombol Menu (Hamburger) HANYA di Desktop */}
        <button 
          onClick={onToggleDesktop} 
          className={`
            hidden md:flex items-center space-x-3 w-full px-4 py-3 
            font-medium rounded-lg
            transition-all duration-200 ease-in-out
            bg-gray-800 text-gray-300 shadow-md hover:shadow-lg hover:bg-gray-700 hover:text-white
            ${!isExpanded ? 'justify-center' : ''}
          `}
        >
          <Menu size={20} className="flex-shrink-0" />
          <span 
            className={`
              transition-opacity duration-100 whitespace-nowrap
              ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 w-0 hidden'}
            `}
          >
            Menu
          </span>
        </button>

        {/* Garis Pemisah */}
        <div className={`border-b border-gray-700 pt-2 ${!onToggleDesktop ? 'hidden' : 'hidden md:block'}`}></div>

        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              className={`
                flex items-center space-x-3 w-full px-4 py-3 
                font-medium rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 shadow-md hover:shadow-lg hover:bg-gray-700 hover:text-white'
                }
                ${!isExpanded ? 'justify-center' : ''}
              `}
              title={!isExpanded ? nav.label : ''} 
            >
              <nav.icon size={20} className="flex-shrink-0" />
              <span 
                className={`
                  transition-opacity duration-100 whitespace-nowrap
                  ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 w-0 hidden'}
                `}
              >
                {nav.label}
              </span>
            </button>
          );
        })}
        
        {/* Tombol Keluar */}
        <button
          onClick={onLogout}
          className={`
            flex items-center space-x-3 w-full px-4 py-3 
            font-medium rounded-lg
            transition-all duration-200 ease-in-out
            bg-gray-800 text-gray-300 shadow-md hover:shadow-lg hover:bg-red-600 hover:text-white
            ${!isExpanded ? 'justify-center' : ''}
          `}
          title={!isExpanded ? 'Keluar' : ''} 
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span 
            className={`
              transition-opacity duration-100 whitespace-nowrap
              ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 w-0 hidden'}
            `}
          >
            {`Keluar`}
          </span>
        </button>
      </nav>

      {/* Ringkasan Laporan */}
      <div 
        className={`
          px-3 py-4 border-t border-gray-700 space-y-3 
          transition-opacity duration-100
          ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 hidden'}
        `}
      >
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">Ringkasan Laporan</h4>
        
        <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-2">
            <Clock size={18} className="text-orange-400" />
            <span className="text-sm font-medium text-gray-300">Pending</span>
          </div>
          <span className="text-lg font-bold text-orange-400">{totalPending}</span>
        </div>
        
        <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-2">
            <Loader size={18} className="text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Proses</span>
          </div>
          <span className="text-lg font-bold text-blue-400">{totalProses}</span>
        </div>
        
        <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-2">
            <Check size={18} className="text-green-400" />
            <span className="text-sm font-medium text-gray-300">Selesai</span>
          </div>
          <span className="text-lg font-bold text-green-400">{totalSelesai}</span>
        </div>
      </div>
    </>
  );
};

// --- 3. KOMPONEN HEADER KONTEN (DIPERBAIKI) ---
const MainHeader = ({ onToggleMobileSidebar, notifications, setShowNotification, showNotification }) => (
  <header className="
    md:bg-white bg-gray-900 
    shadow-sm z-10 p-4 flex justify-between items-center sticky top-0
  ">
    {/* Tombol Hamburger (HANYA di HP) */}
    <button onClick={onToggleMobileSidebar} className="p-2 -ml-2 text-gray-300 rounded-lg hover:bg-gray-700 md:hidden">
      <Menu size={24} />
    </button>

    {/* Judul Halaman (HANYA di HP) */}
    <h1 className="text-lg font-semibold text-white md:hidden">Admin Panel</h1>

    {/* Spacer (HANYA di Desktop, agar Notif ke kanan) */}
    <div className="hidden md:block flex-1"></div>

    {/* Notifikasi */}
    <div className="flex items-center space-x-2 md:space-x-4">
      <button 
        onClick={() => setShowNotification(true)}
        className="relative p-2 text-gray-300 md:text-gray-600 hover:bg-gray-700 md:hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white">
            {notifications.length}
          </span>
        )}
      </button>
      
      {/* --- TOMBOL KELUAR DI HEADER SUDAH DIHAPUS --- */}
      
    </div>
  </header>
);


// --- 4. LAYOUT UTAMA ADMIN (LOGIKA BARU) ---
export default function AdminLayout({ laporan, onDelete, onUpdateStatus }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications] = useState(notificationsData);
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  const renderCurrentPage = () => {
    // ... (Tidak ada perubahan) ...
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

  // Fungsi untuk handle klik navigasi (tutup sidebar mobile)
  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMobileSidebarOpen(false); // Tutup sidebar saat item di-klik
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <div 
        className={`
          hidden md:flex flex-col bg-gray-900 text-white shadow-lg sticky top-0 h-screen
          transition-all duration-300
          ${isDesktopSidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Header Sidebar Desktop (Logo + Teks) */}
        <SidebarHeader isExpanded={isDesktopSidebarOpen} />
        
        {/* Konten Sidebar Desktop */}
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          <SidebarContent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            laporan={laporan}
            onLogout={() => setIsLoggedIn(false)}
            isExpanded={isDesktopSidebarOpen}
            onToggleDesktop={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          />
        </div>
      </div>

      {/* --- SIDEBAR (Mobile - Overlay) --- */}
      <div 
        className={`
          fixed top-0 left-0 z-50 w-64 h-full bg-gray-900 text-white shadow-lg 
          transition-transform duration-300 ease-in-out md:hidden
          overflow-y-auto flex flex-col
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header Sidebar Mobile (Logo + Teks + Tombol X) */}
        <SidebarHeader isExpanded={true} onCloseMobile={() => setIsMobileSidebarOpen(false)} />
        
        {/* Konten Sidebar Mobile */}
        <div className="overflow-y-auto flex-1">
          <SidebarContent
            currentPage={currentPage}
            setCurrentPage={handleNavClick}
            laporan={laporan}
            onLogout={() => {
              setIsLoggedIn(false);
              setIsMobileSidebarOpen(false);
            }}
            isExpanded={true} // Selalu expanded di mobile
          />
        </div>
      </div>

      {/* Overlay (untuk menggelapkan konten saat sidebar mobile terbuka) */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      
      {/* --- KONTEN UTAMA --- */}
      <div className="flex-1 flex flex-col max-w-full overflow-x-hidden">
        
        {/* Header Utama (Konten) */}
        <MainHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          notifications={notifications}
          setShowNotification={setShowNotification}
          showNotification={showNotification}
        />
        
        {showNotification && (
          <NotificationPanel notifications={notifications} />
        )}

        <main className="flex-1 container mx-auto px-4 py-8">
          {renderCurrentPage()}
        </main>
        
        <Footer /> 
      </div>
    </div>
  );
}