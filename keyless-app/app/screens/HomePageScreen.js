import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDID } from '../utils/Storage'; // Recupera o DID salvo

export default function HomePageScreen({ navigation }) {
  const [did, setDid] = useState('');
  const [activities, setActivities] = useState([]); // últimas atividades
  const buttonAnim = new Animated.Value(1);

  useEffect(() => {
    const loadDID = async () => {
      const storedDid = await getDID();
      if (storedDid) setDid(storedDid);

      // Exemplo de últimas atividades
      setActivities([
        { id: 1, action: 'Cadastrou credencial', date: '2025-09-03 10:30' },
        { id: 2, action: 'Compartilhou RG', date: '2025-09-03 11:00' },
        { id: 3, action: 'Compartilhou CNH', date: '2025-09-03 11:15' },
        { id: 4, action: 'Validou credencial', date: '2025-09-03 12:00' },
      ]);
    };
    loadDID();
  }, []);

  const handlePressIn = () =>
    Animated.spring(buttonAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();

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

  const copyDID = () => {
    if (!did) return;
    Clipboard.setString(did);
    Alert.alert('Copiado', 'Seu DID foi copiado para a área de transferência.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/keyless-notext.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.username}>
          {did ? `DID: ${did.slice(0, 10)}...${did.slice(-6)}` : 'Carregando DID...'}
        </Text>
        {did ? (
          <TouchableOpacity onPress={copyDID} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={18} color="#FFF" />
            <Text style={styles.copyText}>Copiar DID</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.subtitle}>Sua carteira digital segura e confiável.</Text>
      </View>

      {/* Action Cards */}
      <View style={styles.cardsContainer}>
        <ActionCard title="Cadastrar" icon="person-add-outline" onPress={() => navigation.navigate('SignIn')} />
        <ActionCard title="Compartilhar" icon="share-social-outline" onPress={() => navigation.navigate('Share')} />
        <ActionCard title="Configurações" icon="settings-outline" onPress={() => navigation.navigate('WalletAction')} />
        <ActionCard title="Validar credenciais" icon="checkmark-done-circle-outline" onPress={() => navigation.navigate('ValidateCredentials')} />
      </View>

      {/* Últimas atividades */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Últimas Atividades</Text>
        {activities.length === 0 ? (
          <Text style={styles.infoText}>Nenhuma atividade recente.</Text>
        ) : (
          activities.map(act => (
            <View key={act.id} style={styles.activityItem}>
              <Text style={styles.activityText}>• {act.action}</Text>
              <Text style={styles.activityDate}>{act.date}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF2FB' },
  header: { width: '90%', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  logo: { width: 160, height: 160, marginBottom: 12 },
  username: { fontSize: 20, fontWeight: '700', color: '#0056A6', textAlign: 'center' },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4E90FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 6,
  },
  copyText: { color: '#FFF', marginLeft: 6, fontSize: 12 },
  subtitle: { fontSize: 14, color: '#4E6E91', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  cardsContainer: { width: '90%', gap: 16 },
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
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0F4C81', marginTop: 12 },
  cardSubtitle: { fontSize: 14, color: '#6B7A99', marginTop: 4, textAlign: 'center' },
  infoSection: { width: '90%', backgroundColor: '#D9E9FA', borderRadius: 20, padding: 20, marginTop: 30 },
  infoTitle: { fontSize: 18, fontWeight: '700', color: '#0056A6', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#4E6E91' },
  activityItem: { marginBottom: 8 },
  activityText: { fontSize: 14, color: '#4E6E91' },
  activityDate: { fontSize: 12, color: '#6B7A99' },
});
