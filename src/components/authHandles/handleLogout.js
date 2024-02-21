import * as Keychain from 'react-native-keychain';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';
import { Alert } from 'react-native';

export async function handleLogout(session_id) {
    const response = await fetch(`${EXPO_PUBLIC_ACCOUNT_IP_URL}/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ session_id: session_id })
    });
    if (response.ok) {
      await Keychain.resetGenericPassword();
    } else {
      Alert.alert('Logout failed');
    }
}