import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import UnauthenticatedNav from './src/components/navigators/UnauthenticatedNav';
import AuthenticatedNav from './src/components/navigators/AuthenticatedNav';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: '#a6c4bc',
  },
};

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('isLoggedIn').then((value) => {
      if (value === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      {isLoggedIn ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </NavigationContainer>
  );
};

export default App;
