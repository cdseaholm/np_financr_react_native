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


        if (response.ok) {
            const data = await response.json();

            if (data.emailIsAvailable === false) {
                return false;
            }

            return true;
        } else {
            return false;
        }
}