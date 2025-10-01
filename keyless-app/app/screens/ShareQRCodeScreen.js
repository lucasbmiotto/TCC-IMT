import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { saveQRCodeData, getAllCredentials } from '../utils/QRCodeToSQLite';

export default function ShareQRCodeScreen({ navigation }) {
  // Exemplo de conteúdo JSON do QRCode
  const qrValue = JSON.stringify({
    credentialTitle: "CNH",
    fields: {
      nome: "João da Silva",
      numero: "123456789",
      validade: "2028-12-31"
    },
    timestamp: Date.now()
  });

  const handleSimulateScan = () => {
    saveQRCodeData(qrValue);
    Alert.alert("Sucesso", "Dados do QRCode salvos no banco!");
  };

  const handleShowCredentials = () => {
    getAllCredentials((list) => {
      Alert.alert("Registros no banco", JSON.stringify(list, null, 2));
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 24 }}>Simular Scan de QRCode</Text>
      <Button title="Simular Scan e Salvar" onPress={handleSimulateScan} />
      <View style={{ height: 16 }} />
      <Button title="Mostrar Registros Salvos" onPress={handleShowCredentials} />
      <View style={{ height: 16 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}