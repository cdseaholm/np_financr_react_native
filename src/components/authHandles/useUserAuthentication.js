import { useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import { Alert } from 'react-native';

export const useUserAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const retrieveSession = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        const session_id = credentials ? credentials.password : null;
        if (session_id !== null) {
          authenticateUser(session_id);
        }
      } catch (error) {
        if (!error.message.includes("Cannot read property 'getGenericPasswordForOptions' of null")) {
          Alert.alert('Keychain error');
        }
      }
    };
    retrieveSession();
  }, []);

  async function authenticateUser(session_id) {
    try {
      const response = await fetch(`${EXPO_PUBLIC_ACCOUNT_IP_URL}/authenticate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: session_id })
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        Alert.alert('Response Error');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  };
  return [user, setUser];
};