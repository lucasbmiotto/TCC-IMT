import React, { useRef } from "react";
import { 
  View, 
  Text, 
  TouchableWithoutFeedback, 
  StyleSheet, 
  ScrollView, 
  Animated 
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CredentialsScreen({ navigation }) {
  const credentials = [
    { id: "cnh", title: "CNH", description: "Carteira Nacional de Habilitação", icon: "car" },
    { id: "rg", title: "RG", description: "Documento de identidade", icon: "id-card" },
    { id: "certificados", title: "Certificados", description: "Cursos e conquistas pessoais", icon: "school" },
    { id: "passaporte", title: "Passaporte", description: "Documento para viagens internacionais", icon: "airplane" },
    { id: "titulo_eleitor", title: "Título de Eleitor", description: "Registro eleitoral digital", icon: "ballot" },
    { id: "cpf", title: "CPF", description: "Cadastro de Pessoa Física seguro", icon: "finger-print" },
    { id: "cartao_saude", title: "Cartão de Saúde", description: "Planos médicos e vacinas", icon: "medkit" },
    { id: "carteira_trabalho", title: "Carteira de Trabalho", description: "Histórico profissional", icon: "briefcase" },
    { id: "cartao_estudante", title: "Carteira Estudantil", description: "Identificação estudantil", icon: "school-outline" },
    { id: "pis", title: "PIS/PASEP", description: "Número de inscrição social", icon: "document-text" },
    { id: "residencia", title: "Comprovante de Residência", description: "Endereço atualizado", icon: "home" },
    { id: "transporte", title: "Cartão de Transporte", description: "Bilhete único e passes digitais", icon: "bus" },
  ];

  const handlePress = (id) => {
    navigation.navigate("CredentialDetail", { credentialId: id });
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
      }).start(() => handlePress(cred.id));
    };

    return (
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.cardHeader}>
            <Ionicons name={cred.icon} size={26} color="#4E90FF" style={{ marginRight: 10 }} />
            <Text style={styles.cardTitle}>{cred.title}</Text>
            <View style={styles.securityBadge}>
              <MaterialCommunityIcons name="shield-check" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.cardDescription}>{cred.description}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardAction}>Acessar</Text>
            <Ionicons name="chevron-forward" size={20} color="#4E90FF" />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Suas credenciais</Text>
        <Text style={styles.subtitle}>Tudo o que importa, guardado com segurança premium</Text>
      </View>

      {/* Cards */}
      <ScrollView contentContainerStyle={styles.cardsWrapper} showsVerticalScrollIndicator={false}>
        {credentials.map((cred) => (
          <AnimatedCard key={cred.id} cred={cred} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#4E90FF",
    marginTop: 10,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  cardsWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    gap: 18,
  },
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4E90FF",
    flex: 1,
  },
  securityBadge: {
    backgroundColor: "#4E90FF",
    borderRadius: 10,
    padding: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 18,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cardAction: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4E90FF",
    marginRight: 6,
  },
});
