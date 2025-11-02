// src/pages/AdminLogin.js
import React, { useState } from 'react';
import { FileText, LogIn } from 'lucide-react';

// 'onLoginSuccess' adalah fungsi yang akan kita kirim dari AdminLayout
export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Di aplikasi nyata, ini akan memanggil API
    // Kita simulasi: jika username & password benar, panggil onLoginSuccess
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
    } else {
      alert('Username atau Password Admin salah!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Login Admin</h1>
          <p className="text-gray-600 mt-2">Sistem Kritik & Saran Desa</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan username admin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan password"
            />
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}