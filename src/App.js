// src/App.js
import React, { useState } from 'react';
// --- TAMBAHKAN IMPOR INI ---
import { Routes, Route } from 'react-router-dom';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
// ------------------------------

export default function App() {
  const [allLaporan, setAllLaporan] = useState([
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
  ]);

  const handleAddLaporan = (laporanBaru) => {
    const newLaporanWithId = { 
      ...laporanBaru, 
      id: allLaporan.length + 1,
      status: 'Pending'
    };
    setAllLaporan([...allLaporan, newLaporanWithId]);
    alert('Laporan berhasil dikirim! Status: Pending.');
  };

  const handleDeleteLaporan = (laporanId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      setAllLaporan(allLaporan.filter(l => l.id !== laporanId));
    }
  };

  const handleUpdateStatus = (laporanId, newStatus) => {
    setAllLaporan(allLaporan.map(l => 
      l.id === laporanId ? { ...l, status: newStatus } : l
    ));
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
          />
        } 
      />
    </Routes>
  );
}