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
    priority: 'Rendah'
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
    priority: 'Sedang'
  },
];

const initialNotifications = notificationsData;

// Data pengumuman sekarang menggunakan 'imageUrls' (array)
const initialPengumuman = [
  {
    id: 1,
    judul: 'Jadwal Posyandu Bulan Ini',
    isi: 'Jadwal posyandu untuk balita akan dilaksanakan pada tanggal 15 setiap bulannya di Balai Desa. Mohon untuk hadir tepat waktu membawa buku KIA.',
    imageUrls: [
      'https://images.unsplash.com/photo-1599045118108-bf9954418b76?auto=format&fit=crop&w=800&q=60'
    ],
    tanggal: new Date().toISOString()
  }
];

export default function App() {
  
  const [allLaporan, setAllLaporan] = useState(() => {
    const savedLaporan = localStorage.getItem('allLaporanData');
    return savedLaporan ? JSON.parse(savedLaporan) : initialLaporan;
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('allNotificationsData');
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });

  const [allPengumuman, setAllPengumuman] = useState(() => {
    const savedPengumuman = localStorage.getItem('allPengumumanData');
    return savedPengumuman ? JSON.parse(savedPengumuman) : initialPengumuman;
  });

  useEffect(() => {
    localStorage.setItem('allPengumumanData', JSON.stringify(allPengumuman));
  }, [allPengumuman]);

  useEffect(() => {
    localStorage.setItem('allLaporanData', JSON.stringify(allLaporan));
  }, [allLaporan]);

  useEffect(() => {
    localStorage.setItem('allNotificationsData', JSON.stringify(notifications));
  }, [notifications]);

  
  // --- FUNGSI LAPORAN (Tidak Berubah) ---
  const handleAddLaporan = (laporanBaru) => {
    const newLaporanWithId = { 
      ...laporanBaru, 
      id: Date.now(),
      status: 'Pending',
      priority: 'Rendah'
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
    setAllLaporan(allLaporan.map(l => {
      if (l.id === laporanId) {
        return { 
          ...l, 
          status: newStatus,
          tanggalSelesai: newStatus === 'Selesai' ? new Date().toISOString() : null
        };
      }
      return l;
    }));
  };

  const handleSetPriority = (laporanId, newPriority) => {
    setAllLaporan(allLaporan.map(l => {
      if (l.id === laporanId) {
        return { ...l, priority: newPriority };
      }
      return l;
    }));
  };

  // --- FUNGSI NOTIFIKASI (Tidak Berubah) ---
  const handleDeleteNotification = (notificationId) => {
    setNotifications(prevNotifs => 
      prevNotifs.filter(notif => notif.id !== notificationId)
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]); 
  };
  
  // --- FUNGSI PENGUMUMAN (Diperbarui) ---
  const handleAddPengumuman = (pengumumanBaru) => {
    const newPengumuman = {
      ...pengumumanBaru,
      id: Date.now(),
      tanggal: new Date().toISOString()
    };
    setAllPengumuman(prev => [newPengumuman, ...prev]);
  };

  const handleDeletePengumuman = (pengumumanId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      setAllPengumuman(allPengumuman.filter(p => p.id !== pengumumanId));
    }
  };
  
  // --- TAMBAHAN: Fungsi untuk Mengedit Pengumuman ---
  const handleEditPengumuman = (id, dataToUpdate) => {
    setAllPengumuman(prev => 
      prev.map(p => 
        // Temukan pengumuman berdasarkan ID, lalu gabungkan data lama (p)
        // dengan data baru (dataToUpdate), sambil memastikan ID & tanggal asli tetap ada.
        p.id === id ? { ...p, ...dataToUpdate, id: p.id, tanggal: p.tanggal } : p
      )
    );
  };
  // ----------------------------------------------------

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
            onSetPriority={handleSetPriority}
            notifications={notifications}
            onDeleteNotification={handleDeleteNotification}
            onClearAllNotifications={handleClearAllNotifications}
            
            allPengumuman={allPengumuman}
            onAddPengumuman={handleAddPengumuman}
            onDeletePengumuman={handleDeletePengumuman}
            
            // --- TAMBAHAN: Teruskan fungsi edit ke AdminLayout ---
            onEditPengumuman={handleEditPengumuman}
            // --------------------------------------------------
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
            allPengumuman={allPengumuman}
          />
        } 
      />
    </Routes>
  );
}