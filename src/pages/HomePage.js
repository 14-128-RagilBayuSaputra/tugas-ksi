// src/pages/HomePage.js
import React from 'react';
import { FileText, BarChart3, CheckCircle } from 'lucide-react';

// Terima 'laporan' dari props
export default function HomePage({ laporan = [] }) { 
  // --- STATISTIK DINAMIS ---
  // (Anda bisa menyesuaikan ini untuk menghitung laporan "saya" jika ada info user)
  const totalLaporanSaya = 0; // Ganti ini nanti jika sudah ada login user
  const selesaiSaya = 0;
  const prosesSaya = 0;

  // Hitung total laporan desa dari props
  const totalLaporanDesa = laporan.length;
  
  // Hitung total laporan yang selesai
  const totalSelesai = laporan.filter(l => l.status === 'Selesai').length;
  
  // Hitung persentase respon
  const tingkatRespon = totalLaporanDesa > 0 
    ? ((totalSelesai / totalLaporanDesa) * 100).toFixed(0) 
    : 0;
  // --- END STATISTIK DINAMIS ---

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang, Warga!</h2>
        <p className="text-green-50">Sampaikan aspirasi Anda untuk kemajuan desa kita bersama</p>
      </div>

      {/* --- PERUBAHAN DI SINI --- */}
      {/* 'grid-cols-1': Tampilan default di HP (1 kolom)
        'md:grid-cols-3': Tampilan di tablet/desktop (3 kolom)
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* ------------------------- */}
      
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Total Laporan Saya</h3>
            <FileText className="text-green-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalLaporanSaya}</p>
          <p className="text-sm text-gray-600 mt-2">{selesaiSaya} Selesai, {prosesSaya} Diproses</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Laporan Desa</h3>
            <BarChart3 className="text-blue-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalLaporanDesa}</p>
          <p className="text-sm text-gray-600 mt-2">Total laporan warga</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Tingkat Respon</h3>
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{tingkatRespon}%</p>
          <p className="text-sm text-gray-600 mt-2">Laporan terselesaikan</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Panduan Penggunaan</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-gray-800">Pilih Kategori Permasalahan</h4>
              <p className="text-sm text-gray-600">Tentukan kategori yang sesuai dengan laporan Anda</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-gray-800">Isi Detail Laporan</h4>
              <p className="text-sm text-gray-600">Jelaskan permasalahan dengan jelas dan lengkap</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-gray-800">Lampirkan Bukti</h4>
              <p className="text-sm text-gray-600">Upload foto atau video sebagai bukti pendukung</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h4 className="font-semibold text-gray-800">Kirim dan Pantau</h4>
              <p className="text-sm text-gray-600">Dapatkan notifikasi perkembangan laporan Anda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}