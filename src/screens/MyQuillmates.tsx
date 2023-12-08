import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { ChatStackParamList } from '../components/navigators/types/ChatStackParamList';
import ChatList from '../components/chat/ChatList';
import Chat from '../components/chat/Chat';
import UserChatProvider from '../contexts/UserChatContext';

const Stack = createNativeStackNavigator<ChatStackParamList>();

const MyQuillmates = (): JSX.Element => {
  return (
    <UserChatProvider>
      <Stack.Navigator>
        <Stack.Screen
          name={'ChatList'}
          component={ChatList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Chat'}
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </UserChatProvider>
  );
};

export default MyQuillmates;
