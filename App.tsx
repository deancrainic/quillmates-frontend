import React, { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthenticatedNav from './src/components/navigators/AuthenticatedNav';
import UnauthenticatedNav from './src/components/navigators/UnauthenticatedNav';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: '#a6c4bc',
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
      {user !== null ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </NavigationContainer>
  );
};

export default App;
