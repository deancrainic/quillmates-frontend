import React, { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthenticatedNav from './src/components/navigators/AuthenticatedNav';
import UnauthenticatedNav from './src/components/navigators/UnauthenticatedNav';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import UserDetailsProvider from './src/contexts/UserDetailsContext';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: '#f5f5f5',
  },
};

const App = (): JSX.Element => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      {user !== null ? (
        <UserDetailsProvider>
          <AuthenticatedNav />
        </UserDetailsProvider>
      ) : (
        <UnauthenticatedNav />
      )}
    </NavigationContainer>
  );
};

export default App;
