import { Alert } from 'react-native';
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';

export async function checkForExistingEmail(email) {
    const url = `${EXPO_PUBLIC_ACCOUNT_IP_URL}/get/email/${email}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('emailresponse:', response);

        if (response.ok) {
            const data = await response.json();
            console.log('data:', data);

            if (data.emailIsAvailable === false) {
                Alert.alert('Email is already in use');
                return false;
            }

            return true;
        } else {
            console.error('Response not OK');
            return false;
        }
}