import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';

export async function checkForExistingUsername(username) {
    try {
        const response = await fetch(`${EXPO_PUBLIC_ACCOUNT_IP_URL}get/username/${username}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('data:', data);

            if (data.usernameInUse) {
                Alert.alert('Username is already in use');
                return false;
            }

            return true;
        } else {
            console.error('Response not OK');
            return false;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        Alert.alert('An error occurred');
        return false;
    }
}