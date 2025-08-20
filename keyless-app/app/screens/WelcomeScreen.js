import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { saveDID } from '../utils/Storage';

export default function WelcomeScreen({ navigation, route }) {
  const { seed } = route.params;

  const fakeDID = `did:key:${Math.random().toString(36).substring(2, 12)}`;

  useEffect(() => {
    saveDID(fakeDID);

    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo!</Text>
      <Text style={styles.did}>DID: {fakeDID}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 20 },
  did: { fontSize: 16, color: 'gray' },
});
