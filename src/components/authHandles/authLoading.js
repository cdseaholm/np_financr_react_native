import React, { useEffect } from 'react';
import { useUserAuthentication } from './useUserAuthentication';


const AuthLoading = ({ navigation }) => {
    const [user, setUser] = useUserAuthentication(navigation);
  
    useEffect(() => {
      navigation.navigate(user ? 'Homepage' : 'Login');
    }, [user]);
  
    return null;
  };
  
  export default AuthLoading;