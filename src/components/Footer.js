// src/components/Footer.js - Elegant Version
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm text-gray-700 font-medium mb-1">
            © 2025 Sistem Kritik dan Saran Desa
          </p>
          <p className="text-xs text-gray-500">
            Versi 1.0 | Kontak: <span className="text-emerald-600 font-medium">admin@desa.go.id</span>
          </p>
        </div>
      </div>
    </footer>
  );
}