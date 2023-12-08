import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserDetailsContext } from '../../contexts/UserDetailsContext';
import ChatListMember from './ChatListMember';
import { ChatDetailsWithId } from '../../models/ChatDetails';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { ChatStackParamList } from '../navigators/types/ChatStackParamList';
import { UserChatContext } from '../../contexts/UserChatContext';

type ChatListProps = NativeStackScreenProps<ChatStackParamList, 'ChatList'>;
const ChatList = ({ navigation }: ChatListProps): JSX.Element => {
  const { userDetails } = useContext(UserDetailsContext);
  const { userChat, setUserChat } = useContext(UserChatContext);
  const [sortedChats, setSortedChats] = useState<ChatDetailsWithId[]>([]);

  useEffect(() => {
    setSortedChats(getSortedChats(userDetails.chats));
    setUserChat((prevState) => {
      let chat = userDetails.chats.filter((c) => c.id === prevState?.id)[0];

      return chat;
    });
  }, [userDetails.chats]);

  const getSortedChats = (chats: ChatDetailsWithId[]) => {
    return chats
      .slice()
      .sort(
        (a, b) =>
          b.messages[b.messages.length - 1].sentAt.toDate().getTime() -
          a.messages[a.messages.length - 1].sentAt.toDate().getTime(),
      );
  };

  const handlePress = (
    username: string,
    pressedUserChat: ChatDetailsWithId,
  ) => {
    setUserChat(pressedUserChat);
    navigation.navigate('Chat', {
      username,
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.main}>
        <Text style={styles.header}>Chats</Text>
        <ScrollView style={styles.listContainer}>
          {sortedChats.map((chat, index) => (
            <ChatListMember
              key={index}
              chatDetails={chat}
              handlePress={handlePress}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    padding: 20,
  },
});

export default ChatList;
