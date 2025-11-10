// src/pages/PengumumanSukses.js
import React from 'react';
import { CheckCircle, List } from 'lucide-react'; // Ganti ikon Home dengan List

// Terima setCurrentPage untuk navigasi kembali
export default function PengumumanSukses({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 text-center">
        
        <CheckCircle 
          className="text-green-500 mx-auto mb-4 w-12 h-12 md:w-16 md:h-16"
        />

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Pengumuman Berhasil Disimpan!
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Pengumuman telah berhasil dipublikasikan atau diperbarui.
        </p>
        
        <button 
          onClick={() => setCurrentPage('pengumuman')} // Arahkan kembali ke 'pengumuman'
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <List size={20} />
          <span>Kembali ke Daftar Pengumuman</span>
        </button>
      </div>
    </div>
  );
}