// src/pages/Transparansi.js - Simple & Clean Version
import React from 'react';
import { Download } from 'lucide-react';
import { kategoriOptions } from '../data/appData';

export default function TransparansiPage({ laporan = [] }) {
  const downloadReport = () => {
    alert('Laporan transparansi sedang diunduh...');
  };

  const kategoriStats = {};
  const kategoriDasar = kategoriOptions.map(kat => kat.split(' ')[0]);
  
  kategoriDasar.forEach(kat => {
    kategoriStats[kat] = { total: 0, selesai: 0, proses: 0, pending: 0 };
  });

  laporan.forEach(item => {
    const katDasar = item.kategori.split(' ')[0];
    if (kategoriStats[katDasar]) {
      kategoriStats[katDasar].total++;
      if (item.status === 'Selesai') kategoriStats[katDasar].selesai++;
      else if (item.status === 'Proses') kategoriStats[katDasar].proses++;
      else if (item.status === 'Pending') kategoriStats[katDasar].pending++;
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

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen py-6">
      {/* Header Simple */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Transparansi Laporan Warga</h2>
            <p className="text-gray-600 text-sm">Data real-time laporan dan aspirasi warga</p>
          </div>
          <button 
            onClick={downloadReport}
            className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
          >
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Category Stats Cards - Simple Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {processedLaporanData.map(item => (
          <div key={item.kategori} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.kategori}</h4>
            <p className="text-3xl font-bold text-gray-900 mb-3">{item.total}</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Selesai</span>
                <span className="font-semibold text-green-600">{item.selesai}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Proses</span>
                <span className="font-semibold text-blue-600">{item.proses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-orange-600">{item.pending}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bars - Simple */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-5">Grafik Status Laporan</h3>
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
        
        <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Selesai</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Diproses</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Pending</span>
          </div>
        </div>
      </div>

      {/* Monthly Stats - Simple Cards */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-5">Statistik Bulanan (Total: {totalLaporan})</h3>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
            <p className="text-4xl font-bold text-green-600 mb-2">{totalSelesai}</p>
            <p className="text-gray-700 font-semibold mb-1">Laporan Selesai</p>
            <p className="text-sm text-gray-500">{getPercentage(totalSelesai)}% dari total</p>
          </div>
          
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-4xl font-bold text-blue-600 mb-2">{totalProses}</p>
            <p className="text-gray-700 font-semibold mb-1">Sedang Diproses</p>
            <p className="text-sm text-gray-500">{getPercentage(totalProses)}% dari total</p>
          </div>
          
          <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-100">
            <p className="text-4xl font-bold text-orange-600 mb-2">{totalPending}</p>
            <p className="text-gray-700 font-semibold mb-1">Menunggu</p>
            <p className="text-sm text-gray-500">{getPercentage(totalPending)}% dari total</p>
          </div>
        </div>
      </div>
    </div>
  );
}