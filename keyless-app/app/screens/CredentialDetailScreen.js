import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const RG_FIELDS = {
  nome: "João da Silva",
  rg: "123456789",
  cpf: "000.000.000-00",
  data_nascimento: "01/01/1990",
  naturalidade: "São Paulo",
};

const CNH_FIELDS = {
  nome: "João da Silva",
  cnh: "987654321",
  cpf: "000.000.000-00",
  validade: "31/12/2028",
  categoria: "B",
};

export default function CredentialDetailScreen({ route, navigation }) {
  const { type } = route.params;
  const fields = type === "RG" ? RG_FIELDS : CNH_FIELDS;
  const [selectedFields, setSelectedFields] = useState([]);

  const toggleField = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const handleShare = () => {
    const sharedFields = selectedFields.map((field) => ({
      name: field,
      value: fields[field],
    }));
    navigation.navigate("ShareQRCode", {
      credential: {
        type,
        sharedFields,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione os dados para compartilhar ({type})</Text>
      <ScrollView style={styles.fieldsList}>
        {Object.keys(fields).map((field) => (
          <TouchableOpacity
            key={field}
            style={[
              styles.fieldItem,
              selectedFields.includes(field) && styles.fieldItemSelected,
            ]}
            onPress={() => toggleField(field)}
          >
            <Text style={styles.fieldName}>{field}</Text>
            <Text style={styles.fieldValue}>{fields[field]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.shareButton,
          selectedFields.length === 0 && { opacity: 0.5 },
        ]}
        disabled={selectedFields.length === 0}
        onPress={handleShare}
      >
        <Text style={styles.shareButtonText}>Gerar QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC", padding: 24 },
  title: { fontSize: 22, fontWeight: "700", color: "#4E90FF", marginBottom: 18 },
  fieldsList: { marginBottom: 24 },
  fieldItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e7ef",
  },
  fieldItemSelected: {
    borderColor: "#4E90FF",
    backgroundColor: "#EAF2FB",
  },
  fieldName: { fontWeight: "700", color: "#4E90FF", marginBottom: 4 },
  fieldValue: { color: "#333" },
  shareButton: {
    backgroundColor: "#4E90FF",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  shareButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});