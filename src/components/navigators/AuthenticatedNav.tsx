import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FindQuillmates from '../../screens/FindQuillmates';
import MyQuillmates from '../../screens/MyQuillmates';
import Profile from '../../screens/Profile';
import { AuthenticatedTabsParamList } from './types/AuthenticatedTabsParamList';
import { UserDetailsContext } from '../../contexts/UserDetailsContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import UserDetails from '../../models/UserDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator<AuthenticatedTabsParamList>();

const AuthenticatedNav = (): JSX.Element => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth().currentUser!.uid;
    firestore()
      .collection('UserDetails')
      .doc(userId)
      .get()
      .then((details) => {
        if (details.exists) {
          const storeDetails = details.data() as UserDetails;
          storeDetails.id = userId;
          setUserDetails(storeDetails);
        }
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : userDetails.username.length > 0 ? (
        <Tab.Navigator initialRouteName={'MyQuillmates'}>
          <Tab.Screen
            name={'FindQuillmates'}
            component={FindQuillmates}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Icon name={'people-circle'} size={27} color="#16715e" />
              ),
              tabBarHideOnKeyboard: true,
              tabBarLabelStyle: { color: 'black', fontSize: 11 },
            }}
          />
          <Tab.Screen
            name={'MyQuillmates'}
            component={MyQuillmates}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Icon
                  name={'chatbubble-ellipses-sharp'}
                  size={27}
                  color="#16715e"
                />
              ),
              tabBarLabelStyle: { color: 'black', fontSize: 11 },
            }}
          />
          <Tab.Screen
            name={'Profile'}
            component={Profile}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Icon name={'person'} size={23} color="#16715e" />
              ),
              tabBarHideOnKeyboard: true,
              tabBarLabelStyle: { color: 'black', fontSize: 11 },
            }}
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
              tabBarIcon: () => (
                <Icon name={'person'} size={23} color="#16715e" />
              ),
              tabBarHideOnKeyboard: true,
              tabBarLabelStyle: { color: 'black', fontSize: 11 },
            }}
            initialParams={{ usernameEditable: true }}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

export default AuthenticatedNav;
