import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ValidateCredentialsScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [buttonAnim] = useState(new Animated.Value(1));

  const handleLogin = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem('@keyless_password');
      if (password === storedPassword) {
        setError('');
        navigation.replace('Home');
      } else {
        setError('Senha incorreta. Tente novamente.');
      }
    } catch (e) {
      console.error('Erro ao validar senha:', e);
      setError('Erro ao validar. Tente novamente.');
    }
  };

  const handlePressIn = () => Animated.spring(buttonAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar na sua carteira</Text>
      <Text style={styles.subtitle}>Digite sua senha para continuar.</Text>
      <TextInput placeholder="Senha" placeholderTextColor="#6B7A99" secureTextEntry value={password} onChangeText={val => { setPassword(val); setError(''); }} style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Validar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const BLUE = '#007AFF';
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F7F9FC' },
  title: { fontSize: 28, fontWeight: '700', color: BLUE, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#475569', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: '#FFF', color: BLUE, borderWidth: 1, borderColor: '#B0C4DE', borderRadius: 14, padding: 16, fontSize: 16, marginBottom: 16 },
  error: { color: '#FF4D4F', marginBottom: 16, textAlign: 'center', fontWeight: '600', fontSize: 15 },
  button: { backgroundColor: BLUE, paddingVertical: 16, borderRadius: 20, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
});
