import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { savePassword, saveSeed } from '../utils/Storage';
import uuid from 'react-native-uuid';

export default function CreateWalletScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [buttonAnim] = useState(new Animated.Value(1));

  const handleCreate = async () => {
    if (!password || password !== confirm) {
      setError('Senhas não coincidem ou estão vazias');
      return;
    }

    try {
      const generatedSeed = uuid.v4();
      await savePassword(password);
      await saveSeed(generatedSeed);

      Alert.alert('Sucesso', 'Carteira criada! Indo para a frase de segurança...');
      navigation.navigate('SeedPhrase', { seed: generatedSeed });
    } catch (err) {
      console.error('Erro no handleCreate:', err);
      Alert.alert('Erro', 'Algo deu errado ao criar a carteira.');
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Carteira</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#6B7A99"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="#6B7A99"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          style={styles.input}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreate}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC', // Fundo claro e clean
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4E90FF', // Azul Keyless original
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    color: '#4E90FF',
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  error: {
    color: '#FF4D4F',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4E90FF',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 24,
    shadowColor: '#4E90FF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
