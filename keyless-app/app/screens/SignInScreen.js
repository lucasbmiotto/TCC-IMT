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
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/keyless-notext.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Cartão */}
      <View style={styles.card}>
        <Text style={styles.title}>Proteja suas Credenciais</Text>
        <Text style={styles.subtitle}>
          Sua carteira digital com segurança de alto nível, privacidade garantida e total controle.
        </Text>

        {/* Botão animado */}
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
              style={{ marginRight: 12 }}
            />
            <Text style={styles.buttonText}>Importar Credencial</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2FB',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 180,
    height: 180,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 35,
    shadowColor: '#4E90FF',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F4C81',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7A99',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4E90FF',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '95%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#4E90FF',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    flexShrink: 1, // evita que o texto saia do botão
  },
});
