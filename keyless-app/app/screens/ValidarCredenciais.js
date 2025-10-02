import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { saveCredential } from "../utils/storage";

const { width } = Dimensions.get("window");

export default function QRCodeScanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loading}>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>
          Precisamos da sua permissão para acessar a câmera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Dar permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    setQrData(data);

    try {
      const parsed = JSON.parse(data); // QR deve conter JSON
      const newCredential = {
        id: parsed.id || Date.now().toString(),
        title: parsed.title || "Credencial",
        description: parsed.description || "Sem descrição",
        data: parsed,
      };
      saveCredential(newCredential);

      Alert.alert("QR Code detectado", "Credencial adicionada com sucesso ✅", [
        { text: "OK", onPress: () => navigation.replace("Credentials") },
      ]);
    } catch (e) {
      Alert.alert("Erro", "QR Code inválido ou formato inesperado.");
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escaneie sua credencial</Text>
      <Text style={styles.subtitle}>
        Aponte a câmera para o QR Code da credencial que deseja validar
      </Text>

      <View style={styles.cameraWrapper}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <View style={styles.qrFrame} />
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.instruction}>
          {qrData ? `QR Code detectado:\n${qrData}` : "Aponte a câmera para o QR Code"}
        </Text>

        {scanned && (
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setScanned(false)}
          >
            <Ionicons name="scan-outline" size={18} color="#FFF" />
            <Text style={styles.scanButtonText}>Escanear novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF2FB", alignItems: "center", padding: 20, justifyContent: "center" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loading: { color: "#0056A6", fontSize: 16 },
  permissionText: { color: "#0056A6", fontSize: 16, marginBottom: 16, textAlign: "center" },
  permissionButton: { backgroundColor: "#4E90FF", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 14 },
  permissionButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  title: { fontSize: 28, fontWeight: "800", color: "#4E90FF", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#6B7A99", marginBottom: 30, textAlign: "center", lineHeight: 22 },
  cameraWrapper: { width: width * 0.75, aspectRatio: 1, borderRadius: 28, overflow: "hidden", borderWidth: 3, borderColor: "#4E90FF", marginBottom: 40 },
  camera: { flex: 1 },
  qrFrame: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 4, borderColor: "rgba(255,255,255,0.6)", borderRadius: 28 },
  resultBox: { width: "85%", alignItems: "center", backgroundColor: "#D9E9FA", borderRadius: 20, padding: 24 },
  instruction: { color: "#0F4C81", fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  scanButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#4E90FF", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 24 },
  scanButtonText: { color: "#FFF", fontSize: 16, marginLeft: 10, fontWeight: "700" },
});
