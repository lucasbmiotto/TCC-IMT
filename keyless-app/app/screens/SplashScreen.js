import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';

export default function SplashScreen({ navigation }) {
  // Animações
  const fade = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(12)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const primaryScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.elastic(1)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(primaryScale, {
      toValue: 0.98,
      friction: 6,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(primaryScale, {
      toValue: 1,
      friction: 6,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.Image
        source={require('../../assets/keyless-logo.png')}
        style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        resizeMode="contain"
        accessible
        accessibilityLabel="Logo Keyless"
      />

      <Animated.View style={{ opacity: fade, transform: [{ translateY: slideUp }] }}>
        <Text style={styles.title}>Bem-vindo ao Keyless</Text>
      </Animated.View>

      <View style={styles.buttons}>
        {/* Botão Criar Carteira */}
        <Animated.View style={{ transform: [{ scale: primaryScale }] }}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => navigation.navigate('CreateWallet')}
            accessibilityRole="button"
            accessibilityLabel="Criar Carteira"
          >
            <Text style={styles.primaryText}>Criar Carteira</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botão Importar Carteira (desabilitado) */}
        <TouchableOpacity
          style={styles.secondaryButton}
          disabled
          accessibilityRole="button"
          accessibilityLabel="Importar Carteira (desabilitado)"
        >
          <Text style={styles.secondaryText}>Importar Carteira</Text>
        </TouchableOpacity>

        {/* Novo Botão: Validar Credenciais */}
        <TouchableOpacity
          style={styles.validateButton}
          onPress={() => navigation.navigate('ValidateCredentials')}
          accessibilityRole="button"
          accessibilityLabel="Validar Credenciais"
        >
          <Text style={styles.validateText}>Validar Credenciais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const BLUE = '#007AFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 12,
  },
  buttons: {
    width: '100%',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: BLUE,
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  primaryText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 14,
    backgroundColor: '#eef4ff',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d7e6ff',
  },
  secondaryText: {
    color: '#5b708f',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  validateButton: {
    marginTop: 14,
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  validateText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
