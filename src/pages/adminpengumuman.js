// src/pages/AdminPengumuman.js
import React, { useState, useEffect } from 'react';
import { Send, Loader, Image as ImageIcon, Trash2, Calendar, Upload, X, Edit2 } from 'lucide-react';

const emptyForm = {
  judul: '',
  isi: '',
  imageUrls: []
};

/**
 * Komponen Form/Editor yang bisa dipakai untuk 'Buat' dan 'Edit'
 */
const PengumumanEditor = ({ onSave, initialData, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadingFiles, setIsReadingFiles] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditMode = !!initialData; // Cek apakah ini mode edit

  // Efek ini akan mengisi form saat 'initialData' (data untuk diedit) berubah
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyForm); // Kosongkan form jika batal edit
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setIsReadingFiles(true);
    
    const filePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(filePromises)
      .then(base64Images => {
        setFormData(prev => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...base64Images]
        }));
        setIsReadingFiles(false);
      })
      .catch(err => {
        console.error("Gagal membaca file:", err);
        alert("Gagal memuat gambar. Ukuran file mungkin terlalu besar untuk localStorage.");
        setIsReadingFiles(false);
      });
    
    e.target.value = null;
  };

  const removeFile = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.judul.trim()) newErrors.judul = 'Judul wajib diisi.';
    if (!formData.isi.trim()) newErrors.isi = 'Isi pengumuman wajib diisi.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (JSON.stringify(formData).length > 4.5 * 1024 * 1024) {
      alert('Peringatan: Ukuran gambar terlalu besar! Pengumuman mungkin gagal disimpan karena melebihi batas 5MB localStorage.');
    }

    setIsLoading(true);
    setTimeout(() => {
      onSave(formData); // Panggil fungsi onSave dari parent
      if (!isEditMode) {
        setFormData(emptyForm); // Reset form hanya jika mode 'Buat'
      }
      setIsLoading(false);
      alert(isEditMode ? 'Pengumuman berhasil diperbarui!' : 'Pengumuman berhasil dipublikasikan!');
    }, 500); 
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}
        </h2>
        {/* Tampilkan tombol Batal hanya jika sedang mode edit */}
        {isEditMode && (
          <button 
            onClick={onCancel} // Tombol Batal
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Batal Edit
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Judul Pengumuman <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.judul ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Contoh: Kerja Bakti Hari Minggu"
          />
          {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Gambar (Opsional, bisa lebih dari 1)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-blue-500 transition-colors">
            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-600 mb-2">Tarik & lepas gambar, atau klik untuk memilih</p>
            <p className="text-xs text-gray-400 mb-4">Format: JPG, PNG (Max 1-2MB per gambar disarankan)</p>
            <input 
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-pengumuman"
            />
            <label 
              htmlFor="file-upload-pengumuman"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors text-sm"
            >
              Pilih File
            </label>
          </div>

          {isReadingFiles && (
            <div className="flex items-center justify-center space-x-2 text-gray-500 mt-2">
              <Loader size={16} className="animate-spin" />
              <span>Memproses gambar...</span>
            </div>
          )}

          {formData.imageUrls.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Gambar Terpilih:</h4>
              {formData.imageUrls.map((imageUrl, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center space-x-2 min-w-0">
                    <img src={imageUrl} alt="Preview" className="w-10 h-10 object-cover rounded shadow-sm" />
                    <span className="text-sm text-gray-700 truncate">
                      {/* Bedakan gambar lama (URL) dan baru (Base64) */}
                      {imageUrl.startsWith('data:') ? `Gambar ${index + 1} (Baru)` : `Gambar ${index + 1}`}
                    </span>
                  </div>
                  <button 
                    type="button"
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Isi Pengumuman <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.isi ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tuliskan isi pengumuman..."
          ></textarea>
          {errors.isi && <p className="text-red-500 text-xs mt-1">{errors.isi}</p>}
        </div>

        <button 
          type="submit"
          disabled={isLoading || isReadingFiles}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:bg-gray-400"
        >
          {(isLoading || isReadingFiles) ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
          {/* Ganti teks tombol berdasarkan mode */}
          <span>{isEditMode ? 'Simpan Perubahan' : 'Publikasikan'}</span>
        </button>
      </form>
    </div>
  );
};

/**
 * Komponen Halaman Utama yang menggabungkan Form dan Daftar
 */
export default function AdminPengumuman({ allPengumuman, onAddPengumuman, onDeletePengumuman, onEditPengumuman }) {
  
  // --- TAMBAHAN: State untuk melacak pengumuman mana yang sedang diedit ---
  const [editingPengumuman, setEditingPengumuman] = useState(null);
  // ------------------------------------------------------------------

  const formatTanggal = (isoString) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // --- TAMBAHAN: Fungsi wrapper untuk menangani 'Create' atau 'Update' ---
  const handleSave = (data) => {
    if (editingPengumuman) {
      // Ini adalah mode EDIT
      onEditPengumuman(editingPengumuman.id, data);
      setEditingPengumuman(null); // Kembali ke mode 'Buat'
    } else {
      // Ini adalah mode CREATE
      onAddPengumuman(data);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingPengumuman(null); // Set kembali ke null untuk batal
  };
  // -----------------------------------------------------------------

  return (
    <div className="space-y-8">
      {/* --- PERUBAHAN: Form sekarang dinamis ---
        Dia akan menampilkan form 'Edit' jika editingPengumuman ada isinya,
        atau form 'Buat' jika isinya null.
        Key sangat penting di sini agar React me-reset state form
      */}
      <PengumumanEditor 
        key={editingPengumuman ? editingPengumuman.id : 'new'} 
        onSave={handleSave}
        initialData={editingPengumuman}
        onCancel={handleCancelEdit}
      />
      {/* -------------------------------------- */}


      {/* Bagian Daftar Pengumuman Terbit */}
      <div className="bg-white rounded-xl shadow-xl p-4 md:p-8">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-6">
          Daftar Pengumuman Terbit
        </h2>
        
        {allPengumuman.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada pengumuman yang dipublikasikan.</p>
        ) : (
          <div className="space-y-4">
            {allPengumuman.map(pengumuman => (
              <div key={pengumuman.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4">
                
                {pengumuman.imageUrls && pengumuman.imageUrls.length > 0 ? (
                  <img 
                    src={pengumuman.imageUrls[0]} 
                    alt={pengumuman.judul} 
                    className="w-full md:w-32 h-32 md:h-20 object-cover rounded-md flex-shrink-0 bg-gray-100" 
                  />
                ) : (
                  <div className="w-full md:w-32 h-32 md:h-20 rounded-md flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400">
                    <ImageIcon size={32} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{pengumuman.judul}</h3>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap break-words">{pengumuman.isi}</p>
                </div>
                
                <div className="flex flex-col justify-between items-start md:items-end pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-4">
                  <span className="flex items-center space-x-1 text-xs text-gray-500 mb-2 md:mb-0">
                    <Calendar size={14} />
                    <span>{formatTanggal(pengumuman.tanggal)}</span>
                  </span>
                  
                  {/* --- TAMBAHAN: Tombol Edit & Hapus --- */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingPengumuman(pengumuman)} // <-- Set state untuk edit
                      className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 text-xs font-semibold flex items-center space-x-1"
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => onDeletePengumuman(pengumuman.id)}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-xs font-semibold flex items-center space-x-1"
                    >
                      <Trash2 size={14} />
                      <span>Hapus</span>
                    </button>
                  </div>
                  {/* ------------------------------------- */}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}