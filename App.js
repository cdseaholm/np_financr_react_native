import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, Component } from 'react';
import { Homepage } from './src/pages/Homepage/Homepage';
import { Registerpage } from './src/pages/Registerpage/Registerpage';
import { Resetpassword } from './src/pages/Resetpassword/Resetpassword';
import { Loginscreen } from './src/pages/Loginscreen/Loginscreen';
import MainAppbar from './src/components/Main-appbar';
import {BottomProfileModalSheet} from './src/components/BottomProfileModalSheet';
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from './src/components/authHandles/userContext';


const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {
  const [isLoading, setisLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const openProfileMenu = () => setProfileMenuVisible(true);
  const closeProfileMenu = () => setProfileMenuVisible(false);

    return (
   <RootStack.Navigator>
          <RootStack.Group mode="modal" initialRouteName='Login' screenOptions={({ route }) => ({
          header: () =>
            route.name !== 'Login' && route.name !== 'ResetPassword' && route.name !== 'Register' && route.name !== 'BottomProfileModalSheet' && (
              <MainAppbar openMenu={openMenu} closeMenu={closeMenu} isMenuVisible={isMenuVisible} isProfileMenuVisible={isProfileMenuVisible} openProfileMenu={openProfileMenu} closeProfileMenu={closeProfileMenu} />
            ),
            
        } )}>
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
    <UserContext.Provider value={{user, setUser}}>
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
    </UserContext.Provider>
  );
}



