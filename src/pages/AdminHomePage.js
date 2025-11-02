// src/pages/AdminHomePage.js
import React from 'react';
import { FileText, BarChart3, CheckCircle } from 'lucide-react';

// Terima 'laporan' dari props
export default function AdminHomePage({ laporan = [] }) { 

  // --- STATISTIK DINAMIS UNTUK ADMIN ---
  const totalLaporanDesa = laporan.length;
  const totalSelesai = laporan.filter(l => l.status === 'Selesai').length;
  const totalProses = laporan.filter(l => l.status === 'Proses').length;
  const totalPending = laporan.filter(l => l.status === 'Pending').length;
  
  const tingkatRespon = totalLaporanDesa > 0 
    ? ((totalSelesai / totalLaporanDesa) * 100).toFixed(0) 
    : 0;
  // --- END STATISTIK ---

  return (
    <div className="space-y-6">
      {/* Banner Selamat Datang Admin */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Selamat Datang, Admin!</h2>
        <p className="text-blue-100">Kelola semua laporan dan aspirasi warga di sini.</p>
      </div>

      {/* Statistik Admin */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Laporan Menunggu</h3>
            <FileText className="text-orange-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalPending}</p>
          <p className="text-sm text-gray-600 mt-2">Laporan perlu ditinjau</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Laporan Diproses</h3>
            <BarChart3 className="text-blue-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalProses}</p>
          <p className="text-sm text-gray-600 mt-2">Laporan sedang dikerjakan</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Tingkat Respon</h3>
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{tingkatRespon}%</p>
          <p className="text-sm text-gray-600 mt-2">Laporan terselesaikan</p>
        </div>
      </div>

      {/* Panduan Penggunaan Admin (Sesuai Permintaan) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Panduan Mengelola Laporan</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-gray-800">Buka "Daftar Laporan"</h4>
              <p className="text-sm text-gray-600">Lihat semua laporan yang masuk dari warga.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-gray-800">Tinjau Laporan</h4>
              <p className="text-sm text-gray-600">Periksa isi laporan. Jika mengandung SARA/Toxic, gunakan tombol Hapus.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-gray-800">Update Status Laporan</h4>
              <p className="text-sm text-gray-600">Klik ikon "Proses" jika laporan valid, atau "Selesai" jika sudah ditangani.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h4 className="font-semibold text-gray-800">Cek Transparansi</h4>
              <p className="text-sm text-gray-600">Pastikan data di halaman transparansi sudah ter-update secara otomatis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}