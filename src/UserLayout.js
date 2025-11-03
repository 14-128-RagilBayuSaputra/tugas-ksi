// src/UserLayout.js
import React, { useState } from 'react';
import { notificationsData } from './data/appData';

// Impor Komponen
import Header from './components/Header';
import Navbar from './components/Navbar'; // <-- 1. KEMBALIKAN IMPOR INI
import Footer from './components/Footer';
import NotificationPanel from './components/Notifikasi';

// Impor Halaman
import HomePage from './pages/HomePage';
import LaporanPage from './pages/Laporan';
import TransparansiPage from './pages/Transparansi';
import LaporanSukses from './pages/LaporanSukses'; 

export default function UserLayout({ onAddLaporan, laporanPublik }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications] = useState(notificationsData);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage laporan={laporanPublik} />;
      case 'laporan':
        return <LaporanPage setCurrentPage={setCurrentPage} onAddLaporan={onAddLaporan} />;
      case 'transparansi':
        return <TransparansiPage laporan={laporanPublik} />;
      case 'laporan_sukses':
        return <LaporanSukses setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage laporan={laporanPublik} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 2. KEMBALIKAN HEADER KE KONDISI SEMULA */}
      {/* (Hapus props currentPage dan setCurrentPage dari Header) */}
      {currentPage !== 'laporan_sukses' && (
        <Header 
          notifications={notifications}
          setShowNotification={setShowNotification}
          showNotification={showNotification}
          isLoggedIn={false}
        />
      )}
      {/* -------------------------------------- */}


      {showNotification && (
        <NotificationPanel notifications={notifications} />
      )}

      {/* --- 3. KEMBALIKAN KOMPONEN NAVBAR --- */}
      {currentPage !== 'laporan_sukses' && (
        <Navbar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )} 
      {/* ----------------------------------- */}


      <main className="container mx-auto px-4 py-8">
        {renderCurrentPage()}
      </main>

      {currentPage !== 'laporan_sukses' && <Footer />}
    </div>
  );
}