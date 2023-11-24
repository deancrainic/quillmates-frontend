import React from 'react';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { ChatStackParamList } from '../navigators/types/ChatStackParamList';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from './ChatHeader';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { StyleSheet } from 'react-native';

type ChatProps = NativeStackScreenProps<ChatStackParamList, 'Chat'>;
const Chat = ({ navigation, route }: ChatProps): JSX.Element => {
  const { userChat } = route.params;

  const convertMessages = () => {
    let messages: IMessage[] = [];

    userChat.messages.forEach((m, index) => {
      messages.push({
        _id: index,
        text: m.content,
        createdAt: m.sentAt.toDate(),
        user: {
          _id: m.sentBy,
          name: m.sentBy,
          avatar: 'https://placeimg.com/140/140/any',
        },
      });
    });

    return messages.sort(
      (a, b) =>
        (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime(),
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <ChatHeader
        username={userChat.users[1]}
        handleBack={() => navigation.navigate('ChatList')}
      />
      <GiftedChat
        messages={convertMessages()}
        onSend={() => console.log('SENT')}
        user={{
          _id: userChat.users[0],
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
