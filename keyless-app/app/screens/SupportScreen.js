import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen({ navigation }) {
  const openEmail = () => {
    Linking.openURL('mailto:support@keyless.app?subject=Suporte%20Keyless');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="help-circle-outline" size={50} color="#4E90FF" />
        <Text style={styles.title}>Suporte</Text>
        <Text style={styles.subtitle}>
          Precisa de ajuda? Estamos aqui para garantir sua segurança e tranquilidade.
        </Text>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.option} onPress={openEmail}>
          <Ionicons name="mail-outline" size={24} color="#4E90FF" />
          <Text style={styles.optionText}>support@keyless.app</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('LocalHelp')}
            >
            <Ionicons name="globe-outline" size={24} color="#4E90FF" />
        <Text style={styles.optionText}>Central de Ajuda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FF5C5C" />
          <Text style={[styles.optionText, { color: '#FF5C5C' }]}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  header: { alignItems: 'center', paddingTop: 100, paddingBottom: 20, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#4E90FF', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#777', marginTop: 6, textAlign: 'center' },
  content: { paddingHorizontal: 20, marginTop: 20, gap: 20 },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12, elevation: 2 },
  optionText: { marginLeft: 12, fontSize: 16, color: '#333', fontWeight: '500' },
});
