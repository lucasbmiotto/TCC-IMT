import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Fingerprint, QrCode, AlertTriangle } from "lucide-react";

function HistoryPage() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // ✅ Busca direto do localStorage
  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("credentials") || "[]");
    setRecords(savedCredentials);
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Histórico de Registros</CardTitle>
          <CardDescription>Visualize seus documentos gravados na blockchain.</CardDescription>
        </CardHeader>
        <CardContent>
          {records.length > 0 ? (
            <motion.ul className="space-y-4">
              {records.map((record) => (
                <motion.li
                  key={record.id}
                  className="border rounded p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{record.onChain.credType}</p>
                    <p>
                      <Fingerprint className="inline h-4 w-4" /> {record.onChain.ownerDID}
                    </p>
                    <p>
                      <FileText className="inline h-4 w-4" /> Hash: {record.onChain.hash}
                    </p>
                    <p className="text-xs">{new Date(record.onChain.timestamp).toLocaleString()}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const payload = {
                        id: record.id,
                        onChain: record.onChain,
                        credential: record.credentialData, // ✅ garante que os dados completos vão pro QR
                        blockchainProof: {
                          hash: record.onChain.hash,
                          issuer: record.onChain.issuer,
                          timestamp: record.onChain.timestamp,
                        },
                      };
                      navigate("/qrcode", { state: { record: payload } });
                    }}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2">Nenhum registro encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default HistoryPage;
