import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ValidateCredentialsScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0); // 🔑 contador de tentativas
  const [buttonAnim] = useState(new Animated.Value(1));

  const handleLogin = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem('@keyless_password');
      if (password === storedPassword) {
        setError('');
        setAttempts(0); // reseta tentativas
        navigation.replace('Home');
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 5) {
          setError('Muitas tentativas incorretas. Você pode deletar a carteira.');
        } else {
          setError(`Senha incorreta. Tentativa ${newAttempts}/5.`);
        }
      }
    } catch (e) {
      console.error('Erro ao validar senha:', e);
      setError('Erro ao validar. Tente novamente.');
    }
  };

  const handleDeleteWallet = async () => {
    Alert.alert(
      'Deletar carteira',
      'Tem certeza que deseja deletar sua carteira? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Deletar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear(); // limpa todos os dados
              navigation.replace('Splash'); // volta para tela inicial
            } catch (err) {
              console.error('Erro ao deletar carteira:', err);
              Alert.alert('Erro', 'Não foi possível deletar a carteira.');
            }
          } 
        }
      ]
    );
  };

  const handlePressIn = () => 
    Animated.spring(buttonAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => 
    Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar na sua carteira</Text>
      <Text style={styles.subtitle}>Digite sua senha para continuar.</Text>

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#6B7A99"
        secureTextEntry
        value={password}
        onChangeText={val => { setPassword(val); setError(''); }}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Validar</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 🔑 Botão de deletar aparece só após 5 erros */}
      {attempts >= 5 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteWallet}>
          <Text style={styles.deleteText}>Deletar Carteira</Text>
        </TouchableOpacity>
      )}
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
  deleteButton: { marginTop: 20, paddingVertical: 14, borderRadius: 14, backgroundColor: '#FF4D4F', alignItems: 'center' },
  deleteText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
