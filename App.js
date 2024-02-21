import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect } from 'react';
import { Homepage } from './src/pages/Homepage/Homepage';
import { Registerpage } from './src/pages/Registerpage/Registerpage';
import { Resetpassword } from './src/pages/Resetpassword/Resetpassword';
import { Loginscreen } from './src/pages/Loginscreen/Loginscreen';
import MainAppbar from './src/components/Main-appbar';
import {BottomProfileModalSheet} from './src/components/BottomProfileModalSheet';
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from './src/components/authHandles/userContext';
import { useUserAuthentication } from './src/components/authHandles/useUserAuthentication';

const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const openProfileMenu = () => setProfileMenuVisible(true);
  const closeProfileMenu = () => setProfileMenuVisible(false);

  const shouldShowHeader = (routeName) => {
    const routesWithoutHeader = ['Login', 'ResetPassword', 'Register', 'BottomProfileModalSheet'];
    return !routesWithoutHeader.includes(routeName);
  };

  return (
    <RootStack.Navigator>
      <RootStack.Group mode="modal" screenOptions={({ route }) => ({
        header: () =>
          shouldShowHeader(route.name) && (
            <MainAppbar openMenu={openMenu} closeMenu={closeMenu} isMenuVisible={isMenuVisible} isProfileMenuVisible={isProfileMenuVisible} openProfileMenu={openProfileMenu} closeProfileMenu={closeProfileMenu} />
          ),
              
      })}>
        <RootStack.Screen name="Homepage" component={Homepage} />
        <RootStack.Screen name="Register" component={Registerpage} />
        <RootStack.Screen name="ResetPassword" component={Resetpassword} />
        <RootStack.Screen name="Login" component={Loginscreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ contentStyle: {position: 'absolute', top: '60%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}, presentation: "modal", animation: "slide_from_bottom", header: () => {}}}>
        <RootStack.Screen name="BottomProfileModalSheet" component={BottomProfileModalSheet} screenOptions={{}}/>
      </RootStack.Group>     
    </RootStack.Navigator>
  );
};

export default function App() {
  return (
    <UserContext.Provider value={useUserAuthentication()}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </UserContext.Provider>
  );
}