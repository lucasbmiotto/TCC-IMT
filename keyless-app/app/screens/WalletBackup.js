import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getDID, getSeedPhrase, getAllCredentials } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

export default function WalletBackupScreen({ navigation }) {
  const [did, setDid] = useState('');
  const [seed, setSeed] = useState('');
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const loadWallet = async () => {
      const storedDid = await getDID();
      const storedSeed = await getSeedPhrase();
      const storedCreds = await getAllCredentials?.();
      if (storedDid) setDid(storedDid);
      if (storedSeed) setSeed(storedSeed);
      if (storedCreds) setCredentials(storedCreds);
    };
    loadWallet();
  }, []);

  const handleDownloadBackup = async () => {
    if (!did || !seed) {
      Alert.alert('Erro', 'Carteira ainda não carregada.');
      return;
    }

    const backupData = { did, seed, credentials, created_at: new Date().toISOString() };
    const fileName = `KeylessBackup_${new Date().toISOString()}.json`;
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(backupData, null, 2), {
      encoding: FileSystem.EncodingType.UTF8,
    });

    try {
      if (Platform.OS === 'web' || !(await Sharing.isAvailableAsync())) {
        Alert.alert('Backup pronto!', 'Copie o conteúdo do backup para salvar em segurança.');
        console.log(JSON.stringify(backupData, null, 2));
      } else {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Salvar backup da carteira',
          UTI: 'public.json',
        });
      }
    } catch (err) {
      console.error('Erro ao compartilhar backup:', err);
      Alert.alert('Erro', 'Não foi possível compartilhar o backup.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadBackup}>
        <Ionicons name="cloud-download-outline" size={24} color="#fff" />
        <Text style={styles.downloadButtonText}>Baixar Backup</Text>
      </TouchableOpacity>
      <Text style={styles.note}>Mantenha este arquivo em local seguro.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 32,
    backgroundColor: '#EAF2FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4E90FF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
    gap: 12,
    marginBottom: 20,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  note: {
    fontSize: 14,
    color: '#6B7A91',
    textAlign: 'center',
  },
});
