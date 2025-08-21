import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function KeysScreen() {
  const [showPrivate, setShowPrivate] = useState(false);
  const [showPublic, setShowPublic] = useState(false);
  const buttonAnimPrivate = new Animated.Value(1);
  const buttonAnimPublic = new Animated.Value(1);

  const animatePressIn = (anim) => {
    Animated.spring(anim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const animatePressOut = (anim) => {
    Animated.spring(anim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  const renderKeyCard = (label, value, show, setShow, anim) => (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          secureTextEntry={!show}
          style={styles.input}
          editable={false}
          value={value}
        />
        <Animated.View style={{ transform: [{ scale: anim }] }}>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            onPressIn={() => animatePressIn(anim)}
            onPressOut={() => animatePressOut(anim)}
            activeOpacity={0.7}
          >
            <Ionicons name={show ? "eye-off" : "eye"} size={28} color="#4E90FF" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Chaves</Text>
      {renderKeyCard("Chave Privada", "48129ufdsfjoav1948903", showPrivate, setShowPrivate, buttonAnimPrivate)}
      {renderKeyCard("Chave Pública", "78174ufhdsjn813yr802", showPublic, setShowPublic, buttonAnimPublic)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#4E90FF',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F4C81',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F0F5FF',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    letterSpacing: 2,
    color: '#333',
  },
});
