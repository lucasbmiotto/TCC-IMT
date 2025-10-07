import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getPassword, getSeed } from '../utils/Storage';

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [seed, setSeed] = useState('');
  const [storedPassword, setStoredPassword] = useState(null);
  const [storedSeed, setStoredSeed] = useState(null);

  useEffect(() => {
    async function loadData() {
      const pass = await getPassword();
      const s = await getSeed();
      setStoredPassword(pass);
      setStoredSeed(s);
    }
    loadData();
  }, []);

  const handleLogin = () => {
    if (password === storedPassword && seed === storedSeed) {
      Alert.alert('Login OK', 'Autenticado com sucesso');
      navigation.replace('Home');
    } else {
      Alert.alert('Erro', 'Senha ou frase de segurança incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Frase de segurança"
        value={seed}
        onChangeText={setSeed}
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
