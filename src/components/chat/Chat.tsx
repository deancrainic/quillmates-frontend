import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { ChatStackParamList } from '../navigators/types/ChatStackParamList';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from './ChatHeader';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { StyleSheet } from 'react-native';
import { Timestamp } from '@react-native-firebase/firestore/lib/modular/Timestamp';
import { ChatDetailsWithId } from '../../models/ChatDetails';
import { Message } from '../../models/Message';
import firestore from '@react-native-firebase/firestore';
import { UserChatContext } from '../../contexts/UserChatContext';

type ChatProps = NativeStackScreenProps<ChatStackParamList, 'Chat'>;
const Chat = ({ navigation, route }: ChatProps): JSX.Element => {
  const { userChat, setUserChat } = useContext(UserChatContext);
  const [username, setUsername] = useState<string>(route.params.username);

  const convertMessages = (chat: ChatDetailsWithId) => {
    let messages: IMessage[] = [];

    chat.messages.forEach((m, index) => {
      messages.push({
        _id: index,
        text: m.content,
        createdAt: m.sentAt.toDate(),
        user: {
          _id: m.sentBy,
          name: username,
        },
      });
    });

    return messages.sort(
      (a, b) =>
        (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime(),
    );
  };

  const handleMessage = useCallback((sentMessages: IMessage[]) => {
    setUserChat((prevState) => {
      firestore()
        .collection('UserDetails')
        .doc(prevState.users.split('_')[0])
        .collection('chats')
        .doc(prevState.id)
        .update({
          messages: [
            ...prevState.messages,
            {
              content: sentMessages[0].text,
              sentBy: sentMessages[0].user._id,
              sentAt: Timestamp.fromDate(sentMessages[0].createdAt as Date),
            } as Message,
          ],
        });

      firestore()
        .collection('UserDetails')
        .doc(prevState.users.split('_')[1])
        .collection('chats')
        .doc(prevState.id)
        .update({
          messages: [
            ...prevState.messages,
            {
              content: sentMessages[0].text,
              sentBy: sentMessages[0].user._id,
              sentAt: Timestamp.fromDate(sentMessages[0].createdAt as Date),
            } as Message,
          ],
        });

      return {
        ...prevState,
        messages: [
          ...prevState.messages,
          {
            content: sentMessages[0].text,
            sentBy: sentMessages[0].user._id,
            sentAt: Timestamp.fromDate(sentMessages[0].createdAt as Date),
          } as Message,
        ],
      };
    });
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <ChatHeader
        username={username}
        handleBack={() => navigation.navigate('ChatList')}
      />
      <GiftedChat
        messages={convertMessages(userChat)}
        onSend={handleMessage}
        user={{
          _id: userChat.users.split('_')[0],
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Chat;
