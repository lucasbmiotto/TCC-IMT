import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import HistoryPage from '@/pages/HistoryPage';
import { Toaster } from '@/components/ui/toaster';
import QRCodePage from './pages/QRCodePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historico" element={<HistoryPage />} />
        <Route path="/qrcode" element={<QRCodePage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;