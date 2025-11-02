// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Impor ini
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Tambahkan ini */}
      <App />
    </BrowserRouter> {/* <-- Tambahkan ini */}
  </React.StrictMode>
);

reportWebVitals();