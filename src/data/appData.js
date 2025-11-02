// src/data/appData.js

export const notificationsData = [
  { id: 1, title: 'Laporan Diproses', message: 'Laporan Anda tentang "Jalan Rusak" sedang diproses', status: 'proses', time: '2 jam lalu' },
  { id: 2, title: 'Laporan Selesai', message: 'Laporan "Fasilitas Posyandu" telah selesai ditangani', status: 'selesai', time: '1 hari lalu' }
];

export const laporanData = [
  { kategori: 'Infrastruktur', total: 45, selesai: 32, proses: 10, pending: 3 },
  { kategori: 'Kesehatan', total: 28, selesai: 25, proses: 2, pending: 1 },
  { kategori: 'Pendidikan', total: 22, selesai: 18, proses: 3, pending: 1 },
  { kategori: 'Lingkungan', total: 35, selesai: 28, proses: 5, pending: 2 },
  { kategori: 'Ekonomi', total: 18, selesai: 15, proses: 2, pending: 1 }
];

export const kategoriOptions = [
  'Infrastruktur (Jalan, Jembatan, dll)',
  'Kesehatan (Posyandu, Puskesmas, dll)',
  'Pendidikan (Sekolah, Perpustakaan, dll)',
  'Lingkungan (Kebersihan, Sampah, dll)',
  'Ekonomi (Pasar, UMKM, dll)',
  'Keamanan (Penerangan, Ronda, dll)',
  'Administrasi Desa',
  'Lainnya'
];