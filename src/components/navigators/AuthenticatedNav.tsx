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
import { ChatDetails, ChatDetailsWithId } from '../../models/ChatDetails';

const Tab = createBottomTabNavigator<AuthenticatedTabsParamList>();

const AuthenticatedNav = (): JSX.Element => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth().currentUser!.uid;
    firestore()
      .collection('UserDetails')
      .doc(userId)
      .onSnapshot((docSnapshot) => {
        if (docSnapshot.exists) {
          const storeDetails = docSnapshot.data() as UserDetails;
          storeDetails.id = userId;

          const chatsCollectionRef = docSnapshot.ref.collection('chats');
          chatsCollectionRef.get().then((chatsQuerySnapshot) => {
            const chatsData: ChatDetailsWithId[] = [];

            chatsQuerySnapshot.forEach((chatDoc) => {
              const data: ChatDetailsWithId = {
                ...(chatDoc.data() as ChatDetails),
                id: chatDoc.id,
              };

              chatsData.push(data);
            });

            storeDetails.chats = chatsData;
            setUserDetails(storeDetails);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });

    firestore()
      .collection('UserDetails')
      .doc(userId)
      .collection('chats')
      .onSnapshot((chatsSnapshot) => {
        if (!chatsSnapshot.empty) {
          const chatsData: ChatDetailsWithId[] = [];

          chatsSnapshot.forEach((chatDoc) => {
            const data: ChatDetailsWithId = {
              ...(chatDoc.data() as ChatDetails),
              id: chatDoc.id,
            };

            chatsData.push(data);
          });

          setUserDetails((prevState) => {
            return { ...prevState, chats: chatsData };
          });
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : userDetails.username.length > 0 ? (
        <Tab.Navigator
          initialRouteName={'MyQuillmates'}
          screenOptions={{
            tabBarActiveBackgroundColor: '#c0d7e7',
            tabBarInactiveBackgroundColor: '#FFFFFF',
            tabBarLabelStyle: { color: 'black', fontSize: 11 },
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen
            name={'FindQuillmates'}
            component={FindQuillmates}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Icon name={'people-circle'} size={27} color="#1a3e56" />
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
                  color="#1a3e56"
                />
              ),
              tabBarHideOnKeyboard: true,
              tabBarLabelStyle: { color: 'black', fontSize: 11 },
            }}
          />
          <Tab.Screen
            name={'Profile'}
            component={Profile}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Icon name={'person'} size={23} color="#1a3e56" />
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
                <Icon name={'person'} size={23} color="#1a3e56" />
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
