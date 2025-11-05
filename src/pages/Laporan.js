// src/pages/Laporan.js
import React, { useState } from 'react';
import { Send, Camera, Video, Upload, X, Loader, Paperclip } from 'lucide-react'; // Impor Paperclip
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
  
  const [isAnonim, setIsAnonim] = useState(false); // <-- TAMBAHAN: State untuk anonim
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  // ... (fungsi handleFileUpload dan removeFile tidak berubah)
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    setFormData({...formData, files: [...formData.files, ...newFiles]});
  };

  const removeFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({...formData, files: newFiles});
  };
  // ...

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // <-- UBAHAN: Validasi nama hanya jika tidak anonim
    if (!isAnonim && !formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi.';
    }
    // ------------------------------------------------

    if (!formData.kategori) newErrors.kategori = 'Kategori wajib dipilih.';
    if (!formData.judul.trim()) newErrors.judul = 'Judul laporan wajib diisi.';
    if (!formData.deskripsi.trim()) newErrors.deskripsi = 'Deskripsi lengkap wajib diisi.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return; 
    }
    setIsLoading(true);
    
    // <-- UBAHAN: Cek jika anonim, ganti nama
    const dataToSubmit = {
      ...formData,
      nama: isAnonim ? 'Warga Anonim' : formData.nama,
      telepon: isAnonim ? '' : formData.telepon, // Kosongkan telepon jika anonim
    };
    // ---------------------------------------
    
    onAddLaporan(dataToSubmit); // <-- UBAHAN: Kirim data yang sudah dimodifikasi
    
    // Reset form
    setFormData({ 
      nama: '', telepon: '', 
      kategori: '', judul: '', deskripsi: '', files: [] 
    });
    setIsAnonim(false); // <-- TAMBAHAN: Reset checkbox
    setIsLoading(false);
    setCurrentPage('laporan_sukses'); 
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-4 md:p-8">

        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-6">Buat Laporan Baru</h2>
        
        <div className="space-y-6">

          <div className="border-b pb-6 border-gray-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Identitas Pelapor</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {/* <-- UBAHAN: Label dinamis --> */}
                  Nama Lengkap {isAnonim ? '(Opsional)' : <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  disabled={isAnonim} // <-- TAMBAHAN: Disable jika anonim
                  className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.nama ? 'border-red-500' : 'border-gray-300'} ${isAnonim ? 'bg-gray-100 cursor-not-allowed' : ''}`} // <-- UBAHAN: Tambah style disabled
                  placeholder="Masukkan nama lengkap Anda"
                />
                {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. Telepon / WA (Opsional)
                </label>
                <input 
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  disabled={isAnonim} // <-- TAMBAHAN: Disable jika anonim
                  className={`w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${isAnonim ? 'bg-gray-100 cursor-not-allowed' : ''}`} // <-- UBAHAN: Tambah style disabled
                  placeholder="Untuk umpan balik"
                />
              </div>
            </div>

            {/* <-- TAMBAHAN: Checkbox Anonim --> */}
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="anonim"
                checked={isAnonim}
                onChange={(e) => setIsAnonim(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="anonim" className="text-sm font-medium text-gray-700 select-none">
                Kirim sebagai Anonim
              </label>
            </div>
            {/* ---------------------------------- */}

            <p className="text-xs text-gray-500 mt-3">
              <span className="font-semibold">Nama Anda (Wajib)</span> akan diteruskan ke Admin Desa untuk akuntabilitas.
            </p>
          </div>
          
          {/* ... (Sisa form tidak berubah) ... */}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori Permasalahan <span className="text-red-500">*</span>
            </label>
            <select 
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.kategori ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Pilih Kategori</option>
              {kategoriOptions.map(kat => (
                <option key={kat} value={kat}>{kat}</option>
              ))}
            </select>
            {errors.kategori && <p className="text-red-500 text-xs mt-1">{errors.kategori}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Laporan <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.judul ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Contoh: Jalan Rusak di RT 02"
            />
            {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea 
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.deskripsi ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Jelaskan permasalahan secara detail..."
            ></textarea>
            {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lampiran Dokumen/Bukti
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-green-500 transition-colors">
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
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
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-colors text-sm"
              >
                Pilih File
              </label>
            </div>

            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">File Terpilih:</h4>
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <div className="flex items-center space-x-2 min-w-0">
                      {file.type.startsWith('image/') ? <Camera size={18} className="text-blue-500 flex-shrink-0" /> : <Paperclip size={18} className="text-gray-500 flex-shrink-0" />}
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)} 
                      className="text-red-500 hover:text-red-700 flex-shrink-0 p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white py-2.5 md:py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:bg-gray-400"
            >
              {isLoading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
              <span>{isLoading ? 'Mengirim...' : 'Kirim Laporan'}</span>
            </button>
            <button 
              onClick={() => setCurrentPage('home')}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 bg-gray-200 text-gray-700 py-2.5 md:py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}