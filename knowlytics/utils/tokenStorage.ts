
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const isWeb = Platform.OS === 'web';

export const saveToken = async (token: string) => {
  if (isWeb) {
    localStorage.setItem('user_token', token);
  } else {
    await SecureStore.setItemAsync('user_token', token);
  }
};

export const getToken = async (): Promise<string | null> => {
  if (isWeb) {
    return localStorage.getItem('user_token');
  } else {
    return await SecureStore.getItemAsync('user_token');
  }
};

export const deleteToken = async () => {
  if (isWeb) {
    localStorage.removeItem('user_token');
  } else {
    await SecureStore.deleteItemAsync('user_token');
  }
};

