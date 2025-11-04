// src/components/Notifikasi.js
import React from 'react';
// --- PERUBAHAN: Impor ikon X ---
import { CheckCircle, Clock, X } from 'lucide-react';

// --- PERUBAHAN: Terima props 'onDeleteNotification' & 'onClearAll' ---
const NotificationPanel = ({ notifications, onDeleteNotification, onClearAll }, ref) => {
  return (
    <div ref={ref} className="absolute right-4 top-20 w-[calc(100vw-2rem)] max-w-sm md:w-96 z-50 bg-white rounded-lg shadow-2xl border border-gray-200">
      
      {/* --- PERUBAHAN: Tambah tombol 'Hapus Semua' --- */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">Notifikasi</h3>
        {notifications.length > 0 && (
          <button 
            onClick={onClearAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Hapus Semua
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {/* --- PERUBAHAN: Tambah kondisi jika kosong --- */}
        {notifications.length === 0 ? (
          <p className="p-6 text-center text-sm text-gray-500">
            Tidak ada notifikasi baru.
          </p>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 group">
              <div className="flex items-start space-x-3">
                {notif.status === 'selesai' ? (
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                ) : (
                  <Clock className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-800">{notif.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
                {/* --- PERUBAHAN: Tombol 'X' untuk hapus per item --- */}
                <button 
                  onClick={() => onDeleteNotification(notif.id)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus notifikasi"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default React.forwardRef(NotificationPanel);