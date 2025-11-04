// src/pages/Transparansi.js
import React from 'react';
// --- PERUBAHAN: Tambahkan Paperclip ---
import { Download, Paperclip } from 'lucide-react';
import { kategoriOptions } from '../data/appData';

export default function TransparansiPage({ laporan = [] }) {
  const downloadReport = () => {
    alert('Laporan transparansi sedang diunduh...');
  };

  // --- KEMBALIKAN LOGIKA STATISTIK AWAL ---
  const kategoriStats = {};
  const kategoriDasar = kategoriOptions.map(kat => kat.split(' ')[0]);
  
  kategoriDasar.forEach(kat => {
    // Tambahkan 'files: 0'
    kategoriStats[kat] = { total: 0, selesai: 0, proses: 0, pending: 0, files: 0 };
  });

  laporan.forEach(item => {
    const katDasar = item.kategori.split(' ')[0];
    if (kategoriStats[katDasar]) {
      kategoriStats[katDasar].total++;
      if (item.status === 'Selesai') {
        kategoriStats[katDasar].selesai++;
      } else if (item.status === 'Proses') {
        kategoriStats[katDasar].proses++;
      } else if (item.status === 'Pending') {
        kategoriStats[katDasar].pending++;
      }
      // Hitung file
      if (item.files && item.files.length > 0) {
        kategoriStats[katDasar].files += item.files.length;
      }
    }
  });

  const processedLaporanData = Object.keys(kategoriStats).map(kat => ({
    kategori: kat,
    ...kategoriStats[kat]
  }));
  
  const totalLaporan = laporan.length;
  const totalSelesai = laporan.filter(l => l.status === 'Selesai').length;
  const totalProses = laporan.filter(l => l.status === 'Proses').length;
  const totalPending = laporan.filter(l => l.status === 'Pending').length;
  const getPercentage = (count) => {
    return totalLaporan > 0 ? ((count / totalLaporan) * 100).toFixed(1) : 0;
  };
  // --- AKHIR LOGIKA STATISTIK AWAL ---

  return (
    <div className="space-y-6">
      <div className="rounded-xl">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 text-center md:text-left">Transparansi Laporan Warga</h2>
          <button 
            onClick={downloadReport}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto shadow-md hover:shadow-lg text-sm"
          >
            <Download size={18} />
            <span>Download Laporan</span>
          </button>
        </div>

        {/* --- KEMBALIKAN KARTU KATEGORI --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {processedLaporanData.map(item => (
            <div key={item.kategori} className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-lg">
              <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.kategori}</h4>
              <p className="text-xl font-bold text-green-600">{item.total}</p>
              <div className="text-xs text-gray-600 mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Selesai:</span>
                  <span className="font-semibold text-green-600">{item.selesai}</span>
                </div>
                <div className="flex justify-between">
                  <span>Proses:</span>
                  <span className="font-semibold text-blue-600">{item.proses}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending:</span>
                  <span className="font-semibold text-orange-600">{item.pending}</span>
                </div>
                {/* Tampilkan jumlah file */}
                {item.files > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Lampiran:</span>
                    <span className="font-semibold">{item.files}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- KEMBALIKAN GRAFIK STATUS LAPORAN --- */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 text-base md:text-lg mb-4">Grafik Status Laporan</h3>
          <div className="space-y-4">
            {processedLaporanData.map(item => {
              if (item.total === 0) return null; 

              const selesaiPersen = (item.selesai / item.total * 100).toFixed(0);
              const prosesPersen = (item.proses / item.total * 100).toFixed(0);
              const pendingPersen = (item.pending / item.total * 100).toFixed(0);
              
              return (
                <div key={item.kategori}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.kategori}</span>
                    <span className="text-sm text-gray-600">{item.total} laporan</span>
                  </div>
                  <div className="flex h-6 rounded-full overflow-hidden bg-gray-200">
                    <div 
                      className="bg-green-500 flex items-center justify-center text-xs text-white font-semibold"
                      style={{ width: `${selesaiPersen}%` }}
                    >
                      {selesaiPersen > 10 && `${selesaiPersen}%`}
                    </div>
                    <div 
                      className="bg-blue-500 flex items-center justify-center text-xs text-white font-semibold"
                      style={{ width: `${prosesPersen}%` }}
                    >
                      {prosesPersen > 10 && `${prosesPersen}%`}
                    </div>
                    <div 
                      className="bg-orange-500 flex items-center justify-center text-xs text-white font-semibold"
                      style={{ width: `${pendingPersen}%` }}
                    >
                      {pendingPersen > 10 && `${pendingPersen}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-6 mt-6 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">Selesai</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-700">Diproses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- KEMBALIKAN STATISTIK BULANAN --- */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4">Statistik Bulanan (Total: {totalLaporan})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 md:p-6 bg-green-50 rounded-lg shadow-md">
            <p className="text-2xl md:text-3xl font-bold text-green-600 mb-2">{totalSelesai}</p>
            <p className="text-sm md:text-base text-gray-700 font-medium">Laporan Selesai</p>
            <p className="text-sm text-gray-500 mt-1">{getPercentage(totalSelesai)}% dari total</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-blue-50 rounded-lg shadow-md">
            <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{totalProses}</p>
            <p className="text-sm md:text-base text-gray-700 font-medium">Sedang Diproses</p>
            <p className="text-sm text-gray-500 mt-1">{getPercentage(totalProses)}% dari total</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-orange-50 rounded-lg shadow-md">
            <p className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">{totalPending}</p>
            <p className="text-sm md:text-base text-gray-700 font-medium">Menunggu</p>
            <p className="text-sm text-gray-500 mt-1">{getPercentage(totalPending)}% dari total</p>
          </div>
        </div>
      </div>
    </div>
  );
}