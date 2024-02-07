import Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

export async function handleRegister(username, email, password, confirmPassword, navigation) {
    if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Please fill in all fields');
    } else {
        if (password !== confirmPassword) {
            console.log(process.env.EXPO_PUBLIC_REGISTER_IP_URL);
            Alert.alert('Passwords do not match');
            return;
        }
        const response = await fetch(process.env.EXPO_PUBLIC_REGISTER_IP_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
        });
        if (response.ok) {
            await Keychain.setGenericPassword(username, password);
            navigation('Homepage');
        } else {
            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response text:', responseText);
            Alert.alert('Registration failed');
        }
    } 
}