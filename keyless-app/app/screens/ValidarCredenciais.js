import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

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
    setScanned(true);
    setQrData(data);

    // Feedback premium com alert e retorno automático
    Alert.alert("QR Code detectado", "Seus dados foram lidos com sucesso ✅");
    setTimeout(() => {
      navigation.navigate("Home"); // volta para a tela principal
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Título premium */}
      <Text style={styles.title}>Escaneie sua credencial</Text>
      <Text style={styles.subtitle}>Aponte a câmera para o QR Code da credencial que deseja validar</Text>

      {/* Scanner centralizado */}
      <View style={styles.cameraWrapper}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <View style={styles.qrFrame} />
      </View>

      {/* Resultado */}
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
  container: {
    flex: 1,
    backgroundColor: "#EAF2FB",
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },

  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loading: { color: "#0056A6", fontSize: 16 },
  permissionText: { color: "#0056A6", fontSize: 16, marginBottom: 16, textAlign: "center" },
  permissionButton: {
    backgroundColor: "#4E90FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  permissionButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#4E90FF",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7A99",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 22,
  },

  cameraWrapper: {
    width: width * 0.75,
    aspectRatio: 1,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#4E90FF",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    marginBottom: 40,
  },
  camera: { flex: 1 },
  qrFrame: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 28,
  },

  resultBox: {
    width: "85%",
    alignItems: "center",
    backgroundColor: "#D9E9FA",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  instruction: {
    color: "#0F4C81",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },

  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4E90FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  scanButtonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "700",
  },
});
