import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';
import { useNavigation } from '@react-navigation/native';

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
      console.log('logresponse:', response);
      if (response.ok) {
        const data = await response.json();
        setUser(data.email);
        navigation.navigate('Homepage');
      } else {
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);
        Alert.alert('Login failed');
      }
      

    } catch (error) {
      console.log('Error:', error);
    }
  }

}

