import React, { useState } from 'react';
import { FileText } from 'lucide-react';

export default function LoginPage({ setIsLoggedIn }) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLogin = () => {
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Sistem Kritik & Saran</h1>
          <p className="text-gray-600 mt-2">Desa Digital</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NIK / Username</label>
            <input 
              type="text"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan NIK atau Username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan Password"
            />
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Masuk
          </button>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun? <span className="text-green-600 hover:underline font-medium cursor-pointer">Daftar di sini</span>
        </p>
      </div>
    </div>
  );
}