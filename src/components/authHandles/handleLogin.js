const Keychain = require('react-native-keychain');

async function handleLogin(username, password, navigation) {
  const credentials = await Keychain.getGenericPassword();

  if (credentials && credentials.username === username && credentials.password === password) {
    navigation.navigate('Homepage');
  }
}

module.exports = { handleLogin };

