import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function KeysScreen() {
  const navigation = useNavigation();
  const buttonAnimDelete = new Animated.Value(1);
  const buttonAnimBack = new Animated.Value(1);

  const handleDelete = () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir as chaves?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => console.log('Chaves excluídas') },
      ]
    );
  };

  const handleBack = () => {
    navigation.navigate('WalletAction');
  };

  const animatePressIn = (anim) => {
    Animated.spring(anim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const animatePressOut = (anim) => {
    Animated.spring(anim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TEM CERTEZA QUE DESEJA EXCLUIR OS DADOS DE SUA CARTEIRA?</Text>

      <View style={styles.buttonsRow}>
        <Animated.View style={{ transform: [{ scale: buttonAnimDelete }] }}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            onPressIn={() => animatePressIn(buttonAnimDelete)}
            onPressOut={() => animatePressOut(buttonAnimDelete)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonAnimBack }] }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            onPressIn={() => animatePressIn(buttonAnimBack)}
            onPressOut={() => animatePressOut(buttonAnimBack)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC', // Fundo claro
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 60,
    color: '#0F4C81', // Azul Keyless
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: '#FF4D4F', // Vermelho de exclusão
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 24,
    shadowColor: '#FF4D4F',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  backButton: {
    backgroundColor: '#4E90FF', // Azul Keyless
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 24,
    shadowColor: '#4E90FF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
