import Keychain from 'react-native-keychain';
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';
import { Alert } from 'react-native';
import { Config } from 'react-native-config';

export async function handleRegister(username, email, password, confirmPassword, navigation) {
    const url = Config.EXPO_PUBLIC_REGISTER_IP_URL;
    if (password !== confirmPassword) {
        console.log(url);
        Alert.alert('Passwords do not match');
        return;
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password: hashedPassword,
            }),
        });
        if (response.ok) {
            await Keychain.setGenericPassword(username, email, password);
            navigation('Homepage');
        } else {
            Alert.alert('Registration failed');
        }
}