import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CredentialDetail({ route, navigation }) {
  const { credential } = route.params;

  // Estado para controlar quais campos o usuário quer compartilhar
  const [selectedFields, setSelectedFields] = useState({});

  const toggleField = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const fields = [
    { label: "Nome", value: credential.fields?.nome, key: "nome" },
    { label: "CPF", value: credential.fields?.cpf, key: "cpf" },
    { label: "Registro", value: credential.fields?.numeroRegistro, key: "numeroRegistro" },
    { label: "Data de Expedição", value: credential.fields?.dataExpedicao, key: "dataExpedicao" },
    { label: "Data de Nascimento", value: credential.fields?.dataNascimento, key: "dataNascimento" },
    { label: "Naturalidade", value: credential.fields?.naturalidade, key: "naturalidade" },
    { label: "Filiação", value: credential.fields?.filiacao, key: "filiacao" },
    { label: "Categoria (CNH)", value: credential.fields?.categoria, key: "categoria" },
    { label: "Validade", value: credential.fields?.validade, key: "validade" },
    { label: "Nacionalidade", value: credential.fields?.validade, key: "nacionalidade" },
  ].filter((f) => f.value); // só mostra se tiver valor

  // Gera lista dos campos selecionados
  const selectedFieldsList = fields
    .filter((field) => selectedFields[field.key])
    .map((field) => ({ name: field.key, value: field.value }));

  const handleShare = () => {
    navigation.navigate("ShareQRCode", {
      credential,
      selectedFields: selectedFieldsList,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="id-card-outline" size={40} color="#4E90FF" />
        <Text style={styles.title}>{credential.title}</Text>
        <Text style={styles.subtitle}>
          Escolha quais informações deseja compartilhar
        </Text>
      </View>

      {/* Dados principais com switches */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados do Documento</Text>
        {fields.map((field) => (
          <View key={field.key} style={styles.detailRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>{field.label}:</Text>
              <Text style={styles.value}>{field.value}</Text>
            </View>
            <Switch
              value={!!selectedFields[field.key]}
              onValueChange={() => toggleField(field.key)}
              trackColor={{ false: "#ccc", true: "#4E90FF" }}
              thumbColor={selectedFields[field.key] ? "#FFF" : "#f4f3f4"}
            />
          </View>
        ))}
      </View>

      {/* Botão compartilhar */}
      <TouchableOpacity
        style={[
          styles.shareButton,
          selectedFieldsList.length === 0 && { opacity: 0.5 },
        ]}
        disabled={selectedFieldsList.length === 0}
        onPress={handleShare}
      >
        <Ionicons name="share-social-outline" size={20} color="#FFF" />
        <Text style={styles.shareButtonText}>Compartilhar Selecionados</Text>
      </TouchableOpacity>

      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#FFF" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#EAF2FB",
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "800", color: "#4E90FF", marginTop: 8 },
  subtitle: { fontSize: 14, color: "#555", marginTop: 4, textAlign: "center", paddingHorizontal: 20 },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F4C81",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: { fontWeight: "600", color: "#333" },
  value: { color: "#555", marginTop: 2 },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4E90FF",
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
  },
  shareButtonText: { color: "#FFF", fontWeight: "700", marginLeft: 8 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4E90FF",
    margin: 20,
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
  },
  backButtonText: { color: "#FFF", fontWeight: "700", marginLeft: 8 },
});