// src/pages/LaporanSukses.js
import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

export default function LaporanSukses({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* --- PERUBAHAN DI SINI --- */}
      {/* Kurangi padding di HP (p-6), tetap p-8 di desktop */}
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 text-center">
      {/* ------------------------- */}
        <CheckCircle 
          className="text-green-500 mx-auto mb-4" 
          size={64} 
        />
        {/* --- PERUBAHAN DI SINI --- */}
        {/* Kurangi ukuran teks di HP (text-2xl) */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {/* ------------------------- */}
          Laporan Berhasil Terkirim!
        </h2>
        {/* --- PERUBAHAN DI SINI --- */}
        {/* Kurangi ukuran teks di HP (text-base) */}
        <p className="text-base md:text-lg text-gray-600 mb-8">
        {/* ------------------------- */}
          Terima kasih atas partisipasi Anda. Laporan Anda sedang ditinjau oleh Admin.
        </p>
        
        <button 
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          <Home size={20} />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
}