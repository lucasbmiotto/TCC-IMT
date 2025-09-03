import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TermsOfUseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="document-text-outline" size={50} color="#4E90FF" />
        <Text style={styles.title}>Termos de Uso</Text>
        <Text style={styles.subtitle}>
          Leia atentamente nossos termos para entender como utilizamos e protegemos suas informações.
        </Text>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>
          1. O Keyless é um aplicativo de identidade digital que prioriza sua privacidade e segurança.{"\n\n"}
          2. Nenhum dado sensível é compartilhado sem sua permissão explícita.{"\n\n"}
          3. Você é responsável por manter o backup da sua carteira digital.{"\n\n"}
          4. O Keyless não se responsabiliza por perdas causadas por negligência do usuário.{"\n\n"}
          5. Ao usar o aplicativo, você concorda com nossas práticas de segurança e privacidade.{"\n\n"}
          Para mais detalhes, visite nossa página oficial.
        </Text>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
          <Text style={styles.backText}>Voltar</Text>
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
  content: { paddingHorizontal: 20, marginTop: 20 },
  text: { fontSize: 14, color: '#444', lineHeight: 22, marginBottom: 30 },
  backButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4E90FF', padding: 14, borderRadius: 12 },
  backText: { color: '#FFF', fontWeight: '600', marginLeft: 8 },
});
