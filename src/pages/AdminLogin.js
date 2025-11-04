// src/pages/AdminLogin.js - Simple & Clean Version
import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State untuk error

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      // --- PERUBAHAN DI SINI ---
      // 1. Simpan status login di localStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
      
      // 2. Panggil fungsi onLoginSuccess (dari AdminLayout)
      onLoginSuccess();
      // -------------------------
    } else {
      setError('Username atau Password Admin salah!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md p-8">
        {/* ... (Logo dan Judul tidak berubah) ... */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            <img 
              src="/Logo Lampung selatan.png"
              alt="Logo Lampung Selatan"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Login Admin</h1>
          <p className="text-gray-600 text-sm">Sistem Kritik & Saran Desa</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Masukkan username admin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Masukkan password"
            />
          </div>

          {/* --- TAMPILKAN ERROR JIKA ADA --- */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 shadow-sm"
          >
            <LogIn size={18} />
            <span>Masuk</span>
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            <strong>Demo:</strong> Username & Password = <code className="bg-gray-100 px-2 py-1 rounded text-xs">admin</code>
          </p>
        </div>
      </div>
    </div>
  );
}