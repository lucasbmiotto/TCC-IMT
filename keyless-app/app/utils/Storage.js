import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas no storage
const PASSWORD_KEY = '@keyless_password';
const SEED_KEY = '@keyless_seed';
const DID_KEY = '@keyless_did';
const CREDENTIALS_KEY = '@keyless_credentials';

// ----------------------
// Senha / Seed / DID
// ----------------------
export const savePassword = async (password) => {
  await AsyncStorage.setItem(PASSWORD_KEY, password);
};

export const saveSeed = async (seed) => {
  await AsyncStorage.setItem(SEED_KEY, seed);
};

export const saveDID = async (did) => {
  await AsyncStorage.setItem(DID_KEY, did);
};

export const getPassword = async () => {
  return await AsyncStorage.getItem(PASSWORD_KEY);
};

export const getSeed = async () => {
  return await AsyncStorage.getItem(SEED_KEY);
};

export const getDID = async () => {
  return await AsyncStorage.getItem(DID_KEY);
};

// ----------------------
// Credenciais
// ----------------------
export const saveCredential = async (credential) => {
  try {
    const stored = await AsyncStorage.getItem(CREDENTIALS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    parsed.push(credential);
    await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.error('Erro ao salvar credencial:', e);
  }
};

export const getCredentials = async () => {
  try {
    const stored = await AsyncStorage.getItem(CREDENTIALS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Erro ao carregar credenciais:', e);
    return [];
  }
};

export const clearCredentials = async () => {
  await AsyncStorage.removeItem(CREDENTIALS_KEY);
};

// ----------------------
// Reset geral
// ----------------------
export const clearStorage = async () => {
  await AsyncStorage.multiRemove([PASSWORD_KEY, SEED_KEY, DID_KEY, CREDENTIALS_KEY]);
};
