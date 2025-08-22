import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { savePassword, saveSeed } from '../utils/Storage';
import uuid from 'react-native-uuid';

export default function CreateWalletScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [buttonAnim] = useState(new Animated.Value(1));

  const handleCreate = async () => {
    if (!password || password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const generatedSeed = uuid.v4();
      await savePassword(password);
      await saveSeed(generatedSeed);

      setError('');
      setSuccess(true);

      setTimeout(() => {
        navigation.navigate('SeedPhrase', { seed: generatedSeed });
      }, 1000);
    } catch (err) {
      console.error('Erro no handleCreate:', err);
      setError('Algo deu errado ao criar a carteira.');
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proteja sua carteira</Text>
      <Text style={styles.subtitle}>
        Crie uma senha segura para proteger suas credenciais digitais.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#6B7A99"
          secureTextEntry
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            setError('');
            setSuccess(false);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="#6B7A99"
          secureTextEntry
          value={confirm}
          onChangeText={(val) => {
            setConfirm(val);
            setError('');
            setSuccess(false);
          }}
          style={styles.input}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>Senha criada com sucesso ✅</Text> : null}

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

const BLUE = '#007AFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BLUE,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    color: BLUE,
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
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
    fontSize: 15,
  },
  success: {
    color: '#22c55e',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
  button: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: BLUE,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
