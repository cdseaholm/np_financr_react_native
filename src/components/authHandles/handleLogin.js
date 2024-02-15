import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';
import { handleUpdate } from './handleUpdate';

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
        console.log('data:', data);
        if (data.loginSuccess) {
          const userThis = data.user;
          console.log('userThis:', userThis);
          const updateSuccess = await handleUpdate(email);
          if (!updateSuccess) {
            console.log('Failed to update login details');
            Alert.alert('Login failed. Please try again.');
            return;
          }
          console.log(userThis);
          setUser(userThis);
          navigation.navigate('Homepage');
        } else {
          Alert.alert('Login failed');
        }
      } else {
        const responseText = await response.text();
        console.log('Response text:', responseText);
        Alert.alert('Login failed');
      }
      

    } catch (error) {
      console.log('Error:', error);
    }
  }

}

