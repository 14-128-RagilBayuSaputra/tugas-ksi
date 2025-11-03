// src/pages/HomePage.js
import React from 'react';
import { FileText, BarChart3, CheckCircle } from 'lucide-react';

export default function HomePage({ laporan = [] }) { 
  const totalLaporanSaya = 0; 
  const selesaiSaya = 0;
  const prosesSaya = 0;
  const totalLaporanDesa = laporan.length;
  const totalSelesai = laporan.filter(l => l.status === 'Selesai').length;
  const tingkatRespon = totalLaporanDesa > 0 
    ? ((totalSelesai / totalLaporanDesa) * 100).toFixed(0) 
    : 0;

  return (
    <div className="space-y-6">
      {/* --- PERUBAHAN: Kecilkan padding & font di HP --- */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-4 md:p-6 shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold mb-1">Selamat Datang, Warga!</h2>
        <p className="text-sm text-green-50">Sampaikan aspirasi Anda untuk kemajuan desa kita bersama</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
        {/* --- PERUBAHAN: Kecilkan padding & font di HP --- */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Total Laporan Saya</h3>
            <FileText className="text-green-600" size={24} />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">{totalLaporanSaya}</p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">{selesaiSaya} Selesai, {prosesSaya} Diproses</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Laporan Desa</h3>
            <BarChart3 className="text-blue-600" size={24} />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">{totalLaporanDesa}</p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Total laporan warga</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Tingkat Respon</h3>
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">{tingkatRespon}%</p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Laporan terselesaikan</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
        <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4">Panduan Penggunaan</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Pilih Kategori Permasalahan</h4>
              <p className="text-sm text-gray-600">Tentukan kategori yang sesuai dengan laporan Anda</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Isi Detail Laporan</h4>
              <p className="text-sm text-gray-600">Jelaskan permasalahan dengan jelas dan lengkap</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Lampirkan Bukti</h4>
              <p className="text-sm text-gray-600">Upload foto atau video sebagai bukti pendukung</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Kirim dan Pantau</h4>
              <p className="text-sm text-gray-600">Dapatkan notifikasi perkembangan laporan Anda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}