import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';
import { checkForExistingEmail } from './checks/checkForExistingEmail';
import * as SecureStore from 'expo-secure-store';

export async function handleRegister(username, email, password, confirmPassword, navigation) {
    if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Please fill in all fields');
    } else {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        } else {

            const emailIsAvailable = await checkForExistingEmail(email);
            if (!emailIsAvailable) { // Change this
                Alert.alert('Email is already in use');
            }
            //console.log('emailIsAvailable:', emailIsAvailable);
            if (emailIsAvailable) {
                const response = await fetch(`${EXPO_PUBLIC_ACCOUNT_IP_URL}/register`, {
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

                    
                if (response.ok) {
                    const data = await response.json();
                    const session_id = data.session_id;
                    await SecureStore.setItemAsync('session_id', session_id);
                    navigation.navigate('Homepage');
                } else {
                    //const responseText = await response.text();
                    //console.log('Response text:', responseText);
                    Alert.alert('Registration failed');
                }
            }
        }
    }
}
