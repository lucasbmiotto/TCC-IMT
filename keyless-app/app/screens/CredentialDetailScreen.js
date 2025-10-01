import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CredentialDetailScreen({ route, navigation }) {
  // Agora recebemos a credencial inteira, não só o ID
  const { credential } = route.params;

  // Se o QR Code trouxe dados extras, usamos eles como campos
  const fields = credential.data
    ? Object.keys(credential.data).filter((k) => k !== "id" && k !== "title" && k !== "description")
    : [];

  const [selectedFields, setSelectedFields] = useState([]);
  const [animations] = useState(fields.map(() => new Animated.Value(0)));

  const toggleField = (index) => {
    if (selectedFields.includes(index)) {
      setSelectedFields(selectedFields.filter((i) => i !== index));
    } else {
      setSelectedFields([...selectedFields, index]);
    }
  };

  const selectAll = () => {
    if (selectedFields.length === fields.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields(fields.map((_, i) => i));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>{credential.title}</Text>
      <Text style={styles.subtitle}>{credential.description}</Text>

      {fields.length > 0 && (
        <TouchableOpacity style={styles.selectAllButton} onPress={selectAll}>
          <Text style={styles.selectAllText}>
            {selectedFields.length === fields.length ? "Desmarcar tudo" : "Selecionar tudo"}
          </Text>
        </TouchableOpacity>
      )}

      {fields.length === 0 ? (
        <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
          Nenhum campo extra disponível nesta credencial.
        </Text>
      ) : (
        fields.map((field, index) => {
          const isSelected = selectedFields.includes(index);
          return (
            <TouchableOpacity key={index} onPress={() => toggleField(index)} activeOpacity={0.8}>
              <Animated.View
                style={[
                  styles.fieldCard,
                  {
                    borderColor: isSelected ? "#4E90FF" : "#FFF",
                    borderWidth: isSelected ? 2 : 0,
                  },
                ]}
              >
                <Text style={styles.fieldLabel}>
                  {field}: {credential.data[field]}
                </Text>
                {isSelected && <Ionicons name="checkmark-circle" size={24} color="#4E90FF" />}
              </Animated.View>
            </TouchableOpacity>
          );
        })
      )}

      <TouchableOpacity
        style={[styles.shareButton, { opacity: selectedFields.length === 0 ? 0.5 : 1 }]}
        disabled={selectedFields.length === 0}
        onPress={() =>
          navigation.navigate("ShareQRCode", {
            credential: {
              title: credential.title,
              fields: selectedFields.map((i) => ({
                name: fields[i],
                value: credential.data[fields[i]],
              })),
            },
          })
        }
      >
        <Text style={styles.shareButtonText}>
          Compartilhar {selectedFields.length} campo(s)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF2FB" },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#4E90FF",
    marginTop: 40,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: { fontSize: 14, color: "#6B7A99", marginBottom: 20, textAlign: "center" },
  selectAllButton: { alignSelf: "center", marginBottom: 20 },
  selectAllText: { color: "#4E90FF", fontWeight: "700", fontSize: 14 },
  fieldCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 22,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  fieldLabel: { fontSize: 16, fontWeight: "600", color: "#0F4C81" },
  shareButton: {
    marginTop: 20,
    backgroundColor: "#4E90FF",
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  shareButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
