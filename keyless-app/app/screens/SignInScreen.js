import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();

  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      {/* Top Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/keyless-notext.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Card com textos e único botão centralizado */}
      <View style={styles.card}>
        <Text style={styles.title}>Proteja suas Credenciais</Text>
        <Text style={styles.subtitle}>
          Sua carteira digital com segurança de alto nível, privacidade garantida e total controle.
        </Text>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate('ValidateCredentials')}
          >
            <Ionicons
              name="cloud-download-outline"
              size={28}
              color="#FFF"
              style={{ marginRight: 10 }} // ícone levemente à esquerda
            />
            <Text style={styles.buttonText}>Importar credencial</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#4E90FF',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F4C81',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7A99',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centraliza texto e ícone
    backgroundColor: '#4E90FF',
    paddingVertical: 20,
    borderRadius: 30,
    width: '100%',
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
});
