import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { ChatStackParamList } from '../navigators/types/ChatStackParamList';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from './ChatHeader';

type ChatProps = NativeStackScreenProps<ChatStackParamList, 'Chat'>;
const Chat = ({ navigation, route }: ChatProps): JSX.Element => {
  const { userChat } = route.params;

  return (
    <SafeAreaView>
      <ChatHeader
        username={userChat.users[1]}
        handleBack={() => navigation.navigate('ChatList')}
      />
    </SafeAreaView>
  );
};

export default Chat;
