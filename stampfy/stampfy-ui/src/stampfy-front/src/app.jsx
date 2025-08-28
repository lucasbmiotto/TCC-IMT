import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import HistoryPage from '@/pages/HistoryPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historico" element={<HistoryPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;