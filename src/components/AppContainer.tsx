import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthenticatedNav from './navigators/AuthenticatedNav';
import UnauthenticatedNav from './navigators/UnauthenticatedNav';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: '#a6c4bc',
  },
};

const AppContainer = (): JSX.Element => {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const ex_auth = await AsyncStorage.getItem('auth');
      if (ex_auth === null) {
        setAuth({
          userId: '',
          exp: '',
          token: '',
        });
      } else {
        setAuth(JSON.parse(ex_auth));
      }
    };

    checkAuthStatus();
    console.log(auth);
    // AsyncStorage.removeItem('auth');
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      {auth.userId.length > 0 ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </NavigationContainer>
  );
};

export default AppContainer;
