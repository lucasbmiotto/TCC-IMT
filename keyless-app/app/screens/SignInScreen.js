import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(1)).current; // Para animação do ícone

  // Animação de toque dos botões
  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();

  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  // Gradiente animado dos botões
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  // Animação de clique no ícone Keyless
  const animateIcon = () => {
    Animated.sequence([
      Animated.spring(iconScale, { toValue: 1.2, useNativeDriver: true }),
      Animated.spring(iconScale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  // Interpolação de cor do gradiente
  const interpolateColor = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4E90FF', '#71B7FF'],
  });

  const renderButton = (title, onPress, iconName) => (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.buttonWrapper}
      >
        <Animated.View style={[styles.button, { backgroundColor: interpolateColor }]}>
          {iconName && (
            <Ionicons
              name={iconName}
              size={28} // Ícone do botão um pouco maior
              color="#FFF"
              style={{ marginRight: 12 }}
            />
          )}
          <Text style={styles.buttonText}>{title}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Proteja suas Credenciais</Text>
        <Text style={styles.heroSubtitle}>
          Tenha controle total sobre sua carteira digital. Seguro, privado e confiável.
        </Text>
      </View>

      {/* Hero Image com animação */}
      <TouchableOpacity onPress={animateIcon} activeOpacity={0.8}>
        <Animated.View style={[styles.heroImageWrapper, { transform: [{ scale: iconScale }] }]}>
          <Image
            source={require('../../assets/keyless-notext.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {renderButton('Cadastrar', () => navigation.navigate(''), 'person-add')}
        <Text style={styles.orText}>ou</Text>
        {renderButton('Importar credencial', () => navigation.navigate(''), 'cloud-download')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-around',
  },
  hero: {
    alignItems: 'center',
    marginTop: 80,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F4C81',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7A99',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  heroImageWrapper: {
    width: 220, // maior
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#4E90FF',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
    marginVertical: 20,
  },
  heroImage: {
    width: 160, // maior
    height: 160,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
    marginVertical: 12,
    borderRadius: 30,
    shadowColor: '#4E90FF',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, // maior
    borderRadius: 30,
    width: 300, // maior
    height: 70,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 25, // maior
    fontWeight: '700',
  },
  orText: {
    marginVertical: 16,
    fontSize: 16,
    color: '#6B7A99',
  },
});
