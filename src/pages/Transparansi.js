// src/pages/Transparansi.js
import React from 'react';
import { Download } from 'lucide-react';
// HAPUS impor 'laporanData' dari appData
// import { laporanData } from '../data/appData';
import { kategoriOptions } from '../data/appData'; // Kita masih perlu ini

// Terima 'laporan' dari props
export default function TransparansiPage({ laporan = [] }) {

  const downloadReport = () => {
    alert('Laporan transparansi sedang diunduh...');
  };

  // --- PEMROSESAN DATA DINAMIS ---

  // 1. Buat struktur data untuk menampung hasil
  const kategoriStats = {};
  
  // Ambil nama kategori dasar (tanpa deskripsi)
  const kategoriDasar = kategoriOptions.map(kat => kat.split(' ')[0]);
  
  kategoriDasar.forEach(kat => {
    kategoriStats[kat] = { total: 0, selesai: 0, proses: 0, pending: 0 };
  });

  // 2. Proses data laporan dari props
  laporan.forEach(item => {
    // Cari kategori dasar
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
    }
  });

  // 3. Ubah objek menjadi array agar mudah di-map (sama seperti laporanData lama)
  const processedLaporanData = Object.keys(kategoriStats).map(kat => ({
    kategori: kat,
    ...kategoriStats[kat]
  }));
  
  // 4. Hitung total bulanan (Statistik Bulanan)
  const totalLaporan = laporan.length;
  const totalSelesai = laporan.filter(l => l.status === 'Selesai').length;
  const totalProses = laporan.filter(l => l.status === 'Proses').length;
  const totalPending = laporan.filter(l => l.status === 'Pending').length;

  const getPercentage = (count) => {
    return totalLaporan > 0 ? ((count / totalLaporan) * 100).toFixed(1) : 0;
  };
  // --- END PEMROSESAN DATA DINAMIS ---


  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Transparansi Laporan Warga</h2>
          <button 
            onClick={downloadReport}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={20} />
            <span>Download Laporan</span>
          </button>
        </div>

        {/* Box Statistik per Kategori (Sekarang Dinamis) */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {processedLaporanData.map(item => (
            <div key={item.kategori} className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.kategori}</h4>
              <p className="text-2xl font-bold text-green-600">{item.total}</p>
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
              </div>
            </div>
          ))}
        </div>

        {/* Grafik Status Laporan (Sekarang Dinamis) */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-4">Grafik Status Laporan</h3>
          <div className="space-y-4">
            {processedLaporanData.map(item => {
              if (item.total === 0) return null; // Jangan tampilkan bar jika total 0

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
          
          <div className="flex justify-center space-x-6 mt-6">
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

      {/* Statistik Bulanan (Sekarang Dinamis) */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Bulanan (Total: {totalLaporan})</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <p className="text-4xl font-bold text-green-600 mb-2">{totalSelesai}</p>
            <p className="text-gray-700 font-medium">Laporan Selesai</p>
            <p className="text-sm text-gray-500 mt-1">{getPercentage(totalSelesai)}% dari total</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-4xl font-bold text-blue-600 mb-2">{totalProses}</p>
            <p className="text-gray-700 font-medium">Sedang Diproses</p>
            <p className="text-sm text-gray-500 mt-1">{getPercentage(totalProses)}% dari total</p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <p className="text-4xl font-bold text-orange-600 mb-2">{totalPending}</p>
            <p className="text-gray-700 font-medium">Menunggu</p>
            <p className="text-sm text-gray-500 mt-1">{getPercentage(totalPending)}% dari total</p>
          </div>
        </div>
      </div>
    </div>
  );
}