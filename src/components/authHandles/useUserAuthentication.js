import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import { Alert } from 'react-native';


export const useUserAuthentication = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const retrieveSession = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        const session_id = credentials.password;
        if (session_id !== null) {
          authenticateUser(session_id)
            .then(user => {
              setUser(user);
              navigation.navigate('Homepage');
            })
            .catch(error => {
              console.log('Authentication error:', error);
              Alert.alert('Authentication error');
            });
        } else {
          navigation.navigate('Login');
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
        console.log('User:', data.user);
        return data.user;
      } else {
        Alert.alert('Response error');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  }
};