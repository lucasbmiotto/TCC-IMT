import React, { useEffect, useState } from 'react';
import { 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDID, getSeedPhrase, getAllCredentials } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

export default function WalletBackupScreen() {
  const [did, setDid] = useState('');
  const [seed, setSeed] = useState('');
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const loadWallet = async () => {
      const storedDid = await getDID();
      const storedSeed = await getSeedPhrase();
      const storedCreds = await getAllCredentials();
      if (storedDid) setDid(storedDid);
      if (storedSeed) setSeed(storedSeed);
      if (storedCreds) setCredentials(storedCreds);
    };
    loadWallet();
  }, []);

  const handleDownloadBackup = async () => {
    if (!did) {
      Alert.alert('Erro', 'DID não encontrado. Não é possível gerar backup.');
      return;
    }

    const password = await AsyncStorage.getItem('@keyless_password');
    const backupData = { 
      did, 
      seed: seed || null, 
      credentials, 
      password: password || null, // ✅ senha pura
      created_at: new Date().toISOString() 
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `KeylessBackup_${timestamp}.json`;
    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(backupData, null, 2));

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Salvar backup da carteira',
          UTI: 'public.json',
        });
      } else {
        Alert.alert(
          'Backup pronto!',
          'Não foi possível abrir o menu de compartilhamento neste dispositivo. Copie o conteúdo abaixo e salve em segurança.'
        );
        console.log(JSON.stringify(backupData, null, 2));
      }
    } catch (err) {
      console.error('Erro ao gerar backup:', err);
      Alert.alert('Erro', 'Não foi possível gerar o backup.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadBackup}>
        <Ionicons name="cloud-download-outline" size={24} color="#fff" />
        <Text style={styles.downloadButtonText}>Baixar Backup</Text>
      </TouchableOpacity>
      <Text style={styles.note}>
        Este arquivo contém sua frase de segurança, DID, credenciais e senha. 
        Guarde-o em local seguro e nunca compartilhe com terceiros.
      </Text>
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
    marginTop: 12,
  },
});
