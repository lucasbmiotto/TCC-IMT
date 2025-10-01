import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('keyless.db');

export function initDB() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        fields TEXT,
        timestamp INTEGER
      );`
    );
  });
}

export function saveQRCodeData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const { credentialTitle, fields, timestamp } = data;

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO credentials (title, fields, timestamp) VALUES (?, ?, ?);',
        [credentialTitle, JSON.stringify(fields), timestamp || Date.now()]
      );
    });
  } catch (err) {
    console.error('Erro ao salvar QRCode no SQLite:', err);
  }
}

export function getAllCredentials(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM credentials;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.error(error)
    );
  });
}