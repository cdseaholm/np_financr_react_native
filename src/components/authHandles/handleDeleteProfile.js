const Keychain = require('react-native-keychain');

async function handleDeletProfile(navigation) {
    await Keychain.resetGenericPassword();
    navigation.navigate('Login');
  };

  module.exports = { handleDeletProfile };