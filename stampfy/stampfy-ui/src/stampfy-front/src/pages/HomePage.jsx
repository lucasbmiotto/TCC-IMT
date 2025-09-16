import React, { useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DynamicFormFields, { documentFieldsConfig } from '@/components/DynamicFormFields';
import { FileUp, Send, FileText, CheckCircle, Fingerprint, FileType, History } from 'lucide-react';

const documentTypeLabels = {
  rg: 'RG (Identidade)',
  cnh: 'CNH (Habilitação)',
  nascimento: 'Certidão de Nascimento',
  outro: 'Outro Documento',
};

function HomePage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [documentType, setDocumentType] = useState('');
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleDocumentTypeChange = (value) => {
    setDocumentType(value);
    setFormData({}); // Reset form data when type changes
    setSelectedFile(null);
  };
  
  const handleFormDataChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: 'Arquivo Selecionado',
        description: `"${file.name}" está pronto para ser registrado.`,
      });
    }
  };

  const handleRegisterClick = () => {
    const newRecord = {
      id: Date.now(),
      documentType,
      documentLabel: documentTypeLabels[documentType] || 'Documento',
      did: formData.did,
      fileName: selectedFile.name,
      timestamp: new Date().toISOString(),
      details: { ...formData }
    };

    try {
      const existingRecords = JSON.parse(localStorage.getItem('stampfy_records')) || [];
      localStorage.setItem('stampfy_records', JSON.stringify([newRecord, ...existingRecords]));
      
      toast({
        title: 'Registro bem-sucedido! 🎉',
        description: `O documento foi registrado com sucesso.`,
      });

      // Reset form
      setDocumentType('');
      setFormData({});
      setSelectedFile(null);

    } catch (error) {
      toast({
        title: 'Erro ao registrar 😢',
        description: 'Não foi possível salvar o registro. Por favor, tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const isFormComplete = useMemo(() => {
    if (!documentType || !selectedFile) return false;
    const requiredFields = documentFieldsConfig[documentType] || [];
    if (!requiredFields.every(field => formData[field.id] && formData[field.id].trim() !== '')) return false;
    if(!formData.did || formData.did.trim() === '') return false;
    return true;
  }, [documentType, formData, selectedFile]);
  
  return (
    <>
      <Helmet>
        <title>Stampfy - Registro de Documentos</title>
        <meta name="description" content="Uma plataforma simples e moderna para registrar seus documentos com segurança." />
        <meta property="og:title" content="Stampfy - Registro de Documentos" />
        <meta property="og:description" content="Uma plataforma simples e moderna para registrar seus documentos com segurança." />
      </Helmet>
      
      <main className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-lg z-10"
        >
          <Card>
            <CardHeader className="text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="inline-block p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mb-4">
                  <FileUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="gradient-text text-4xl font-bold">Stampfy</CardTitle>
                <CardDescription className="mt-2 text-lg">
                  Plataforma de registro de documentos.
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-2">
                  <Label htmlFor="doc-type" className="flex items-center gap-2"><FileType className="w-4 h-4" />Tipo de Documento</Label>
                  <Select onValueChange={handleDocumentTypeChange} value={documentType}>
                    <SelectTrigger id="doc-type">
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rg">{documentTypeLabels.rg}</SelectItem>
                      <SelectItem value="cnh">{documentTypeLabels.cnh}</SelectItem>
                      <SelectItem value="nascimento">{documentTypeLabels.nascimento}</SelectItem>
                      <SelectItem value="outro">{documentTypeLabels.outro}</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <AnimatePresence>
                  {documentType && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }} className="space-y-6 overflow-hidden">
                        <div className="pt-6 border-t border-dashed">
                          <DynamicFormFields documentType={documentType} formData={formData} onDataChange={handleFormDataChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="did" className="flex items-center gap-2"><Fingerprint className="w-4 h-4" />DID da Pessoa</Label>
                            <Input id="did" placeholder="did:example:123456789abcdefghi" value={formData.did || ''} onChange={(e) => handleFormDataChange('did', e.target.value)} />
                        </div>
                        <div className="flex flex-col items-center">
                          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                          {selectedFile ? (
                            <div className="w-full flex flex-col items-center text-center p-4 border-2 border-dashed rounded-lg border-green-500 bg-green-500/10">
                              <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                              <p className="font-semibold text-green-600">Arquivo de complemento pronto!</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">{selectedFile.name}</p>
                              <Button variant="link" size="sm" onClick={() => setSelectedFile(null)} className="mt-2 text-primary">Escolher outro arquivo</Button>
                            </div>
                          ) : (
                            <div className="w-full flex flex-col items-center text-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-accent transition-colors" onClick={handleChooseFileClick}>
                              <FileText className="w-12 h-12 text-muted-foreground mb-2" />
                              <p className="font-semibold text-foreground">Clique para escolher um arquivo de complemento</p>
                              <p className="text-sm text-muted-foreground">Ou arraste e solte aqui</p>
                            </div>
                          )}
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                  <Button onClick={handleRegisterClick} className="w-full text-lg py-6 font-semibold" size="lg" disabled={!isFormComplete}>
                    <Send className="mr-2 h-5 w-5" />Registrar
                  </Button>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center p-4 border-t">
              <Button variant="ghost" onClick={() => navigate('/historico')}>
                <History className="mr-2 h-4 w-4" />
                Ver Histórico de Registros
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        <footer className="text-center mt-8 text-muted-foreground text-sm z-10">
          <p>&copy; {new Date().getFullYear()} Stampfy. Todos os direitos reservados.</p>
        </footer>
      </main>
    </>
  );
}

export default HomePage;