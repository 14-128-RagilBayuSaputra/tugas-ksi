// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import { notificationsData } from './data/appData';

const initialLaporan = [
  { 
    id: 1, 
    nama: 'Warga Tes 1', 
    telepon: '08123456789',
    kategori: 'Infrastruktur', 
    judul: 'Jalan Rusak di RT 02', 
    deskripsi: 'Jalannya berlubang dan bahaya', 
    status: 'Pending', 
    files: [],
    priority: 'Rendah' // <-- TAMBAHAN: Prioritas awal
  },
  { 
    id: 2, 
    nama: 'Warga Tes 2', 
    telepon: '',
    kategori: 'Lingkungan', 
    judul: 'Sampah menumpuk', 
    deskripsi: 'Sampah di TPS liar', 
    status: 'Proses', 
    files: [],
    priority: 'Sedang' // <-- TAMBAHAN: Prioritas awal
  },
];

const initialNotifications = notificationsData;

export default function App() {
  
  const [allLaporan, setAllLaporan] = useState(() => {
    const savedLaporan = localStorage.getItem('allLaporanData');
    return savedLaporan ? JSON.parse(savedLaporan) : initialLaporan;
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('allNotificationsData');
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });

  useEffect(() => {
    localStorage.setItem('allLaporanData', JSON.stringify(allLaporan));
  }, [allLaporan]);

  useEffect(() => {
    localStorage.setItem('allNotificationsData', JSON.stringify(notifications));
  }, [notifications]);

  
  const handleAddLaporan = (laporanBaru) => {
    const newLaporanWithId = { 
      ...laporanBaru, 
      id: Date.now(),
      status: 'Pending',
      priority: 'Rendah' // <-- TAMBAHAN: Set prioritas default untuk laporan baru
    };
    setAllLaporan(prevLaporan => [newLaporanWithId, ...prevLaporan]);
    
    const adminNotif = {
      id: Date.now() + 1,
      title: 'Laporan Baru Masuk',
      message: `Laporan "${laporanBaru.judul}" dari ${laporanBaru.nama} perlu ditinjau.`,
      status: 'proses',
      time: 'Baru saja'
    };
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

  // <-- TAMBAHAN: Fungsi untuk mengubah prioritas ---
  const handleSetPriority = (laporanId, newPriority) => {
    setAllLaporan(allLaporan.map(l => {
      if (l.id === laporanId) {
        return { ...l, priority: newPriority };
      }
      return l;
    }));
  };
  // -----------------------------------------------

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prevNotifs => 
      prevNotifs.filter(notif => notif.id !== notificationId)
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]); 
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
            onSetPriority={handleSetPriority} // <-- UBAHAN: Teruskan prop
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
            notifications={notifications}
            onDeleteNotification={handleDeleteNotification}
            onClearAllNotifications={handleClearAllNotifications}
          />
        } 
      />
    </Routes>
  );
}