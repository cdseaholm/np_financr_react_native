import { Alert } from 'react-native';
import { EXPO_PUBLIC_REGISTER_IP_URL } from '@env';
import fetch from 'node-fetch';

export async function handleRegister(username, email, password, confirmPassword, navigation) {

    if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Please fill in all fields');
    } else {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        } else {
        try {
            const response = await fetch(EXPO_PUBLIC_REGISTER_IP_URL, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  email: email
                })
            });
            console.log('Response:', response);
            if (response.ok) {
                navigation.navigate('Homepage');
            } else {
                console.log('Response status:', response.status);
                const responseText = await response.text();
                console.log('Response text:', responseText);
                Alert.alert('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            Alert.alert('An error occurred');
        }
    } 
}}