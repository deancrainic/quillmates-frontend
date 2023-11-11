import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FindQuillmates from '../../screens/FindQuillmates';
import MyQuillmates from '../../screens/MyQuillmates';
import Profile from '../../screens/Profile';
import { AuthenticatedTabsParamList } from './types/AuthenticatedTabsParamList';

const Tab = createBottomTabNavigator<AuthenticatedTabsParamList>();

//pe useEffect facem request sa vedem daca avem user details. In functie daca avem user detail trimitem la navivatorul norml altfel trimitem la profile
const AuthenticatedNav = (): JSX.Element => {
  useEffect(() => {});
  return (
    <Tab.Navigator>
      <Tab.Screen name={'FindQuillmates'} component={FindQuillmates} />
      <Tab.Screen name={'MyQuillmates'} component={MyQuillmates} />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{ headerShown: false }}
        initialParams={{ usernameEditable: true }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedNav;
