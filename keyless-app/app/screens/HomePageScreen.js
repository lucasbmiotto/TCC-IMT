import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';

export default function HomePageScreen({ navigation }) {
  const username = "Jon Doe";
  const buttonAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(buttonAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  const renderButton = (title, onPress) => (
    <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/keyless-notext.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.buttons}>
        {renderButton("CADASTRAR", () => navigation.navigate('SignIn'))}
        {renderButton("COMPARTILHAR", () => navigation.navigate('Share'))}
        {renderButton("CONFIGURAÇÕES", () => navigation.navigate('WalletAction'))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: 40,
  },
  header: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 12,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4E90FF',
    textAlign: 'center',
  },
  buttons: {
    width: '90%',
    gap: 16,
  },
  button: {
    backgroundColor: '#4E90FF',
    paddingVertical: 16,
    borderRadius: 24,
    shadowColor: '#4E90FF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
