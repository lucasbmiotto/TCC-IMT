import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ValidarCredenciais() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/keyless-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Validar Credenciais</Text>
      <Text style={styles.subtitle}>
        Aponte a câmera para o QR code para validar suas credenciais
      </Text>

      {/* Área simulada do QR code */}
      <View style={styles.qrPlaceholder}>
        <Text style={styles.qrText}>[Área do QR Code]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4b4b4b',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  qrPlaceholder: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
  },
  qrText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

