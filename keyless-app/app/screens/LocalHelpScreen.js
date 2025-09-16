import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LocalHelpScreen() {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={require('../assets/help/index.html')}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
