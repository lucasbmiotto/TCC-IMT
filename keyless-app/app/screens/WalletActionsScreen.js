import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WalletActionsScreen({ navigation }) {
  
  const cardWidth = width * 0.85; 
  const cardPadding = 20; 
  const iconSize = 26; 

  const ActionCard = ({ title, icon, color, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
    const onPressOut = () => {
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start(() => onPress());
    };

    const textColor = color === '#FFF' ? '#4E90FF' : '#fff';
    const iconColor = color === '#FFF' ? '#4E90FF' : '#fff';

    return (
      <TouchableOpacity activeOpacity={1} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: color, width: cardWidth, paddingVertical: cardPadding, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Ionicons name={icon} size={iconSize} color={iconColor} style={{ marginBottom: 8 }} />
          <Text style={[styles.cardText, { color: textColor }]}>{title}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.subtitle}>Gerencie sua carteira de forma segura e elegante</Text>
      </View>

      {/* Botões estáticos centralizados */}
      <View style={styles.centerContainer}>
        <ActionCard
          title="Backup da Carteira"
          icon="cloud-upload-outline"
          color="#4E90FF"
          onPress={() => navigation.navigate('WalletBackup')}
        />
        <ActionCard
          title="Suporte"
          icon="help-circle-outline"
          color="#FFF"
          onPress={() => navigation.navigate('Support')}
        />
        <ActionCard
          title="Termos de Uso"
          icon="document-text-outline"
          color="#FFF"
          onPress={() => navigation.navigate('TermsOfUse')}
        />
        <ActionCard
          title="Excluir Carteira"
          icon="trash-outline"
          color="#FF5C5C"
          onPress={() => navigation.navigate('DeleteScreen')}
        />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Keyless © 2025</Text>
        <Text style={styles.footerText}>Versão 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    paddingTop: 100, // espaço maior para Dynamic Island
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32, // título maior
    fontWeight: '800',
    color: '#4E90FF',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
    textAlign: 'center',
  },
  centerContainer: {
    position: 'absolute',
    top: height / 4, // botões mais para cima
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  card: {
    borderRadius: 16,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#AAA',
  },
});
