import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';
import { checkForExistingEmail } from './checks/checkForExistingEmail';
import { checkForExistingUsername } from './checks/checkForExistingUsername';

export async function handleRegister(username, email, password, confirmPassword, navigation) {
    if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Please fill in all fields');
    } else {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        } else {
            const usernameIsAvailable = await checkForExistingUsername(username);
            console.log('usernameIsAvailable:', usernameIsAvailable);
            if (!usernameIsAvailable) { // Change this
                Alert.alert('Username is already in use');
            }
            //console.log('usernameIsAvailable:', usernameIsAvailable);
            const emailIsAvailable = await checkForExistingEmail(email);
            console.log('usernameIsAvailable:', usernameIsAvailable);
            if (!emailIsAvailable) { // Change this
                Alert.alert('Email is already in use');
            }
            //console.log('emailIsAvailable:', emailIsAvailable);
            if (usernameIsAvailable && emailIsAvailable) {
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
                console.log('regresponse:', response);
                    
                if (response.ok) {
                    navigation.navigate('Homepage');
                } else {
                    console.log('Response status:', response.status);
                    const responseText = await response.text();
                    console.log('Response text:', responseText);
                    Alert.alert('Registration failed');
                }
            }
        }
    }
}
