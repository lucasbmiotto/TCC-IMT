import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveDID, saveSeed, saveCredentials } from '../utils/Storage';
import { Ionicons } from '@expo/vector-icons';

export default function ImportWallet({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    try {
      setLoading(true);

      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (result.canceled) {
        setLoading(false);
        return;
      }

      const fileUri = result.assets[0].uri;
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: 'utf8' });
      const parsed = JSON.parse(content);

      if (!parsed.did || !parsed.seed) {
        Alert.alert('Erro', 'Arquivo de backup inválido.');
        setLoading(false);
        return;
      }

      // Salva no storage
      await saveDID(parsed.did);
      await saveSeed(parsed.seed);
      await saveCredentials(parsed.did, parsed.credentials || []);

      // 🔑 restaura a senha
      if (parsed.password) {
        await AsyncStorage.setItem('@keyless_password', parsed.password); // ✅ mesma chave
        }

      // Marca que o usuário agora tem carteira
      await AsyncStorage.setItem('userData', JSON.stringify({ hasWallet: true }));

      Alert.alert('Sucesso', 'Carteira importada com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('ValidateCredentialLogin') },
      ]);
    } catch (err) {
      console.error('Erro ao importar backup:', err);
      Alert.alert('Erro', 'Não foi possível importar o backup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="cloud-upload-outline" size={64} color="#4E90FF" />
      <Text style={styles.title}>Importar Carteira</Text>
      <Text style={styles.subtitle}>
        Selecione o arquivo de backup (.json) para restaurar sua carteira neste dispositivo.
      </Text>

      <TouchableOpacity style={styles.importButton} onPress={handleImport} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.importButtonText}>Selecionar Backup</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2FB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5b708f',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  importButton: {
    backgroundColor: '#4E90FF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  importButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});
