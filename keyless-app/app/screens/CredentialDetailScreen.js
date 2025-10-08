import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";

export default function CredentialDetailScreen({ route, navigation }) {
  const { credential } = route.params;

  // Campos conforme DynamicFormFields
  const rgFields = [
    { label: "Nome Completo", key: "nome" },
    { label: "Registro Geral", key: "numero-registro" },
    { label: "Data de Expedição", key: "data-expedicao" },
    { label: "CPF", key: "cpf" },
    { label: "Data de Nascimento", key: "data-nascimento" },
    { label: "Filiação", key: "filiacao" },
    { label: "Naturalidade", key: "naturalidade" },
  ];
  const cnhFields = [
    { label: "Nome Completo", key: "nome" },
    { label: "CPF", key: "cpf" },
    { label: "Data de Nascimento", key: "data-nascimento" },
    { label: "Número de Registro", key: "numero-registro" },
    { label: "Nacionalidade", key: "nacionalidade" },
  ];

  const fields =
    credential.type === "rg"
      ? rgFields
      : credential.type === "cnh"
      ? cnhFields
      : [];

  const [selectedFields, setSelectedFields] = useState({});

  const toggleField = (key) => {
    setSelectedFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectedFieldsList = fields
    .filter((field) => selectedFields[field.key])
    .map((field) => ({
      name: field.key,
      value: credential.fields[field.key],
    }));

  const handleShare = () => {
    navigation.navigate("ShareQRCode", {
      credential,
      selectedFields: selectedFieldsList,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Selecione os dados para compartilhar</Text>
      {fields.map((field) =>
        credential.fields[field.key] ? (
          <View key={field.key} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>{field.label}:</Text>
              <Text style={styles.value}>{credential.fields[field.key]}</Text>
            </View>
            <Switch
              value={!!selectedFields[field.key]}
              onValueChange={() => toggleField(field.key)}
              trackColor={{ false: "#ccc", true: "#4E90FF" }}
              thumbColor={selectedFields[field.key] ? "#FFF" : "#f4f3f4"}
            />
          </View>
        ) : null
      )}
      <TouchableOpacity
        style={[
          styles.shareButton,
          selectedFieldsList.length === 0 && { opacity: 0.5 },
        ]}
        disabled={selectedFieldsList.length === 0}
        onPress={handleShare}
      >
        <Text style={styles.shareButtonText}>Gerar QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC", padding: 24 },
  title: { fontSize: 22, fontWeight: "700", color: "#4E90FF", marginBottom: 18 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e7ef",
  },
  label: { fontWeight: "700", color: "#4E90FF", marginBottom: 2 },
  value: { color: "#333" },
  shareButton: {
    backgroundColor: "#4E90FF",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 18,
  },
  shareButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  backButton: {
    backgroundColor: "#4E90FF",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 12,
  },
  backButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});