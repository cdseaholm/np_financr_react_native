import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Logo from '../../images/nplogo.png';
import { Menu, Avatar, PaperProvider, Divider, IconButton, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function MainAppbar({openMenu, closeMenu, isMenuVisible, openProfileMenu, closeProfileMenu, isProfileMenuVisible}) {
  const navigation = useNavigation();

  return (
    <PaperProvider>
    <View style={{alignItems: "center", flexDirection: 'row', justifyContent: "space-between", backgroundColor: 'rgb(76, 119, 85)', height: 90, paddingTop: 30 }}>

        <View style={{justifyContent: "flex-start", paddingLeft: 5}}>
        <Menu
          visible={isMenuVisible}
          onDismiss={closeMenu}
          anchor={<IconButton iconColor='white' icon="menu" size={30} onPress={openMenu}
           />}
        >
          <Menu.Item onPress={() => {}} title="Option 1" />
          <Menu.Item onPress={() => {}} title="Option 2" />
          <Menu.Item onPress={() => {}} title="Option 3" />
          <Divider />
          <Menu.Item onPress={closeMenu} title="Close Menu" />
        </Menu>
        </View>

        <View style={{justifyContent: "center", paddingRight: 10}}>
        <Text style={{color: "white", fontSize: 18}}>Financr</Text>
        </View>

        
        <View style={{justifyContent: "flex-end", paddingRight: 15}}>
        <TouchableOpacity onPress={openProfileMenu}>
        <Menu
  visible={isProfileMenuVisible}
  onDismiss={closeProfileMenu}
  anchor={<Avatar.Image source={Logo} size={40} />}
>
  <Menu.Item onPress={() => navigation.navigate('BottomProfileModalSheet')} title="Profile"/>
  <Divider />
 {/* {user && <Menu.Item onPress={() => {
    // Add your logout logic here
    navigation.navigate('Login');
  }} title="Logout" />}
*/}
  <Menu.Item onPress={() => navigation.navigate('Login')} title="Logout" /> 
  <Divider />
  <Menu.Item onPress={closeProfileMenu} title="Close Menu" />
</Menu>
        </TouchableOpacity>
        </View>

    </View>
    </PaperProvider>
  );
}

export default MainAppbar;

