// src/pages/HomePage.js - Simple & Clean Version
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
    <div className="space-y-6 bg-gray-100 min-h-screen py-6">
      {/* Hero Banner - Simple */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">
          Selamat Datang di Portal Aspirasi Warga
        </h2>
        <p className="text-white/90">
          Sampaikan kritik dan saran Anda untuk kemajuan desa bersama
        </p>
      </div>

      {/* Stats Cards - Floating Shadow */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Total Laporan Saya</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="text-green-600" size={22} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">{totalLaporanSaya}</p>
          <p className="text-xs text-gray-500">{selesaiSaya} Selesai, {prosesSaya} Diproses</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Laporan Desa</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="text-blue-600" size={22} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">{totalLaporanDesa}</p>
          <p className="text-xs text-gray-500">Total laporan warga</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Tingkat Respon</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={22} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">{tingkatRespon}%</p>
          <p className="text-xs text-gray-500">Laporan terselesaikan</p>
        </div>
      </div>

      {/* Panduan Section - Floating Shadow */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Panduan Penggunaan</h3>
        <div className="space-y-4">
          {[
            { num: 1, title: 'Pilih Kategori Permasalahan', desc: 'Tentukan kategori yang sesuai dengan laporan Anda' },
            { num: 2, title: 'Isi Detail Laporan', desc: 'Jelaskan permasalahan dengan jelas dan lengkap' },
            { num: 3, title: 'Lampirkan Bukti', desc: 'Upload foto atau video sebagai bukti pendukung' },
            { num: 4, title: 'Kirim dan Pantau', desc: 'Dapatkan notifikasi perkembangan laporan Anda' }
          ].map(item => (
            <div key={item.num} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-sm">
                {item.num}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}