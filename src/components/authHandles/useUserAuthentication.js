import { useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import { Alert } from 'react-native';


export const useUserAuthentication = (navigation) => {
  const [user, setUser] = useState(null);

  if (user) {
    navigation.navigate('Homepage');
  } else {
    navigation.navigate('Login');
  }

  useEffect(() => {
    const retrieveSession = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        const session_id = credentials.password;
        if (session_id !== null) {
          authenticateUser(session_id);
        }
      } catch (error) {
        Alert.alert('Keychain error');
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
        navigation.navigate('Homepage');
      } else {
        Alert.alert('Response Error');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  };
  return [user, setUser];
};