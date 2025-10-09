import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCredentials, saveCredentials, getDID } from "../utils/Storage";

export default function CredentialsScreen({ navigation }) {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const load = async () => {
      const did = await getDID();
      if (!did) return;
      const creds = await getCredentials(did);
      setCredentials(creds || []);
    };
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  const handlePress = (cred) => {
    navigation.navigate("CredentialDetail", { credential: cred });
  };

  const handleDelete = async (credId) => {
    const did = await getDID();
    if (!did) return;

    Alert.alert(
      "Excluir credencial",
      "Tem certeza que deseja excluir esta credencial? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const updated = credentials.filter((c) => c.id !== credId);
            setCredentials(updated);
            await saveCredentials(did, updated);
          },
        },
      ]
    );
  };

  const AnimatedCard = ({ cred }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start(() => handlePress(cred));
    };

    return (
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.cardHeader}>
            <Ionicons
              name={cred.icon || "document-text-outline"}
              size={26}
              color="#4E90FF"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.cardTitle}>{cred.title}</Text>
            <View style={styles.securityBadge}>
              <MaterialCommunityIcons name="shield-check" size={16} color="#fff" />
            </View>
          </View>

          <Text style={styles.cardDescription}>
            {cred.description || cred.fields?.nome || "Sem descrição"}
          </Text>

          <View style={styles.cardFooter}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.cardAction}>Acessar</Text>
              <Ionicons name="chevron-forward" size={20} color="#4E90FF" />
            </View>

            {/* Botão de deletar */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(cred.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Suas credenciais</Text>
        <Text style={styles.subtitle}>
          Tudo o que importa, guardado com segurança premium
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.cardsWrapper}
        showsVerticalScrollIndicator={false}
      >
        {credentials.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#666" }}>
            Nenhuma credencial cadastrada ainda. Escaneie um QR para começar.
          </Text>
        ) : (
          credentials
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // mais novos primeiro
            .map((cred, index) => (
              <AnimatedCard key={`${cred.id}-${index}`} cred={cred} />
            ))
        )}
      </ScrollView>
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
  cardsWrapper: { paddingHorizontal: 24, paddingBottom: 30, gap: 18 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#4E90FF", flex: 1 },
  securityBadge: { backgroundColor: "#4E90FF", borderRadius: 10, padding: 4 },
  cardDescription: { fontSize: 14, color: "#666", marginBottom: 18 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardAction: { fontSize: 14, fontWeight: "600", color: "#4E90FF", marginRight: 6 },
  deleteButton: {
    backgroundColor: "#FF4E4E",
    padding: 8,
    borderRadius: 12,
  },
});
