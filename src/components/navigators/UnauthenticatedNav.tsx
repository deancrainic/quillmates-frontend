import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import { UnauthenticatedStackParamList } from './types/UnauthenticatedStackParamList';

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

const UnauthenticatedNav = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Register'}
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedNav;
