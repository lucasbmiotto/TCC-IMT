import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas no storage
const PASSWORD_KEY = '@keyless_password';
const SEED_KEY = '@keyless_seed';
const DID_KEY = '@keyless_did';
const CREDENTIALS_KEY_PREFIX = '@keyless_credentials_';

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
// Credenciais por DID
// ----------------------
const getCredentialsKey = (did) => `${CREDENTIALS_KEY_PREFIX}${did}`;

export const saveCredential = async (did, credential) => {
  try {
    const key = getCredentialsKey(did);
    const stored = await AsyncStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];
    parsed.push(credential);
    await AsyncStorage.setItem(key, JSON.stringify(parsed));
  } catch (e) {
    console.error('Erro ao salvar credencial:', e);
  }
};

export const getCredentials = async (did) => {
  try {
    const key = getCredentialsKey(did);
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Erro ao carregar credenciais:', e);
    return [];
  }
};

export const saveCredentials = async (did, credentials) => {
  try {
    const key = getCredentialsKey(did);
    await AsyncStorage.setItem(key, JSON.stringify(credentials));
  } catch (e) {
    console.error('Erro ao sobrescrever credenciais:', e);
  }
};

export const clearCredentials = async (did) => {
  const key = getCredentialsKey(did);
  await AsyncStorage.removeItem(key);
};

// ----------------------
// Reset geral
// ----------------------
export const clearStorage = async () => {
  const did = await getDID();
  const keys = [PASSWORD_KEY, SEED_KEY, DID_KEY];
  if (did) keys.push(getCredentialsKey(did));
  await AsyncStorage.multiRemove(keys);
};

export const getAllCredentials = async () => {
  const did = await getDID();
  if (!did) return [];
  return await getCredentials(did);
};

export const getSeedPhrase = async () => {
  return await getSeed();
};
