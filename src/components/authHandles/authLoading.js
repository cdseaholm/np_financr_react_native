import { useUserAuthentication } from './useUserAuthentication';

const AuthLoading = () => {
  const [user, setUser] = useUserAuthentication();

  return user;
};

export default AuthLoading;