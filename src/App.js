// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
// --- PERUBAHAN: Impor data notifikasi awal ---
import { notificationsData } from './data/appData';

// Data awal laporan (fallback)
const initialLaporan = [
  { 
    id: 1, 
    nama: 'Warga Tes 1', 
    telepon: '08123456789',
    kategori: 'Infrastruktur', 
    judul: 'Jalan Rusak di RT 02', 
    deskripsi: 'Jalannya berlubang dan bahaya', 
    status: 'Pending', 
    files: [] 
  },
  { 
    id: 2, 
    nama: 'Warga Tes 2', 
    telepon: '',
    kategori: 'Lingkungan', 
    judul: 'Sampah menumpuk', 
    deskripsi: 'Sampah di TPS liar', 
    status: 'Proses', 
    files: [] 
  },
];

// --- PERUBAHAN: Data notifikasi awal (fallback) ---
const initialNotifications = notificationsData;

export default function App() {
  
  // --- State Laporan (dari localStorage) ---
  const [allLaporan, setAllLaporan] = useState(() => {
    const savedLaporan = localStorage.getItem('allLaporanData');
    return savedLaporan ? JSON.parse(savedLaporan) : initialLaporan;
  });

  // --- State Notifikasi (dari localStorage) ---
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('allNotificationsData');
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });

  // --- Simpan Laporan ke localStorage ---
  useEffect(() => {
    localStorage.setItem('allLaporanData', JSON.stringify(allLaporan));
  }, [allLaporan]);

  // --- Simpan Notifikasi ke localStorage ---
  useEffect(() => {
    localStorage.setItem('allNotificationsData', JSON.stringify(notifications));
  }, [notifications]); // Efek ini berjalan setiap kali 'notifications' berubah

  
  const handleAddLaporan = (laporanBaru) => {
    const newLaporanWithId = { 
      ...laporanBaru, 
      id: Date.now(), // Gunakan timestamp agar ID unik
      status: 'Pending'
    };
    // Tambahkan laporan baru di atas
    setAllLaporan(prevLaporan => [newLaporanWithId, ...prevLaporan]);
    
    // --- NOTIFIKASI DINAMIS (Untuk Admin) ---
    const adminNotif = {
      id: Date.now() + 1, // ID unik
      title: 'Laporan Baru Masuk',
      message: `Laporan "${laporanBaru.judul}" dari ${laporanBaru.nama} perlu ditinjau.`,
      status: 'proses',
      time: 'Baru saja'
    };
    // Tambahkan notifikasi baru di atas
    setNotifications(prevNotifs => [adminNotif, ...prevNotifs]);
  };

  const handleDeleteLaporan = (laporanId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      setAllLaporan(allLaporan.filter(l => l.id !== laporanId));
    }
  };

  const handleUpdateStatus = (laporanId, newStatus) => {
    let updatedLaporan = null;
    
    setAllLaporan(allLaporan.map(l => {
      if (l.id === laporanId) {
        updatedLaporan = { ...l, status: newStatus };
        return updatedLaporan;
      }
      return l;
    }));

    // --- NOTIFIKASI DINAMIS (Untuk User) ---
    if (updatedLaporan) {
      const userNotif = {
        id: Date.now(),
        title: `Laporan Anda ${newStatus}`,
        message: `Laporan Anda tentang "${updatedLaporan.judul}" telah diubah statusnya menjadi ${newStatus}.`,
        status: newStatus === 'Selesai' ? 'selesai' : 'proses',
        time: 'Baru saja'
      };
      setNotifications(prevNotifs => [userNotif, ...prevNotifs]);
    }
  };

  // --- FUNGSI BARU UNTUK HAPUS NOTIFIKASI ---
  const handleDeleteNotification = (notificationId) => {
    setNotifications(prevNotifs => 
      prevNotifs.filter(notif => notif.id !== notificationId)
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]); // Kosongkan array notifikasi
  };
  
  return (
    <Routes>
      {/* Rute untuk Admin */}
      <Route 
        path="/admin" 
        element={
          <AdminLayout 
            laporan={allLaporan} 
            onDelete={handleDeleteLaporan}
            onUpdateStatus={handleUpdateStatus}
            // --- PERUBAHAN: Kirim state & handler notifikasi ---
            notifications={notifications}
            onDeleteNotification={handleDeleteNotification}
            onClearAllNotifications={handleClearAllNotifications}
          />
        } 
      />
      
      {/* Rute untuk User (semua rute lain) */}
      <Route 
        path="*" 
        element={
          <UserLayout 
            onAddLaporan={handleAddLaporan} 
            laporanPublik={allLaporan} 
            // --- PERUBAHAN: Kirim state & handler notifikasi ---
            notifications={notifications}
            onDeleteNotification={handleDeleteNotification}
            onClearAllNotifications={handleClearAllNotifications}
          />
        } 
      />
    </Routes>
  );
}