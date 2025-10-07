import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveDID } from '../utils/Storage';

export default function WelcomeScreen({ navigation, route }) {
  const { seed } = route.params;
  const fakeDID = `did:key:${Math.random().toString(36).substring(2, 12)}`;

  useEffect(() => {
    const saveData = async () => {
      await saveDID(fakeDID);
      await AsyncStorage.setItem('userData', JSON.stringify({ hasWallet: true }));
      console.log('userData salvo com sucesso');
    };

    saveData();

    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/keyless-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo ao Keyless 🎉</Text>
      <Text style={styles.did}>DID gerado:</Text>
      <Text style={styles.didValue}>{fakeDID}</Text>
      <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 30 }} />
      <Text style={styles.loading}>Preparando sua carteira...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 20, textAlign: 'center' },
  did: { fontSize: 16, color: '#555' },
  didValue: { fontSize: 16, color: '#007AFF', fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  loading: { fontSize: 14, color: '#555', marginTop: 10 },
});
