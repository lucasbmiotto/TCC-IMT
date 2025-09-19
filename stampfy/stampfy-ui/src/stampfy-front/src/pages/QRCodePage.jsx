import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Se quiser QR real, instale: npm install react-qr-code
import QRCode from 'react-qr-code';

function QRCodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state || {};

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-lg">Nenhum dado para exibir.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-6">QR Code do Registro</h2>
      <div className="bg-white p-6 rounded shadow mb-6">
        <QRCode value={JSON.stringify(record)} size={200} />
      </div>
      <pre className="mb-6 bg-gray-100 p-4 rounded text-sm max-w-md overflow-x-auto">{JSON.stringify(record, null, 2)}</pre>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
}

export default QRCodePage;