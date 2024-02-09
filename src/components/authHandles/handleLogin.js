import * as Keychain from 'react-native-keychain';

export async function handleLogin(username, password, navigation) {
  const credentials = await Keychain.getGenericPassword();

  if (credentials && credentials.username === username && credentials.password === password) {
    navigation.navigate('Homepage');
  }
}

