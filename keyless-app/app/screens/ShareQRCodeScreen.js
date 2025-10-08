import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ShareQRCodeScreen({ route, navigation }) {
  const { credential, selectedFields = [] } = route.params || {};

  const [timer, setTimer] = useState(5 * 60); // 5 minutos em segundos
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (!credential) return;

    const qrData = {
      id: credential.id || null,
      type: credential.type || "",
      title: credential.title || "",
      sharedFields: selectedFields,
      timestamp: Date.now(),
    };

    setQrValue(JSON.stringify(qrData));

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          Alert.alert("QR Code expirado", "O QR Code expirou, gere novamente.");
          navigation.goBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [credential, selectedFields, navigation]);

  const handleScanned = () => {
    Alert.alert("Compartilhamento realizado", "Seus dados foram compartilhados com sucesso ✅");
    navigation.navigate("Home");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compartilhamento seguro</Text>
      <Text style={styles.subtitle}>QR Code válido por: {formatTime(timer)}</Text>

      {qrValue !== "" && (
        <QRCode
          value={qrValue}
          size={250}
          color="#4E90FF"
          backgroundColor="#EAF2FB"
        />
      )}

      <View style={styles.fieldsBox}>
        {selectedFields.map((field) => (
          <View key={field.name} style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>{field.name}:</Text>
            <Text style={styles.fieldValue}>{field.value}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={handleScanned}>
        <Text style={styles.scanButtonText}>Simular Escaneamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF2FB", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#4E90FF", marginBottom: 12, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#6B7A99", marginBottom: 24, textAlign: "center" },
  scanButton: {
    marginTop: 30,
    backgroundColor: "#4E90FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: "center"
  },
  scanButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  fieldsBox: { marginTop: 24, width: "100%" },
  fieldRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8, paddingHorizontal: 10 },
  fieldLabel: { fontWeight: "700", color: "#4E90FF" },
  fieldValue: { color: "#333" },
});