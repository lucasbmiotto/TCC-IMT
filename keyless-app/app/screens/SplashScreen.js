import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  const [hasUser, setHasUser] = useState(null); // null = carregando, false = novo usuário

  const fade = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(20)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.elastic(1)),
        useNativeDriver: true,
      }),
    ]).start(() => {
      checkUser();
    });
  }, []);

  const checkUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userData');
      const parsed = JSON.parse(user);
      console.log('userData encontrado:', parsed);

      if (parsed?.hasWallet) {
        navigation.replace('ValidateCredentialLogin');
      } else {
        setHasUser(false); // mostra botões
      }
    } catch (e) {
      console.log('Erro ao verificar usuário:', e);
      setHasUser(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.Image
        source={require('../../assets/keyless-logo.png')}
        style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        resizeMode="contain"
      />

      <Animated.View style={{ opacity: fade, transform: [{ translateY: slideUp }] }}>
        <Text style={styles.title}>Bem-vindo ao Keyless</Text>
      </Animated.View>

      {/* Botões de ação para novo usuário */}
      {hasUser === false && (
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('CreateWallet')}
          >
            <Text style={styles.primaryText}>Criar Carteira</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('ImportWallet')}
          >
            <Text style={styles.secondaryText}>Importar Carteira</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: 12,
  },
  buttons: {
    width: '100%',
    marginTop: 30,
  },
  primaryButton: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  primaryText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
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
});
