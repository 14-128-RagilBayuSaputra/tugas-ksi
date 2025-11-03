// src/pages/Laporan.js
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
    // ... (kode tidak berubah)
    const files = Array.from(e.target.files);
    setFormData({...formData, files: [...formData.files, ...files]});
  };

  const removeFile = (index) => {
    // ... (kode tidak berubah)
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({...formData, files: newFiles});
  };
  
  const handleChange = (e) => {
    // ... (kode tidak berubah)
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.kategori && formData.judul && formData.deskripsi && formData.nama) {
      // 1. Panggil fungsi onAddLaporan dari App.js
      onAddLaporan(formData); 
      
      // 2. Reset form
      setFormData({ 
        nama: '', telepon: '', 
        kategori: '', judul: '', deskripsi: '', files: [] 
      });

      // 3. Pindah ke halaman sukses (BUKAN 'home' dan HAPUS alert)
      setCurrentPage('laporan_sukses'); 
      
    } else {
      alert('Mohon lengkapi Nama, Kategori, Judul, dan Deskripsi!');
    }
  };

  return (
    // ... (Seluruh JSX formulir Anda tidak perlu diubah) ...
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Buat Laporan Baru</h2>
        
        <div className="space-y-6">

          {/* --- BAGIAN IDENTITAS BARU --- */}
          <div className="border-b pb-6 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Identitas Pelapor</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  name="nama" // Tambahkan 'name'
                  value={formData.nama}
                  onChange={handleChange} // Gunakan handleChange
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. Telepon / WA (Opsional)
                </label>
                <input 
                  type="tel"
                  name="telepon" // Tambahkan 'name'
                  value={formData.telepon}
                  onChange={handleChange} // Gunakan handleChange
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Untuk umpan balik"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              <span className="font-semibold">Nama Anda (Wajib)</span> akan diteruskan ke Admin Desa untuk akuntabilitas.
            </p>
          </div>
          {/* --- END BAGIAN IDENTITAS --- */}
          
          {/* Bagian Laporan (yang sudah ada) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori Permasalahan <span className="text-red-500">*</span>
            </label>
            <select 
              name="kategori" // Tambahkan 'name'
              value={formData.kategori}
              onChange={handleChange} // Gunakan handleChange
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Pilih Kategori</option>
              {kategoriOptions.map(kat => (
                <option key={kat} value={kat}>{kat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Laporan <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              name="judul" // Tambahkan 'name'
              value={formData.judul}
              onChange={handleChange} // Gunakan handleChange
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: Jalan Rusak di RT 02"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea 
              name="deskripsi" // Tambahkan 'name'
              value={formData.deskripsi}
              onChange={handleChange} // Gunakan handleChange
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Jelaskan permasalahan secara detail..."
            ></textarea>
          </div>

          {/* ... (sisa kode upload file dan tombol) ... */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lampiran Dokumen/Bukti
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
              <Upload className="mx-auto text-gray-400 mb-2" size={40} />
              <p className="text-sm text-gray-600 mb-2">Upload foto, video, atau dokumen pendukung</p>
              <p className="text-xs text-gray-400 mb-4">Format: JPG, PNG, MP4, PDF (Max 10MB)</p>
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
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-colors"
              >
                Pilih File
              </label>
            </div>

            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {file.type.startsWith('image/') ? <Camera size={20} className="text-blue-500" /> : <Video size={20} className="text-purple-500" />}
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>Kirim Laporan</span>
            </button>
            <button 
              onClick={() => setCurrentPage('home')}
              className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}