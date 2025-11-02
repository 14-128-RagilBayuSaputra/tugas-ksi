// src/pages/DaftarLaporan.js
import React from 'react';
import { Trash2, CheckCircle, Clock, Check, Loader, Phone } from 'lucide-react'; // Tambahkan ikon Phone

export default function DaftarLaporan({ laporan, onDelete, onUpdateStatus }) {
  
  // ... (fungsi getStatusInfo tidak berubah) ...
  const getStatusInfo = (status) => {
    if (status === 'Selesai') {
      return { icon: <CheckCircle size={18} className="text-green-500" />, color: "text-green-700" };
    }
    if (status === 'Proses') {
      return { icon: <Loader size={18} className="text-blue-500 animate-spin" />, color: "text-blue-700" };
    }
    return { icon: <Clock size={18} className="text-orange-500" />, color: "text-orange-700" };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Laporan Masuk</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {/* Tambahkan Kolom Pelapor */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelapor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laporan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {laporan.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500"> {/* Ubah colSpan jadi 5 */}
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
                      <span>{item.status}</span>
                    </span>
                  </td>
                  
                  {/* --- DATA PELAPOR BARU --- */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{item.nama}</div>
                    {item.telepon && (
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Phone size={14} />
                        <span>{item.telepon}</span>
                      </div>
                    )}
                  </td>
                  {/* --- END DATA PELAPOR --- */}

                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{item.judul}</div>
                    <div className="text-sm text-gray-600">{item.deskripsi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.kategori}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {/* ... (Tombol aksi admin tidak berubah) ... */}
                    {item.status === 'Pending' && (
                      <button 
                        onClick={() => onUpdateStatus(item.id, 'Proses')}
                        className="text-blue-600 hover:text-blue-900" title="Proses Laporan">
                        <Loader size={20} />
                      </button>
                    )}
                    {item.status === 'Proses' && (
                      <button 
                        onClick={() => onUpdateStatus(item.id, 'Selesai')}
                        className="text-green-600 hover:text-green-900" title="Selesaikan Laporan">
                        <Check size={20} />
                      </button>
                    )}
                    <button 
                      onClick={() => onDelete(item.id)} 
                      className="text-red-600 hover:text-red-900"
                      title="Hapus Laporan"
                    >
                      <Trash2 size={20} />
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