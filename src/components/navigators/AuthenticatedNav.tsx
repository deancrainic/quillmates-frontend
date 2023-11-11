import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FindQuillmates from '../../screens/FindQuillmates';
import MyQuillmates from '../../screens/MyQuillmates';
import Profile from '../../screens/Profile';
import { AuthenticatedTabsParamList } from './types/AuthenticatedTabsParamList';
import { UserDetailsContext } from '../../contexts/UserDetailsContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import UserDetails from '../../models/UserDetails';

const Tab = createBottomTabNavigator<AuthenticatedTabsParamList>();

const AuthenticatedNav = (): JSX.Element => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  useEffect(() => {
    const userId = auth().currentUser!.uid;
    firestore()
      .collection('UserDetails')
      .doc(userId)
      .get()
      .then((details) => {
        const storeDetails = details.data() as UserDetails;
        storeDetails.id = userId;
        setUserDetails(storeDetails);
      });
  }, []);

  return (
    <>
      {userDetails.username.length > 0 ? (
        <Tab.Navigator initialRouteName={'MyQuillmates'}>
          <Tab.Screen name={'FindQuillmates'} component={FindQuillmates} />
          <Tab.Screen name={'MyQuillmates'} component={MyQuillmates} />
          <Tab.Screen
            name={'Profile'}
            component={Profile}
            options={{ headerShown: false }}
            initialParams={{ usernameEditable: true }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name={'Profile'}
            component={Profile}
            options={{
              headerShown: false,
            }}
            initialParams={{ usernameEditable: true }}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

export default AuthenticatedNav;
