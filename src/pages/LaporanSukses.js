// src/pages/LaporanSukses.js
import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

export default function LaporanSukses({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 text-center">
        
        {/* --- PERBAIKAN: Hapus prop 'size' dan 'md:size' --- */}
        {/* --- Gunakan 'w-12 h-12' (48px) untuk HP dan 'md:w-16 md:h-16' (64px) untuk desktop --- */}
        <CheckCircle 
          className="text-green-500 mx-auto mb-4 w-12 h-12 md:w-16 md:h-16"
        />
        {/* ----------------------------------------------------------------- */}

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Laporan Berhasil Terkirim!
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8">
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