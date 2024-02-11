import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';

export async function checkForExistingUsername(username) {
    const url = `${EXPO_PUBLIC_ACCOUNT_IP_URL}/get/username/${username}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('usernameresponse:', response);
        if (response.ok) {
            const data = await response.json();
            console.log('data:', data);

            if (data.usernameIsAvailable === false) {
                Alert.alert('Username is already in use');
                return false;
            }

            return true;
        } else {
            console.error('Response not OK');
            return false;
        }

}