import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Clipboard,
  ToastAndroid,
  Platform,
} from 'react-native';
import { saveSeed } from '../utils/Storage';

const generateSeed = () => {
  const words = [];
  const wordlist = [
    'apple', 'car', 'blue', 'mountain', 'river', 'cloud',
    'wallet', 'secure', 'open', 'trust', 'key', 'light',
  ];
  for (let i = 0; i < 12; i++) {
    words.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
  }
  return words;
};

export default function SeedPhraseScreen({ navigation }) {
  const [seedWords, setSeedWords] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const generated = generateSeed();
    setSeedWords(generated);
    saveSeed(generated.join(' '));

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleContinue = () => {
    navigation.navigate('Welcome', { seed: seedWords.join(' ') });
  };

  const handleCopy = () => {
    const fullSeed = seedWords.join(' ');
    Clipboard.setString(fullSeed);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Seed copiada com sucesso', ToastAndroid.SHORT);
    } else {
      alert('Seed copiada com sucesso');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frase de Segurança</Text>

      <View style={styles.warningContainer}>
        <Text style={styles.warning}>
          Esta frase será exibida apenas uma vez. Guarde-a com segurança.
        </Text>
      </View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 24,
        }}
      >
        {seedWords.map((word, index) => (
          <View key={index} style={styles.wordCard}>
            <Text style={styles.wordIndex}>{index + 1}</Text>
            <Text style={styles.word}>{word}</Text>
          </View>
        ))}
      </Animated.View>

      <TouchableOpacity
        style={styles.copyButton}
        onPress={handleCopy}
        activeOpacity={0.85}
      >
        <Text style={styles.copyText}>Copiar para área de transferência</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const BLUE = '#007AFF';
const WARNING_BG = '#FFF3F3';
const WARNING_TEXT = '#D32F2F';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BLUE,
    textAlign: 'center',
    marginBottom: 16,
  },
  warningContainer: {
    backgroundColor: WARNING_BG,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  warning: {
    textAlign: 'center',
    color: WARNING_TEXT,
    fontSize: 15,
    fontWeight: '700',
  },
  wordCard: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    minWidth: 80,
    alignItems: 'center',
  },
  wordIndex: {
    fontSize: 12,
    fontWeight: '700',
    color: '#90A4AE',
    marginBottom: 4,
  },
  word: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  copyButton: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#E8F4FF',
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 24,
  },
  copyText: {
    color: BLUE,
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: BLUE,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
