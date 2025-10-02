import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCredentials } from "../utils/storage";

export default function CredentialsScreen({ navigation }) {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const load = async () => {
      const creds = await getCredentials();
      setCredentials(creds);
    };
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  const handlePress = (cred) => {
    navigation.navigate("CredentialDetail", { credential: cred });
  };

  const handleShare = (cred) => {
    navigation.navigate("ShareCredential", { credential: cred });
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
          <Text style={styles.cardDescription}>{cred.description}</Text>

          <View style={styles.cardFooter}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare(cred)}
            >
              <Ionicons name="qr-code-outline" size={18} color="#FFF" />
              <Text style={styles.shareButtonText}>Compartilhar</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.cardAction}>Acessar</Text>
              <Ionicons name="chevron-forward" size={20} color="#4E90FF" />
            </View>
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

      <ScrollView contentContainerStyle={styles.cardsWrapper} showsVerticalScrollIndicator={false}>
        {credentials.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#666" }}>
            Nenhuma credencial cadastrada ainda. Escaneie um QR para começar.
          </Text>
        ) : (
          credentials.map((cred) => <AnimatedCard key={cred.id} cred={cred} />)
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
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardAction: { fontSize: 14, fontWeight: "600", color: "#4E90FF", marginRight: 6 },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4E90FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  shareButtonText: { color: "#FFF", fontSize: 13, fontWeight: "600", marginLeft: 6 },
});
