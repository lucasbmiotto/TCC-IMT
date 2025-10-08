import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getCredentials } from "../utils/storage";

export default function ShareScreen({ navigation }) {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const load = async () => {
      const creds = await getCredentials();
      setCredentials(creds);
    };
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Compartilhar Documento</Text>
      {credentials.length === 0 ? (
        <Text style={styles.empty}>Nenhuma credencial cadastrada.</Text>
      ) : (
        credentials.map((cred) => (
          <TouchableOpacity
            key={cred.id}
            style={styles.card}
            onPress={() => navigation.navigate("CredentialDetail", { credential: cred })}
          >
            <Text style={styles.cardTitle}>{cred.title}</Text>
            <Text style={styles.cardType}>Tipo: {cred.type.toUpperCase()}</Text>
            <Text style={styles.cardDate}>Criado em: {new Date(cred.createdAt).toLocaleString()}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC", padding: 24 },
  title: { fontSize: 26, fontWeight: "800", color: "#4E90FF", marginBottom: 18 },
  empty: { textAlign: "center", color: "#666", marginTop: 40 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#4E90FF" },
  cardType: { fontSize: 14, color: "#555", marginTop: 4 },
  cardDate: { fontSize: 12, color: "#888", marginTop: 2 },
});