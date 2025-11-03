// src/pages/Laporan.js - Simple & Clean Version
import React, { useState } from 'react';
import { Send, Camera, Video, Upload, X } from 'lucide-react';
import { kategoriOptions } from '../data/appData';

export default function LaporanPage({ setCurrentPage, onAddLaporan }) {
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    kategori: '',
    judul: '',
    deskripsi: '',
    files: []
  });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({...formData, files: [...formData.files, ...files]});
  };

  const removeFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({...formData, files: newFiles});
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.kategori && formData.judul && formData.deskripsi && formData.nama) {
      onAddLaporan(formData); 
      setFormData({ nama: '', telepon: '', kategori: '', judul: '', deskripsi: '', files: [] });
      setCurrentPage('home');
    } else {
      alert('Mohon lengkapi Nama, Kategori, Judul, dan Deskripsi!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Buat Laporan Baru</h2>
          <p className="text-gray-600 text-sm">Sampaikan aspirasi Anda dengan jelas dan lengkap</p>
        </div>
        
        <div className="space-y-6">
          {/* Identitas Pelapor */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-800 mb-4">1. Identitas Pelapor</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. Telepon / WA (Opsional)
                </label>
                <input 
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Untuk umpan balik"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
              📋 <strong>Catatan:</strong> Nama Anda akan diteruskan ke Admin Desa untuk akuntabilitas.
            </p>
          </div>

          {/* Detail Laporan */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800 mb-4">2. Detail Laporan</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Permasalahan <span className="text-red-500">*</span>
              </label>
              <select 
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option value="">Pilih Kategori</option>
                {kategoriOptions.map(kat => (
                  <option key={kat} value={kat}>{kat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="Contoh: Jalan Rusak di RT 02"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                placeholder="Jelaskan permasalahan secara detail..."
              ></textarea>
            </div>
          </div>

          {/* Upload Bukti */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">3. Lampiran Dokumen/Bukti</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-1">Upload foto, video, atau dokumen</p>
              <p className="text-xs text-gray-400 mb-3">JPG, PNG, MP4, PDF (Max 10MB)</p>
              <input 
                type="file"
                multiple
                accept="image/*,video/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-colors text-sm font-medium"
              >
                Pilih File
              </label>
            </div>

            {formData.files.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('image/') ? 
                        <Camera size={18} className="text-blue-600" /> : 
                        <Video size={18} className="text-purple-600" />
                      }
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button 
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 shadow-sm"
            >
              <Send size={18} />
              <span>Kirim Laporan</span>
            </button>
            <button 
              onClick={() => setCurrentPage('home')}
              className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}