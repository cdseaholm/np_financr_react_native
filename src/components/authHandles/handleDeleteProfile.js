import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import fetch from 'node-fetch';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import { useNavigation } from '@react-navigation/native';


export async function handleDeleteProfile(email) {
  const navigation = useNavigation();
    try {
      const response = await fetch(`${EXPO_PUBLIC_ACCOUNT_IP_URL}/delete/${email}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
      if (response.ok) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Deleting Profile failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  };