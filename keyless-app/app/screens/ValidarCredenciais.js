import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ExpoCamera from 'expo-camera';

export default function TesteCamera() {
  const [hasPermission, setHasPermission] = useState(null);

  const ativarCamera = async () => {
    const { status } = await ExpoCamera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Permissão ainda não concedida</Text>
        <Button title="Ativar Câmera" onPress={ativarCamera} />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>Sem permissão de câmera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ExpoCamera.Camera style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
