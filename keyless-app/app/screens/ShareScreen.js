import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShareScreen({ navigation }) {
  const handleShare = (type) => {
    navigation.navigate("CredentialDetail", { type });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Compartilhar documento</Text>
        <Text style={styles.subtitle}>
          Escolha o tipo de documento que deseja compartilhar
        </Text>
      </View>
      <View style={styles.cardsWrapper}>
        <TouchableOpacity style={styles.card} onPress={() => handleShare("RG")}>
          <View style={styles.cardHeader}>
            <Ionicons name="id-card-outline" size={26} color="#4E90FF" style={{ marginRight: 10 }} />
            <Text style={styles.cardTitle}>RG</Text>
            <View style={styles.securityBadge}>
              <MaterialCommunityIcons name="shield-check" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.cardDescription}>Registro Geral</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleShare("CNH")}>
          <View style={styles.cardHeader}>
            <Ionicons name="car-outline" size={26} color="#4E90FF" style={{ marginRight: 10 }} />
            <Text style={styles.cardTitle}>CNH</Text>
            <View style={styles.securityBadge}>
              <MaterialCommunityIcons name="shield-check" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.cardDescription}>Carteira Nacional de Habilitação</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F9FC" },
  header: { paddingHorizontal: 24, marginBottom: 16 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#4E90FF",
    marginTop: 10,
    marginBottom: 6,
  },
  subtitle: { fontSize: 15, textAlign: "center", color: "#555", marginBottom: 20 },
  cardsWrapper: { paddingHorizontal: 24, gap: 18 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#4E90FF", flex: 1 },
  securityBadge: { backgroundColor: "#4E90FF", borderRadius: 10, padding: 4 },
  cardDescription: { fontSize: 14, color: "#666" },
});