import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';
import { handleUpdate } from './handleUpdate';
import * as Keychain from 'react-native-keychain';

export async function handleLogin(email, password, navigation, setUser) {

  if (!email || !password) {
    Alert.alert('Please fill in all fields');
  } else {
    try {
      const response = await fetch(`${EXPO_PUBLIC_ACCOUNT_IP_URL}/get/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email, 
          password: password })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.loginSuccess) {
          const userThis = data.user;
          const updateSuccess = await handleUpdate(email);
          if (!updateSuccess) {
            Alert.alert('Login failed. Please try again.');
            return;
          }
          await Keychain.setGenericPassword('session_id', data.session_id);
          setUser(userThis);
          navigation.navigate('Homepage');
        } else {
          Alert.alert('Login failed');
        }
      } else {
        const responseText = await response.text();
        Alert.alert('Login failed');
      }
      

    } catch (error) {
      console.log('Error:', error);
    }
  }

}

