import localforage from 'localforage';
import CryptoJS from 'crypto-js';

const TOKEN_KEY="session-token"
const SECRET_KEY = ""

// Encrypt token string
function encrypt(token: string): string {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
}

// Decrypt token string
function decrypt(encryptedToken: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    return null;
  }
}

// Save token (encrypted) to IndexedDB/localForage
export const saveToken = async (token: string): Promise<void> => {
  const encryptedToken = encrypt(token);
  await localforage.setItem(TOKEN_KEY, encryptedToken);
};

// Get token and decrypt it
export const getToken = async (): Promise<string | null> => {
  const encryptedToken = await localforage.getItem<string>(TOKEN_KEY);
  if (!encryptedToken) return null;
  return decrypt(encryptedToken);
};

// Delete token from storage
export const deleteToken = async (): Promise<void> => {
  await localforage.removeItem(TOKEN_KEY);
};
