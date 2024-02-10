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
            if (usernameIsAvailable == true) {
                Alert.alert('Username is already in use');
            }
            console.log('usernameIsAvailable:', usernameIsAvailable);
            const emailIsAvailable = await checkForExistingEmail(email);
            if (emailIsAvailable == true) {
                Alert.alert('Email is already in use');
            }
            console.log('emailIsAvailable:', emailIsAvailable);
            const isAvailable = usernameIsAvailable == true && emailIsAvailable == true;
            console.log('isAvailable:', isAvailable);
            if (isAvailable == true) {
                try {
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
}
}
}