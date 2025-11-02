// src/UserLayout.js

import React, { useState } from 'react';
import { notificationsData } from './data/appData'; 

import Header from './components/Header';
import Navbar from './components/Navbar'; // <-- UBAH INI (dari Navbar ke Navibar)
import Footer from './components/Footer';
import NotificationPanel from './components/Notifikasi';

import HomePage from './pages/HomePage';
import LaporanPage from './pages/Laporan';
import TransparansiPage from './pages/Transparansi';

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
      default:
        return <HomePage laporan={laporanPublik} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        notifications={notifications}
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        isLoggedIn={false}
      />

      {showNotification && (
        <NotificationPanel notifications={notifications} />
      )}

      {/* Baris ini sekarang akan berfungsi */}
      <Navbar 
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