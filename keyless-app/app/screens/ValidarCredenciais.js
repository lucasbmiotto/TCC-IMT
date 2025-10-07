import React from "react";
import { View, Text, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { saveCredential, getDID } from "../utils/Storage";

export default function ValidarCredenciais({ navigation }) {
  const handleBarCodeScanned = async ({ data }) => {
    try {
      const parsed = JSON.parse(data);
      const did = await getDID();
      const docType = parsed.credential?.type || "rg";

      // RG fields
      const rgFields = {
        nome: parsed.credential?.fields?.nome || "",
        "numero-registro": parsed.credential?.fields?.["numero-registro"] || "",
        "data-expedicao": parsed.credential?.fields?.["data-expedicao"] || "",
        cpf: parsed.credential?.fields?.cpf || "",
        "data-nascimento": parsed.credential?.fields?.["data-nascimento"] || "",
        filiacao: parsed.credential?.fields?.filiacao || "",
        naturalidade: parsed.credential?.fields?.naturalidade || "",
      };

      // CNH fields
      const cnhFields = {
        nome: parsed.credential?.fields?.nome || "",
        cpf: parsed.credential?.fields?.cpf || "",
        "data-nascimento": parsed.credential?.fields?.["data-nascimento"] || "",
        "numero-registro": parsed.credential?.fields?.["numero-registro"] || "",
        nacionalidade: parsed.credential?.fields?.nacionalidade || "",
      };

      const fields = docType === "rg" ? rgFields : docType === "cnh" ? cnhFields : {};

      const newCredential = {
        id: parsed.id?.toString() || Date.now().toString(),
        type: docType,
        title: docType.toUpperCase(),
        fields,
        createdAt: new Date().toISOString(),
      };

      await saveCredential(did, newCredential);
      Alert.alert("Sucesso", "Credencial salva!");
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Erro", "QR Code inválido.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      <Text style={{ textAlign: "center", margin: 12 }}>
        Escaneie o QR Code do documento
      </Text>
    </View>
  );
}