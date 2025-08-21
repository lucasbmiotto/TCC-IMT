import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ícones para cada ação

export default function HomePageScreen({ navigation }) {
  const username = "Jon Doe";

  const buttonAnim = new Animated.Value(1);

  const handlePressIn = () => Animated.spring(buttonAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  const ActionCard = ({ title, icon, onPress }) => (
    <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
        activeOpacity={0.8}
      >
        <Ionicons name={icon} size={36} color="#4E90FF" />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>Acesse rapidamente esta função</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/keyless-notext.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.username}>Olá, {username}!</Text>
        <Text style={styles.subtitle}>Sua carteira digital segura e confiável.</Text>
      </View>

      {/* Action Cards */}
      <View style={styles.cardsContainer}>
        <ActionCard title="Cadastrar" icon="person-add-outline" onPress={() => navigation.navigate('SignIn')} />
        <ActionCard title="Compartilhar" icon="share-social-outline" onPress={() => navigation.navigate('Share')} />
        <ActionCard title="Configurações" icon="settings-outline" onPress={() => navigation.navigate('WalletAction')} />
      </View>

      {/* Placeholder futura seção */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Últimas Atividades</Text>
        <Text style={styles.infoText}>Nenhuma atividade recente.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    width: '90%',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  username: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4E90FF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7A99',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  cardsContainer: {
    width: '90%',
    gap: 16,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F4C81',
    marginTop: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7A99',
    marginTop: 4,
    textAlign: 'center',
  },
  infoSection: {
    width: '90%',
    backgroundColor: '#E8F0FE',
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4E90FF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7A99',
  },
});
