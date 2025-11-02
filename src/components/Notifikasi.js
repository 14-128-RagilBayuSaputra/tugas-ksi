import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

export default function NotificationPanel({ notifications }) {
  return (
    <div className="absolute right-4 top-20 bg-white rounded-lg shadow-2xl w-96 z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Notifikasi</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notif => (
          <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-start space-x-3">
              {notif.status === 'selesai' ? (
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
              ) : (
                <Clock className="text-blue-500 flex-shrink-0" size={20} />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-800">{notif.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}