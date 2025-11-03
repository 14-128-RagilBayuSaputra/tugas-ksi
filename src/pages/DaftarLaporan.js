// src/pages/DaftarLaporan.js
import React from 'react';
import { Trash2, CheckCircle, Clock, Check, Loader, Phone } from 'lucide-react';

export default function DaftarLaporan({ laporan, onDelete, onUpdateStatus }) {
  
  const getStatusInfo = (status) => {
    if (status === 'Selesai') {
      return { icon: <CheckCircle size={18} className="text-green-500" />, color: "text-green-700", label: "Selesai" };
    }
    if (status === 'Proses') {
      return { icon: <Loader size={18} className="text-blue-500 animate-spin" />, color: "text-blue-700", label: "Proses" };
    }
    return { icon: <Clock size={18} className="text-orange-500" />, color: "text-orange-700", label: "Pending" };
  };

  return (
    <div className=""> 
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Daftar Laporan Masuk</h2>
      
      {/* --- TAMPILAN MOBILE (KARTU) --- */}
      <div className="space-y-4 md:hidden">
        {laporan.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500 border border-gray-200">
            Belum ada laporan yang masuk.
          </div>
        )}
        {laporan.map(item => {
          const statusInfo = getStatusInfo(item.status);
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-200">
              {/* Bagian Atas Kartu (Isi Laporan) */}
              <div className="p-4">
                {/* Status */}
                <span className={`inline-flex items-center space-x-2 text-sm font-medium ${statusInfo.color} mb-3`}>
                  {statusInfo.icon}
                  <span>{statusInfo.label}</span>
                </span>
                
                {/* Judul & Deskripsi */}
                <h3 className="text-base font-semibold text-gray-900">{item.judul}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.deskripsi}</p>
                
                {/* Info Tambahan */}
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium text-gray-600">Pelapor:</span> {item.nama}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Kategori:</span> {item.kategori}
                  </p>
                  {item.telepon && (
                     <p className="flex items-center space-x-1">
                      <Phone size={14} />
                      <span>{item.telepon}</span>
                    </p>
                  )}
                </div>
              </div>
              
              {/* Bagian Bawah Kartu (Tombol Aksi) */}
              <div className="flex items-center justify-end space-x-2 p-3 bg-gray-50 rounded-b-xl border-t">
                {item.status === 'Pending' && (
                  <button 
                    onClick={() => onUpdateStatus(item.id, 'Proses')}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-semibold"
                  >
                    Proses
                  </button>
                )}
                {item.status === 'Proses' && (
                  <button 
                    onClick={() => onUpdateStatus(item.id, 'Selesai')}
                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm font-semibold"
                  >
                    Selesai
                  </button>
                )}
                <button 
                  onClick={() => onDelete(item.id)} 
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-semibold"
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- TAMPILAN DESKTOP (TABEL) --- */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelapor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laporan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {laporan.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  Belum ada laporan yang masuk.
                </td>
              </tr>
            )}
            {laporan.map(item => {
              const statusInfo = getStatusInfo(item.status);
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center space-x-2 text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.icon}
                      <span>{statusInfo.label}</span>
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{item.nama}</div>
                    {item.telepon && (
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Phone size={14} />
                        <span>{item.telepon}</span>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{item.judul}</div>
                    <div className="text-sm text-gray-600 truncate max-w-xs">{item.deskripsi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.kategori}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {item.status === 'Pending' && (
                      <button 
                        onClick={() => onUpdateStatus(item.id, 'Proses')}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-semibold"
                      >
                        Proses
                      </button>
                    )}
                    {item.status === 'Proses' && (
                      <button 
                        onClick={() => onUpdateStatus(item.id, 'Selesai')}
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm font-semibold"
                      >
                        Selesai
                      </button>
                    )}
                    <button 
                      onClick={() => onDelete(item.id)} 
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-semibold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}