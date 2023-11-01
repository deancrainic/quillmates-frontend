import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FindQuillmates from '../../screens/FindQuillmates';
import MyQuillmates from '../../screens/MyQuillmates';
import Profile from '../../screens/Profile';

const Tab = createBottomTabNavigator();

const AuthenticatedNav = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'FindQuillmates'} component={FindQuillmates} />
      <Tab.Screen name={'MyQuillmates'} component={MyQuillmates} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};

export default AuthenticatedNav;
