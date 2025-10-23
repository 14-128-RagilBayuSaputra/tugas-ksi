import React, { useState } from 'react';
import { Home, Send, BarChart3, Bell, Download, LogOut, FileText, Camera, Video, Upload, X, CheckCircle, Clock } from 'lucide-react';

export default function SistemKritikSaranDesa() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [formData, setFormData] = useState({
    kategori: '',
    judul: '',
    deskripsi: '',
    files: []
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'Laporan Diproses', message: 'Laporan Anda tentang "Jalan Rusak" sedang diproses', status: 'proses', time: '2 jam lalu' },
    { id: 2, title: 'Laporan Selesai', message: 'Laporan "Fasilitas Posyandu" telah selesai ditangani', status: 'selesai', time: '1 hari lalu' }
  ]);

  const laporanData = [
    { kategori: 'Infrastruktur', total: 45, selesai: 32, proses: 10, pending: 3 },
    { kategori: 'Kesehatan', total: 28, selesai: 25, proses: 2, pending: 1 },
    { kategori: 'Pendidikan', total: 22, selesai: 18, proses: 3, pending: 1 },
    { kategori: 'Lingkungan', total: 35, selesai: 28, proses: 5, pending: 2 },
    { kategori: 'Ekonomi', total: 18, selesai: 15, proses: 2, pending: 1 }
  ];

  const kategoriOptions = [
    'Infrastruktur (Jalan, Jembatan, dll)',
    'Kesehatan (Posyandu, Puskesmas, dll)',
    'Pendidikan (Sekolah, Perpustakaan, dll)',
    'Lingkungan (Kebersihan, Sampah, dll)',
    'Ekonomi (Pasar, UMKM, dll)',
    'Keamanan (Penerangan, Ronda, dll)',
    'Administrasi Desa',
    'Lainnya'
  ];

  const handleLogin = () => {
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
      setCurrentPage('home');
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({...formData, files: [...formData.files, ...files]});
  };

  const removeFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({...formData, files: newFiles});
  };

  const handleSubmit = () => {
    if (formData.kategori && formData.judul && formData.deskripsi) {
      alert('Laporan berhasil dikirim! Admin akan segera memproses laporan Anda.');
      setFormData({ kategori: '', judul: '', deskripsi: '', files: [] });
      setCurrentPage('home');
    } else {
      alert('Mohon lengkapi semua field yang wajib diisi!');
    }
  };

  const downloadReport = () => {
    alert('Laporan transparansi sedang diunduh...');
  };

  if (!isLoggedIn) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FileText size={32} />
            <div>
              <h1 className="text-xl font-bold">Sistem Kritik & Saran Desa</h1>
              <p className="text-sm text-green-100">Portal Aspirasi Warga</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowNotification(!showNotification)}
              className="relative p-2 hover:bg-green-500 rounded-lg transition-colors"
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400 transition-colors"
            >
              <LogOut size={18} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {showNotification && (
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
      )}

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { id: 'home', label: 'Beranda', icon: Home },
              { id: 'laporan', label: 'Buat Laporan', icon: Send },
              { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
            ].map(nav => (
              <button
                key={nav.id}
                onClick={() => setCurrentPage(nav.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  currentPage === nav.id 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <nav.icon size={20} />
                <span>{nav.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-2">Selamat Datang, Warga!</h2>
              <p className="text-green-50">Sampaikan aspirasi Anda untuk kemajuan desa kita bersama</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Total Laporan Saya</h3>
                  <FileText className="text-green-600" size={32} />
                </div>
                <p className="text-3xl font-bold text-gray-800">12</p>
                <p className="text-sm text-gray-600 mt-2">3 Selesai, 2 Diproses</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Laporan Desa</h3>
                  <BarChart3 className="text-blue-600" size={32} />
                </div>
                <p className="text-3xl font-bold text-gray-800">148</p>
                <p className="text-sm text-gray-600 mt-2">Total laporan warga</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Tingkat Respon</h3>
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <p className="text-3xl font-bold text-gray-800">87%</p>
                <p className="text-sm text-gray-600 mt-2">Laporan terselesaikan</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Panduan Penggunaan</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Pilih Kategori Permasalahan</h4>
                    <p className="text-sm text-gray-600">Tentukan kategori yang sesuai dengan laporan Anda</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Isi Detail Laporan</h4>
                    <p className="text-sm text-gray-600">Jelaskan permasalahan dengan jelas dan lengkap</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Lampirkan Bukti</h4>
                    <p className="text-sm text-gray-600">Upload foto atau video sebagai bukti pendukung</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Kirim dan Pantau</h4>
                    <p className="text-sm text-gray-600">Dapatkan notifikasi perkembangan laporan Anda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'laporan' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Buat Laporan Baru</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori Permasalahan <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formData.kategori}
                    onChange={(e) => setFormData({...formData, kategori: e.target.value})}
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
                    value={formData.judul}
                    onChange={(e) => setFormData({...formData, judul: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Contoh: Jalan Rusak di RT 02"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Jelaskan permasalahan secara detail..."
                  ></textarea>
                </div>

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
        )}

        {currentPage === 'transparansi' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Transparansi Laporan Warga</h2>
                <button 
                  onClick={downloadReport}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download size={20} />
                  <span>Download Laporan</span>
                </button>
              </div>

              <div className="grid md:grid-cols-5 gap-4 mb-8">
                {laporanData.map(item => (
                  <div key={item.kategori} className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.kategori}</h4>
                    <p className="text-2xl font-bold text-green-600">{item.total}</p>
                    <div className="text-xs text-gray-600 mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span>Selesai:</span>
                        <span className="font-semibold text-green-600">{item.selesai}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proses:</span>
                        <span className="font-semibold text-blue-600">{item.proses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="font-semibold text-orange-600">{item.pending}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-4">Grafik Status Laporan</h3>
                <div className="space-y-4">
                  {laporanData.map(item => {
                    const selesaiPersen = (item.selesai / item.total * 100).toFixed(0);
                    const prosesPersen = (item.proses / item.total * 100).toFixed(0);
                    const pendingPersen = (item.pending / item.total * 100).toFixed(0);
                    
                    return (
                      <div key={item.kategori}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{item.kategori}</span>
                          <span className="text-sm text-gray-600">{item.total} laporan</span>
                        </div>
                        <div className="flex h-6 rounded-full overflow-hidden bg-gray-200">
                          <div 
                            className="bg-green-500 flex items-center justify-center text-xs text-white font-semibold"
                            style={{ width: `${selesaiPersen}%` }}
                          >
                            {selesaiPersen > 10 && `${selesaiPersen}%`}
                          </div>
                          <div 
                            className="bg-blue-500 flex items-center justify-center text-xs text-white font-semibold"
                            style={{ width: `${prosesPersen}%` }}
                          >
                            {prosesPersen > 10 && `${prosesPersen}%`}
                          </div>
                          <div 
                            className="bg-orange-500 flex items-center justify-center text-xs text-white font-semibold"
                            style={{ width: `${pendingPersen}%` }}
                          >
                            {pendingPersen > 10 && `${pendingPersen}%`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-center space-x-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Selesai</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Diproses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-700">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Bulanan</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <p className="text-4xl font-bold text-green-600 mb-2">118</p>
                  <p className="text-gray-700 font-medium">Laporan Selesai</p>
                  <p className="text-sm text-gray-500 mt-1">79.7% dari total</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <p className="text-4xl font-bold text-blue-600 mb-2">22</p>
                  <p className="text-gray-700 font-medium">Sedang Diproses</p>
                  <p className="text-sm text-gray-500 mt-1">14.9% dari total</p>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <p className="text-4xl font-bold text-orange-600 mb-2">8</p>
                  <p className="text-gray-700 font-medium">Menunggu</p>
                  <p className="text-sm text-gray-500 mt-1">5.4% dari total</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Sistem Kritik dan Saran Desa. Semua hak dilindungi.</p>
          <p className="text-xs text-gray-400 mt-2">Versi 1.0 | Kontak: admin@desa.go.id</p>
        </div>
      </footer>
    </div>
  );
}