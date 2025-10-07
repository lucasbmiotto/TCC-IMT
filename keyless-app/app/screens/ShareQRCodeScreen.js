import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ShareQRCodeScreen({ route }) {
  const { credential, selectedFields } = route.params;
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    const qrData = {
      id: credential.id,
      type: credential.type,
      title: credential.title,
      sharedFields: selectedFields,
      timestamp: Date.now(),
    };
    setQrValue(JSON.stringify(qrData));
  }, [credential, selectedFields]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code para Compartilhamento</Text>
      {qrValue !== "" && (
        <QRCode value={qrValue} size={250} color="#4E90FF" backgroundColor="#EAF2FB" />
      )}
      <Text style={styles.info}>
        Mostre este QR Code para compartilhar os dados selecionados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF2FB", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "800", color: "#4E90FF", marginBottom: 18, textAlign: "center" },
  info: { fontSize: 15, color: "#6B7A99", marginTop: 24, textAlign: "center" },
});