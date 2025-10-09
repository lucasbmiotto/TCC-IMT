import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function LeituraCredenciais({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [scanned, setScanned] = useState(false);

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
    try {
      const parsed = JSON.parse(data);
      setScannedData(parsed);
    } catch (e) {
      Alert.alert("Erro", "QR Code inválido ou formato inesperado.");
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validar QR Code Compartilhado</Text>
      <Text style={styles.subtitle}>
        Escaneie o QR Code compartilhado para visualizar os dados do documento
      </Text>

      {!scanned && (
        <View style={styles.cameraWrapper}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
          />
          <View style={styles.qrFrame} />
        </View>
      )}

      {scanned && (
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            setScanned(false);
            setScannedData(null);
          }}
        >
          <Ionicons name="scan-outline" size={18} color="#FFF" />
          <Text style={styles.scanButtonText}>Escanear novamente</Text>
        </TouchableOpacity>
      )}

      {scannedData && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Dados Compartilhados:</Text>
          <Text><Text style={styles.label}>Tipo:</Text> {scannedData.type || scannedData.title}</Text>
          <Text><Text style={styles.label}>Timestamp:</Text> {scannedData.timestamp ? new Date(scannedData.timestamp).toLocaleString() : "-"}</Text>

          <Text style={[styles.label, { marginTop: 8 }]}>Campos:</Text>
          {Array.isArray(scannedData.sharedFields) && scannedData.sharedFields.length > 0 ? (
            scannedData.sharedFields.map((field) => (
              <Text key={field.name} style={{ marginTop: 6 }}>
                <Text style={styles.fieldName}>{field.name}:</Text> {field.value}
              </Text>
            ))
          ) : (
            <Text>Nenhum campo compartilhado.</Text>
          )}

          {/* mostra o hash top-level se presente */}
          {scannedData.onChainHash && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.label}>Hash da Prova:</Text>
              <Text selectable style={{ color: "#333", marginTop: 4 }}>{scannedData.onChainHash}</Text>
            </View>
          )}
        </View>
      )}
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
  scanButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#4E90FF", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 24, marginBottom: 16 },
  scanButtonText: { color: "#FFF", fontSize: 16, marginLeft: 10, fontWeight: "700" },
  resultBox: { backgroundColor: "#fff", borderRadius: 16, padding: 18, marginTop: 18, width: "100%", shadowColor: "#000", shadowOpacity: 0.07, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 4 },
  resultTitle: { fontWeight: "700", fontSize: 16, marginBottom: 8, color: "#4E90FF" },
  label: { fontWeight: "700", color: "#4E90FF" },
  fieldName: { fontWeight: "600", color: "#0F4C81" },
});