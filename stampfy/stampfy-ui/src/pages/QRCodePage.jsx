import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

function QRCodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state || {};

  useEffect(() => {
    // Marca o registro como lido no localStorage
    if (record && record.id) {
      const credentials = JSON.parse(localStorage.getItem("credentials") || "[]");
      const updated = credentials.map(item =>
        item.id === record.id ? { ...item, qrRead: true } : item
      );
      localStorage.setItem("credentials", JSON.stringify(updated));
    }
  }, [record]);

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

  const { credential, onChain, blockchainProof } = record;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">QR Code do Registro</h2>

      <div className="bg-white p-6 rounded shadow mb-6">
        <QRCode value={JSON.stringify(record)} size={200} />
      </div>

      <div className="w-full max-w-md bg-gray-50 p-6 rounded shadow space-y-2 mb-6">
        <h3 className="font-bold text-lg">Dados da Credencial</h3>
        {credential && Object.entries(credential.fields || {}).map(([key, value]) => (
          <p key={key}><span className="font-semibold">{key}:</span> {value}</p>
        ))}

        <h3 className="font-bold text-lg mt-4">Prova na Blockchain</h3>
        <p className="break-all"><span className="font-semibold">Hash:</span> {blockchainProof.hash}</p>
        <p><span className="font-semibold">Emissor:</span> {blockchainProof.issuer}</p>
        <p><span className="font-semibold">Timestamp:</span> {new Date(blockchainProof.timestamp).toLocaleString()}</p>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </div>
  );
}

export default QRCodePage;