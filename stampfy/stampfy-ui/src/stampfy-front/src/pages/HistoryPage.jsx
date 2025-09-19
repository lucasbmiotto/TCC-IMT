import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, History as HistoryIcon, FileText, Fingerprint, Trash2, AlertTriangle, QrCode } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function HistoryPage() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('stampfy_records')) || [];
    setRecords(storedRecords);
  }, []);

  const handleDelete = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem('stampfy_records', JSON.stringify(updatedRecords));
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <>
      <Helmet>
        <title>Histórico de Registros - Stampfy</title>
        <meta name="description" content="Veja todos os seus documentos registrados na plataforma Stampfy." />
        <meta property="og:title" content="Histórico de Registros - Stampfy" />
        <meta property="og:description" content="Veja todos os seus documentos registrados na plataforma Stampfy." />
      </Helmet>
      
      <main className="min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto z-10 relative">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Início
            </Button>
          </motion.div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="inline-block p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full">
                  <HistoryIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="gradient-text text-3xl font-bold">Histórico de Registros</CardTitle>
                  <CardDescription>Visualize e gerencie seus documentos registrados.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {records.length > 0 ? (
                <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                  {records.map((record) => (
                    <motion.li key={record.id} variants={itemVariants} layout>
                      <div className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-accent/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-primary">{record.documentLabel}</p>
                          <div className="text-sm text-muted-foreground mt-2 space-y-1">
                            <p className="flex items-center gap-2"><Fingerprint className="h-4 w-4" /> <strong>DID:</strong> <span className="font-mono break-all">{record.did}</span></p>
                            <p className="flex items-center gap-2"><FileText className="h-4 w-4" /> <strong>Arquivo:</strong> {record.fileName}</p>
                            <p className="text-xs mt-1">{formatDate(record.timestamp)}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            title="Ver QR Code"
                            onClick={() => navigate('/qrcode', { state: { record } })}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não pode ser desfeita. Isso excluirá permanentemente o registro do seu histórico.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(record.id)}>Excluir</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">Nenhum registro encontrado</h3>
                  <p className="text-muted-foreground mt-2">Parece que você ainda não registrou nenhum documento.</p>
                  <Button onClick={() => navigate('/')} className="mt-6">Registrar meu primeiro documento</Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

export default HistoryPage;